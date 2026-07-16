import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { MenuPreview } from "@/components/home/MenuPreview";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { MealPlansSection } from "@/components/home/MealPlansSection";
import { PricingSection } from "@/components/home/PricingSection";
import { MarketsSection } from "@/components/home/MarketsSection";
import { SubscribeCTA } from "@/components/home/SubscribeCTA";
import { buildPageMetadata } from "@/lib/metadata";
import { HOME_META } from "@/lib/site-config";

export const metadata: Metadata = buildPageMetadata({
  title: HOME_META.title,
  description: HOME_META.description,
  path: "/",
  keywords: [
    "private chef meal plans Dubai",
    "luxury meal delivery UAE",
    "executive meal plans Dubai",
    "healthy meal delivery Dubai",
    "meal plan delivery Abu Dhabi",
    "premium meal subscription GCC",
    "high protein meal delivery Dubai",
    "keto meal plan UAE",
  ],
});

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection />
      <MenuPreview />
      <FeaturesSection />
      <HowItWorks />
      <MealPlansSection />
      <PricingSection />
      <MarketsSection />
      <SubscribeCTA />
    </div>
  );
}
