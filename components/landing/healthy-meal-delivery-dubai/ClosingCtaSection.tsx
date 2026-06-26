"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { closingCta } from "@/content/healthy-meal-delivery-dubai";

export function ClosingCtaSection() {
  const router = useRouter();

  return (
    <section className="border-b border-border-subtle bg-bg-light py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            {closingCta.heading}
          </h2>
          <div className="mt-6 space-y-5">
            {closingCta.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="text-base leading-relaxed text-secondary-text sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button type="button" size="lg" onClick={() => router.push("/plans")}>
              {closingCta.ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
