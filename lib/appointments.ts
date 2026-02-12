import { createClient } from "@/lib/supabase/server";
import {
  addMinutes,
  format,
  parse,
  startOfDay,
  endOfDay,
  isAfter,
  isBefore,
  isEqual,
  parseISO,
} from "date-fns";

export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export async function getAvailableSlots(date: string, typeId: string) {
  const supabase = await createClient();

  // 1. Get Appointment Type
  const { data: type, error: typeError } = await supabase
    .from("appointment_types")
    .select("*")
    .eq("id", typeId)
    .single();

  if (typeError || !type) throw new Error("Invalid appointment type");

  // 2. Check for Availability Overrides (Priority 1)
  const { data: override, error: overrideError } = await supabase
    .from("availability_overrides")
    .select("*")
    .eq("override_date", date)
    .single();

  let startTime, endTime;

  if (override) {
    if (!override.is_available) return []; // Date specifically blocked
    startTime = override.start_time;
    endTime = override.end_time;
  } else {
    // 3. Fallback to Global Availability (Priority 2)
    const dayOfWeek = new Date(date).getDay();
    const { data: availability, error: availError } = await supabase
      .from("availability_settings")
      .select("*")
      .eq("day_of_week", dayOfWeek)
      .eq("is_active", true)
      .single();

    if (availError || !availability) return []; // No availability for this day

    // 4. Check Blackout Dates (Priority 3)
    const { data: blackout, error: blackoutError } = await supabase
      .from("blackout_dates")
      .select("*")
      .eq("blackout_date", date)
      .single();

    if (blackout) return []; // Date is blacked out

    startTime = availability.start_time;
    endTime = availability.end_time;
  }

  // 4. Get Existing Appointments
  const { data: existingAppointments, error: appointmentsError } =
    await supabase
      .from("appointments")
      .select("start_time, end_time")
      .eq("appointment_date", date)
      .neq("status", "cancelled");

  // 5. Get Config (Buffer)
  const { data: bufferConfig } = await supabase
    .from("booking_configs")
    .select("value")
    .eq("key", "buffer_minutes")
    .single();
  const bufferMinutes = parseInt(bufferConfig?.value || "15");

  // 6. Generate Slots
  const slots: TimeSlot[] = [];
  let current = parse(startTime, "HH:mm:ss", new Date(date));
  const end = parse(endTime, "HH:mm:ss", new Date(date));

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

      // Slot overlaps if:
      // slotStart < appEnd + buffer AND slotEnd + buffer > appStart
      const appEndWithBuffer = addMinutes(appEnd, bufferMinutes);
      const slotEndWithBuffer = addMinutes(slotEnd, bufferMinutes);

      return (
        isBefore(slotStart, appEndWithBuffer) &&
        isAfter(slotEndWithBuffer, appStart)
      );
    });

    if (!isOverlapping) {
      slots.push({
        startTime: format(slotStart, "HH:mm:ss"),
        endTime: format(slotEnd, "HH:mm:ss"),
      });
    }

    // Move to next possible slot (increment by duration + buffer or just fixed interval)
    // Here we increment by duration + buffer to keep things simple or fixed 30m intervals
    current = addMinutes(current, 30);
  }

  return slots;
}
