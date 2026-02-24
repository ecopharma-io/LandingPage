// ============================================
// EcoPharma — Social Proof Stats Bar Data
// Stats displayed between hero and content
// ============================================

export interface SocialProofStat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export const SOCIAL_PROOF_STATS: SocialProofStat[] = [
  {
    value: 19000,
    suffix: "+",
    label: "Independent Pharmacies in the US",
  },
  {
    value: 50,
    suffix: "%",
    label: "Revenue Increase from Online Orders",
  },
  {
    value: 24,
    suffix: "hr",
    label: "From Signup to Live Store",
  },
  {
    value: 0,
    prefix: "$",
    label: "Setup Fees for Founders",
  },
];
