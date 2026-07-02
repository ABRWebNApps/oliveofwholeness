import { createAdminClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { sendAppointmentReminderEmail } from "@/lib/email";
import { format, addDays, startOfDay } from "date-fns";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function GET() {
  const supabase = await createAdminClient();
  const today = startOfDay(new Date());
  const results = { reminder6day: { sent: 0, skipped: 0 }, reminder3day: { sent: 0, skipped: 0 }, errors: [] as string[] };

  // --- 6-day reminder ---
  const date6 = format(addDays(today, 6), "yyyy-MM-dd");
  const { data: appointments6, error: err6 } = await supabase
    .from("appointments")
    .select("id, customer_name, customer_email, appointment_date, start_time, appointment_types(name)")
    .eq("appointment_date", date6)
    .eq("status", "confirmed")
    .eq("reminder_6day_sent", false);

  if (err6) {
    results.errors.push(`6-day query failed: ${err6.message}`);
  } else if (appointments6) {
    for (const appt of appointments6) {
      if (!appt.customer_email?.includes("@")) {
        results.reminder6day.skipped++;
        continue;
      }
      try {
        const ok = await sendAppointmentReminderEmail(
          appt.customer_email,
          appt.customer_name,
          format(new Date(appt.appointment_date), "EEEE, MMMM d, yyyy"),
          appt.start_time.substring(0, 5),
          (appt.appointment_types as unknown as { name: string } | null)?.name || "Service",
          6
        );
        if (ok) {
          await supabase.from("appointments").update({ reminder_6day_sent: true }).eq("id", appt.id);
          results.reminder6day.sent++;
        } else {
          results.errors.push(`Failed to send 6-day reminder to ${appt.customer_email}`);
        }
      } catch (e: any) {
        results.errors.push(`6-day error for ${appt.customer_email}: ${e.message}`);
      }
    }
  }

  // --- 3-day reminder ---
  const date3 = format(addDays(today, 3), "yyyy-MM-dd");
  const { data: appointments3, error: err3 } = await supabase
    .from("appointments")
    .select("id, customer_name, customer_email, appointment_date, start_time, appointment_types(name)")
    .eq("appointment_date", date3)
    .eq("status", "confirmed")
    .eq("reminder_3day_sent", false);

  if (err3) {
    results.errors.push(`3-day query failed: ${err3.message}`);
  } else if (appointments3) {
    for (const appt of appointments3) {
      if (!appt.customer_email?.includes("@")) {
        results.reminder3day.skipped++;
        continue;
      }
      try {
        const ok = await sendAppointmentReminderEmail(
          appt.customer_email,
          appt.customer_name,
          format(new Date(appt.appointment_date), "EEEE, MMMM d, yyyy"),
          appt.start_time.substring(0, 5),
          (appt.appointment_types as unknown as { name: string } | null)?.name || "Service",
          3
        );
        if (ok) {
          await supabase.from("appointments").update({ reminder_3day_sent: true }).eq("id", appt.id);
          results.reminder3day.sent++;
        } else {
          results.errors.push(`Failed to send 3-day reminder to ${appt.customer_email}`);
        }
      } catch (e: any) {
        results.errors.push(`3-day error for ${appt.customer_email}: ${e.message}`);
      }
    }
  }

  return NextResponse.json({
    ok: results.errors.length === 0,
    summary: `6-day: ${results.reminder6day.sent} sent, ${results.reminder6day.skipped} skipped | 3-day: ${results.reminder3day.sent} sent, ${results.reminder3day.skipped} skipped`,
    ...results,
  });
}