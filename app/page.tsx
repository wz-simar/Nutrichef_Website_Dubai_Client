import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { MenuPreview } from "@/components/home/MenuPreview";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CommunitySection } from "@/components/home/CommunitySection";
import { MealPlansSection } from "@/components/home/MealPlansSection";
import { FAQSection } from "@/components/home/FAQSection";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { NutritionistCredential } from "@/components/home/NutritionistCredential";
import { LocationSection } from "@/components/home/LocationSection";
import { buildPageMetadata } from "@/lib/metadata";
import { HOME_META } from "@/lib/site-config";

export const metadata: Metadata = buildPageMetadata({
  title: HOME_META.title,
  description: HOME_META.description,
  path: "/",
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <MenuPreview />
      <FeaturesSection />
      <HowItWorks />
      <NutritionistCredential />
      <CommunitySection />
      <MealPlansSection />
      <FAQSection />
      <LocationSection />
      <InstagramFeed />
    </div>
  );
}
