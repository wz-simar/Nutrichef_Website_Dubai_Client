import React from "react";
import Link from "next/link";

const features = [
  {
    title: "Your Time Back",
    description: "10+ hours a week returned. No menus, no prep, no decisions.",
    iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Chef-Crafted",
    description: "Fine-dining chefs. 80+ dishes in weekly rotation.",
    iconPath:
      "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
  },
  {
    title: "Clinical Precision",
    description: "Every macro signed off by our Head Nutritionist.",
    iconPath:
      "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    title: "Total Flexibility",
    description: "Pause, skip, or redirect in seconds. Zero penalties.",
    iconPath:
      "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4",
  },
];

export const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="border-y border-border-subtle bg-bg-light py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-heading max-w-xl text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            You handle the empire.
            <br />
            We handle the fuel.
          </h2>
          <Link
            href="/plans"
            className="group inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover"
          >
            Start my plan
            <span
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </Link>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border-subtle bg-border-subtle sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className="group relative bg-surface p-8 transition hover:bg-background"
            >
              <span className="font-heading absolute right-6 top-6 text-5xl font-semibold tabular-nums text-foreground/[0.06] transition group-hover:text-gold/20">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div className="relative">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border-subtle bg-bg-light text-primary">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={feature.iconPath}
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-secondary-text">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
