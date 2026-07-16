"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HERO_SLIDES } from "@/lib/heroMedia";

/**
 * Full-screen hero: client photography with per-slide copy, always
 * auto-advancing. Crossfade + text animations are pure CSS (keyed remount),
 * so the hero renders and rotates even where requestAnimationFrame is
 * throttled.
 */
export const HeroSection = () => {
  const router = useRouter();
  const [slide, setSlide] = useState(0);

  const current = HERO_SLIDES[slide];

  useEffect(() => {
    if (HERO_SLIDES.length < 2) return;
    const id = window.setTimeout(
      () => setSlide((s) => (s + 1) % HERO_SLIDES.length),
      current.durationMs
    );
    return () => window.clearTimeout(id);
  }, [slide, current.durationMs]);

  const go = (dir: 1 | -1) =>
    setSlide((s) => (s + dir + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <section
      id="hero"
      className="relative isolate h-[100svh] min-h-[560px] w-full overflow-hidden bg-emerald-deep"
    >
      {/* ── Slides ── */}
      {HERO_SLIDES.map((s, i) => {
        const active = i === slide;
        const posStyle = {
          "--pos-mobile": s.objectPositionMobile ?? s.objectPosition ?? "center",
          "--pos-desktop": s.objectPosition ?? "center",
        } as React.CSSProperties;
        return (
          <div
            key={s.src}
            aria-hidden={!active}
            className="absolute inset-0"
            style={{
              opacity: active ? 1 : 0,
              transform: active ? "scale(1.05)" : "scale(1)",
              transition: "opacity 1s ease, transform 8s linear",
            }}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="hero-media object-cover"
              style={posStyle}
            />
          </div>
        );
      })}

      {/* ── Scrims: navbar top + copy bottom ── */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/60 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black/80 via-black/30 to-transparent"
        aria-hidden
      />

      {/* ── Copy (remounts per slide → CSS animation replays) ── */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-28 lg:px-10">
          <div key={slide} className="hero-slide-copy max-w-2xl">
            <p className="font-heading mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.3em] text-gold sm:text-xs">
              {current.eyebrow}
            </p>

            <h1 className="font-heading text-[2.6rem] font-semibold leading-[1.03] tracking-tight text-white sm:text-6xl lg:text-[4.2rem]">
              {current.headline[0]}
              <br />
              <span className="bg-gradient-to-r from-gold-soft to-[#f3e7c3] bg-clip-text text-transparent">
                {current.headline[1]}
              </span>
            </h1>

            <p className="mt-4 max-w-lg text-lg leading-relaxed text-white/85 sm:text-xl">
              {current.sub}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => router.push("/plans")}
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-primary px-9 text-base font-semibold text-white shadow-[0_18px_44px_-12px_rgba(0,0,0,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover"
              >
                Start my plan
                <span
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
                  aria-hidden
                >
                  →
                </span>
              </button>
              <Link
                href="/menu"
                className="inline-flex h-14 items-center rounded-full border border-white/35 px-8 text-base font-semibold text-white backdrop-blur-sm transition hover:border-white hover:bg-white/10"
              >
                This week&rsquo;s menu
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Controls ── */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 pb-6 sm:px-8 lg:px-10">
          {/* Dots with progress fill */}
          <div className="flex items-center gap-2.5" role="tablist" aria-label="Hero slides">
            {HERO_SLIDES.map((s, i) => {
              const active = i === slide;
              return (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`Slide ${i + 1}: ${s.eyebrow}`}
                  onClick={() => setSlide(i)}
                  className={`relative h-[5px] overflow-hidden rounded-full transition-all duration-300 ${
                    active ? "w-12 bg-white/30" : "w-5 bg-white/30 hover:bg-white/50"
                  }`}
                >
                  {active ? (
                    <span
                      key={`fill-${slide}`}
                      className="absolute inset-y-0 left-0 rounded-full bg-white"
                      style={{ animation: `hero-dot-fill ${current.durationMs}ms linear forwards` }}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Arrows */}
          <div className="flex gap-2">
            {([-1, 1] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                aria-label={dir === -1 ? "Previous slide" : "Next slide"}
                onClick={() => go(dir)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur transition hover:bg-white/25"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  {dir === -1 ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
