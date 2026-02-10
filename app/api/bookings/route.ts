import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/appointments";

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();
  const { typeId, name, email, notes, date, startTime, endTime } = body;

  if (!typeId || !name || !email || !date || !startTime || !endTime) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // 1. Double check availability (prevent race conditions/late entries)
  try {
    const availableSlots = await getAvailableSlots(date, typeId);
    const isStillAvailable = availableSlots.some(
      (slot) => slot.startTime === startTime && slot.endTime === endTime
    );

    if (!isStillAvailable) {
      return NextResponse.json(
        { error: "This slot is no longer available" },
        { status: 409 }
      );
    }

    // 2. Create the appointment
    const { data, error } = await supabase
      .from("appointments")
      .insert([
        {
          appointment_type_id: typeId,
          customer_name: name,
          customer_email: email,
          notes,
          appointment_date: date,
          start_time: startTime,
          end_time: endTime,
          status: "pending",
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
