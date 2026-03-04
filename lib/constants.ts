// ============================================
// EcoPharma — Site-Wide Constants
// Single source of truth for all site metadata
// ============================================

export const SITE = {
  name: "EcoPharma",
  tagline: "Shopify for Pharmacies",
  description:
    "EcoPharma is the all-in-one e-commerce platform built for independent pharmacies. Launch your online store in 24 hours with prescription management, HIPAA-compliant checkout, telehealth, and local delivery — no coding required.",
  positioning:
    "The modern, all-in-one platform that helps independent pharmacies compete online in 24 hours — not 24 weeks.",
  url: "https://ecopharma.io",
  foundersUrl: "https://ecopharma.io/founders",
  demoCalendarUrl: "https://calendly.com/ecopharma/demo",
  contactEmail: "sales@ecopharma.io",
  formSubmissionEmail: "waitlist@ecopharma.io",
  lifetimeEmail: "lifetime@ecopharma.io",
} as const;

// ============================================
// Navigation Links
// ============================================

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "/blog" },
] as const;

// ============================================
// Social Media Links
// ============================================

export const SOCIAL_LINKS = [
  { label: "Twitter / X", href: "https://x.com/EcoPharma_io", icon: "Twitter" },
  { label: "Instagram", href: "https://www.instagram.com/ecopharma_io/", icon: "Instagram" },
  { label: "YouTube", href: "https://www.youtube.com/@EcoPharma_io", icon: "Youtube" },
] as const;

// ============================================
// Footer Link Groups
// ============================================

export const FOOTER_LINKS = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "#faq" },
  ],
  resources: [
    { label: "Help Center", href: "#" },
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "System Status", href: "#" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Contact", href: "mailto:sales@ecopharma.io" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
} as const;
