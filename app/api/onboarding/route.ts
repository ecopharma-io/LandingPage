import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface OnboardingPayload {
  // Step 1 — Business Details
  businessLegalName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  deaNumber?: string;
  stateLicenseNumber?: string;
  // Step 2 — Online Store Preferences
  preferredDomain: string;
  storeName: string;
  tagline?: string;
  primaryColor: string;
  template: string;
  // Step 3 — Services & Operations
  servicesOffered: string[];
  operatingHours: string;
  acceptedInsurance?: string;
  specialNotes?: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendOnboardingEmail(data: OnboardingPayload) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn("[ONBOARDING EMAIL] SMTP not configured — skipping email delivery.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 465,
    secure: (Number(SMTP_PORT) || 465) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const text = [
    `New Onboarding Submission (Post-Payment)`,
    ``,
    `=== Business Details ===`,
    `Legal Name: ${data.businessLegalName}`,
    `Address: ${data.address}, ${data.city}, ${data.state} ${data.zip}`,
    `Phone: ${data.phone}`,
    `DEA Number: ${data.deaNumber || "N/A"}`,
    `State License: ${data.stateLicenseNumber || "N/A"}`,
    ``,
    `=== Online Store ===`,
    `Preferred Domain: ${data.preferredDomain}`,
    `Store Name: ${data.storeName}`,
    `Tagline: ${data.tagline || "N/A"}`,
    `Primary Color: ${data.primaryColor}`,
    `Template: ${data.template}`,
    ``,
    `=== Services & Operations ===`,
    `Services: ${data.servicesOffered.join(", ") || "None selected"}`,
    `Operating Hours: ${data.operatingHours}`,
    `Insurance: ${data.acceptedInsurance || "N/A"}`,
    `Special Notes: ${data.specialNotes || "N/A"}`,
    ``,
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");

  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;font-weight:600;color:#374151;border-bottom:1px solid #f3f4f6;">${escapeHtml(label)}</td><td style="padding:8px 12px;border-bottom:1px solid #f3f4f6;">${escapeHtml(value)}</td></tr>`;

  const html = `
    <div style="font-family:sans-serif;max-width:600px;">
      <h2 style="color:#2563eb;margin-bottom:4px;">New Onboarding Submission</h2>
      <p style="color:#6b7280;font-size:14px;margin-top:0;">Post-payment setup details from a new Lifetime Access customer.</p>

      <h3 style="color:#111827;margin-top:24px;">Business Details</h3>
      <table style="border-collapse:collapse;width:100%;">
        ${row("Legal Name", data.businessLegalName)}
        ${row("Address", `${data.address}, ${data.city}, ${data.state} ${data.zip}`)}
        ${row("Phone", data.phone)}
        ${row("DEA Number", data.deaNumber || "N/A")}
        ${row("State License", data.stateLicenseNumber || "N/A")}
      </table>

      <h3 style="color:#111827;margin-top:24px;">Online Store</h3>
      <table style="border-collapse:collapse;width:100%;">
        ${row("Preferred Domain", data.preferredDomain)}
        ${row("Store Name", data.storeName)}
        ${row("Tagline", data.tagline || "N/A")}
        ${row("Primary Color", data.primaryColor)}
        ${row("Template", data.template)}
      </table>

      <h3 style="color:#111827;margin-top:24px;">Services & Operations</h3>
      <table style="border-collapse:collapse;width:100%;">
        ${row("Services", data.servicesOffered.join(", ") || "None selected")}
        ${row("Operating Hours", data.operatingHours)}
        ${row("Accepted Insurance", data.acceptedInsurance || "N/A")}
        ${row("Special Notes", data.specialNotes || "N/A")}
      </table>

      <p style="color:#6b7280;font-size:12px;margin-top:24px;">Submitted: ${new Date().toISOString()}</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"EcoPharma" <lifetime@ecopharma.io>`,
    to: process.env.ONBOARDING_NOTIFY_EMAIL || "lifetime@ecopharma.io",
    subject: `Onboarding: ${data.storeName} — ${data.businessLegalName}`,
    text,
    html,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<OnboardingPayload>;

    const {
      businessLegalName, address, city, state, zip, phone,
      preferredDomain, storeName, primaryColor, template,
      servicesOffered, operatingHours,
    } = body;

    if (
      !businessLegalName?.trim() ||
      !address?.trim() ||
      !city?.trim() ||
      !state?.trim() ||
      !zip?.trim() ||
      !phone?.trim() ||
      !preferredDomain?.trim() ||
      !storeName?.trim() ||
      !primaryColor?.trim() ||
      !template?.trim() ||
      !operatingHours?.trim() ||
      !servicesOffered ||
      servicesOffered.length === 0
    ) {
      return NextResponse.json(
        { success: false, error: "All required fields must be filled." },
        { status: 400 }
      );
    }

    const data: OnboardingPayload = {
      businessLegalName: businessLegalName.trim(),
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      zip: zip.trim(),
      phone: phone.trim(),
      deaNumber: body.deaNumber?.trim(),
      stateLicenseNumber: body.stateLicenseNumber?.trim(),
      preferredDomain: preferredDomain.trim(),
      storeName: storeName.trim(),
      tagline: body.tagline?.trim(),
      primaryColor: primaryColor.trim(),
      template: template.trim(),
      servicesOffered,
      operatingHours: operatingHours.trim(),
      acceptedInsurance: body.acceptedInsurance?.trim(),
      specialNotes: body.specialNotes?.trim(),
    };

    console.log("[ONBOARDING SUBMITTED]", {
      storeName: data.storeName,
      businessLegalName: data.businessLegalName,
      timestamp: new Date().toISOString(),
    });

    try {
      await sendOnboardingEmail(data);
    } catch (emailError) {
      console.error("[ONBOARDING EMAIL ERROR]", emailError);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
