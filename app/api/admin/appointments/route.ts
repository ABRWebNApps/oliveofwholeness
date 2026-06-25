import { createAdminClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { sendAppointmentStatusEmail } from "@/lib/email";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

// List all appointments
export async function GET() {
  const supabase = await createAdminClient();
  const { data, error } = await supabase
    .from("appointments")
    .select("*, appointment_types(name)")
    .order("appointment_date", { ascending: true })
    .order("start_time", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// Update appointment status
export async function PATCH(request: Request) {
  const supabase = await createAdminClient();
  const body = await request.json();
  const { id, status } = body;

  if (!id || !status) {
    return NextResponse.json(
      { error: "Missing id or status" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("appointments")
    .update({ status })
    .eq("id", id)
    .select("*, appointment_types(name)")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (status === "confirmed" || status === "cancelled") {
    if (!data.customer_email || !data.customer_email.includes("@")) {
      console.error("Invalid or missing customer email. Skipping email send.");
    } else {
      const dateFormatted = format(
        new Date(data.appointment_date),
        "MMMM d, yyyy"
      );
      const timeFormatted = data.start_time.substring(0, 5);

      try {
        await sendAppointmentStatusEmail(
          data.customer_email,
          data.customer_name,
          dateFormatted,
          timeFormatted,
          data.appointment_types?.name || "Service",
          status as "confirmed" | "cancelled"
        );
      } catch (emailError) {
        console.error("Failed to send status email:", emailError);
      }
    }
  }

  return NextResponse.json(data);
}