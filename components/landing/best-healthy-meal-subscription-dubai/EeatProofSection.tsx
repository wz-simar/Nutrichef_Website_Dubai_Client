import React from "react";
import { eeatProof } from "@/content/best-healthy-meal-subscription-dubai";

export function EeatProofSection() {
  return (
    <section className="border-b border-border-subtle bg-bg-light py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-secondary-text">
            Trust
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            {eeatProof.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-secondary-text sm:text-lg">
            {eeatProof.intro}
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {eeatProof.points.map((point) => (
            <article
              key={point.title}
              className="rounded-2xl border border-border-subtle bg-surface p-6 shadow-sm sm:p-8"
            >
              <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {point.title}
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-secondary-text">
                {point.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
