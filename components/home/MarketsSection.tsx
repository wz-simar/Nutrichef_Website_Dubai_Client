import React from "react";
import Link from "next/link";
import { REGIONS } from "@/lib/regions";

/**
 * Four-market band: internal links to each country landing page.
 * Doubles as the international-SEO hub for the /uae, /saudi-arabia,
 * /qatar, and /kuwait pages.
 */
export function MarketsSection() {
  return (
    <section
      id="markets"
      className="border-t border-border-subtle bg-bg-light py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            One standard. Four markets.
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            Born in Dubai. Built for the Gulf.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-secondary-text">
            The UAE is our flagship. Saudi Arabia, Qatar, and Kuwait are next on
            the map — same chefs&rsquo; standard, same clinical precision, wherever
            your life takes you.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REGIONS.map((region) => (
            <Link
              key={region.code}
              href={region.path}
              className="group flex flex-col rounded-2xl border border-border-subtle bg-surface p-7 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-4xl" aria-hidden>
                  {region.flag}
                </span>
                {region.status === "live" ? (
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-wider text-primary">
                    Delivering now
                  </span>
                ) : (
                  <span className="rounded-full bg-gold/10 px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-wider text-gold">
                    Opening soon
                  </span>
                )}
              </div>
              <h3 className="font-heading mt-5 text-xl font-semibold text-foreground">
                {region.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-secondary-text">
                {region.cities.join(" · ")}
              </p>
              <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-secondary-text">
                {region.tagline}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition group-hover:gap-2.5">
                {region.status === "live" ? "Order in the UAE" : "Join the priority list"}
                <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
