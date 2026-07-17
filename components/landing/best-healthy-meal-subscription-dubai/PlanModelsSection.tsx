import React from "react";
import Link from "next/link";
import { planModels } from "@/content/best-healthy-meal-subscription-dubai";
import { whatsappLink } from "@/lib/site-config";

export function PlanModelsSection() {
  return (
    <section className="border-b border-border-subtle bg-surface py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-secondary-text">
            Plans
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            {planModels.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-secondary-text sm:text-lg">
            {planModels.intro}
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {planModels.cards.map((card) => (
            <article
              key={card.title}
              className={`relative overflow-hidden rounded-2xl border bg-surface shadow-sm ${
                card.popular
                  ? "border-primary ring-2 ring-primary/15"
                  : "border-border-subtle"
              }`}
            >
              {card.popular ? (
                <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              ) : null}
              <div className="p-6 sm:p-8">
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  {card.title}
                </h3>
                <p className="mt-3 font-heading text-2xl font-semibold text-primary">
                  {card.price}
                </p>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-secondary-text">
                  <span className="font-semibold text-foreground">Best for: </span>
                  {card.bestFor}
                </p>
                <Link
                  href="/plans"
                  className="mt-6 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                  See plans →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 max-w-3xl text-base leading-relaxed text-secondary-text sm:text-lg">
          {planModels.footnoteBefore}
          <a
            href={whatsappLink(
              "Hi NutriChef, I'd like to see this week's vegetarian and vegan menu.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            WhatsApp
          </a>
          {planModels.footnoteAfter}
        </p>
      </div>
    </section>
  );
}
