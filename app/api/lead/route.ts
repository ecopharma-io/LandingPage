import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Basic in-memory rate limiting (resets on server restart — fine for pre-launch)
const recentSubmissions = new Map<string, number>();
const RATE_LIMIT_MS = 5 * 60 * 1000; // 5 minutes

interface LeadPayload {
  pharmacyName: string;
  contactName: string;
  email: string;
  phone?: string;
  state: string;
  locations: string;
  challenge: string;
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
// Internal notification email (to your team)
// ============================================

async function sendLeadNotification(lead: LeadPayload) {
  const transporter = createTransporter();
  if (!transporter) {
    console.warn("[LEAD EMAIL] SMTP not configured — skipping.");
    return;
  }

  const text = [
    `New Waitlist Lead`,
    ``,
    `Pharmacy: ${lead.pharmacyName}`,
    `Contact: ${lead.contactName}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone || "N/A"}`,
    `State: ${lead.state}`,
    `Locations: ${lead.locations}`,
    `Challenge: ${lead.challenge}`,
    ``,
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");

  const html = `
    <h2 style="color:#2563eb;">New Waitlist Lead</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;">
      <tr><td style="padding:6px 12px;font-weight:600;color:#374151;">Pharmacy</td><td style="padding:6px 12px;">${escapeHtml(lead.pharmacyName)}</td></tr>
      <tr><td style="padding:6px 12px;font-weight:600;color:#374151;">Contact</td><td style="padding:6px 12px;">${escapeHtml(lead.contactName)}</td></tr>
      <tr><td style="padding:6px 12px;font-weight:600;color:#374151;">Email</td><td style="padding:6px 12px;"><a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></td></tr>
      <tr><td style="padding:6px 12px;font-weight:600;color:#374151;">Phone</td><td style="padding:6px 12px;">${escapeHtml(lead.phone || "N/A")}</td></tr>
      <tr><td style="padding:6px 12px;font-weight:600;color:#374151;">State</td><td style="padding:6px 12px;">${escapeHtml(lead.state)}</td></tr>
      <tr><td style="padding:6px 12px;font-weight:600;color:#374151;">Locations</td><td style="padding:6px 12px;">${escapeHtml(lead.locations)}</td></tr>
      <tr><td style="padding:6px 12px;font-weight:600;color:#374151;">Challenge</td><td style="padding:6px 12px;">${escapeHtml(lead.challenge)}</td></tr>
    </table>
    <p style="color:#6b7280;font-size:12px;margin-top:16px;">Submitted: ${new Date().toISOString()}</p>
  `;

  await transporter.sendMail({
    from: `"EcoPharma" <waitlist@ecopharma.io>`,
    to: process.env.LEAD_NOTIFY_EMAIL || "waitlist@ecopharma.io",
    subject: `New Lead: ${lead.pharmacyName} (${lead.state})`,
    text,
    html,
  });
}

// ============================================
// Auto-reply email (to the person who signed up)
// ============================================

async function sendWelcomeEmail(lead: LeadPayload) {
  const transporter = createTransporter();
  if (!transporter) return;

  const firstName = escapeHtml(lead.contactName.split(" ")[0]);
  const pharmacyName = escapeHtml(lead.pharmacyName);

  const text = [
    `Hi ${lead.contactName.split(" ")[0]},`,
    ``,
    `Thank you for joining the EcoPharma waitlist! We're thrilled to have ${lead.pharmacyName} on board.`,
    ``,
    `Here's what happens next:`,
    ``,
    `1. You're now on our VIP early access list`,
    `2. We'll notify you as soon as your spot is ready`,
    `3. You'll get a personalized onboarding walkthrough`,
    ``,
    `While you wait, set up your store preferences so we can launch faster:`,
    `  https://ecopharma.io/waitlist/onboarding`,
    ``,
    `Follow us on social media for updates:`,
    `  Twitter: https://x.com/EcoPharma_io`,
    `  Instagram: https://www.instagram.com/ecopharma_io/`,
    `  YouTube: https://www.youtube.com/@EcoPharma_io`,
    ``,
    `Reply to this email with any questions — we read every message.`,
    ``,
    `Want to skip the wait? Claim lifetime access for a one-time $999 payment:`,
    `  https://ecopharma.io/checkout`,
    ``,
    `We're building EcoPharma specifically for independent pharmacies like yours, and your feedback matters. Don't hesitate to reach out.`,
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

    <!-- Header -->
    <div style="text-align:center;margin-bottom:32px;">
      <div style="display:inline-block;background:linear-gradient(135deg,#2563eb,#1d4ed8);padding:12px 24px;border-radius:12px;">
        <span style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:-0.5px;">EcoPharma</span>
      </div>
    </div>

    <!-- Main Card -->
    <div style="background:#ffffff;border-radius:16px;padding:40px 32px;box-shadow:0 1px 3px rgba(0,0,0,0.08),0 4px 12px rgba(0,0,0,0.04);">

      <!-- Welcome Badge -->
      <div style="text-align:center;margin-bottom:24px;">
        <span style="display:inline-block;background:#eff6ff;color:#2563eb;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;padding:6px 16px;border-radius:100px;">You're on the list</span>
      </div>

      <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#111827;text-align:center;line-height:1.3;">
        Welcome, ${firstName}!
      </h1>
      <p style="margin:0 0 24px;font-size:15px;color:#6b7280;text-align:center;line-height:1.6;">
        Thank you for signing up <strong style="color:#374151;">${pharmacyName}</strong> for EcoPharma's early access program.
      </p>

      <hr style="border:none;border-top:1px solid #f3f4f6;margin:24px 0;">

      <!-- What's Next -->
      <h2 style="margin:0 0 16px;font-size:16px;font-weight:700;color:#111827;">
        Here's what happens next
      </h2>

      <!-- Step 1 -->
      <div style="display:flex;margin-bottom:16px;">
        <div style="flex-shrink:0;width:32px;height:32px;background:#eff6ff;border-radius:8px;text-align:center;line-height:32px;font-size:14px;font-weight:700;color:#2563eb;margin-right:14px;">1</div>
        <div>
          <p style="margin:0;font-size:14px;font-weight:600;color:#111827;">You're on our VIP early access list</p>
          <p style="margin:4px 0 0;font-size:13px;color:#6b7280;line-height:1.5;">We're onboarding pharmacies in small batches to ensure the best experience.</p>
        </div>
      </div>

      <!-- Step 2 -->
      <div style="display:flex;margin-bottom:16px;">
        <div style="flex-shrink:0;width:32px;height:32px;background:#eff6ff;border-radius:8px;text-align:center;line-height:32px;font-size:14px;font-weight:700;color:#2563eb;margin-right:14px;">2</div>
        <div>
          <p style="margin:0;font-size:14px;font-weight:600;color:#111827;">We'll notify you when your spot is ready</p>
          <p style="margin:4px 0 0;font-size:13px;color:#6b7280;line-height:1.5;">You'll receive an email with your login credentials and setup instructions.</p>
        </div>
      </div>

      <!-- Step 3 -->
      <div style="display:flex;margin-bottom:24px;">
        <div style="flex-shrink:0;width:32px;height:32px;background:#eff6ff;border-radius:8px;text-align:center;line-height:32px;font-size:14px;font-weight:700;color:#2563eb;margin-right:14px;">3</div>
        <div>
          <p style="margin:0;font-size:14px;font-weight:600;color:#111827;">Personalized onboarding walkthrough</p>
          <p style="margin:4px 0 0;font-size:13px;color:#6b7280;line-height:1.5;">A dedicated team member will guide you through setting up your online store.</p>
        </div>
      </div>

      <hr style="border:none;border-top:1px solid #f3f4f6;margin:24px 0;">

      <!-- Set Up Your Store CTA -->
      <div style="text-align:center;margin-bottom:24px;">
        <p style="margin:0 0 8px;font-size:14px;font-weight:600;color:#111827;">Pre-configure your store while you wait</p>
        <p style="margin:0 0 16px;font-size:13px;color:#6b7280;line-height:1.5;">Choose your template, colors, and services so we can launch faster when your spot opens.</p>
        <a href="https://ecopharma.io/waitlist/onboarding" style="display:inline-block;background:#2563eb;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:12px 32px;border-radius:8px;">Set Up Your Store</a>
      </div>

      <hr style="border:none;border-top:1px solid #f3f4f6;margin:24px 0;">

      <!-- Skip the Line CTA -->
      <div style="background:#f8fafc;border-radius:12px;padding:24px;text-align:center;">
        <p style="margin:0 0 4px;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#1d4ed8;">Don't want to wait?</p>
        <p style="margin:0 0 16px;font-size:15px;color:#374151;font-weight:500;">Skip the line with lifetime access — <strong>$999 one-time</strong></p>
        <a href="https://ecopharma.io/checkout" style="display:inline-block;background:#2563eb;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:12px 28px;border-radius:8px;">Claim Lifetime Access</a>
        <p style="margin:12px 0 0;font-size:12px;color:#6b7280;">No monthly fees, ever. 60-day satisfaction guarantee.</p>
      </div>

    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:32px 0 0;">
      <!-- Social Links -->
      <p style="margin:0 0 12px;font-size:13px;color:#6b7280;">Follow us for updates</p>
      <div style="margin-bottom:20px;">
        <a href="https://x.com/EcoPharma_io" style="display:inline-block;margin:0 6px;color:#6b7280;text-decoration:none;font-size:13px;font-weight:500;">Twitter</a>
        <span style="color:#d1d5db;">&middot;</span>
        <a href="https://www.instagram.com/ecopharma_io/" style="display:inline-block;margin:0 6px;color:#6b7280;text-decoration:none;font-size:13px;font-weight:500;">Instagram</a>
        <span style="color:#d1d5db;">&middot;</span>
        <a href="https://www.youtube.com/@EcoPharma_io" style="display:inline-block;margin:0 6px;color:#6b7280;text-decoration:none;font-size:13px;font-weight:500;">YouTube</a>
      </div>

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

  await transporter.sendMail({
    from: `"EcoPharma" <waitlist@ecopharma.io>`,
    replyTo: "waitlist@ecopharma.io",
    to: lead.email,
    subject: `Welcome to EcoPharma, ${lead.contactName.split(" ")[0]}! You're on the list.`,
    text,
    html,
  });
}

// ============================================
// Google Sheets — append lead as a new row
// ============================================

async function appendToGoogleSheet(lead: LeadPayload) {
  const sheetUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!sheetUrl) {
    console.warn("[GOOGLE SHEET] Webhook URL not configured — skipping.");
    return;
  }

  await fetch(sheetUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      pharmacyName: lead.pharmacyName,
      contactName: lead.contactName,
      email: lead.email,
      phone: lead.phone || "",
      state: lead.state,
      locations: lead.locations,
      challenge: lead.challenge,
      timestamp: new Date().toISOString(),
    }),
  });
}

// ============================================
// POST handler
// ============================================

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<LeadPayload>;

    // Validate required fields
    const { pharmacyName, contactName, email, state, locations, challenge } =
      body;

    if (
      !pharmacyName?.trim() ||
      !contactName?.trim() ||
      !email?.trim() ||
      !state?.trim() ||
      !locations?.trim() ||
      !challenge?.trim()
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

    // Rate limiting
    const normalizedEmail = email.toLowerCase().trim();
    const lastSubmission = recentSubmissions.get(normalizedEmail);
    if (lastSubmission && Date.now() - lastSubmission < RATE_LIMIT_MS) {
      return NextResponse.json(
        {
          success: false,
          error: "You've already submitted recently. Please try again later.",
        },
        { status: 429 }
      );
    }

    // Record submission time
    recentSubmissions.set(normalizedEmail, Date.now());

    // Clean up old entries periodically
    if (recentSubmissions.size > 1000) {
      const now = Date.now();
      for (const [key, time] of recentSubmissions) {
        if (now - time > RATE_LIMIT_MS) recentSubmissions.delete(key);
      }
    }

    const lead: LeadPayload = {
      pharmacyName: pharmacyName.trim(),
      contactName: contactName.trim(),
      email: normalizedEmail,
      phone: body.phone?.trim(),
      state: state.trim(),
      locations: locations.trim(),
      challenge: challenge.trim(),
    };

    // Log the lead (visible in server logs / Vercel function logs)
    console.log("[LEAD CAPTURED]", {
      ...lead,
      timestamp: new Date().toISOString(),
    });

    // Send emails + append to Google Sheet in parallel
    const results = await Promise.allSettled([
      sendLeadNotification(lead),
      sendWelcomeEmail(lead),
      appendToGoogleSheet(lead),
    ]);

    for (const result of results) {
      if (result.status === "rejected") {
        console.error("[LEAD PIPELINE ERROR]", result.reason);
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
