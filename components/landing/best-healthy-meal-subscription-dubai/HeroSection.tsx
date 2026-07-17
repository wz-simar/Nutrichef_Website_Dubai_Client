import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  hero,
  navTrustLine,
} from "@/content/best-healthy-meal-subscription-dubai";

const HERO_BACKGROUND_DESKTOP = "/complete_background.png";
const HERO_BACKGROUND_MOBILE = "/complete_background_mobile.png";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-screen w-full items-center overflow-hidden"
    >
      <Image
        src={HERO_BACKGROUND_MOBILE}
        alt={hero.imageAlt}
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
          <p className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/75 sm:text-xs">
            {navTrustLine.items.map((item, index) => (
              <React.Fragment key={item}>
                {index > 0 ? (
                  <span className="text-white/35" aria-hidden>
                    ·
                  </span>
                ) : null}
                <span>{item}</span>
              </React.Fragment>
            ))}
          </p>
          <h1 className="font-heading text-[2rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[2.85rem] xl:text-[3.15rem]">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            {hero.subheading}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href={hero.primaryHref}
              className="inline-flex h-14 items-center justify-center rounded-xl bg-primary px-8 text-base font-semibold text-white shadow-sm transition hover:bg-primary-hover"
            >
              {hero.primaryCta}
            </Link>
            <Link
              href={hero.secondaryHref}
              className="inline-flex h-14 items-center justify-center rounded-xl border-2 border-white/35 bg-transparent px-8 text-base font-semibold text-white transition hover:border-white hover:bg-white/10"
            >
              {hero.secondaryCta}
            </Link>
          </div>
          <p className="mt-4 text-sm text-white/70">{hero.microcopy}</p>
        </div>
      </div>
    </section>
  );
}
