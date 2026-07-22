"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { useTenant } from "@/contexts/TenantContext";
import { formatMajorUnits } from "@/lib/formatCurrency";
import { GOAL_EMOJIS } from "@/lib/mealPlanTemplateDisplay";
import {
  collectRawDurationKeysFromPricing,
  daysForDurationKey,
  supportedDurationKeysPresent,
  type PlanDurationDayKey,
} from "@/lib/mealPlanDurationTiers";

/**
 * Public price checker on the home page: pick a plan, meals per day, and
 * duration → live total, per-day cost, and the plan's daily calories.
 * No login required; checkout continues on /plans.
 */

interface ApiTemplate {
  _id: string;
  title: string;
  goalType?: string;
  dietType?: string;
  structure?: {
    nutrition?: { calories?: number; protein?: number; carbs?: number; fat?: number };
  };
  pricing?: {
    breakfast?: Record<string, number>;
    lunch?: Record<string, number>;
    dinner?: Record<string, number>;
  };
}

const MEALS_OPTIONS = [2, 3, 4, 5];

function emojiFor(t: ApiTemplate): string {
  const keys = [t.dietType, t.goalType, t.title]
    .filter(Boolean)
    .map((k) => String(k).toLowerCase());
  for (const k of keys) if (GOAL_EMOJIS[k]) return GOAL_EMOJIS[k];
  for (const k of keys)
    for (const [pattern, emoji] of Object.entries(GOAL_EMOJIS))
      if (k.includes(pattern)) return emoji;
  return "🍽️";
}

function caloriesFor(t: ApiTemplate): number | null {
  const n = t.structure?.nutrition;
  if (!n) return null;
  if (n.calories && n.calories > 0) return Math.round(n.calories);
  const p = n.protein ?? 0;
  const c = n.carbs ?? 0;
  const f = n.fat ?? 0;
  const kcal = p * 4 + c * 4 + f * 9;
  return kcal > 0 ? Math.round(kcal) : null;
}

function slotPriceFor(t: ApiTemplate, dur: string): number | null {
  for (const slot of ["lunch", "breakfast", "dinner"] as const) {
    const v = t.pricing?.[slot]?.[dur];
    if (v != null && v > 0) return v;
  }
  return null;
}

export function PricingSection() {
  const { currency } = useTenant();
  const [templates, setTemplates] = useState<ApiTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [planId, setPlanId] = useState("");
  const [meals, setMeals] = useState(3);
  const [duration, setDuration] = useState<string>("");

  const fetchTemplates = useCallback(async () => {
    try {
      const res = await api.get<{ templates: ApiTemplate[] }>(
        "/menu/list?type=templates",
        { noAuth: true }
      );
      const list = res.data?.templates ?? [];
      setTemplates(list);
      if (list.length > 0) setPlanId(list[0]._id);
    } catch {
      setTemplates([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchTemplates();
  }, [fetchTemplates]);

  const plan = useMemo(
    () => templates.find((t) => t._id === planId),
    [templates, planId]
  );

  const durations: PlanDurationDayKey[] = useMemo(() => {
    if (!plan?.pricing) return [];
    return supportedDurationKeysPresent(
      collectRawDurationKeysFromPricing(plan.pricing, ["breakfast", "lunch", "dinner"])
    );
  }, [plan]);

  useEffect(() => {
    if (durations.length > 0 && !durations.includes(duration as PlanDurationDayKey)) {
      setDuration(durations[0]);
    }
  }, [durations, duration]);

  const quote = useMemo(() => {
    if (!plan || !duration) return null;
    const slot = slotPriceFor(plan, duration);
    const days = daysForDurationKey(duration);
    if (slot == null || days == null) return null;
    const total = slot * meals;
    return { total, days, perDay: total / days, perMeal: total / (meals * days) };
  }, [plan, duration, meals]);

  return (
    <section
      id="pricing"
      className="border-t border-border-subtle bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            Check your price.
          </h2>
          <p className="mt-3 text-lg text-secondary-text">
            Pick a plan, meals per day, and length — your price appears
            instantly. No sign-up needed.
          </p>
        </div>

        {loading ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded-2xl border border-border-subtle bg-bg-light"
              />
            ))}
          </div>
        ) : templates.length === 0 ? (
          <p className="mt-10 text-secondary-text">
            Plans are loading slowly — see{" "}
            <Link href="/plans" className="font-semibold text-primary underline-offset-4 hover:underline">
              the plan builder
            </Link>
            .
          </p>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            {/* Plan cards with calories */}
            <div className="lg:col-span-7">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-secondary-text">
                1 · Your plan
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {templates.map((t) => {
                  const active = t._id === planId;
                  const kcal = caloriesFor(t);
                  return (
                    <button
                      key={t._id}
                      type="button"
                      onClick={() => setPlanId(t._id)}
                      className={`flex min-w-0 items-start gap-3 rounded-2xl border-2 p-4 text-left transition ${
                        active
                          ? "border-primary bg-primary/10"
                          : "border-border-subtle bg-surface shadow-sm hover:border-foreground/15"
                      }`}
                    >
                      <span className="text-2xl leading-none" aria-hidden>
                        {emojiFor(t)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[0.9375rem] font-semibold leading-snug text-foreground">
                          {t.title}
                        </span>
                        {kcal ? (
                          <span
                            className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[0.6875rem] font-bold ${
                              active
                                ? "bg-primary/15 text-primary"
                                : "bg-bg-light text-secondary-text"
                            }`}
                          >
                            ~{kcal.toLocaleString()} kcal/day
                          </span>
                        ) : null}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="mb-4 mt-8 text-sm font-bold uppercase tracking-[0.18em] text-secondary-text">
                2 · Meals per day
              </p>
              <div className="flex flex-wrap gap-3">
                {MEALS_OPTIONS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMeals(m)}
                    className={`h-12 w-16 rounded-xl border-2 text-base font-semibold transition ${
                      meals === m
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border-subtle bg-surface text-secondary-text shadow-sm hover:border-foreground/15"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              <p className="mb-4 mt-8 text-sm font-bold uppercase tracking-[0.18em] text-secondary-text">
                3 · Programme length
              </p>
              <div className="flex flex-wrap gap-3">
                {durations.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDuration(d)}
                    className={`h-12 rounded-xl border-2 px-5 text-base font-semibold transition ${
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

            {/* Live quote */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 rounded-[28px] border border-border-subtle bg-emerald-deep p-8 text-white shadow-[0_24px_60px_-24px_rgba(13,33,23,0.5)]">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-soft">
                  Your price
                </p>
                <p className="font-heading mt-3 text-lg font-semibold leading-snug">
                  {plan?.title ?? "—"}
                </p>
                <p className="mt-1 text-sm text-white/60">
                  {meals} meals/day · {quote ? `${quote.days} days` : "—"}
                  {plan && caloriesFor(plan)
                    ? ` · ~${caloriesFor(plan)!.toLocaleString()} kcal/day`
                    : ""}
                </p>

                <p className="font-heading mt-6 text-5xl font-semibold tracking-tight">
                  {quote ? formatMajorUnits(quote.total, currency) : "—"}
                </p>
                {quote ? (
                  <p className="mt-2 text-sm text-white/60">
                    {formatMajorUnits(Math.round(quote.perDay), currency)}/day ·{" "}
                    {formatMajorUnits(Math.round(quote.perMeal), currency)}/meal ·
                    free delivery
                  </p>
                ) : null}

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
