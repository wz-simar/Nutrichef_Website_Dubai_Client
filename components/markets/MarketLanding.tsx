import React from "react";
import Link from "next/link";
import { SITE_URL, whatsappLink } from "@/lib/site-config";
import { REGIONS, type Region } from "@/lib/regions";

function MarketSchema({ region }: { region: Region }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: `NutriChef ${region.nameShort}`,
    url: `${SITE_URL}${region.path}`,
    servesCuisine: "Healthy gourmet meal plans",
    priceRange: "$$$",
    areaServed: region.cities.map((name) => ({ "@type": "City", name })),
    address: { "@type": "PostalAddress", addressCountry: region.code.toUpperCase() },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

const pillars = [
  {
    title: "Chef-crafted, nutritionist-signed",
    body: "Cooked fresh each morning. Every macro signed off.",
  },
  {
    title: "80+ dishes, zero repetition",
    body: "Restaurant variety, nutrition-lab discipline.",
  },
  {
    title: "White-glove flexibility",
    body: "Pause, skip, or redirect in seconds. No penalties.",
  },
];

export function MarketLanding({ region }: { region: Region }) {
  const isLive = region.status === "live";
  const otherMarkets = REGIONS.filter((r) => r.code !== region.code);
  const waitlistHref = whatsappLink(
    `Hi NutriChef, please add me to the ${region.name} priority list.`
  );

  return (
    <div className="flex flex-col">
      <MarketSchema region={region} />

      {/* Hero */}
      <section className="border-b border-border-subtle bg-emerald-deep pt-32 pb-16 text-white sm:pt-36 sm:pb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft">
            <span aria-hidden>{region.flag}</span> NutriChef in {region.name}
          </p>
          <h1 className="font-heading mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            {isLive
              ? `Private-Chef Meal Plans, Delivered Across the ${region.nameShort}`
              : `${region.name}: Your Private Chef Is Almost Here`}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">
            {region.tagline}
          </p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-white/50">
            {region.cities.join(" · ")} · Billed in {region.currency}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            {isLive ? (
              <>
                <Link
                  href="/plans"
                  className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-9 text-base font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-primary-hover"
                >
                  Start my plan
                </Link>
                <Link
                  href="/menu"
                  className="inline-flex h-14 items-center justify-center rounded-full border border-white/30 px-9 text-base font-semibold text-white transition hover:bg-white/10"
                >
                  View this week&rsquo;s menu
                </Link>
              </>
            ) : (
              <>
                <a
                  href={waitlistHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-14 items-center justify-center rounded-full bg-gold px-9 text-base font-semibold text-emerald-deep shadow-lg shadow-black/20 transition hover:brightness-110"
                >
                  Join the priority list
                </a>
                <Link
                  href="/menu"
                  className="inline-flex h-14 items-center justify-center rounded-full border border-white/30 px-9 text-base font-semibold text-white transition hover:bg-white/10"
                >
                  Preview the menu
                </Link>
              </>
            )}
          </div>
          {!isLive ? (
            <p className="mt-6 text-sm text-white/50">
              Priority members receive founding pricing and first delivery slots
              when {region.nameShort} opens.
            </p>
          ) : null}
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <h2 className="font-heading max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
            The standard we&rsquo;re bringing to {region.nameShort}
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-border-subtle bg-surface p-8 shadow-sm"
              >
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  {p.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-secondary-text">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="border-t border-border-subtle bg-bg-light py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <h2 className="font-heading text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
            {isLive ? "Where we deliver" : "Where we're launching first"}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-secondary-text">
            {isLive
              ? "Every morning before 10 AM, seven days a week."
              : "Launch kitchens planned around where our members live and work."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {region.cities.map((city) => (
              <span
                key={city}
                className="rounded-full border border-border-subtle bg-surface px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm"
              >
                {city}
              </span>
            ))}
          </div>
          {isLive ? (
            <p className="mt-8 text-[0.9375rem] text-secondary-text">
              Somewhere else in the Emirates?{" "}
              <a
                href={whatsappLink("Hi NutriChef, do you deliver to my area?")}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                Ask our concierge on WhatsApp
              </a>{" "}
              — we confirm coverage within minutes.
            </p>
          ) : null}
        </div>
      </section>

      {/* Cross-market links */}
      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            NutriChef across the GCC
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {otherMarkets.map((r) => (
              <Link
                key={r.code}
                href={r.path}
                className="group flex items-center gap-4 rounded-2xl border border-border-subtle bg-surface p-5 shadow-sm transition hover:border-primary/40 hover:shadow-md"
              >
                <span className="text-3xl" aria-hidden>
                  {r.flag}
                </span>
                <span>
                  <span className="block font-semibold text-foreground">
                    {r.name}
                  </span>
                  <span className="block text-sm text-secondary-text">
                    {r.status === "live" ? "Delivering now" : "Opening soon"}
                  </span>
                </span>
                <span
                  className="ml-auto text-primary transition group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-12 rounded-2xl border border-border-subtle bg-bg-light p-8 sm:p-10">
            <h3 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
              {isLive
                ? "Ready when you are."
                : `Be first at the table in ${region.nameShort}.`}
            </h3>
            <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-secondary-text">
              {isLive
                ? "Design your plan in two minutes, or browse this week's menu first. Your first delivery can arrive tomorrow morning."
                : "Join the priority list today and our team will personally onboard you the week we open — founding pricing included."}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={isLive ? "/plans" : "/subscribe"}
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover"
              >
                {isLive ? "Start my plan" : "Subscribe for launch updates"}
              </Link>
              <Link
                href="/why-us"
                className="inline-flex h-12 items-center justify-center rounded-full border border-border-subtle bg-surface px-7 text-sm font-semibold text-foreground transition hover:bg-bg-light"
              >
                Why NutriChef
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
