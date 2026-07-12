import React from "react";

const features = [
  {
    title: "Time Is Your Scarcest Asset",
    description:
      "We give you back 10+ hours a week — no menus, no meal prep, no decisions. Your nutrition runs itself while you run everything else.",
    iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "A Chef's Brigade, Not a Kitchen Line",
    description:
      "80+ dishes in weekly rotation, built by chefs who trained in fine dining. This is restaurant-calibre food that happens to hit your macros.",
    iconPath:
      "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
  },
  {
    title: "Clinically Engineered Nutrition",
    description:
      "Every plan is signed off by our Head Nutritionist. Calories, protein, carbs, and fat — calculated to your body and your ambition, not a template.",
    iconPath:
      "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    title: "White-Glove Flexibility",
    description:
      "Travelling to Riyadh Tuesday? Board meeting ran late? Pause, skip, or redirect your deliveries in seconds. Zero penalties, zero questions.",
    iconPath:
      "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4",
  },
];

export const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="border-y border-border-subtle bg-bg-light py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            Built for people who don&rsquo;t compromise
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            You handle the empire. We handle the fuel.
          </h2>
          <p className="mt-4 text-xl font-semibold text-primary sm:text-2xl">
            Precision nutrition that keeps pace with your calendar
          </p>
          <ul className="mt-8 flex flex-col gap-3 text-base font-medium text-foreground sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-2">
            <li className="flex items-center gap-2">
              <span className="text-gold" aria-hidden>
                ✓
              </span>
              Delivered before your first call.
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gold" aria-hidden>
                ✓
              </span>
              Macros managed for you.
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gold" aria-hidden>
                ✓
              </span>
              Pause. Skip. Redirect. Anytime.
            </li>
          </ul>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border-subtle bg-border-subtle sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className="group relative bg-surface p-8 transition hover:bg-background sm:p-9"
            >
              <span className="font-heading absolute right-6 top-6 text-5xl font-semibold tabular-nums text-foreground/[0.06] transition group-hover:text-gold/20 sm:text-6xl">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div className="relative">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border-subtle bg-bg-light text-primary">
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
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-secondary-text">
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
