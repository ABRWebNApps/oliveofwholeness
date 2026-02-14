import { createClient } from "@/lib/supabase/server";
import { addMinutes, format, parse, isBefore, isEqual } from "date-fns";

export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export async function getAvailableSlots(date: string, typeId: string) {
  const supabase = await createClient();

  // 1. Check if date is marked as available in the new system
  const { data: availableDate, error: dateError } = await supabase
    .from("available_dates")
    .select("*")
    .eq("date", date)
    .eq("is_available", true)
    .single();

  // If date is not marked as available or doesn't exist, return no slots
  if (dateError || !availableDate) {
    console.log(`Date ${date} not found or not available`);
    return [];
  }

  // 2. Get Appointment Type
  const { data: type, error: typeError } = await supabase
    .from("appointment_types")
    .select("*")
    .eq("id", typeId)
    .single();

  if (typeError || !type) throw new Error("Invalid appointment type");

  // 3. Get Existing Appointments for this date
  const { data: existingAppointments, error: appointmentsError } =
    await supabase
      .from("appointments")
      .select("start_time, end_time")
      .eq("appointment_date", date)
      .neq("status", "cancelled");

  // 4. Use configured start/end times from available_dates
  // Fallback to 9-5 if columns are null (though migration sets defaults)
  let startTime = availableDate.start_time;
  let endTime = availableDate.end_time;

  // Debug log to see what we got from DB
  console.log(
    `[getAvailableSlots] Date: ${date}, DB Start: ${startTime}, DB End: ${endTime}`
  );

  if (!startTime) {
    startTime = "09:00:00";
    console.log(
      "[getAvailableSlots] start_time missing/null, defaulting to 09:00:00"
    );
  }
  if (!endTime) {
    endTime = "17:00:00";
    console.log(
      "[getAvailableSlots] end_time missing/null, defaulting to 17:00:00"
    );
  }

  // Helper to parse time string safely (handles HH:mm and HH:mm:ss)
  const parseTime = (timeStr: string, baseDate: Date) => {
    // Try HH:mm:ss first
    try {
      if (timeStr.split(":").length === 3) {
        return parse(timeStr, "HH:mm:ss", baseDate);
      }
    } catch (e) {}

    // Try HH:mm
    try {
      if (timeStr.split(":").length === 2) {
        return parse(timeStr, "HH:mm", baseDate);
      }
    } catch (e) {}

    // Fallback/Retry
    return parse(
      timeStr,
      timeStr.length === 5 ? "HH:mm" : "HH:mm:ss",
      baseDate
    );
  };

  // 5. Generate Slots
  const slots: TimeSlot[] = [];
  // Parse using a reference date (the selected date)
  const baseDate = new Date(date);
  let current = parseTime(startTime, baseDate);
  const end = parseTime(endTime, baseDate);

  // Safety check: if start >= end, return empty
  if (!isBefore(current, end)) {
    console.log(
      "[getAvailableSlots] Start time is after end time, returning empty slots"
    );
    return [];
  }

  while (
    isBefore(addMinutes(current, type.duration_minutes), end) ||
    isEqual(addMinutes(current, type.duration_minutes), end)
  ) {
    const slotStart = current;
    const slotEnd = addMinutes(current, type.duration_minutes);

    // Check if slot overlaps with any existing appointment
    const isOverlapping = existingAppointments?.some((app) => {
      const appStart = parseTime(app.start_time, baseDate);
      const appEnd = parseTime(app.end_time, baseDate);

      // Slot overlaps if slotStart < appEnd AND slotEnd > appStart
      return isBefore(slotStart, appEnd) && isBefore(appStart, slotEnd);
    });

    if (!isOverlapping) {
      slots.push({
        startTime: format(slotStart, "HH:mm:ss"),
        endTime: format(slotEnd, "HH:mm:ss"),
      });
    }

    // Move to next slot (30-minute intervals)
    current = addMinutes(current, 30);
  }

  return slots;
}
