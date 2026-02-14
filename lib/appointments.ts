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
  const startTime = availableDate.start_time || "09:00:00";
  const endTime = availableDate.end_time || "17:00:00";

  // 5. Generate Slots
  const slots: TimeSlot[] = [];
  // Parse using a reference date (the selected date)
  let current = parse(startTime, "HH:mm:ss", new Date(date));
  const end = parse(endTime, "HH:mm:ss", new Date(date));

  // Safety check: if start >= end, return empty
  if (!isBefore(current, end)) {
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
      const appStart = parse(app.start_time, "HH:mm:ss", new Date(date));
      const appEnd = parse(app.end_time, "HH:mm:ss", new Date(date));

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
