import React from "react";
import { deliveryArea } from "@/content/best-healthy-meal-subscription-dubai";
import { whatsappLink } from "@/lib/site-config";

export function DeliveryAreaSection() {
  return (
    <section className="border-b border-border-subtle bg-surface py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-secondary-text">
              Delivery
            </p>
            <h2 className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
              {deliveryArea.heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-secondary-text sm:text-lg">
              {deliveryArea.paragraph}
            </p>
            <a
              href={whatsappLink(
                "Hi NutriChef, I'd like to confirm delivery timing for my area in Dubai.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Message us your area on WhatsApp →
            </a>
          </div>
          <div className="lg:col-span-6">
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
              {deliveryArea.zones.map((zone) => (
                <li
                  key={zone}
                  className="rounded-xl border border-border-subtle bg-bg-light px-4 py-3 text-center text-sm font-medium text-foreground"
                >
                  {zone}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
