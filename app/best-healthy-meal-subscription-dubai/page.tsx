import type { Metadata } from "next";
import { HeroSection } from "@/components/landing/best-healthy-meal-subscription-dubai/HeroSection";
import { TrustBarSection } from "@/components/landing/best-healthy-meal-subscription-dubai/TrustBarSection";
import { ProblemSection } from "@/components/landing/best-healthy-meal-subscription-dubai/ProblemSection";
import { PromiseSection } from "@/components/landing/best-healthy-meal-subscription-dubai/PromiseSection";
import { PlanModelsSection } from "@/components/landing/best-healthy-meal-subscription-dubai/PlanModelsSection";
import { CostCalculatorSection } from "@/components/landing/best-healthy-meal-subscription-dubai/CostCalculatorSection";
import { DietaryNeedsSection } from "@/components/landing/best-healthy-meal-subscription-dubai/DietaryNeedsSection";
import { EeatProofSection } from "@/components/landing/best-healthy-meal-subscription-dubai/EeatProofSection";
import { DeliveryAreaSection } from "@/components/landing/best-healthy-meal-subscription-dubai/DeliveryAreaSection";
import { AppExperienceSection } from "@/components/landing/best-healthy-meal-subscription-dubai/AppExperienceSection";
import { TestimonialsSection } from "@/components/landing/best-healthy-meal-subscription-dubai/TestimonialsSection";
import { GuaranteeSection } from "@/components/landing/best-healthy-meal-subscription-dubai/GuaranteeSection";
import { LeadCaptureSection } from "@/components/landing/best-healthy-meal-subscription-dubai/LeadCaptureSection";
import { FaqSection } from "@/components/landing/best-healthy-meal-subscription-dubai/FaqSection";
import { FinalCtaBanner } from "@/components/landing/best-healthy-meal-subscription-dubai/FinalCtaBanner";
import {
  faqItems,
  seo,
} from "@/content/best-healthy-meal-subscription-dubai";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: seo.title,
  description: seo.description,
  path: seo.path,
  absoluteTitle: true,
  keywords: [
    "best healthy meal subscription Dubai",
    "healthy meal delivery Dubai",
    "meal plan Dubai comparison",
    "cheapest meal plan Dubai",
    "meal plan Dubai reviews",
    "healthy meal plan Dubai",
    "meal plan Dubai price",
    "keto meal plan Dubai",
    "vegan meal delivery Dubai",
    "GLP1 meal plan Dubai",
    "meal delivery Dubai Marina",
    "NutriChef reviews Dubai",
  ],
});

function FaqSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function BestHealthyMealSubscriptionDubaiPage() {
  return (
    <>
      <FaqSchema />
      <div className="flex min-h-screen flex-col">
        <HeroSection />
        <TrustBarSection />
        <ProblemSection />
        <PromiseSection />
        <PlanModelsSection />
        <CostCalculatorSection />
        <DietaryNeedsSection />
        <EeatProofSection />
        <DeliveryAreaSection />
        <AppExperienceSection />
        <TestimonialsSection />
        <GuaranteeSection />
        <LeadCaptureSection />
        <FaqSection />
        <FinalCtaBanner />
      </div>
    </>
  );
}
