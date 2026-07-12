"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { guardAgainstRafStall } from "@/lib/gsapStallGuard";

/** Moody fine-dining table — blended into the emerald canvas, editorial not stock. */
const HERO_BACKDROP =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2200&q=80";

const HEADLINE_LINES = ["Your Private Chef.", "Your Nutritionist.", "At Your Door by 10 AM."];

const FLOATING_CARDS = [
  {
    id: "salmon",
    title: "Miso-Glazed Salmon",
    kcal: "560 kcal",
    macro: "42g protein",
    time: "Delivered 7:42 AM",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "wagyu",
    title: "Wagyu Beef Bowl",
    kcal: "610 kcal",
    macro: "44g protein",
    time: "Delivered 8:05 AM",
    image:
      "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "acai",
    title: "Acai Power Bowl",
    kcal: "380 kcal",
    macro: "14g protein",
    time: "Delivered 6:58 AM",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80",
  },
] as const;

const STATS = [
  { value: 290, suffix: "K", label: "members worldwide" },
  { value: 19, suffix: "M", label: "meals delivered" },
  { value: 4, suffix: "", label: "GCC markets, UAE first" },
] as const;

export const HeroSection = () => {
  const router = useRouter();
  const scope = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context((self) => {
      if (reduceMotion) return;

      // ── Entrance timeline ────────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        "[data-hero-bg]",
        { scale: 1.12, autoAlpha: 0.65 },
        { scale: 1, autoAlpha: 1, duration: 2.2, ease: "power2.out" },
        0
      );

      tl.fromTo(
        "[data-hero-eyebrow-rule]",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.9, transformOrigin: "left center" },
        0.35
      );
      tl.fromTo(
        "[data-hero-eyebrow]",
        { autoAlpha: 0, x: -24 },
        { autoAlpha: 1, x: 0, duration: 0.8 },
        0.4
      );

      // Masked line-by-line headline reveal
      tl.fromTo(
        "[data-hero-line-inner]",
        { yPercent: 110 },
        { yPercent: 0, duration: 1.05, stagger: 0.14, ease: "power4.out" },
        0.55
      );

      tl.fromTo(
        "[data-hero-fade]",
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.12 },
        1.15
      );

      // Floating dish cards: staggered entrance
      tl.fromTo(
        "[data-hero-card]",
        { autoAlpha: 0, y: 60, scale: 0.9, rotate: 0 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotate: (i) => [-4, 3, -2][i] ?? 0,
          duration: 1.1,
          stagger: 0.16,
          ease: "back.out(1.4)",
        },
        1.2
      );

      // Count-up stats
      const counters = self.selector?.("[data-hero-count]") as HTMLElement[] | undefined;
      counters?.forEach((el, i) => {
        const target = STATS[i]?.value ?? 0;
        const suffix = STATS[i]?.suffix ?? "";
        const obj = { v: 0 };
        tl.to(
          obj,
          {
            v: target,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = `${Math.round(obj.v)}${suffix}`;
            },
          },
          1.45
        );
      });

      // ── Ambient motion ───────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>("[data-hero-card]").forEach((card, i) => {
        gsap.to(card, {
          y: `+=${[14, -12, 10][i] ?? 12}`,
          duration: 2.6 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 2.4 + i * 0.3,
        });
      });

      gsap.to("[data-hero-scroll-dot]", {
        y: 14,
        duration: 1.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // ── Scroll parallax ──────────────────────────────────────────────
      gsap.to("[data-hero-bg]", {
        yPercent: 16,
        ease: "none",
        scrollTrigger: { trigger: scope.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.utils.toArray<HTMLElement>("[data-hero-card]").forEach((card, i) => {
        gsap.to(card, {
          yPercent: [-26, -42, -18][i] ?? -25,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
      gsap.to("[data-hero-copy]", {
        yPercent: -10,
        autoAlpha: 0.25,
        ease: "none",
        scrollTrigger: { trigger: scope.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, scope);

    const clearGuard = guardAgainstRafStall(ctx);

    return () => {
      clearGuard();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={scope}
      className="relative isolate flex min-h-screen w-full items-center overflow-hidden bg-emerald-deep"
    >
      {/* Background: emerald base + moody dining photography blended in from the right */}
      <div data-hero-bg className="absolute inset-0 -z-20 will-change-transform">
        <div className="absolute inset-0 bg-emerald-deep" aria-hidden />
        <Image
          src={HERO_BACKDROP}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] opacity-75"
        />
      </div>
      {/* Cinematic grade: emerald wash left→right, settle into emerald at the base */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#0d2117]/85 via-[#0d2117]/45 to-[#0d2117]/90 sm:bg-gradient-to-r sm:from-[#0d2117] sm:via-[#0d2117]/75 sm:to-[#0d2117]/25"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-b from-transparent to-emerald-deep"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-44 bg-gradient-to-b from-[#06120c]/85 to-transparent"
        aria-hidden
      />
      {/* Champagne glow behind the headline */}
      <div
        className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-[480px] w-[640px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(184,145,46,0.14), rgba(184,145,46,0) 70%)",
        }}
        aria-hidden
      />
      {/* Gold hairline at the very top */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-32 pb-24 sm:px-8 sm:pt-36 lg:px-10 lg:pt-36">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          {/* ── Copy column ── */}
          <div data-hero-copy className="max-w-2xl lg:col-span-7">
            <div className="mb-6 flex items-center gap-4">
              <span
                data-hero-eyebrow-rule
                className="h-px w-12 shrink-0 bg-gold"
                aria-hidden
              />
              <p
                data-hero-eyebrow
                className="font-heading text-[0.6875rem] font-semibold uppercase tracking-[0.32em] text-gold-soft sm:text-xs"
              >
                🇦🇪 Dubai · Abu Dhabi · Sharjah — GCC-wide next
              </p>
            </div>

            <h1 className="font-heading text-[2.7rem] font-semibold leading-[1.04] tracking-tight text-white sm:text-[3.4rem] lg:text-[3.9rem]">
              {HEADLINE_LINES.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.08em]">
                  <span
                    data-hero-line-inner
                    className={`block will-change-transform ${
                      i === 2
                        ? "bg-gradient-to-r from-gold-soft via-[#f3e7c3] to-gold-soft bg-clip-text text-transparent"
                        : ""
                    }`}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <p
              data-hero-fade
              className="mt-7 max-w-lg text-lg leading-relaxed text-white/80 sm:text-xl"
            >
              You didn&rsquo;t build your life to spend it counting calories. A chef&rsquo;s
              brigade and a clinical nutritionist stand behind every meal —
              engineered to your goals, ready in three minutes.
            </p>

            <div data-hero-fade className="mt-5 flex flex-wrap items-center gap-2.5">
              {["80+ rotating dishes", "Nutritionist-signed macros", "Pause anytime"].map(
                (chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-1.5 text-[0.8125rem] font-semibold text-white/85 backdrop-blur-sm"
                  >
                    <span className="h-1 w-1 rounded-full bg-gold" aria-hidden />
                    {chip}
                  </span>
                )
              )}
            </div>

            <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => router.push("/plans")}
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-primary px-9 text-base font-semibold text-white shadow-[0_18px_44px_-12px_rgba(28,107,69,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-[0_22px_52px_-10px_rgba(28,107,69,0.8)]"
              >
                Design my plan
                <span
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
                  aria-hidden
                >
                  →
                </span>
              </button>
              <Link
                href="/menu"
                className="group inline-flex h-14 items-center gap-2 rounded-full border border-white/25 px-8 text-base font-semibold text-white/90 backdrop-blur-sm transition hover:border-gold-soft/60 hover:text-white"
              >
                This week&rsquo;s menu
                <span
                  className="inline-block text-gold-soft transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            </div>

            {/* Stats */}
            <dl
              data-hero-fade
              className="mt-14 grid max-w-xl grid-cols-3 divide-x divide-white/12 border-t border-white/12 pt-8"
            >
              {STATS.map((stat, i) => (
                <div key={stat.label} className={i === 0 ? "pr-6" : "px-6"}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd
                    data-hero-count
                    className="font-heading text-3xl font-semibold tabular-nums text-white sm:text-4xl"
                  >
                    {stat.value}
                    {stat.suffix}
                  </dd>
                  <dd className="mt-1.5 text-[0.8125rem] leading-snug text-white/60">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ── Floating dish cards (desktop) ── */}
          <div className="relative hidden h-[560px] lg:col-span-5 lg:block" aria-hidden>
            {FLOATING_CARDS.map((card, i) => (
              <div
                key={card.id}
                data-hero-card
                className={`absolute w-[248px] rounded-3xl border border-white/15 bg-white/[0.08] p-3 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.65)] backdrop-blur-xl will-change-transform ${
                  ["right-6 top-0", "left-0 top-[200px]", "right-0 top-[356px]"][i]
                }`}
              >
                <div className="relative aspect-[16/11] overflow-hidden rounded-2xl">
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    sizes="248px"
                    className="object-cover"
                  />
                  <span className="absolute left-2.5 top-2.5 rounded-full bg-emerald-deep/80 px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-wider text-gold-soft backdrop-blur">
                    {card.kcal}
                  </span>
                </div>
                <div className="px-1.5 pb-1.5 pt-3">
                  <p className="font-heading text-[0.9375rem] font-semibold leading-snug text-white">
                    {card.title}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs font-semibold text-white/65">{card.macro}</span>
                    <span className="inline-flex items-center gap-1.5 text-[0.625rem] font-bold uppercase tracking-wide text-emerald-300/90">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                      {card.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        data-hero-fade
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        aria-hidden
      >
        <span className="text-[0.625rem] font-bold uppercase tracking-[0.3em] text-white/45">
          Scroll
        </span>
        <span className="flex h-9 w-[22px] items-start justify-center rounded-full border border-white/25 p-1.5">
          <span data-hero-scroll-dot className="h-1.5 w-1.5 rounded-full bg-gold-soft" />
        </span>
      </div>
    </section>
  );
};
