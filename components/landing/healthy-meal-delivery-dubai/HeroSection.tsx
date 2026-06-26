"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { hero } from "@/content/healthy-meal-delivery-dubai";

const HERO_BACKGROUND_DESKTOP = "/complete_background.png";
const HERO_BACKGROUND_MOBILE = "/complete_background_mobile.png";
const HERO_ALT =
  "NutriChef fresh healthy meal delivery across Dubai with chef cooked daily plans";

export function HeroSection() {
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
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 hidden object-cover object-center sm:block"
        aria-hidden
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
            {hero.eyebrow}
          </p>
          <h1 className="font-heading text-[2.25rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem]">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
            {hero.subheading}
          </p>
          <div className="mt-10 flex flex-col items-start gap-3">
            <Button type="button" size="lg" onClick={() => router.push("/plans")}>
              {hero.ctaLabel}
            </Button>
            <p className="text-sm text-white/75">{hero.secondaryText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
