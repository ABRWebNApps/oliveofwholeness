import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { sendAppointmentStatusEmail } from "@/lib/email";
import { format } from "date-fns";

// List all appointments
export async function GET() {
  const supabase = await createClient();
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
  const supabase = await createClient();
  const body = await request.json();
  const { id, status } = body;

  if (!id || !status) {
    return NextResponse.json(
      { error: "Missing id or status" },
      { status: 400 }
    );
  }

  // Update status and fetch appointment details including customer email and type name
  const { data, error } = await supabase
    .from("appointments")
    .update({ status })
    .eq("id", id)
    .select("*, appointment_types(name)")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Send email if status is confirmed or cancelled
  if (status === "confirmed" || status === "cancelled") {
    // We don't want to block the response if email fails, so we don't await this or handle error here tightly
    // In production, a queue would be better.
    console.log(`Sending email for appointment ${id} with status ${status}`);
    console.log(`Recipient email: ${data.customer_email}`);

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
          status
        );
      } catch (emailError) {
        console.error("Failed to send status email:", emailError);
      }
    }
  }

  return NextResponse.json(data);
}
