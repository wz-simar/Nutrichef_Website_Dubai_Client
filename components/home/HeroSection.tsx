"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../Button";
import { DELIVERY_ZONES_TEXT } from "@/lib/site-config";

const HERO_BACKGROUND_DESKTOP = "/complete_background.png";
const HERO_BACKGROUND_MOBILE = "/complete_background_mobile.png";
const HERO_ALT =
  "Nutrichef chef presenting freshly prepared meals with the Dubai skyline in the background";

export const HeroSection = () => {
  const router = useRouter();

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-screen w-full items-center overflow-hidden"
    >
      <Image
        src={HERO_BACKGROUND_MOBILE}
        alt={HERO_ALT}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center sm:hidden"
      />
      <Image
        src={HERO_BACKGROUND_DESKTOP}
        alt={HERO_ALT}
        fill
        priority
        sizes="100vw"
        className="-z-20 hidden object-cover object-center sm:block"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/65 via-black/35 to-black/55 sm:bg-gradient-to-r sm:from-black/70 sm:via-black/30 sm:to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-black/45 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-32 pb-20 sm:px-8 sm:pt-36 sm:pb-24 lg:px-10 lg:pt-40 lg:pb-28">
        <div className="max-w-2xl">
          <p className="font-heading mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
            Fresh daily · Heat &amp; eat
          </p>
          <h1 className="font-heading text-[2.65rem] font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem]">
            Fresh Healthy
            <br />
            Meal Plans
            <br />
            <span className="text-primary">
              Delivered Daily
              <br />
              in Dubai
            </span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/85 sm:text-xl">
            Designed by nutritionists, crafted by chefs, personalized to your
            goals. Fresh daily. Just heat and eat.
          </p>
          <p className="mt-4 inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-sm">
            {DELIVERY_ZONES_TEXT}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              type="button"
              size="lg"
              onClick={() => router.push("/plans")}
            >
              See plans
            </Button>
            <Link
              href="/menu"
              className="text-sm font-semibold text-white/85 underline-offset-4 transition hover:text-white hover:underline"
            >
              Browse menu
            </Link>
          </div>
          <dl className="mt-14 grid max-w-lg gap-6 border-t border-white/20 pt-10 sm:grid-cols-2 sm:gap-8">
            <div>
              <dt className="sr-only">Customers</dt>
              <dd className="font-heading text-2xl font-semibold text-white sm:text-3xl">
                290K
              </dd>
              <dd className="mt-1 text-sm leading-snug text-white/75">
                happy customers in Worldwide
              </dd>
            </div>
            <div>
              <dt className="sr-only">Meals</dt>
              <dd className="font-heading text-2xl font-semibold text-white sm:text-3xl">
                19M
              </dd>
              <dd className="mt-1 text-sm leading-snug text-white/75">
                meals delivered
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};
