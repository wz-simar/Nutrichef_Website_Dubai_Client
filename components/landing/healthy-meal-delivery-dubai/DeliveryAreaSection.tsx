import React from "react";
import Link from "next/link";
import { ImagePlaceholder } from "@/components/landing/shared/ImagePlaceholder";
import { deliveryArea, WHATSAPP_URL } from "@/content/healthy-meal-delivery-dubai";

export function DeliveryAreaSection() {
  return (
    <section className="border-b border-border-subtle bg-bg-light py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-secondary-text">
            Delivery
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            {deliveryArea.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-secondary-text sm:text-lg">
            {deliveryArea.body}
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <ImagePlaceholder
              label="Delivery coverage map"
              aspect="wide"
              className="w-full"
            />
            <p className="mt-6 text-base leading-relaxed text-secondary-text">
              {deliveryArea.ctaText}
            </p>
            <Link
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-xl bg-[#25D366] px-6 text-sm font-semibold text-white transition hover:bg-[#1ebe5d]"
            >
              Message us on WhatsApp
            </Link>
          </div>

          <div className="rounded-2xl border border-border-subtle bg-surface p-6 sm:p-8">
            <h3 className="font-heading text-lg font-semibold text-foreground">
              Covered zones
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {deliveryArea.zones.map((zone) => (
                <li
                  key={zone}
                  className="flex items-center gap-2 text-sm font-medium text-secondary-text"
                >
                  <span className="text-primary" aria-hidden>
                    📍
                  </span>
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
