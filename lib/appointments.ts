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

  // 4. Determine available ranges
  // Prefer time_slots, fallback to start_time/end_time columns, then default 9-5
  let availableRanges: { start: string; end: string }[] = [];

  if (
    availableDate.time_slots &&
    Array.isArray(availableDate.time_slots) &&
    availableDate.time_slots.length > 0
  ) {
    availableRanges = availableDate.time_slots;
  } else if (availableDate.start_time && availableDate.end_time) {
    availableRanges = [
      { start: availableDate.start_time, end: availableDate.end_time },
    ];
  } else {
    availableRanges = [{ start: "09:00:00", end: "17:00:00" }];
    console.log(
      "[getAvailableSlots] No time slots or start/end times found, defaulting to 09:00-17:00"
    );
  }

  // Helper to parse time string safely (handles HH:mm and HH:mm:ss)
  const parseTime = (timeStr: string, baseDate: Date) => {
    // Try HH:mm:ss first
    if (timeStr.includes(":")) {
      const parts = timeStr.split(":");
      if (parts.length === 3) {
        return parse(timeStr, "HH:mm:ss", baseDate);
      } else if (parts.length === 2) {
        return parse(timeStr, "HH:mm", baseDate);
      }
    }
    // Fallback/Retry
    return parse(
      timeStr,
      timeStr.length === 5 ? "HH:mm" : "HH:mm:ss",
      baseDate
    );
  };

  // 5. Generate Slots
  const slots: TimeSlot[] = [];
  const baseDate = new Date(date);

  for (const range of availableRanges) {
    let current = parseTime(range.start, baseDate);
    const end = parseTime(range.end, baseDate);

    // Safety check: if start >= end, return empty
    if (!isBefore(current, end)) {
      console.log(
        `[getAvailableSlots] Range start (${range.start}) is after or equal to end (${range.end}), skipping.`
      );
      continue;
    }

    while (
      isBefore(addMinutes(current, type.duration_minutes), end) ||
      isEqual(addMinutes(current, type.duration_minutes), end)
    ) {
      const slotStart = current;
      const slotEnd = addMinutes(current, type.duration_minutes);

      // Check if slot overlaps with any existing appointment
      const isOverlapping = existingAppointments?.some((app) => {
        // Handle potential nulls or malformed data in appointments (though DB constraints should prevent it)
        if (!app.start_time || !app.end_time) return false;

        const appStart = parseTime(app.start_time, baseDate);
        const appEnd = parseTime(app.end_time, baseDate);

        // Slot overlaps if slotStart < appEnd AND slotEnd > appStart
        return isBefore(slotStart, appEnd) && isBefore(appStart, slotEnd);
      });

      if (!isOverlapping) {
        // Avoid duplicates if ranges overlap (though admin UI should prevent overlap)
        const slotCoded = format(slotStart, "HH:mm:ss");
        if (!slots.some((s) => s.startTime === slotCoded)) {
          slots.push({
            startTime: outputFormat(slotStart),
            endTime: outputFormat(slotEnd),
          });
        }
      }

      // Move to next slot (30-minute intervals)
      current = addMinutes(current, 30);
    }
  }

  // Sort slots by start time
  slots.sort((a, b) => a.startTime.localeCompare(b.startTime));

  return slots;
}

// Helper for consistent output format
function outputFormat(date: Date) {
  return format(date, "HH:mm:ss");
}
