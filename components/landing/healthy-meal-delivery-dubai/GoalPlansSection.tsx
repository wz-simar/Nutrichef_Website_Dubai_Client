import React from "react";
import { ImagePlaceholder } from "@/components/landing/shared/ImagePlaceholder";
import { goalPlans } from "@/content/healthy-meal-delivery-dubai";

export function GoalPlansSection() {
  return (
    <section className="border-b border-border-subtle bg-bg-light py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-secondary-text">
            Plans
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            {goalPlans.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-secondary-text sm:text-lg">
            {goalPlans.intro}
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {goalPlans.cards.map((card) => (
            <article
              key={card.title}
              className="overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-sm"
            >
              <ImagePlaceholder
                label={`${card.title} plan image`}
                aspect="video"
                className="rounded-none border-0 border-b-2 border-dashed border-border-subtle"
              />
              <div className="p-6 sm:p-8">
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  {card.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-secondary-text">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 max-w-3xl text-base leading-relaxed text-secondary-text sm:text-lg">
          {goalPlans.closing}
        </p>
      </div>
    </section>
  );
}
