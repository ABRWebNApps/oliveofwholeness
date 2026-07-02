import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendAppointmentReminderEmail(
  toEmail: string,
  customerName: string,
  date: string,
  time: string,
  serviceName: string,
  daysBefore: 6 | 3
) {
  if (daysBefore === 6) {
    const subject = "Your Session is Almost Here – A Few Gentle Reminders";
    const htmlContent = `
      <div style="font-family: Georgia, 'Times New Roman', serif; line-height: 1.8; color: #2d2d2d; max-width: 600px; margin: 0 auto; background: #fcfcfc; border-radius: 12px; overflow: hidden; border: 1px solid #e8e0d4;">
        <div style="background: linear-gradient(135deg, #2e7d32, #4caf50); padding: 30px 40px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 400; letter-spacing: 0.5px;">Your Session is Almost Here</h1>
          <p style="color: #e8f5e9; margin: 8px 0 0; font-size: 15px;">A Few Gentle Reminders</p>
        </div>
        <div style="padding: 35px 40px;">
          <p style="font-size: 16px;">Dear ${customerName},</p>
          <p style="font-size: 15px; color: #444;">I hope you're doing well!</p>
          <p style="font-size: 15px; color: #444;">I'm looking forward to our session together. This is a gentle reminder that your <strong>${serviceName}</strong> is scheduled for <strong>${date}</strong> at <strong>${time}</strong>.</p>
          <p style="font-size: 15px; color: #444;">This time has been intentionally set aside just for you, and I can't wait to support you on your healing journey.</p>

          <div style="background: #f1f8e9; padding: 25px; border-radius: 10px; margin: 25px 0; border-left: 4px solid #4caf50;">
            <p style="font-size: 15px; color: #2e7d32; margin-top: 0; font-weight: bold;">To help you get the very best from our time together, here are a few simple ways to prepare:</p>

            <p style="margin-bottom: 12px;"><span style="font-weight: bold; color: #2e7d32;">🍃 Find a quiet, comfortable space</span> where you won't be interrupted. This is your time, and you deserve to be fully present.</p>

            <p style="margin-bottom: 12px;"><span style="font-weight: bold; color: #2e7d32;">📵 Avoid multitasking.</span> Please resist the temptation to answer messages, work, drive, or do other activities during our session. Being fully present allows you to receive deeper insights and experience greater transformation.</p>

            <p style="margin-bottom: 12px;"><span style="font-weight: bold; color: #2e7d32;">📓 Have a notebook and pen nearby.</span> You may receive important insights, reflections, or action steps that you'll want to capture while they're fresh.</p>

            <p style="margin-bottom: 12px;"><span style="font-weight: bold; color: #2e7d32;">💭 Take a few moments beforehand to reflect.</span> Ask yourself:</p>
            <ul style="margin-top: 0; padding-left: 25px; color: #555;">
              <li>What would I most like to leave this session with?</li>
              <li>What has been on my heart lately?</li>
              <li>What am I ready to heal, release, or move forward from?</li>
            </ul>

            <p style="margin-bottom: 12px;"><span style="font-weight: bold; color: #2e7d32;">💻 If your session is online,</span> please check your internet connection, ensure your device is charged, and join a few minutes early if possible.</p>

            <p style="margin-bottom: 12px;"><span style="font-weight: bold; color: #2e7d32;">☕ Keep a glass of water or your favourite warm drink nearby.</span> It helps you stay comfortable and grounded throughout our conversation.</p>

            <p style="margin-bottom: 0;"><span style="font-weight: bold; color: #2e7d32;">❤️ Most importantly, come with an open heart.</span> You don't need to have all the answers or know exactly what to say. Simply show up as you are. This is a safe, supportive space created with care for you.</p>
          </div>

          <p style="font-size: 15px; color: #444;">I believe this session has the potential to bring fresh clarity, meaningful breakthroughs, and practical next steps, and I'm excited to walk alongside you.</p>

          <p style="font-size: 15px; color: #444;">If, for any reason, you need to reschedule, please let me know as early as possible in line with the booking policy.</p>

          <p style="font-size: 15px; color: #444;">Always remember that healing happens one courageous step at a time. Thank you for choosing to invest in yourself. I look forward to seeing you soon.</p>

          <hr style="border: 0; border-top: 1px solid #e0d6c8; margin: 30px 0;" />

          <p style="font-size: 14px; color: #777; font-style: italic;">With warmth,</p>
          <p style="font-size: 16px; color: #2e7d32; font-weight: bold; margin-top: -5px;">Olive of Wholeness</p>

          <div style="background: #fff8e1; padding: 15px; border-radius: 8px; margin-top: 25px; border: 1px solid #f0e6c0;">
            <p style="font-size: 13px; color: #8d6e2c; margin: 0;"><strong>📅 Session Details</strong><br/>
            Service: ${serviceName}<br/>
            Date: ${date}<br/>
            Time: ${time}</p>
          </div>
        </div>
      </div>
    `;

    try {
      const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM || "onboarding@resend.dev",
        to: toEmail.trim(),
        subject,
        html: htmlContent,
      });
      if (error) {
        console.error("Resend Error (6-day reminder):", error);
        return false;
      }
      console.log("6-day reminder sent:", data?.id);
      return true;
    } catch (error) {
      console.error("Critical error in sendAppointmentReminderEmail (6-day):", error);
      return false;
    }
  }

  // --- 3-day reminder ---
  const subject3 = "Your Session is in 3 Days – We're Excited to See You";
  const htmlContent3 = `
    <div style="font-family: Georgia, 'Times New Roman', serif; line-height: 1.7; color: #2d2d2d; max-width: 600px; margin: 0 auto; background: #fcfcfc; border-radius: 12px; overflow: hidden; border: 1px solid #e8e0d4;">
      <div style="background: linear-gradient(135deg, #2e7d32, #4caf50); padding: 25px 40px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 400;">Your Session is in 3 Days</h1>
      </div>
      <div style="padding: 30px 40px;">
        <p style="font-size: 16px;">Dear ${customerName},</p>
        <p style="font-size: 15px; color: #444;">This is a friendly reminder that your <strong>${serviceName}</strong> is coming up in <strong>3 days</strong> on <strong>${date}</strong> at <strong>${time}</strong>.</p>

        <div style="background: #fff8e1; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #f0e6c0;">
          <p style="font-size: 14px; color: #8d6e2c; margin: 0;"><strong>📅 Session Details</strong><br/>
          Service: ${serviceName}<br/>
          Date: ${date}<br/>
          Time: ${time}</p>
        </div>

        <p style="font-size: 15px; color: #444;">Just a quick checklist as you prepare:</p>
        <ul style="padding-left: 20px; color: #555; font-size: 15px;">
          <li style="margin-bottom: 8px;">✅ Find a quiet, comfortable space</li>
          <li style="margin-bottom: 8px;">✅ Ensure a stable internet connection (if online)</li>
          <li style="margin-bottom: 8px;">✅ Have a notebook and pen handy</li>
          <li style="margin-bottom: 8px;">✅ Come with an open heart — you are ready</li>
        </ul>

        <p style="font-size: 15px; color: #444;">If you need to reschedule, please reach out as soon as possible.</p>

        <hr style="border: 0; border-top: 1px solid #e0d6c8; margin: 25px 0;" />
        <p style="font-size: 14px; color: #777; font-style: italic;">With warmth,</p>
        <p style="font-size: 16px; color: #2e7d32; font-weight: bold; margin-top: -5px;">Olive of Wholeness</p>
      </div>
    </div>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
      to: toEmail.trim(),
      subject: subject3,
      html: htmlContent3,
    });
    if (error) {
      console.error("Resend Error (3-day reminder):", error);
      return false;
    }
    console.log("3-day reminder sent:", data?.id);
    return true;
  } catch (error) {
    console.error("Critical error in sendAppointmentReminderEmail (3-day):", error);
    return false;
  }
}

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
