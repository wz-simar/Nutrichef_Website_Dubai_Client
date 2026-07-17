"use client";

import Link from "next/link";
import { SeoFaqSection } from "@/components/landing/shared/SeoFaqSection";
import {
  faqFooterLink,
  faqHeading,
  faqItems,
} from "@/content/best-healthy-meal-subscription-dubai";

export function FaqSection() {
  return (
    <>
      <SeoFaqSection heading={faqHeading} items={faqItems} />
      <div className="border-t border-border-subtle bg-background pb-16 pt-2">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Link
            href={faqFooterLink.href}
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            {faqFooterLink.label} →
          </Link>
        </div>
      </div>
    </>
  );
}
