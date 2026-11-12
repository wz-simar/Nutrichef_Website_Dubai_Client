import type { Metadata } from "next";
import { HeroSection } from "@/components/landing/healthy-food-delivery-dubai/HeroSection";
import { VideoSection } from "@/components/landing/healthy-food-delivery-dubai/VideoSection";
import { GuideSections } from "@/components/landing/healthy-food-delivery-dubai/GuideSections";
import { FaqSection } from "@/components/landing/healthy-food-delivery-dubai/FaqSection";
import { FinalVerdictSection } from "@/components/landing/healthy-food-delivery-dubai/FinalVerdictSection";
import { faqItems, seo } from "@/content/healthy-food-delivery-dubai";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: seo.title,
  description: seo.description,
  path: seo.path,
  absoluteTitle: true,
  keywords: [
    "healthy food delivery Dubai",
    "healthy meal plan Dubai",
    "meal plans vs delivery apps Dubai",
    "Talabat healthy Dubai",
    "Deliveroo healthy Dubai",
    "NutriChef Dubai",
    "GLP1 meal plan Dubai",
    "PCOS meal plan Dubai",
    "diabetic meal delivery Dubai",
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

export default function HealthyFoodDeliveryDubaiPage() {
  return (
    <>
      <FaqSchema />
      <div className="flex min-h-screen flex-col">
        <HeroSection />
        <VideoSection />
        <GuideSections />
        <FaqSection />
        <FinalVerdictSection />
      </div>
    </>
  );
}
