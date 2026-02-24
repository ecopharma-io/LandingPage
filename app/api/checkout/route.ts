import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface CheckoutPayload {
  // Step 1 — About You
  ownerName: string;
  email: string;
  phone?: string;
  role: string;
  // Step 2 — About Your Pharmacy
  pharmacyName: string;
  pharmacyType: string;
  npiNumber?: string;
  state: string;
  locations: string;
  currentWebsite?: string;
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

async function sendCheckoutEmail(data: CheckoutPayload) {
  const transporter = createTransporter();
  if (!transporter) {
    console.warn("[CHECKOUT EMAIL] SMTP not configured — skipping.");
    return;
  }

  const text = [
    `New Lifetime Access — Pre-Payment Info`,
    ``,
    `=== About the Owner ===`,
    `Name: ${data.ownerName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "N/A"}`,
    `Role: ${data.role}`,
    ``,
    `=== About the Pharmacy ===`,
    `Pharmacy: ${data.pharmacyName}`,
    `Type: ${data.pharmacyType}`,
    `NPI: ${data.npiNumber || "N/A"}`,
    `State: ${data.state}`,
    `Locations: ${data.locations}`,
    `Current Website: ${data.currentWebsite || "N/A"}`,
    ``,
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");

  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;font-weight:600;color:#374151;border-bottom:1px solid #f3f4f6;">${escapeHtml(label)}</td><td style="padding:8px 12px;border-bottom:1px solid #f3f4f6;">${escapeHtml(value)}</td></tr>`;

  const html = `
    <div style="font-family:sans-serif;max-width:600px;">
      <h2 style="color:#2563eb;margin-bottom:4px;">New Lifetime Access Lead</h2>
      <p style="color:#6b7280;font-size:14px;margin-top:0;">Pre-payment info — redirecting to Dodo Payments next.</p>

      <h3 style="color:#111827;margin-top:24px;">About the Owner</h3>
      <table style="border-collapse:collapse;width:100%;">
        ${row("Name", data.ownerName)}
        ${row("Email", data.email)}
        ${row("Phone", data.phone || "N/A")}
        ${row("Role", data.role)}
      </table>

      <h3 style="color:#111827;margin-top:24px;">About the Pharmacy</h3>
      <table style="border-collapse:collapse;width:100%;">
        ${row("Pharmacy", data.pharmacyName)}
        ${row("Type", data.pharmacyType)}
        ${row("NPI Number", data.npiNumber || "N/A")}
        ${row("State", data.state)}
        ${row("Locations", data.locations)}
        ${row("Current Website", data.currentWebsite || "None")}
      </table>

      <p style="color:#6b7280;font-size:12px;margin-top:24px;">Submitted: ${new Date().toISOString()}</p>
    </div>
  `;

  const notifyTo = process.env.CHECKOUT_NOTIFY_EMAIL || "lifetime@ecopharma.io";
  console.log(`[CHECKOUT NOTIFY] Sending to: ${notifyTo}`);
  const info = await transporter.sendMail({
    from: `"EcoPharma" <lifetime@ecopharma.io>`,
    to: notifyTo,
    subject: `Lifetime Lead: ${data.pharmacyName} — ${data.ownerName}`,
    text,
    html,
  });
  console.log(`[CHECKOUT NOTIFY] Sent! MessageId: ${info.messageId}, Response: ${info.response}`);
}

// ============================================
// Auto-reply email (to the founder who paid)
// ============================================

async function sendFounderWelcomeEmail(data: CheckoutPayload) {
  const transporter = createTransporter();
  if (!transporter) return;

  const firstName = escapeHtml(data.ownerName.split(" ")[0]);
  const pharmacyName = escapeHtml(data.pharmacyName);

  const text = [
    `Hi ${data.ownerName.split(" ")[0]},`,
    ``,
    `Thank you for joining EcoPharma! Your account for ${data.pharmacyName} is ready.`,
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

    <!-- Header -->
    <div style="text-align:center;margin-bottom:32px;">
      <div style="display:inline-block;background:linear-gradient(135deg,#2563eb,#1d4ed8);padding:12px 24px;border-radius:12px;">
        <span style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:-0.5px;">EcoPharma</span>
      </div>
    </div>

    <!-- Main Card -->
    <div style="background:#ffffff;border-radius:16px;padding:40px 32px;box-shadow:0 1px 3px rgba(0,0,0,0.08),0 4px 12px rgba(0,0,0,0.04);">

      <!-- Founder Badge -->
      <div style="text-align:center;margin-bottom:24px;">
        <span style="display:inline-block;background:#eff6ff;color:#2563eb;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;padding:6px 16px;border-radius:100px;">Founder Member</span>
      </div>

      <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#111827;text-align:center;line-height:1.3;">
        Welcome, ${firstName}!
      </h1>
      <p style="margin:0 0 24px;font-size:15px;color:#6b7280;text-align:center;line-height:1.6;">
        Thank you for joining EcoPharma. Your account for <strong style="color:#374151;">${pharmacyName}</strong> is ready — here's how to get started.
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
          <p style="margin:0;font-size:14px;font-weight:600;color:#111827;">Complete your store setup</p>
          <p style="margin:4px 0 0;font-size:13px;color:#6b7280;line-height:1.5;">Tell us about your business, pick your store template, and choose your services.</p>
        </div>
      </div>

      <!-- Setup CTA -->
      <div style="text-align:center;margin-bottom:20px;">
        <a href="https://ecopharma.io/onboarding" style="display:inline-block;background:#2563eb;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:12px 32px;border-radius:8px;">Complete Your Store Setup</a>
      </div>

      <!-- Step 2 -->
      <div style="display:flex;margin-bottom:16px;">
        <div style="flex-shrink:0;width:32px;height:32px;background:#eff6ff;border-radius:8px;text-align:center;line-height:32px;font-size:14px;font-weight:700;color:#2563eb;margin-right:14px;">2</div>
        <div>
          <p style="margin:0;font-size:14px;font-weight:600;color:#111827;">We'll build your store</p>
          <p style="margin:4px 0 0;font-size:13px;color:#6b7280;line-height:1.5;">Our team will set up your customized storefront based on your preferences. This typically takes 24–48 hours.</p>
        </div>
      </div>

      <!-- Step 3 -->
      <div style="display:flex;margin-bottom:16px;">
        <div style="flex-shrink:0;width:32px;height:32px;background:#eff6ff;border-radius:8px;text-align:center;line-height:32px;font-size:14px;font-weight:700;color:#2563eb;margin-right:14px;">3</div>
        <div>
          <p style="margin:0;font-size:14px;font-weight:600;color:#111827;">Personalized onboarding call</p>
          <p style="margin:4px 0 0;font-size:13px;color:#6b7280;line-height:1.5;">A dedicated team member will reach out to schedule a 1-on-1 walkthrough of your new store.</p>
        </div>
      </div>

      <!-- Step 4 -->
      <div style="display:flex;margin-bottom:24px;">
        <div style="flex-shrink:0;width:32px;height:32px;background:#eff6ff;border-radius:8px;text-align:center;line-height:32px;font-size:14px;font-weight:700;color:#2563eb;margin-right:14px;">4</div>
        <div>
          <p style="margin:0;font-size:14px;font-weight:600;color:#111827;">Go live!</p>
          <p style="margin:4px 0 0;font-size:13px;color:#6b7280;line-height:1.5;">Once everything looks great, we'll help you launch your store and start serving patients online.</p>
        </div>
      </div>

      <hr style="border:none;border-top:1px solid #f3f4f6;margin:24px 0;">

      <!-- What's Included -->
      <div style="background:#f8fafc;border-radius:12px;padding:24px;">
        <p style="margin:0 0 12px;font-size:14px;font-weight:700;color:#111827;text-align:center;">What's included in your plan</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:6px 0;font-size:13px;color:#374151;">All current and future platform features</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-size:13px;color:#374151;">Priority support from our team</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-size:13px;color:#374151;">Direct access for feedback and feature requests</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-size:13px;color:#374151;">60-day satisfaction guarantee</td>
          </tr>
        </table>
      </div>

    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:32px 0 0;">
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

  console.log(`[FOUNDER WELCOME] Sending to: ${data.email}`);
  const info = await transporter.sendMail({
    from: `"EcoPharma Founders" <lifetime@ecopharma.io>`,
    replyTo: "lifetime@ecopharma.io",
    to: data.email,
    subject: `Welcome to EcoPharma, ${data.ownerName.split(" ")[0]} — here's how to get started`,
    text,
    html,
  });
  console.log(`[FOUNDER WELCOME] Sent! MessageId: ${info.messageId}, Response: ${info.response}`);
}

// ============================================
// Google Sheets — append lifetime lead
// ============================================

async function appendToGoogleSheet(data: CheckoutPayload) {
  const sheetUrl = process.env.GOOGLE_SHEET_LIFETIME_WEBHOOK_URL;
  if (!sheetUrl) {
    console.warn("[GOOGLE SHEET] Lifetime webhook URL not configured — skipping.");
    return;
  }

  await fetch(sheetUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ownerName: data.ownerName,
      email: data.email,
      phone: data.phone || "",
      role: data.role,
      pharmacyName: data.pharmacyName,
      pharmacyType: data.pharmacyType,
      npiNumber: data.npiNumber || "",
      state: data.state,
      locations: data.locations,
      currentWebsite: data.currentWebsite || "",
      timestamp: new Date().toISOString(),
    }),
  });
}

// ============================================
// POST handler
// ============================================

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<CheckoutPayload>;

    const { ownerName, email, role, pharmacyName, pharmacyType, state, locations } = body;

    if (
      !ownerName?.trim() ||
      !email?.trim() ||
      !role?.trim() ||
      !pharmacyName?.trim() ||
      !pharmacyType?.trim() ||
      !state?.trim() ||
      !locations?.trim()
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

    const data: CheckoutPayload = {
      ownerName: ownerName.trim(),
      email: email.toLowerCase().trim(),
      phone: body.phone?.trim(),
      role: role.trim(),
      pharmacyName: pharmacyName.trim(),
      pharmacyType: pharmacyType.trim(),
      npiNumber: body.npiNumber?.trim(),
      state: state.trim(),
      locations: locations.trim(),
      currentWebsite: body.currentWebsite?.trim(),
    };

    console.log("[CHECKOUT PRE-PAYMENT]", {
      ...data,
      timestamp: new Date().toISOString(),
    });

    // Send emails + append to Google Sheet in parallel
    const labels = ["notifyEmail", "welcomeEmail", "googleSheet"];
    const results = await Promise.allSettled([
      sendCheckoutEmail(data),
      sendFounderWelcomeEmail(data),
      appendToGoogleSheet(data),
    ]);

    const errors: string[] = [];
    results.forEach((result, i) => {
      if (result.status === "rejected") {
        const msg = result.reason instanceof Error ? result.reason.message : String(result.reason);
        console.error(`[CHECKOUT ${labels[i]}] FAILED:`, msg);
        errors.push(`${labels[i]}: ${msg}`);
      } else {
        console.log(`[CHECKOUT ${labels[i]}] OK`);
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
