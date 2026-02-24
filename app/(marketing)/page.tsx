import { Hero } from "@/components/landing/hero";
import { SocialProofBar } from "@/components/landing/social-proof-bar";
import { ProblemSection } from "@/components/landing/problem-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { AISymptomsSection } from "@/components/landing/ai-symptoms-section";
import { StoreBuilderSection } from "@/components/landing/store-builder-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { PlatformPreview } from "@/components/landing/platform-preview";
import { PricingSection } from "@/components/landing/pricing-section";
import { ComparisonTable } from "@/components/landing/comparison-table";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { FAQSection } from "@/components/landing/faq-section";
import { FinalCTA } from "@/components/landing/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProofBar />
      <ProblemSection />
      <FeaturesSection />
      <AISymptomsSection />
      <StoreBuilderSection />
      <HowItWorks />
      <PlatformPreview />
      <PricingSection />
      <ComparisonTable />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
