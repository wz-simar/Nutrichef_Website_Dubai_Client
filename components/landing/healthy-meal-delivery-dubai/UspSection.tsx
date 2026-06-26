import React from "react";
import { usp } from "@/content/healthy-meal-delivery-dubai";

export function UspSection() {
  return (
    <section className="border-b border-border-subtle bg-surface py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-secondary-text">
            Why NutriChef
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            {usp.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-secondary-text sm:text-lg">
            {usp.intro}
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border-subtle bg-border-subtle sm:grid-cols-2 lg:grid-cols-3">
          {usp.items.map((item, idx) => (
            <div
              key={item.title}
              className="group relative bg-surface p-8 transition hover:bg-background sm:p-9 lg:last:col-span-1"
            >
              <span className="font-heading absolute right-6 top-6 text-5xl font-semibold tabular-nums text-foreground/[0.06] transition group-hover:text-primary/15 sm:text-6xl">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div className="relative">
                <h3 className="font-heading pr-12 text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-secondary-text">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
