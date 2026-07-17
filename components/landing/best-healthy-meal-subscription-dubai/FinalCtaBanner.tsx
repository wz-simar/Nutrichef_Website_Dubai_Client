import React from "react";
import { finalCta } from "@/content/best-healthy-meal-subscription-dubai";
import { whatsappLink } from "@/lib/site-config";

export function FinalCtaBanner() {
  return (
    <section className="bg-primary py-16 sm:py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 text-center sm:px-8 lg:flex-row lg:px-10 lg:text-left">
        <p className="font-heading text-2xl font-semibold leading-tight text-white sm:text-3xl lg:max-w-2xl">
          {finalCta.text}
        </p>
        <a
          href={whatsappLink(
            "Hi NutriChef, I'd like to check my meal plan price on WhatsApp.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-14 shrink-0 items-center justify-center rounded-full bg-white px-8 text-base font-semibold text-primary shadow-sm transition hover:bg-white/95"
        >
          {finalCta.buttonLabel}
        </a>
      </div>
    </section>
  );
}
