"use client";

import { SeoFaqSection } from "@/components/landing/shared/SeoFaqSection";
import { faqHeading, faqItems } from "@/content/healthy-meal-delivery-dubai";

export function FaqSection() {
  return <SeoFaqSection heading={faqHeading} items={faqItems} />;
}
