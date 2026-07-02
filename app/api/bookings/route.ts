import { createAdminClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/appointments";
import { sendAppointmentStatusEmail } from "@/lib/email";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const supabase = await createAdminClient();
  const body = await request.json();
  const { typeId, name, email, notes, date, startTime, endTime } = body;

  if (!typeId || !name || !email || !date || !startTime || !endTime) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

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
      .select("*, appointment_types(name)")
      .single();

    if (error) throw error;

    // Send confirmation email
    if (email && email.includes("@")) {
      const dateFormatted = format(new Date(date), "MMMM d, yyyy");
      const timeFormatted = startTime.substring(0, 5);
      sendAppointmentStatusEmail(
        email,
        name,
        dateFormatted,
        timeFormatted,
        data?.appointment_types?.name || "Service",
        "confirmed"
      ).catch((e) => console.error("Email send failed:", e));
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}