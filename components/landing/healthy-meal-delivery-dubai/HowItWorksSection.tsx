import React from "react";
import { ImagePlaceholder } from "@/components/landing/shared/ImagePlaceholder";
import { howItWorks } from "@/content/healthy-meal-delivery-dubai";

export function HowItWorksSection() {
  return (
    <section className="border-b border-border-subtle bg-surface py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-secondary-text">
            How it works
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            {howItWorks.heading}
          </h2>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.steps.map((step, idx) => (
            <div key={step.title} className="flex flex-col">
              <div className="relative mb-6">
                <div className="absolute -left-2 -top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-surface bg-foreground text-sm font-bold text-background shadow-sm">
                  {idx + 1}
                </div>
                <ImagePlaceholder
                  label={`Step ${idx + 1} image`}
                  aspect="square"
                  className="w-full"
                />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground sm:text-xl">
                {step.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-secondary-text">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
