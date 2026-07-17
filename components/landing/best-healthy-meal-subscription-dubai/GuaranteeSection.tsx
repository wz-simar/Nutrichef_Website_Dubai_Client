import React from "react";
import { guarantee } from "@/content/best-healthy-meal-subscription-dubai";

export function GuaranteeSection() {
  return (
    <section className="border-b border-border-subtle bg-bg-light py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl rounded-2xl border border-primary/20 bg-surface p-8 text-center shadow-sm sm:p-12">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            Guarantee
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
            {guarantee.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-secondary-text sm:text-lg">
            {guarantee.paragraph}
          </p>
        </div>
      </div>
    </section>
  );
}
