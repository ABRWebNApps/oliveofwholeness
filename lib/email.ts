import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: parseInt(process.env.SMTP_PORT || "465") === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

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

  const plainText =
    status === "confirmed"
      ? `Dear ${customerName},\n\nYour appointment has been successfully confirmed.\n\nDetails:\n- Service: ${serviceName}\n- Date: ${date}\n- Time: ${time}\n\nWe look forward to seeing you.\n\nBest regards,\nOlive of Wholeness`
      : `Dear ${customerName},\n\nWe regret to inform you that your appointment request has been declined/cancelled.\n\nDetails:\n- Service: ${serviceName}\n- Date: ${date}\n- Time: ${time}\n\nPlease contact us if you have any questions or would like to reschedule.\n\nBest regards,\nOlive of Wholeness`;

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
    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_USER}" <${process.env.SMTP_USER}>`,
      to: toEmail.trim(),
      replyTo: process.env.SMTP_USER,
      subject: subject,
      text: plainText,
      html: htmlContent,
    });
    console.log(
      "Email status: Delivered to provider. MessageId:",
      info.messageId
    );
    return true;
  } catch (error) {
    console.error("SMTP Error:", error);
    return false;
  }
}
