import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface WaitlistOnboardingPayload {
  email: string;
  storeName: string;
  preferredDomain: string;
  tagline?: string;
  template: string;
  primaryColor: string;
  servicesOffered: string[];
  operatingHours: string;
  specialNotes?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 465,
    secure: (Number(SMTP_PORT) || 465) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

// ============================================
// Team notification email
// ============================================

async function sendNotificationEmail(data: WaitlistOnboardingPayload) {
  const transporter = createTransporter();
  if (!transporter) {
    console.warn("[WAITLIST ONBOARDING] SMTP not configured — skipping.");
    return;
  }

  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;font-weight:600;color:#374151;border-bottom:1px solid #f3f4f6;">${escapeHtml(label)}</td><td style="padding:8px 12px;border-bottom:1px solid #f3f4f6;">${escapeHtml(value)}</td></tr>`;

  const text = [
    `Waitlist Onboarding Complete`,
    ``,
    `Email: ${data.email}`,
    ``,
    `=== Store Preferences ===`,
    `Store Name: ${data.storeName}`,
    `Domain: ${data.preferredDomain}.ecopharma.io`,
    `Tagline: ${data.tagline || "N/A"}`,
    `Template: ${data.template}`,
    `Primary Color: ${data.primaryColor}`,
    ``,
    `=== Services & Preferences ===`,
    `Services: ${data.servicesOffered.join(", ")}`,
    `Operating Hours: ${data.operatingHours}`,
    `Special Notes: ${data.specialNotes || "N/A"}`,
    ``,
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");

  const html = `
    <div style="font-family:sans-serif;max-width:600px;">
      <h2 style="color:#2563eb;margin-bottom:4px;">Waitlist Onboarding Complete</h2>
      <p style="color:#6b7280;font-size:14px;margin-top:0;">A waitlist customer has set up their store preferences.</p>

      <h3 style="color:#111827;margin-top:24px;">Contact</h3>
      <table style="border-collapse:collapse;width:100%;">
        ${row("Email", data.email)}
      </table>

      <h3 style="color:#111827;margin-top:24px;">Store Preferences</h3>
      <table style="border-collapse:collapse;width:100%;">
        ${row("Store Name", data.storeName)}
        ${row("Domain", `${data.preferredDomain}.ecopharma.io`)}
        ${row("Tagline", data.tagline || "N/A")}
        ${row("Template", data.template)}
        ${row("Primary Color", data.primaryColor)}
      </table>

      <h3 style="color:#111827;margin-top:24px;">Services & Preferences</h3>
      <table style="border-collapse:collapse;width:100%;">
        ${row("Services", data.servicesOffered.join(", "))}
        ${row("Operating Hours", data.operatingHours)}
        ${row("Special Notes", data.specialNotes || "N/A")}
      </table>

      <p style="color:#6b7280;font-size:12px;margin-top:24px;">Submitted: ${new Date().toISOString()}</p>
    </div>
  `;

  const info = await transporter.sendMail({
    from: `"EcoPharma" <waitlist@ecopharma.io>`,
    to: process.env.LEAD_NOTIFY_EMAIL || "waitlist@ecopharma.io",
    subject: `Waitlist Setup: ${data.storeName} (${data.email})`,
    text,
    html,
  });
  console.log(`[WAITLIST ONBOARDING NOTIFY] Sent! MessageId: ${info.messageId}`);
}

// ============================================
// User confirmation email
// ============================================

async function sendConfirmationEmail(data: WaitlistOnboardingPayload) {
  const transporter = createTransporter();
  if (!transporter) return;

  const storeName = escapeHtml(data.storeName);
  const domain = escapeHtml(data.preferredDomain);

  const text = [
    `Your store preferences are saved!`,
    ``,
    `Thank you for setting up your preferences for ${data.storeName}. We've saved everything and will use it to prepare your store.`,
    ``,
    `Your preferences:`,
    `- Store: ${data.storeName}`,
    `- Domain: ${data.preferredDomain}.ecopharma.io`,
    `- Template: ${data.template}`,
    `- Services: ${data.servicesOffered.join(", ")}`,
    ``,
    `What happens next:`,
    `1. You're on our priority list`,
    `2. We'll notify you when your spot opens`,
    `3. Your store will be pre-configured with your preferences`,
    `4. You'll get a personalized onboarding walkthrough`,
    ``,
    `If you have any questions, reply to this email.`,
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

    <div style="background:#ffffff;border-radius:16px;padding:40px 32px;box-shadow:0 1px 3px rgba(0,0,0,0.08);">

      <div style="text-align:center;margin-bottom:24px;">
        <span style="display:inline-block;background:#eff6ff;color:#2563eb;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;padding:6px 16px;border-radius:100px;">Preferences Saved</span>
      </div>

      <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#111827;text-align:center;line-height:1.3;">
        Your store is taking shape!
      </h1>
      <p style="margin:0 0 24px;font-size:15px;color:#6b7280;text-align:center;line-height:1.6;">
        We've saved your preferences for <strong style="color:#374151;">${storeName}</strong>. Here's a summary.
      </p>

      <hr style="border:none;border-top:1px solid #f3f4f6;margin:24px 0;">

      <div style="background:#f8fafc;border-radius:12px;padding:20px;">
        <p style="margin:0 0 12px;font-size:14px;font-weight:700;color:#111827;">Your store details</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:4px 0;font-size:13px;color:#6b7280;width:120px;">Store Name</td><td style="padding:4px 0;font-size:13px;color:#374151;font-weight:500;">${storeName}</td></tr>
          <tr><td style="padding:4px 0;font-size:13px;color:#6b7280;">Domain</td><td style="padding:4px 0;font-size:13px;color:#374151;font-weight:500;">${domain}.ecopharma.io</td></tr>
          <tr><td style="padding:4px 0;font-size:13px;color:#6b7280;">Template</td><td style="padding:4px 0;font-size:13px;color:#374151;font-weight:500;">${escapeHtml(data.template)}</td></tr>
          <tr><td style="padding:4px 0;font-size:13px;color:#6b7280;">Services</td><td style="padding:4px 0;font-size:13px;color:#374151;font-weight:500;">${escapeHtml(data.servicesOffered.join(", "))}</td></tr>
        </table>
      </div>

      <hr style="border:none;border-top:1px solid #f3f4f6;margin:24px 0;">

      <h2 style="margin:0 0 16px;font-size:16px;font-weight:700;color:#111827;">What happens next</h2>

      <div style="display:flex;margin-bottom:16px;">
        <div style="flex-shrink:0;width:32px;height:32px;background:#eff6ff;border-radius:8px;text-align:center;line-height:32px;font-size:14px;font-weight:700;color:#2563eb;margin-right:14px;">1</div>
        <div>
          <p style="margin:0;font-size:14px;font-weight:600;color:#111827;">You're on our priority list</p>
          <p style="margin:4px 0 0;font-size:13px;color:#6b7280;line-height:1.5;">We're onboarding pharmacies in small batches for the best experience.</p>
        </div>
      </div>

      <div style="display:flex;margin-bottom:16px;">
        <div style="flex-shrink:0;width:32px;height:32px;background:#eff6ff;border-radius:8px;text-align:center;line-height:32px;font-size:14px;font-weight:700;color:#2563eb;margin-right:14px;">2</div>
        <div>
          <p style="margin:0;font-size:14px;font-weight:600;color:#111827;">We'll notify you when your spot opens</p>
          <p style="margin:4px 0 0;font-size:13px;color:#6b7280;line-height:1.5;">You'll receive an email with your login credentials.</p>
        </div>
      </div>

      <div style="display:flex;margin-bottom:16px;">
        <div style="flex-shrink:0;width:32px;height:32px;background:#eff6ff;border-radius:8px;text-align:center;line-height:32px;font-size:14px;font-weight:700;color:#2563eb;margin-right:14px;">3</div>
        <div>
          <p style="margin:0;font-size:14px;font-weight:600;color:#111827;">Your store will be ready</p>
          <p style="margin:4px 0 0;font-size:13px;color:#6b7280;line-height:1.5;">Pre-configured with the template, colors, and services you chose today.</p>
        </div>
      </div>

      <div style="display:flex;margin-bottom:24px;">
        <div style="flex-shrink:0;width:32px;height:32px;background:#eff6ff;border-radius:8px;text-align:center;line-height:32px;font-size:14px;font-weight:700;color:#2563eb;margin-right:14px;">4</div>
        <div>
          <p style="margin:0;font-size:14px;font-weight:600;color:#111827;">Personalized onboarding call</p>
          <p style="margin:4px 0 0;font-size:13px;color:#6b7280;line-height:1.5;">A team member will walk you through your new store.</p>
        </div>
      </div>

    </div>

    <div style="text-align:center;padding:32px 0 0;">
      <p style="margin:0 0 4px;font-size:12px;color:#9ca3af;">
        &copy; ${new Date().getFullYear()} EcoPharma. All rights reserved.
      </p>
      <p style="margin:0;font-size:12px;color:#9ca3af;">
        Questions? Reply to this email or reach us at
        <a href="mailto:sales@ecopharma.io" style="color:#2563eb;text-decoration:none;">sales@ecopharma.io</a>
      </p>
    </div>

  </div>
</body>
</html>`;

  const info = await transporter.sendMail({
    from: `"EcoPharma" <waitlist@ecopharma.io>`,
    replyTo: "waitlist@ecopharma.io",
    to: data.email,
    subject: `Your store preferences are saved — here's what's next`,
    text,
    html,
  });
  console.log(`[WAITLIST ONBOARDING CONFIRM] Sent to ${data.email}! MessageId: ${info.messageId}`);
}

// ============================================
// Google Sheets
// ============================================

async function appendToGoogleSheet(data: WaitlistOnboardingPayload) {
  const sheetUrl = process.env.GOOGLE_SHEET_WAITLIST_ONBOARDING_WEBHOOK_URL;
  if (!sheetUrl) {
    console.warn("[GOOGLE SHEET] Waitlist onboarding webhook URL not configured — skipping.");
    return;
  }

  await fetch(sheetUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "waitlist-onboarding",
      email: data.email,
      storeName: data.storeName,
      preferredDomain: data.preferredDomain,
      tagline: data.tagline || "",
      template: data.template,
      primaryColor: data.primaryColor,
      servicesOffered: data.servicesOffered.join(", "),
      operatingHours: data.operatingHours,
      specialNotes: data.specialNotes || "",
      timestamp: new Date().toISOString(),
    }),
  });
}

// ============================================
// POST handler
// ============================================

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<WaitlistOnboardingPayload>;

    const { email, storeName, preferredDomain, template, primaryColor, servicesOffered, operatingHours } = body;

    if (
      !email?.trim() ||
      !storeName?.trim() ||
      !preferredDomain?.trim() ||
      !template?.trim() ||
      !primaryColor?.trim() ||
      !operatingHours?.trim() ||
      !servicesOffered ||
      servicesOffered.length === 0
    ) {
      return NextResponse.json(
        { success: false, error: "All required fields must be filled." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const data: WaitlistOnboardingPayload = {
      email: email.toLowerCase().trim(),
      storeName: storeName.trim(),
      preferredDomain: preferredDomain.trim().toLowerCase().replace(/[^a-z0-9-]/g, ""),
      tagline: body.tagline?.trim(),
      template: template.trim(),
      primaryColor: primaryColor.trim(),
      servicesOffered,
      operatingHours: operatingHours.trim(),
      specialNotes: body.specialNotes?.trim(),
    };

    console.log("[WAITLIST ONBOARDING]", {
      email: data.email,
      storeName: data.storeName,
      timestamp: new Date().toISOString(),
    });

    const labels = ["notifyEmail", "confirmEmail", "googleSheet"];
    const results = await Promise.allSettled([
      sendNotificationEmail(data),
      sendConfirmationEmail(data),
      appendToGoogleSheet(data),
    ]);

    const errors: string[] = [];
    results.forEach((result, i) => {
      if (result.status === "rejected") {
        const msg = result.reason instanceof Error ? result.reason.message : String(result.reason);
        console.error(`[WAITLIST ONBOARDING ${labels[i]}] FAILED:`, msg);
        errors.push(`${labels[i]}: ${msg}`);
      } else {
        console.log(`[WAITLIST ONBOARDING ${labels[i]}] OK`);
      }
    });

    return NextResponse.json({ success: true, errors: errors.length ? errors : undefined });
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
