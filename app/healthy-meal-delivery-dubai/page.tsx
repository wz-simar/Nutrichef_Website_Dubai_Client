import type { Metadata } from "next";
import { HeroSection } from "@/components/landing/healthy-meal-delivery-dubai/HeroSection";
import { IntroSection } from "@/components/landing/healthy-meal-delivery-dubai/IntroSection";
import { WhyChooseSection } from "@/components/landing/healthy-meal-delivery-dubai/WhyChooseSection";
import { UspSection } from "@/components/landing/healthy-meal-delivery-dubai/UspSection";
import { GoalPlansSection } from "@/components/landing/healthy-meal-delivery-dubai/GoalPlansSection";
import { HowItWorksSection } from "@/components/landing/healthy-meal-delivery-dubai/HowItWorksSection";
import { DeliveryAreaSection } from "@/components/landing/healthy-meal-delivery-dubai/DeliveryAreaSection";
import { TestimonialsSection } from "@/components/landing/healthy-meal-delivery-dubai/TestimonialsSection";
import { ClosingCtaSection } from "@/components/landing/healthy-meal-delivery-dubai/ClosingCtaSection";
import { FaqSection } from "@/components/landing/healthy-meal-delivery-dubai/FaqSection";
import { seo } from "@/content/healthy-meal-delivery-dubai";

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: { canonical: "/healthy-meal-delivery-dubai" },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: "/healthy-meal-delivery-dubai",
  },
};

export default function HealthyMealDeliveryDubaiPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection />
      <IntroSection />
      <WhyChooseSection />
      <UspSection />
      <GoalPlansSection />
      <HowItWorksSection />
      <DeliveryAreaSection />
      <TestimonialsSection />
      <ClosingCtaSection />
      <FaqSection />
    </div>
  );
}
