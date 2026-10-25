import nodemailer, { Transporter } from "nodemailer";

let cachedTransporter: Transporter | null = null;

function getTransporter() {
  if (cachedTransporter) {
    return cachedTransporter;
  }

  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER ? process.env.SMTP_USER.trim() : "";
  // Strip whitespace, spaces, and quotes from app password
  const pass = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/[\s"']/g, "") : "";

  if (!user || !pass) {
    throw new Error("SMTP credentials (SMTP_USER / SMTP_PASS) are missing in environment variables.");
  }

  const isGmail = host.includes("gmail") || user.endsWith("@gmail.com");

  // Use connection pooling to keep TLS/TCP connections hot and eliminate connection overhead
  cachedTransporter = nodemailer.createTransport(
    isGmail
      ? {
          service: "gmail",
          pool: true,
          maxConnections: 5,
          maxMessages: 100,
          rateDelta: 1000,
          rateLimit: 5,
          auth: {
            user,
            pass,
          },
        }
      : {
          host,
          port,
          secure: port === 465,
          pool: true,
          maxConnections: 5,
          maxMessages: 100,
          auth: {
            user,
            pass,
          },
        }
  );

  return cachedTransporter;
}

/**
 * Clean escape helper to prevent HTML injection in emails
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Generate beautifully styled HTML for the visitor confirmation email
 */
function generateVisitorEmailHtml(name: string, message: string): string {
  const escapedName = escapeHtml(name);
  const escapedMessage = escapeHtml(message).replace(/\n/g, "<br/>");
  const year = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank you for reaching out</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0c0d0e; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ededed; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0c0d0e; padding: 40px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #141517; border-radius: 16px; border: 1px solid #27272a; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
          
          <!-- Top Accent Banner -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 32px 32px 20px 32px; border-bottom: 1px solid #222326;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #38bdf8; margin-bottom: 6px;">
                      // MESSAGE DISPATCHED • CONFIRMATION
                    </div>
                    <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
                      Priyanshu Kumar
                    </h1>
                    <div style="font-size: 12px; color: #a1a1aa; margin-top: 4px; font-family: 'Courier New', Courier, monospace;">
                      Full-Stack Software Engineer &amp; Product Builder
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 28px 32px;">
              <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 24px; color: #f4f4f5;">
                Hi <strong>${escapedName}</strong>,
              </p>
              <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 22px; color: #a1a1aa;">
                Thank you for getting in touch through my portfolio. I have received your message safely and wanted to let you know that it is on my radar.
              </p>
              
              <!-- Quick Response Badge -->
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="background-color: #182230; border: 1px solid #1e3a8a; border-radius: 8px; padding: 8px 14px; font-size: 12px; font-family: 'Courier New', Courier, monospace; color: #60a5fa;">
                    ⚡ Typical response time: Within 12 hours
                  </td>
                </tr>
              </table>

              <!-- Message Copy Box -->
              <div style="background-color: #090a0b; border: 1px solid #27272a; border-radius: 12px; padding: 20px; margin-bottom: 28px;">
                <div style="font-size: 11px; font-family: 'Courier New', Courier, monospace; text-transform: uppercase; letter-spacing: 1.5px; color: #71717a; margin-bottom: 10px;">
                  Your Message Summary
                </div>
                <div style="font-size: 13px; line-height: 22px; color: #e4e4e7; font-family: 'Courier New', Courier, monospace; word-break: break-word;">
                  ${escapedMessage}
                </div>
              </div>

              <!-- Direct links / portfolio -->
              <p style="margin: 0 0 20px 0; font-size: 13px; line-height: 20px; color: #a1a1aa;">
                In the meantime, feel free to explore my latest repositories and problem-solving logs:
              </p>

              <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 8px;">
                <tr>
                  <td style="padding-right: 12px;">
                    <a href="https://pranshu.indevs.in" target="_blank" style="display: inline-block; background-color: #ffffff; color: #000000; font-size: 12px; font-weight: 600; text-decoration: none; padding: 9px 18px; border-radius: 8px; font-family: 'Courier New', Courier, monospace;">
                      Visit Portfolio ➔
                    </a>
                  </td>
                  <td style="padding-right: 12px;">
                    <a href="https://github.com/Priyanshu1283" target="_blank" style="display: inline-block; background-color: #1f2023; color: #e4e4e7; border: 1px solid #3f3f46; font-size: 12px; text-decoration: none; padding: 8px 16px; border-radius: 8px; font-family: 'Courier New', Courier, monospace;">
                      GitHub
                    </a>
                  </td>
                  <td>
                    <a href="https://www.linkedin.com/in/priyanshu-kumar-03310a253/" target="_blank" style="display: inline-block; background-color: #1f2023; color: #e4e4e7; border: 1px solid #3f3f46; font-size: 12px; text-decoration: none; padding: 8px 16px; border-radius: 8px; font-family: 'Courier New', Courier, monospace;">
                      LinkedIn
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #0d0e10; border-top: 1px solid #1f2023; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 12px; color: #71717a; font-family: 'Courier New', Courier, monospace;">
                Best regards,<br/>
                <strong style="color: #d4d4d8;">Priyanshu Kumar (Pranshu)</strong>
              </p>
              <p style="margin: 0; font-size: 11px; color: #52525b; font-family: 'Courier New', Courier, monospace;">
                priyanshukumarbgs066@gmail.com • +91-8102346798<br/>
                © ${year} Priyanshu Kumar. Built with Next.js &amp; MERN.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Generate clean HTML for the owner notification email
 */
function generateOwnerEmailHtml(name: string, email: string, message: string): string {
  const escapedName = escapeHtml(name);
  const escapedEmail = escapeHtml(email);
  const escapedMessage = escapeHtml(message).replace(/\n/g, "<br/>");
  const timeString = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Portfolio Message</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f4f5; color: #18181b;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e4e4e7; padding: 28px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
    
    <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #f4f4f5; padding-bottom: 16px; margin-bottom: 20px;">
      <h2 style="margin: 0; font-size: 20px; color: #09090b;">
        ⚡ New Portfolio Inquiry
      </h2>
      <span style="font-size: 12px; color: #71717a; font-family: monospace;">
        ${timeString} IST
      </span>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
      <tr>
        <td style="padding: 8px 0; color: #71717a; width: 80px; font-weight: 600;">From:</td>
        <td style="padding: 8px 0; color: #09090b; font-weight: bold;">${escapedName}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #71717a; font-weight: 600;">Email:</td>
        <td style="padding: 8px 0;">
          <a href="mailto:${escapedEmail}" style="color: #2563eb; text-decoration: none; font-weight: 500;">
            ${escapedEmail}
          </a>
        </td>
      </tr>
    </table>

    <div style="margin-bottom: 24px;">
      <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #71717a; font-weight: 600; margin-bottom: 8px;">
        Message Content:
      </div>
      <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 16px; border-radius: 6px; font-size: 14px; line-height: 22px; color: #334155; white-space: pre-wrap;">
${escapedMessage}
      </div>
    </div>

    <div style="text-align: center; margin-top: 28px; padding-top: 20px; border-top: 1px solid #f4f4f5;">
      <a href="mailto:${escapedEmail}?subject=Re: Inquiry on Priyanshu's Portfolio" style="display: inline-block; background-color: #09090b; color: #ffffff; text-decoration: none; padding: 10px 24px; border-radius: 8px; font-size: 14px; font-weight: 600;">
        ✉️ Reply to ${escapedName}
      </a>
    </div>

  </div>
</body>
</html>
  `.trim();
}

/**
 * Send both emails concurrently in parallel via pooled connection
 */
export async function sendContactEmails({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const transporter = getTransporter();
  const ownerEmail = process.env.CONTACT_OWNER_EMAIL || process.env.SMTP_USER;
  const smtpUser = process.env.SMTP_USER;

  const results = {
    userSent: false,
    ownerSent: false,
    userError: null as string | null,
    ownerError: null as string | null,
  };

  // 1. Prepare Visitor Email Promise
  const userMailPromise = transporter.sendMail({
    from: `"Priyanshu Kumar" <${smtpUser}>`,
    to: email,
    subject: `Thanks for connecting, ${name}! [Priyanshu's Portfolio]`,
    text: `Hi ${name},\n\nThank you for reaching out through my portfolio! I've received your message and will respond within 12 hours.\n\nYour message summary:\n"${message}"\n\nBest regards,\nPriyanshu Kumar\nhttps://pranshu.indevs.in`,
    html: generateVisitorEmailHtml(name, message),
  });

  // 2. Prepare Owner Notification Promise
  const ownerMailPromise = ownerEmail
    ? transporter.sendMail({
        from: `"Portfolio Contact Form" <${smtpUser}>`,
        to: ownerEmail,
        replyTo: email,
        subject: `⚡ New Portfolio Message from ${name}`,
        text: `New Portfolio message from: ${name} (${email})\n\nMessage:\n${message}`,
        html: generateOwnerEmailHtml(name, email, message),
      })
    : Promise.resolve(null);

  // Send BOTH emails at the exact same millisecond in parallel!
  const [userSettled, ownerSettled] = await Promise.allSettled([
    userMailPromise,
    ownerMailPromise,
  ]);

  if (userSettled.status === "fulfilled") {
    results.userSent = true;
  } else {
    const errorMsg =
      userSettled.reason instanceof Error
        ? userSettled.reason.message
        : String(userSettled.reason);
    console.error("Error sending confirmation email to user:", errorMsg);
    results.userError = errorMsg;
  }

  if (ownerSettled.status === "fulfilled" && ownerSettled.value !== null) {
    results.ownerSent = true;
  } else if (ownerSettled.status === "rejected") {
    const errorMsg =
      ownerSettled.reason instanceof Error
        ? ownerSettled.reason.message
        : String(ownerSettled.reason);
    console.error("Error sending notification email to owner:", errorMsg);
    results.ownerError = errorMsg;
  }

  return results;
}
