// ============================================
// EcoPharma — Lifetime Deal Pricing
// Single LTD offer — all features, forever
// ============================================

export interface LifetimeDeal {
  name: string;
  price: number;
  originalMonthly: number;
  originalYearly: number;
  savingsPercent: number;
  spotsTotal: number;
  spotsRemaining: number;
  badge: string;
  ctaText: string;
  paymentLink: string;
  guarantee: string;
  features: string[];
}

export const LIFETIME_DEAL: LifetimeDeal = {
  name: "Lifetime Access",
  price: 999,
  originalMonthly: 999,
  originalYearly: 11988,
  savingsPercent: 92,
  spotsTotal: 50,
  spotsRemaining: 47,
  badge: "Founder's Program — Limited Spots",
  ctaText: "Claim Lifetime Access — $999",
  paymentLink: "#", // TODO: Replace with Dodo Payments link
  guarantee: "60-day money-back guarantee. No questions asked.",
  features: [
    "Unlimited pharmacy locations",
    "Unlimited products & orders",
    "Custom domain support",
    "White-label branding (your brand only)",
    "Full e-commerce storefront with 5 templates",
    "Prescription upload with OCR",
    "Rx management & pharmacist review queue",
    "Drug interaction & allergy alerts",
    "Refill request management",
    "HIPAA-compliant infrastructure (encryption, audit trails, BAA)",
    "DEA & state pharmacy board compliance tools",
    "Telehealth video consultations",
    "Appointment scheduling & patient portal",
    "Local delivery routing & national shipping",
    "Insurance card + credit card payments (Stripe Connect)",
    "Email & SMS marketing campaigns",
    "Loyalty program & referral system",
    "Advanced analytics & reporting",
    "Inventory forecasting",
    "Multi-location inventory sync",
    "API access for custom integrations",
    "Dedicated onboarding support",
    "All future features — forever",
    "Priority support",
  ],
};

// ============================================
// Value Proposition Stats (ROI)
// ============================================

export const VALUE_PROPS = {
  customBuildCost: "$20K–$50K",
  monthlyAlternative: "$999/mo",
  yearlyAlternative: "$11,988/yr",
  roiOrders: "10 extra online orders/week",
  roiRevenue: "$26,000/year",
  paybackPeriod: "Pays for itself with 1–2 orders per day",
} as const;
