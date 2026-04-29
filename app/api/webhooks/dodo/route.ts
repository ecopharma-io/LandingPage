import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "standardwebhooks";
import nodemailer from "nodemailer";

function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 465,
    secure: (Number(SMTP_PORT) || 465) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendFounderWelcomeEmail(email: string, name: string) {
  const transporter = createTransporter();
  if (!transporter) return;

  const firstName = escapeHtml(name.split(" ")[0]);

  const text = [
    `Hi ${name.split(" ")[0]},`,
    ``,
    `Your payment has been confirmed! Welcome to EcoPharma.`,
    ``,
    `Here's how to get started:`,
    ``,
    `1. Complete your store setup`,
    `   Visit https://ecopharma.io/onboarding to configure your online pharmacy store.`,
    ``,
    `2. We'll build your store`,
    `   Our team will set up your customized storefront based on your preferences. This takes 24-48 hours.`,
    ``,
    `3. Personalized onboarding call`,
    `   A dedicated team member will schedule a 1-on-1 walkthrough to get you started.`,
    ``,
    `4. Go live!`,
    `   Once everything looks great, we'll help you launch your store.`,
    ``,
    `What's included in your plan:`,
    `- All current and future platform features`,
    `- Priority support from our team`,
    `- Direct access for feedback and feature requests`,
    ``,
    `If you have any questions, reply to this email — we read and respond to every message.`,
    ``,
    `Welcome aboard!`,
    ``,
    `The EcoPharma Team`,
    `https://ecopharma.io`,
  ].join("\n");

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">

    <div style="text-align:center;margin-bottom:32px;">
      <div style="display:inline-block;background:linear-gradient(135deg,#2563eb,#1d4ed8);padding:12px 24px;border-radius:12px;">
        <span style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:-0.5px;">EcoPharma</span>
      </div>
    </div>

    <div style="background:#ffffff;border-radius:16px;padding:40px 32px;box-shadow:0 1px 3px rgba(0,0,0,0.08),0 4px 12px rgba(0,0,0,0.04);">

      <div style="text-align:center;margin-bottom:24px;">
        <span style="display:inline-block;background:#dcfce7;color:#166534;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;padding:6px 16px;border-radius:100px;">Payment Confirmed</span>
      </div>

      <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#111827;text-align:center;line-height:1.3;">
        Welcome, ${firstName}!
      </h1>
      <p style="margin:0 0 24px;font-size:15px;color:#6b7280;text-align:center;line-height:1.6;">
        Your payment has been confirmed. Here's how to get started with EcoPharma.
      </p>

      <hr style="border:none;border-top:1px solid #f3f4f6;margin:24px 0;">

      <h2 style="margin:0 0 16px;font-size:16px;font-weight:700;color:#111827;">Here's what happens next</h2>

      <div style="display:flex;margin-bottom:16px;">
        <div style="flex-shrink:0;width:32px;height:32px;background:#eff6ff;border-radius:8px;text-align:center;line-height:32px;font-size:14px;font-weight:700;color:#2563eb;margin-right:14px;">1</div>
        <div>
          <p style="margin:0;font-size:14px;font-weight:600;color:#111827;">Complete your store setup</p>
          <p style="margin:4px 0 0;font-size:13px;color:#6b7280;line-height:1.5;">Tell us about your business, pick your store template, and choose your services.</p>
        </div>
      </div>

      <div style="text-align:center;margin-bottom:20px;">
        <a href="https://ecopharma.io/onboarding" style="display:inline-block;background:#2563eb;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:12px 32px;border-radius:8px;">Complete Your Store Setup</a>
      </div>

      <div style="display:flex;margin-bottom:16px;">
        <div style="flex-shrink:0;width:32px;height:32px;background:#eff6ff;border-radius:8px;text-align:center;line-height:32px;font-size:14px;font-weight:700;color:#2563eb;margin-right:14px;">2</div>
        <div>
          <p style="margin:0;font-size:14px;font-weight:600;color:#111827;">We'll build your store</p>
          <p style="margin:4px 0 0;font-size:13px;color:#6b7280;line-height:1.5;">Our team will set up your customized storefront based on your preferences. This typically takes 24-48 hours.</p>
        </div>
      </div>

      <div style="display:flex;margin-bottom:16px;">
        <div style="flex-shrink:0;width:32px;height:32px;background:#eff6ff;border-radius:8px;text-align:center;line-height:32px;font-size:14px;font-weight:700;color:#2563eb;margin-right:14px;">3</div>
        <div>
          <p style="margin:0;font-size:14px;font-weight:600;color:#111827;">Personalized onboarding call</p>
          <p style="margin:4px 0 0;font-size:13px;color:#6b7280;line-height:1.5;">A dedicated team member will reach out to schedule a 1-on-1 walkthrough of your new store.</p>
        </div>
      </div>

      <div style="display:flex;margin-bottom:24px;">
        <div style="flex-shrink:0;width:32px;height:32px;background:#eff6ff;border-radius:8px;text-align:center;line-height:32px;font-size:14px;font-weight:700;color:#2563eb;margin-right:14px;">4</div>
        <div>
          <p style="margin:0;font-size:14px;font-weight:600;color:#111827;">Go live!</p>
          <p style="margin:4px 0 0;font-size:13px;color:#6b7280;line-height:1.5;">Once everything looks great, we'll help you launch your store and start serving patients online.</p>
        </div>
      </div>

      <hr style="border:none;border-top:1px solid #f3f4f6;margin:24px 0;">

      <div style="background:#f8fafc;border-radius:12px;padding:24px;">
        <p style="margin:0 0 12px;font-size:14px;font-weight:700;color:#111827;text-align:center;">What's included in your plan</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:6px 0;font-size:13px;color:#374151;">All current and future platform features</td></tr>
          <tr><td style="padding:6px 0;font-size:13px;color:#374151;">Priority support from our team</td></tr>
          <tr><td style="padding:6px 0;font-size:13px;color:#374151;">Direct access for feedback and feature requests</td></tr>
          <tr><td style="padding:6px 0;font-size:13px;color:#374151;">60-day satisfaction guarantee</td></tr>
        </table>
      </div>

    </div>

    <div style="text-align:center;padding:32px 0 0;">
      <p style="margin:0 0 12px;font-size:13px;color:#6b7280;">Follow us for updates</p>
      <div style="margin-bottom:20px;">
        <a href="https://x.com/EcoPharma_io" style="display:inline-block;margin:0 6px;color:#6b7280;text-decoration:none;font-size:13px;font-weight:500;">Twitter</a>
        <span style="color:#d1d5db;">&middot;</span>
        <a href="https://www.instagram.com/ecopharma_io/" style="display:inline-block;margin:0 6px;color:#6b7280;text-decoration:none;font-size:13px;font-weight:500;">Instagram</a>
        <span style="color:#d1d5db;">&middot;</span>
        <a href="https://www.youtube.com/@EcoPharma_io" style="display:inline-block;margin:0 6px;color:#6b7280;text-decoration:none;font-size:13px;font-weight:500;">YouTube</a>
      </div>
      <p style="margin:0 0 4px;font-size:12px;color:#9ca3af;">&copy; ${new Date().getFullYear()} EcoPharma. All rights reserved.</p>
      <p style="margin:0;font-size:12px;color:#9ca3af;">Questions? Reply to this email or reach us at <a href="mailto:sales@ecopharma.io" style="color:#2563eb;text-decoration:none;">sales@ecopharma.io</a></p>
    </div>

  </div>
</body>
</html>`;

  console.log(`[WEBHOOK] Sending founder welcome email to: ${email}`);
  const info = await transporter.sendMail({
    from: `"EcoPharma Founders" <lifetime@ecopharma.io>`,
    replyTo: "lifetime@ecopharma.io",
    to: email,
    subject: `Welcome to EcoPharma, ${name.split(" ")[0]} — your payment is confirmed`,
    text,
    html,
  });
  console.log(`[WEBHOOK] Welcome email sent! MessageId: ${info.messageId}`);
}

async function sendPaymentConfirmationToTeam(
  email: string,
  name: string,
  paymentId: string,
  amount: number,
  currency: string
) {
  const transporter = createTransporter();
  if (!transporter) return;

  const notifyTo =
    process.env.CHECKOUT_NOTIFY_EMAIL || "lifetime@ecopharma.io";

  await transporter.sendMail({
    from: `"EcoPharma" <lifetime@ecopharma.io>`,
    to: notifyTo,
    subject: `Payment Confirmed: ${name} — $${(amount / 100).toFixed(2)} ${currency}`,
    text: [
      `Payment confirmed!`,
      ``,
      `Customer: ${name}`,
      `Email: ${email}`,
      `Payment ID: ${paymentId}`,
      `Amount: $${(amount / 100).toFixed(2)} ${currency}`,
      `Time: ${new Date().toISOString()}`,
    ].join("\n"),
    html: `
      <div style="font-family:sans-serif;max-width:600px;">
        <h2 style="color:#166534;">Payment Confirmed</h2>
        <table style="border-collapse:collapse;width:100%;">
          <tr><td style="padding:8px 12px;font-weight:600;border-bottom:1px solid #f3f4f6;">Customer</td><td style="padding:8px 12px;border-bottom:1px solid #f3f4f6;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:600;border-bottom:1px solid #f3f4f6;">Email</td><td style="padding:8px 12px;border-bottom:1px solid #f3f4f6;">${escapeHtml(email)}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:600;border-bottom:1px solid #f3f4f6;">Payment ID</td><td style="padding:8px 12px;border-bottom:1px solid #f3f4f6;">${escapeHtml(paymentId)}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:600;border-bottom:1px solid #f3f4f6;">Amount</td><td style="padding:8px 12px;border-bottom:1px solid #f3f4f6;">$${(amount / 100).toFixed(2)} ${escapeHtml(currency)}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:600;border-bottom:1px solid #f3f4f6;">Time</td><td style="padding:8px 12px;border-bottom:1px solid #f3f4f6;">${new Date().toISOString()}</td></tr>
        </table>
      </div>
    `,
  });
  console.log(`[WEBHOOK] Payment confirmation sent to team: ${notifyTo}`);
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const webhookId = request.headers.get("webhook-id") || "";
    const webhookSignature = request.headers.get("webhook-signature") || "";
    const webhookTimestamp = request.headers.get("webhook-timestamp") || "";

    // Verify webhook signature
    const webhookKey = process.env.DODO_PAYMENTS_WEBHOOK_KEY;
    if (!webhookKey) {
      console.error("[WEBHOOK] DODO_PAYMENTS_WEBHOOK_KEY not configured");
      return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
    }

    const wh = new Webhook(webhookKey);
    try {
      wh.verify(rawBody, {
        "webhook-id": webhookId,
        "webhook-signature": webhookSignature,
        "webhook-timestamp": webhookTimestamp,
      });
    } catch {
      console.error("[WEBHOOK] Signature verification failed");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    console.log(`[WEBHOOK] Event received: ${payload.type}`, payload.data);

    if (payload.type === "payment.succeeded") {
      const { payment_id, total_amount, currency, customer } = payload.data;
      const customerEmail = customer?.email || "";
      const customerName = customer?.name || "";

      // Send welcome email and team notification in parallel
      await Promise.allSettled([
        sendFounderWelcomeEmail(customerEmail, customerName),
        sendPaymentConfirmationToTeam(
          customerEmail,
          customerName,
          payment_id,
          total_amount,
          currency
        ),
      ]);
    } else if (payload.type === "payment.failed") {
      console.error("[WEBHOOK] Payment failed:", payload.data);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[WEBHOOK] Error:", err);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
