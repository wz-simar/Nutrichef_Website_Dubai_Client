import type { Metadata } from "next";
import Link from "next/link";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { NutritionistCredential } from "@/components/home/NutritionistCredential";
import { SubscribeCTA } from "@/components/home/SubscribeCTA";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Why NutriChef — The Private-Chef Standard in Meal Delivery | UAE & GCC",
  description:
    "Why the UAE's most demanding clients choose NutriChef: fine-dining chefs, clinically engineered macros, white-glove flexibility, and delivery before 10 AM across Dubai, Abu Dhabi & Sharjah — expanding to KSA, Qatar & Kuwait.",
  path: "/why-us",
  keywords: [
    "best meal delivery Dubai",
    "premium meal plan service UAE",
    "private chef alternative Dubai",
    "why NutriChef",
  ],
});

export default function WhyUsPage() {
  return (
    <div className="flex flex-col">
      <section className="border-b border-border-subtle bg-bg-light pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            Why us
          </p>
          <h1 className="font-heading mt-3 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            A private chef used to be a luxury.
            <br className="hidden sm:block" /> We made it a system.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-secondary-text">
            Fine-dining chefs, a clinical nutritionist, and a delivery operation
            that beats your alarm clock.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/plans"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover"
            >
              Start my plan
            </Link>
            <Link
              href="/menu"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border-subtle bg-surface px-7 text-sm font-semibold text-foreground transition hover:bg-background"
            >
              See this week&rsquo;s menu
            </Link>
          </div>
        </div>
      </section>
      <FeaturesSection />
      <HowItWorks />
      <NutritionistCredential />
      <SubscribeCTA />
    </div>
  );
}
