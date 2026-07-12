import React from "react";
import Link from "next/link";
import { whatsappLink } from "@/lib/site-config";

/** Full-width conversion band between the story sections and the FAQ. */
export function SubscribeCTA() {
  return (
    <section className="relative overflow-hidden bg-emerald-deep py-20 text-white sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft">
          The last food decision you&rsquo;ll ever make
        </p>
        <h2 className="font-heading mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
          Delegate your nutrition
          <br className="hidden sm:block" /> the way you delegate everything else.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
          You have a driver, an assistant, an advisor. Now you have a chef and a
          nutritionist — on retainer, for less than one restaurant lunch a day.
          Start this week. Pause whenever life demands it.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/plans"
            className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-9 text-base font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-primary-hover"
          >
            Design my plan
          </Link>
          <a
            href={whatsappLink(
              "Hi NutriChef, I'd like a private consultation about a meal plan."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center rounded-full border border-white/30 px-9 text-base font-semibold text-white transition hover:bg-white/10"
          >
            Speak to our concierge
          </a>
        </div>
        <p className="mt-8 text-sm text-white/50">
          No lock-in. No penalties. Cancel from your dashboard in one tap.
        </p>
      </div>
    </section>
  );
}
