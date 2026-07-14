import React from "react";
import Link from "next/link";
import { REGIONS } from "@/lib/regions";

/** Compact four-market band: flag, cities, status, one link each. */
export function MarketsSection() {
  return (
    <section
      id="markets"
      className="border-t border-border-subtle bg-bg-light py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <h2 className="font-heading max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
          Born in Dubai. Built for the Gulf.
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REGIONS.map((region) => (
            <Link
              key={region.code}
              href={region.path}
              className="group flex flex-col rounded-2xl border border-border-subtle bg-surface p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl" aria-hidden>
                  {region.flag}
                </span>
                {region.status === "live" ? (
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-wider text-primary">
                    Live
                  </span>
                ) : (
                  <span className="rounded-full bg-gold/10 px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-wider text-gold">
                    Soon
                  </span>
                )}
              </div>
              <h3 className="font-heading mt-4 text-lg font-semibold text-foreground">
                {region.name}
              </h3>
              <p className="mt-0.5 text-sm text-secondary-text">
                {region.cities.join(" · ")}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition group-hover:gap-2.5">
                {region.status === "live" ? "Order now" : "Join the waitlist"}
                <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
