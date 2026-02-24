// ============================================
// EcoPharma — Feature Cards Data
// 6 features displayed on the landing page
// ============================================

export interface Feature {
  icon: string; // Lucide icon name
  title: string;
  description: string;
}

export const FEATURES: Feature[] = [
  {
    icon: "Store",
    title: "Online Storefront",
    description:
      "Beautiful, mobile-first storefront with your branding. Drag-and-drop builder, 5 pharmacy-specific templates, and custom domain support.",
  },
  {
    icon: "Pill",
    title: "Rx Management",
    description:
      "Prescription upload with OCR, refill requests, and transfer management. Full pharmacist review queue with drug interaction and allergy alerts.",
  },
  {
    icon: "ShieldCheck",
    title: "Compliance Built-In",
    description:
      "HIPAA, DEA, and state pharmacy board compliance from day one. Encrypted data, audit trails, and BAA agreements included.",
  },
  {
    icon: "Video",
    title: "Telehealth",
    description:
      "Video consultations with your pharmacists. Appointment scheduling, in-call product recommendations, and post-call summaries.",
  },
  {
    icon: "Truck",
    title: "Delivery & Shipping",
    description:
      "Local delivery routing, national shipping, and in-store pickup. Real-time order tracking keeps your customers informed.",
  },
  {
    icon: "BarChart3",
    title: "Analytics & Marketing",
    description:
      "Revenue dashboards, email and SMS campaigns, loyalty programs, referral tracking, and SEO tools. Know your business inside out.",
  },
];
