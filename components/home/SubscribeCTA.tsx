import React from "react";
import Link from "next/link";
import { whatsappLink } from "@/lib/site-config";
import { STARTING_PRICE_PER_MEAL_AED } from "@/lib/site-config";

/** Full-width final conversion band. One message, one CTA. */
export function SubscribeCTA() {
  return (
    <section className="relative overflow-hidden bg-emerald-deep py-20 text-white sm:py-24">
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[360px] w-[640px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(28,107,69,0.4), rgba(28,107,69,0) 70%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <h2 className="font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
          Delegate your nutrition.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
          A chef and a nutritionist on retainer — from AED{" "}
          {STARTING_PRICE_PER_MEAL_AED} a meal.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
          <Link
            href="/plans"
            className="group inline-flex h-14 items-center gap-3 rounded-full bg-primary px-10 text-base font-semibold text-white shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover"
          >
            Start my plan
            <span
              className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
              aria-hidden
            >
              →
            </span>
          </Link>
          <a
            href={whatsappLink("Hi NutriChef, I'd like help choosing a meal plan.")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-semibold text-white/85 underline-offset-4 transition hover:text-white hover:underline"
          >
            Talk to our concierge
          </a>
        </div>
        <p className="mt-7 text-sm text-white/45">Pause anytime. No lock-in.</p>
      </div>
    </section>
  );
}
