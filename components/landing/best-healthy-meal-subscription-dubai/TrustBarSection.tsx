import React from "react";
import { trustBar } from "@/content/best-healthy-meal-subscription-dubai";

export function TrustBarSection() {
  return (
    <section
      aria-label="Trust highlights"
      className="border-b border-border-subtle bg-emerald-deep py-5 sm:py-6"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-8 sm:gap-y-3 lg:justify-between">
          {trustBar.items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 text-sm font-medium text-white/90 sm:text-[0.9375rem]"
            >
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] text-white"
                aria-hidden
              >
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
