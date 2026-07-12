import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/metadata";
import { STARTING_PRICE_PER_DAY_AED, whatsappLink } from "@/lib/site-config";
import { REGIONS } from "@/lib/regions";

export const metadata: Metadata = buildPageMetadata({
  title: "Subscribe & Save — Private-Chef Meal Plans from AED 99/Day | NutriChef",
  description: `Subscribe to NutriChef and put your nutrition on autopilot. Chef-crafted meals from AED ${STARTING_PRICE_PER_DAY_AED}/day, longer plans unlock preferential rates, pause anytime. Delivering across the UAE — KSA, Qatar & Kuwait next.`,
  path: "/subscribe",
  keywords: [
    "meal plan subscription Dubai",
    "weekly meal subscription UAE",
    "healthy food subscription Dubai",
    "meal delivery subscription GCC",
  ],
});

const tiers = [
  {
    length: "1 week",
    label: "The Trial",
    body: "Taste the standard. Seven days of chef-crafted precision — enough to feel the difference in your energy by Friday.",
    highlight: false,
  },
  {
    length: "2 weeks",
    label: "The Habit",
    body: "Two weeks locks in the rhythm: mornings without decisions, macros without maths, and preferential pricing over weekly billing.",
    highlight: false,
  },
  {
    length: "4 weeks",
    label: "The Standard",
    body: "Our members' choice. A full month on retainer at our best rate — the way the busiest people in the Emirates run their nutrition.",
    highlight: true,
  },
];

const assurances = [
  {
    title: "Pause anytime",
    body: "Travelling? Freeze your plan from the dashboard in one tap. Days are never lost.",
  },
  {
    title: "No lock-in",
    body: "Cancel whenever you like, penalty-free. We keep you by being excellent, not by contract.",
  },
  {
    title: "Concierge on WhatsApp",
    body: "A human answers. Address changes, allergy notes, extra guests — handled in minutes.",
  },
  {
    title: "Secure checkout",
    body: "Payments run on Stripe with full card security. No card details ever touch our servers.",
  },
];

export default function SubscribePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b border-border-subtle bg-emerald-deep pt-32 pb-16 text-white sm:pt-36 sm:pb-20">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft">
            Subscribe &amp; save
          </p>
          <h1 className="font-heading mt-4 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            Put your nutrition on retainer.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">
            One decision today replaces a thousand small ones — every menu, every
            macro, every morning, handled. From AED {STARTING_PRICE_PER_DAY_AED}{" "}
            a day, with better rates the longer you commit.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/plans"
              className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-9 text-base font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-primary-hover"
            >
              Build my subscription
            </Link>
            <a
              href={whatsappLink("Hi NutriChef, help me choose the right subscription.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/30 px-9 text-base font-semibold text-white transition hover:bg-white/10"
            >
              Ask the concierge
            </a>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <h2 className="font-heading text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
            Choose your commitment
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-secondary-text">
            Every tier includes the full 80+ dish rotation, nutritionist-signed
            macros, and morning delivery. Longer terms simply cost less per week.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.length}
                className={`relative flex flex-col rounded-2xl border p-8 shadow-sm ${
                  tier.highlight
                    ? "border-gold bg-surface ring-1 ring-gold"
                    : "border-border-subtle bg-surface"
                }`}
              >
                {tier.highlight ? (
                  <span className="absolute -top-3 left-8 rounded-full bg-gold px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-wider text-emerald-deep">
                    Members&rsquo; choice
                  </span>
                ) : null}
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary-text">
                  {tier.label}
                </p>
                <h3 className="font-heading mt-2 text-2xl font-semibold text-foreground">
                  {tier.length}
                </h3>
                <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-secondary-text">
                  {tier.body}
                </p>
                <Link
                  href="/plans"
                  className={`mt-8 inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition ${
                    tier.highlight
                      ? "bg-primary text-white shadow-sm hover:bg-primary-hover"
                      : "border border-border-subtle text-foreground hover:bg-bg-light"
                  }`}
                >
                  See live pricing →
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-secondary-text">
            Live pricing is calculated per plan, meals per day, and market
            currency on the{" "}
            <Link
              href="/plans"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              plan builder
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Assurances */}
      <section className="border-t border-border-subtle bg-bg-light py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <h2 className="font-heading text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
            Commitment without the catch
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {assurances.map((a) => (
              <div
                key={a.title}
                className="rounded-2xl border border-border-subtle bg-surface p-7 shadow-sm"
              >
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {a.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary-text">
                  {a.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Markets + final CTA */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Subscribing from outside the UAE?
          </h2>
          <p className="mt-3 max-w-2xl text-secondary-text">
            Join the priority list in your market and we&rsquo;ll onboard you with
            founding pricing the week we launch.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {REGIONS.map((r) => (
              <Link
                key={r.code}
                href={r.path}
                className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition hover:border-primary/40"
              >
                <span aria-hidden>{r.flag}</span> {r.name}
                {r.status === "live" ? (
                  <span className="text-xs font-bold text-primary">· Live</span>
                ) : null}
              </Link>
            ))}
          </div>
          <div className="mt-14 rounded-2xl bg-emerald-deep p-10 text-center text-white sm:p-14">
            <h3 className="font-heading text-2xl font-semibold sm:text-3xl">
              Your first delivery can arrive tomorrow morning.
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-white/70">
              Two minutes to design. A lifetime of never asking &ldquo;what should
              I eat?&rdquo; again.
            </p>
            <Link
              href="/plans"
              className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-primary px-10 text-base font-semibold text-white shadow-lg shadow-black/25 transition hover:bg-primary-hover"
            >
              Start my subscription
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
