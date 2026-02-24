// ============================================
// EcoPharma — Shared Form Constants
// Reusable across checkout modal, onboarding wizard, etc.
// ============================================

export const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","District of Columbia","Florida","Georgia","Hawaii","Idaho",
  "Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine",
  "Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri",
  "Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico",
  "New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon",
  "Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee",
  "Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin",
  "Wyoming",
] as const;

export const LOCATION_OPTIONS = ["1", "2–3", "4–5", "5+"] as const;

export const ROLE_OPTIONS = [
  "Owner",
  "Pharmacist-in-Charge",
  "Manager",
  "Other",
] as const;

export const PHARMACY_TYPE_OPTIONS = [
  "Independent",
  "Compounding",
  "Specialty",
  "Long-term Care",
  "Other",
] as const;

export const SERVICES_OPTIONS = [
  "Prescription Pickup",
  "Local Delivery",
  "Shipping",
  "Telehealth",
  "Compounding",
  "Immunizations",
  "Health Screenings",
] as const;

export const TEMPLATE_OPTIONS = [
  { id: "modern", label: "Modern", color: "#2563eb" },
  { id: "classic", label: "Classic", color: "#1e3a5f" },
  { id: "minimal", label: "Minimal", color: "#6b7280" },
  { id: "warm", label: "Warm", color: "#d97706" },
  { id: "professional", label: "Professional", color: "#059669" },
] as const;

export const COLOR_SWATCH_OPTIONS = [
  { id: "blue", label: "Blue", value: "#2563eb" },
  { id: "green", label: "Green", value: "#059669" },
  { id: "purple", label: "Purple", value: "#7c3aed" },
  { id: "red", label: "Red", value: "#dc2626" },
  { id: "orange", label: "Orange", value: "#d97706" },
  { id: "teal", label: "Teal", value: "#0d9488" },
] as const;

export const CHALLENGE_OPTIONS = [
  "No online ordering",
  "Losing customers to chains",
  "Outdated systems",
  "Current solutions too expensive",
  "Compliance concerns",
  "Other",
] as const;
