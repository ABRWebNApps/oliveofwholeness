import { createAdminClient } from "@/lib/supabase/server";
import { addMinutes, format, parse, isBefore, isEqual } from "date-fns";

export interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}

export async function getAvailableSlots(date: string, typeId: string) {
  const supabase = await createAdminClient();

  // 1. Check if date is marked as available
  let availableRanges: { start: string; end: string }[] = [];
  const { data: availableDate } = await supabase
    .from("available_dates")
    .select("*")
    .eq("date", date)
    .eq("is_available", true)
    .single();

  if (availableDate) {
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
      availableRanges = [{ start: "09:00", end: "17:00" }];
    }
  } else {
    return [];
  }

  // 2. Get appointment duration
  const { data: type } = await supabase
    .from("appointment_types")
    .select("duration_minutes")
    .eq("id", typeId)
    .single();

  const durationMinutes = type?.duration_minutes || 60;

  // 3. Get existing appointments
  const { data: existingAppointments } = await supabase
    .from("appointments")
    .select("start_time, end_time")
    .eq("appointment_date", date)
    .neq("status", "cancelled");

  // Helper to parse time string
  const parseTime = (timeStr: string, baseDate: Date) => {
    if (timeStr.includes(":")) {
      const parts = timeStr.split(":");
      if (parts.length === 3) {
        return parse(timeStr, "HH:mm:ss", baseDate);
      } else if (parts.length === 2) {
        return parse(timeStr, "HH:mm", baseDate);
      }
    }
    return parse(
      timeStr,
      timeStr.length === 5 ? "HH:mm" : "HH:mm:ss",
      baseDate
    );
  };

  // 4. Generate Slots
  const slots: { startTime: string; endTime: string; available: boolean }[] = [];
  const baseDate = new Date(date);

  for (const range of availableRanges) {
    const rawStart = range.start || "09:00";
    const rawEnd = range.end || "17:00";
    let current = parseTime(rawStart, baseDate);
    const end = parseTime(rawEnd, baseDate);

    if (!isBefore(current, end)) continue;

    while (
      isBefore(addMinutes(current, durationMinutes), end) ||
      isEqual(addMinutes(current, durationMinutes), end)
    ) {
      const slotStart = current;
      const slotEnd = addMinutes(current, durationMinutes);

      const isOverlapping = existingAppointments?.some((app) => {
        if (!app.start_time || !app.end_time) return false;
        const appStart = parseTime(app.start_time, baseDate);
        const appEnd = parseTime(app.end_time, baseDate);
        return isBefore(slotStart, appEnd) && isBefore(appStart, slotEnd);
      });

      const slotCoded = format(slotStart, "HH:mm:ss");
      if (!slots.some((s) => s.startTime === slotCoded)) {
        slots.push({
          startTime: outputFormat(slotStart),
          endTime: outputFormat(slotEnd),
          available: !isOverlapping,
        });
      }

      current = addMinutes(current, 30);
    }
  }

  slots.sort((a, b) => a.startTime.localeCompare(b.startTime));
  return slots;
}

function outputFormat(date: Date) {
  return format(date, "HH:mm:ss");
}