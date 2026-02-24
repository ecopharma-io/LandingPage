// ============================================
// EcoPharma — FAQ Data
// 8 questions for the landing page accordion
// Sources: CONTEXT.md Sections 5 (FAQs) & 6 (Objection Handling)
// ============================================

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "When will the platform be ready?",
    answer:
      "EcoPharma launches in 6–8 weeks (February 2026). As a Founding Member, you'll get early beta access before the public launch so you can start setting up your store ahead of everyone else.",
  },
  {
    question: "What happens after I pay? What do I get right now?",
    answer:
      "You immediately lock in lifetime access at $999 — a one-time payment instead of monthly payments forever. You'll receive a welcome email with your Founder's dashboard access, onboarding timeline, and a direct line to our team. When the platform launches, you'll be first in line with a dedicated 1-on-1 onboarding session.",
  },
  {
    question: "Is EcoPharma HIPAA compliant?",
    answer:
      "Yes. EcoPharma is built on HIPAA-compliant infrastructure with AES-256 encryption at rest, TLS 1.3 in transit, comprehensive audit logs, and Business Associate Agreements (BAA). Your patients' data is protected at every level.",
  },
  {
    question: "What if it doesn't work for my pharmacy?",
    answer:
      "We offer a 60-day money-back guarantee, no questions asked. If EcoPharma isn't the right fit for your pharmacy, you get a full refund. Zero risk.",
  },
  {
    question: "Does it integrate with my pharmacy management system (PMS)?",
    answer:
      "We're building integrations with major PMS systems starting Q2 2026, with PioneerRx and QS/1 as top priorities. As a Founding Member, you directly influence which integrations we build first.",
  },
  {
    question: "How long does it take to set up my online store?",
    answer:
      "Average setup time is 30 minutes. Choose a template, upload your logo, pick your colors, import products from our OTC catalog, and you're live. Founding Members also get a 1-on-1 onboarding call where we walk you through everything.",
  },
  {
    question: "Why should I pay now for a product that's still being built?",
    answer:
      "The Founder's program exists because we want committed partners who shape the product with us. The tradeoff: you commit now at $999 one-time instead of $999/month later, and you get to influence every feature we build. Plus, you're covered by our 60-day money-back guarantee — so there's no real risk.",
  },
  {
    question: "I've never heard of EcoPharma — why should I trust you?",
    answer:
      "We're brand new — and that's exactly why the Founder's program exists. You get lifetime access at a fraction of the normal price in exchange for being an early adopter. Our 60-day money-back guarantee means you can try everything risk-free. And as a Founding Member, you have a direct line to our team and real influence over the product roadmap.",
  },
];
