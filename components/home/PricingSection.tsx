"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useTenant } from "@/contexts/TenantContext";
import { formatMajorUnits } from "@/lib/formatCurrency";
import { PACKAGE_DURATION_KEYS, type PackageDurationKey } from "@/lib/nutrichefPackages";
import {
  buildPriceCompare,
  getPackagesForFamily,
  packagePriceAed,
  type PackageCode,
  type PackageFamily,
} from "@/lib/nutrichefPackages";
import { whenNearViewport } from "@/lib/scheduleIdle";

/**
 * Public price checker: estimate with package sheet + Plan A/B/C + duration.
 * Exact diet plan category is collected only in registration questions.
 */

const FAMILY_OPTIONS: { id: PackageFamily; label: string; hint: string }[] = [
  {
    id: "weight_loss",
    label: "Weight loss sheet",
    hint: "Fat loss, GLP-1, PCOS, diabetic & balanced",
  },
  {
    id: "muscle_gain",
    label: "Muscle gain sheet",
    hint: "Protein-forward Plan A / B / C",
  },
];

export function PricingSection() {
  const { currency } = useTenant();
  const [family, setFamily] = useState<PackageFamily>("weight_loss");
  const [packageCode, setPackageCode] = useState<PackageCode>("A");
  const [duration, setDuration] = useState<PackageDurationKey>("20");
  const [ready, setReady] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(
    () => whenNearViewport(sectionRef.current, () => setReady(true), "-80px"),
    [],
  );

  const packages = useMemo(() => getPackagesForFamily(family), [family]);

  const selectedPkg = useMemo(
    () => packages.find((p) => p.code === packageCode) ?? packages[0],
    [packages, packageCode],
  );

  useEffect(() => {
    if (!packages.some((p) => p.code === packageCode)) {
      setPackageCode(packages[0]?.code ?? "A");
    }
  }, [packages, packageCode]);

  const quote = useMemo(() => {
    if (!selectedPkg) return null;
    const total = packagePriceAed(family, selectedPkg.code, Number(duration));
    if (total == null) return null;
    const days = Number(duration);
    const compare = buildPriceCompare(total, days);
    return {
      total,
      days,
      perDay: total / days,
      macros: selectedPkg.macros,
      summary: selectedPkg.summary,
      compare,
    };
  }, [family, selectedPkg, duration]);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="border-t border-border-subtle bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            Check your price.
          </h2>
          <p className="mt-3 text-lg text-secondary-text">
            Estimate with Plan A / B / C and length. Your exact diet plan category
            is chosen only in registration questions.
          </p>
        </div>

        {!ready ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded-2xl border border-border-subtle bg-bg-light"
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-secondary-text">
                1 · Price sheet (estimate)
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {FAMILY_OPTIONS.map((opt) => {
                  const active = family === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setFamily(opt.id)}
                      className={`flex min-h-11 min-w-0 flex-col rounded-2xl border-2 p-4 text-left transition ${
                        active
                          ? "border-primary bg-primary/10"
                          : "border-border-subtle bg-surface shadow-sm hover:border-foreground/15"
                      }`}
                    >
                      <span className="text-[0.9375rem] font-semibold text-foreground">
                        {opt.label}
                      </span>
                      <span className="mt-1 text-[0.75rem] text-secondary-text">{opt.hint}</span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-[13px] font-medium text-secondary-text">
                Fat Loss, Muscle Gain, PCOS, and the rest are picked in{" "}
                <Link href="/auth/register" className="font-semibold text-primary underline-offset-2 hover:underline">
                  questions
                </Link>
                — not here.
              </p>

              <p className="mb-4 mt-8 text-sm font-bold uppercase tracking-[0.18em] text-secondary-text">
                2 · Package
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {packages.map((pkg) => {
                  const active = packageCode === pkg.code;
                  return (
                    <button
                      key={pkg.code}
                      type="button"
                      onClick={() => setPackageCode(pkg.code)}
                      className={`min-h-11 rounded-2xl border-2 p-4 text-left transition ${
                        active
                          ? "border-primary bg-primary/10"
                          : "border-border-subtle bg-surface shadow-sm hover:border-foreground/15"
                      }`}
                    >
                      <span className="block text-[0.9375rem] font-semibold text-foreground">
                        {pkg.title}
                      </span>
                      <span className="mt-1 block text-[0.75rem] leading-snug text-secondary-text">
                        {pkg.summary}
                      </span>
                      <span className="mt-2 block text-[0.6875rem] font-bold text-secondary-text">
                        {pkg.macros.calories} · {pkg.macros.protein} protein
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="mb-4 mt-8 text-sm font-bold uppercase tracking-[0.18em] text-secondary-text">
                3 · Programme length
              </p>
              <div className="flex flex-wrap gap-3">
                {PACKAGE_DURATION_KEYS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDuration(d)}
                    className={`h-12 min-w-11 rounded-xl border-2 px-5 text-base font-semibold transition ${
                      duration === d
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border-subtle bg-surface text-secondary-text shadow-sm hover:border-foreground/15"
                    }`}
                  >
                    {d} days
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="sticky top-24 rounded-[28px] border border-border-subtle bg-emerald-deep p-8 text-white shadow-[0_24px_60px_-24px_rgba(13,33,23,0.5)]">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-soft">
                  Your package
                </p>
                <p className="font-heading mt-3 text-lg font-semibold leading-snug">
                  {family === "muscle_gain" ? "Muscle gain" : "Weight loss"} ·{" "}
                  {selectedPkg?.title ?? "—"}
                </p>
                <p className="mt-1 text-sm text-white/60">
                  {quote ? `${quote.summary} · ${quote.days} days` : "—"}
                </p>
                {quote ? (
                  <p className="mt-2 text-sm text-white/55">
                    {quote.macros.calories} · {quote.macros.protein} protein ·{" "}
                    {quote.macros.carbs} carbs · {quote.macros.fat} fat
                  </p>
                ) : null}

                {quote?.compare ? (
                  <div className="mt-6">
                    <p className="text-sm text-white/55">
                      <span className="line-through decoration-white/50">
                        {formatMajorUnits(quote.compare.listAed, currency, {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                      </span>
                    </p>
                    <p className="font-heading text-5xl font-semibold tracking-tight text-gold-soft">
                      {formatMajorUnits(quote.compare.saleAed, currency, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </p>
                    <p className="mt-2 text-sm text-white/60">
                      Weekly{" "}
                      <span className="line-through decoration-white/40">
                        {formatMajorUnits(quote.compare.weeklyListAed, currency, {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                      </span>{" "}
                      <span className="font-semibold text-gold-soft">
                        {formatMajorUnits(quote.compare.weeklySaleAed, currency, {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                      </span>
                      {" · "}
                      {formatMajorUnits(Math.round(quote.perDay), currency)}/day ·
                      free delivery
                    </p>
                  </div>
                ) : (
                  <p className="font-heading mt-6 text-5xl font-semibold tracking-tight">
                    —
                  </p>
                )}

                <Link
                  href="/plans"
                  className="group mt-8 inline-flex h-13 w-full items-center justify-center gap-3 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover"
                >
                  Continue to checkout
                  <span
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
                <Link
                  href="/plans#trial"
                  className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-gold-soft transition hover:bg-white/10"
                >
                  Or try Taste Trial — AED 99
                </Link>
                <p className="mt-4 text-center text-xs text-white/45">
                  Pause anytime. No lock-in.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
