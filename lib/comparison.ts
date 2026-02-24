// ============================================
// EcoPharma — Comparison Table Data
// EcoPharma vs alternatives
// ============================================

export interface ComparisonCell {
  value: string;
  isPositive: boolean;
}

export interface ComparisonRow {
  feature: string;
  ecopharma: ComparisonCell;
  customBuild: ComparisonCell;
  shopify: ComparisonCell;
  competitors: ComparisonCell;
}

export const COMPARISON_COLUMNS = [
  "EcoPharma",
  "Custom Build",
  "Shopify + Apps",
  "Competitors",
] as const;

export const COMPARISON_DATA: ComparisonRow[] = [
  {
    feature: "Setup Time",
    ecopharma: { value: "24 hours", isPositive: true },
    customBuild: { value: "3–6 months", isPositive: false },
    shopify: { value: "2–4 weeks", isPositive: false },
    competitors: { value: "1–3 months", isPositive: false },
  },
  {
    feature: "Year 1 Cost",
    ecopharma: { value: "$999 (lifetime)", isPositive: true },
    customBuild: { value: "$20K–$50K", isPositive: false },
    shopify: { value: "$3,600+", isPositive: false },
    competitors: { value: "$3,600–$18,000", isPositive: false },
  },
  {
    feature: "Rx Management",
    ecopharma: { value: "Built-in", isPositive: true },
    customBuild: { value: "Custom build", isPositive: false },
    shopify: { value: "Not available", isPositive: false },
    competitors: { value: "Basic", isPositive: false },
  },
  {
    feature: "HIPAA Compliance",
    ecopharma: { value: "Built-in", isPositive: true },
    customBuild: { value: "Your responsibility", isPositive: false },
    shopify: { value: "Not available", isPositive: false },
    competitors: { value: "Varies", isPositive: false },
  },
  {
    feature: "Telehealth",
    ecopharma: { value: "Built-in", isPositive: true },
    customBuild: { value: "Custom build", isPositive: false },
    shopify: { value: "Not available", isPositive: false },
    competitors: { value: "Not available", isPositive: false },
  },
  {
    feature: "Pharmacy-Specific",
    ecopharma: { value: "Purpose-built", isPositive: true },
    customBuild: { value: "If built", isPositive: false },
    shopify: { value: "Generic e-commerce", isPositive: false },
    competitors: { value: "Partial", isPositive: false },
  },
  {
    feature: "Transparent Pricing",
    ecopharma: { value: "Yes", isPositive: true },
    customBuild: { value: "No", isPositive: false },
    shopify: { value: "Yes", isPositive: true },
    competitors: { value: "No", isPositive: false },
  },
];
