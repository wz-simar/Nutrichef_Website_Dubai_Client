"use client";

import React from "react";
import Link from "next/link";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FAQ_ITEMS } from "@/lib/faqs";

export const FAQSection = () => {
  return (
    <section
      id="faq"
      className="border-t border-border-subtle bg-background py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:max-w-6xl lg:px-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4 lg:pt-2">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-secondary-text">
              Support
            </p>
            <h2 className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
              Frequently asked questions
            </h2>
          </div>

          <div className="mt-12 lg:col-span-8 lg:mt-0">
            <FAQAccordion items={FAQ_ITEMS} defaultOpenIndex={0} />
          </div>
        </div>

        <div className="mt-14 lg:mt-16 lg:grid lg:grid-cols-12 lg:gap-16">
          <div className="hidden lg:col-span-4" aria-hidden />
          <div className="flex justify-center lg:col-span-8 lg:justify-start">
            <Link
              href="/contact-us"
              className="inline-flex h-14 items-center justify-center rounded-xl border-2 border-foreground/20 bg-transparent px-8 text-base font-semibold tracking-tight text-foreground transition hover:border-foreground/40 hover:bg-foreground/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Got more questions?
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
