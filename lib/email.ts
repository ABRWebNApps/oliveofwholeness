import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendAppointmentStatusEmail(
  toEmail: string,
  customerName: string,
  date: string,
  time: string,
  serviceName: string,
  status: "confirmed" | "cancelled"
) {
  const subject =
    status === "confirmed"
      ? "Appointment Confirmed - Olive of Wholeness"
      : "Appointment Update - Olive of Wholeness";

  const htmlContent =
    status === "confirmed"
      ? `
      <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px;">
        <h2 style="color: #2e7d32;">Appointment Confirmed</h2>
        <p>Dear ${customerName},</p>
        <p>Your appointment has been successfully confirmed.</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #eee;">
          <p style="margin: 0;"><strong>Service:</strong> ${serviceName}</p>
          <p style="margin: 5px 0 0 0;"><strong>Date:</strong> ${date}</p>
          <p style="margin: 5px 0 0 0;"><strong>Time:</strong> ${time}</p>
        </div>
        <p>We look forward to seeing you.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #777;">Best regards,<br/><strong>Olive of Wholeness</strong></p>
      </div>
    `
      : `
      <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px;">
        <h2 style="color: #c62828;">Appointment Update</h2>
        <p>Dear ${customerName},</p>
        <p>We regret to inform you that your appointment request has been declined/cancelled.</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #eee;">
          <p style="margin: 0;"><strong>Service:</strong> ${serviceName}</p>
          <p style="margin: 5px 0 0 0;"><strong>Date:</strong> ${date}</p>
          <p style="margin: 5px 0 0 0;"><strong>Time:</strong> ${time}</p>
        </div>
        <p>Please contact us if you have any questions or would like to reschedule.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #777;">Best regards,<br/><strong>Olive of Wholeness</strong></p>
      </div>
    `;

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
      to: toEmail.trim(),
      subject: subject,
      html: htmlContent,
    });

    if (error) {
      console.error("Resend Error:", error);
      return false;
    }

    console.log("Resend status: Sent", data?.id);
    return true;
  } catch (error) {
    console.error("Critical error in sendAppointmentStatusEmail:", error);
    return false;
  }
}
