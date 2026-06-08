import type { Metadata } from "next";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { NutritionistCredential } from "@/components/home/NutritionistCredential";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Why NutriChef — Healthy Meal Delivery Dubai",
  description:
    "Discover why NutriChef is Dubai's trusted choice for fresh daily meal plans — total flexibility, chef-crafted menus, eco-friendly packaging, and nutritionist-designed macros.",
  path: "/why-us",
});

export default function WhyUsPage() {
  return (
    <div className="flex flex-col">
      <section className="border-b border-border-subtle bg-bg-light pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-secondary-text">
            Why us
          </p>
          <h1 className="font-heading mt-3 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            Why NutriChef?
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-secondary-text">
            Total control, chef-crafted meals, and daily fresh deliveries — designed
            for busy people across Dubai and the UAE.
          </p>
        </div>
      </section>
      <FeaturesSection />
      <HowItWorks />
      <NutritionistCredential />
    </div>
  );
}
