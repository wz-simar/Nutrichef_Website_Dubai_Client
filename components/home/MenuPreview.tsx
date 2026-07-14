"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { guardAgainstRafStall } from "@/lib/gsapStallGuard";
import { MENU_FILTERS } from "@/components/menu/FilterBar";
import { api } from "@/lib/api";
import type { PlanFilterId } from "@/lib/planFromMacros";
import { derivePlanFilterIdFromMacros } from "@/lib/planFromMacros";

const FALLBACK_IMAGE =
  "https://cdn.calo.app/food/46cfb754-32c1-4f59-93fa-026430ae9918/square@3x.jpg";

interface ApiRecipe {
  _id: string;
  title: string;
  nutrition?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
  tags?: string[];
  media?: string[];
}

interface PreviewMeal {
  id: string;
  title: string;
  image: string;
  calories: number | null;
  protein?: number;
  carbs?: number;
  fat?: number;
  planFilterId: PlanFilterId;
}

function mapRecipeToMeal(recipe: ApiRecipe): PreviewMeal {
  const n = recipe.nutrition;
  const hasCalories = n?.calories != null && Number.isFinite(n.calories);
  const p = n?.protein;
  const c = n?.carbs;
  const f = n?.fat;
  const hasP = p != null && Number.isFinite(p);
  const hasC = c != null && Number.isFinite(c);
  const hasF = f != null && Number.isFinite(f);
  const caloriesNum = hasCalories ? Math.round(n!.calories!) : 0;
  const planFilterId = derivePlanFilterIdFromMacros({
    calories: caloriesNum,
    protein: hasP ? (p as number) : 0,
    carbs: hasC ? (c as number) : 0,
    fat: hasF ? (f as number) : 0,
  });

  return {
    id: recipe._id,
    title: recipe.title,
    image: recipe.media?.[0] || FALLBACK_IMAGE,
    calories: hasCalories ? caloriesNum : null,
    protein: hasP ? p : undefined,
    carbs: hasC ? c : undefined,
    fat: hasF ? f : undefined,
    planFilterId,
  };
}

function mealMatchesTab(meal: PreviewMeal, tabId: string): boolean {
  if (tabId === "all") return true;
  return meal.planFilterId === tabId;
}

/** Segmented macro bar: protein (gold) / carbs (leaf) / fat (mist). */
function MacroBar({ meal }: { meal: PreviewMeal }) {
  const p = meal.protein ?? 0;
  const c = meal.carbs ?? 0;
  const f = meal.fat ?? 0;
  const total = p + c + f;
  if (total <= 0) {
    return <p className="text-xs font-medium text-white/45">Macros on request</p>;
  }
  const seg = (v: number) => `${Math.max(4, Math.round((v / total) * 100))}%`;
  return (
    <div>
      <div className="flex h-[5px] w-full gap-[3px] overflow-hidden rounded-full">
        <span data-macro-seg style={{ width: seg(p) }} className="h-full origin-left rounded-full bg-gold" />
        <span data-macro-seg style={{ width: seg(c) }} className="h-full origin-left rounded-full bg-accent-warm" />
        <span data-macro-seg style={{ width: seg(f) }} className="h-full origin-left rounded-full bg-white/30" />
      </div>
      <div className="mt-2 flex items-center justify-between text-[0.6875rem] font-semibold tracking-wide">
        <span className="text-gold-soft">{Math.round(p)}g protein</span>
        <span className="text-white/55">{Math.round(c)}g carbs</span>
        <span className="text-white/40">{Math.round(f)}g fat</span>
      </div>
    </div>
  );
}

export const MenuPreview = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [meals, setMeals] = useState<PreviewMeal[]>([]);
  const [loading, setLoading] = useState(true);
  const scope = useRef<HTMLElement>(null);

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get<{ recipes: ApiRecipe[]; templates?: unknown[] }>(
        "/menu/list?type=recipes",
        { noAuth: true },
      );
      const recipes = res.data?.recipes ?? [];
      setMeals(recipes.map(mapRecipeToMeal));
    } catch {
      setMeals([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchRecipes();
  }, [fetchRecipes]);

  const visibleMeals = useMemo(
    () => meals.filter((m) => mealMatchesTab(m, activeTab)),
    [meals, activeTab],
  );

  // ── Section entrance (scroll-triggered) ────────────────────────────
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) return;

      gsap.fromTo(
        "[data-menu-line-inner]",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: "[data-menu-header]", start: "top 80%" },
        },
      );
      gsap.fromTo(
        "[data-menu-fade]",
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-menu-header]", start: "top 78%" },
        },
      );
    }, scope);

    const clearGuard = guardAgainstRafStall(ctx);

    return () => {
      clearGuard();
      ctx.revert();
    };
  }, []);

  // ── Card entrance: replays on every filter change / data load ──────
  useLayoutEffect(() => {
    if (loading) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-menu-card]",
        { autoAlpha: 0, y: 40, scale: 0.97 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-menu-track]", start: "top 90%" },
        },
      );
      gsap.fromTo(
        "[data-macro-seg]",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.9,
          stagger: 0.03,
          ease: "power2.out",
          delay: 0.3,
          scrollTrigger: { trigger: "[data-menu-track]", start: "top 90%" },
        },
      );
    }, scope);

    const clearGuard = guardAgainstRafStall(ctx);

    return () => {
      clearGuard();
      ctx.revert();
    };
  }, [loading, visibleMeals]);

  return (
    <section
      id="menu"
      ref={scope}
      className="relative overflow-hidden bg-emerald-deep py-20 text-white sm:py-24"
    >
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(28,107,69,0.35), rgba(28,107,69,0) 70%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* ── Header: one headline + filters. Nothing else. ── */}
        <div
          data-menu-header
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <h2 className="font-heading text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl">
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-menu-line-inner className="block will-change-transform">
                This week&rsquo;s{" "}
                <em className="not-italic bg-gradient-to-r from-gold-soft to-[#f3e7c3] bg-clip-text text-transparent">
                  menu.
                </em>
              </span>
            </span>
          </h2>

          <div data-menu-fade className="overflow-x-auto pb-1 hide-scrollbar">
            <div
              role="tablist"
              aria-label="Menu categories"
              className="flex w-max gap-1.5 rounded-full border border-white/12 bg-white/[0.05] p-1.5 backdrop-blur"
            >
              {MENU_FILTERS.map((tab) => {
                const selected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 sm:px-5 ${
                      selected
                        ? "bg-gold-soft text-emerald-deep shadow-[0_6px_20px_-6px_rgba(230,217,184,0.5)]"
                        : "text-white/55 hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    {tab.icon ? (
                      <span className="text-base" aria-hidden>
                        {tab.icon}
                      </span>
                    ) : null}
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Cards ── */}
        {loading ? (
          <div className="mt-10 flex snap-x gap-6 overflow-x-auto pb-4 hide-scrollbar">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-[min(100%,300px)] shrink-0 snap-start sm:w-[320px]">
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-2.5">
                  <div className="aspect-[4/5] animate-pulse rounded-2xl bg-white/[0.07]" />
                  <div className="px-2 pb-3 pt-4">
                    <div className="h-5 w-3/4 animate-pulse rounded bg-white/[0.07]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : visibleMeals.length === 0 ? (
          <p className="mt-10 text-center text-base text-white/55">
            {meals.length === 0
              ? "No recipes in the menu yet."
              : "No dishes match this filter."}
          </p>
        ) : (
          <div
            data-menu-track
            className="mt-10 flex snap-x gap-6 overflow-x-auto pb-5 hide-scrollbar"
          >
            {visibleMeals.map((meal) => (
              <article
                key={`${activeTab}-${meal.id}`}
                data-menu-card
                className="group w-[min(100%,300px)] shrink-0 snap-start will-change-transform sm:w-[320px]"
              >
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-2.5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-gold/35 hover:bg-white/[0.08] hover:shadow-[0_36px_70px_-24px_rgba(0,0,0,0.7)]">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white/[0.04]">
                    <Image
                      src={meal.image}
                      alt={meal.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                      sizes="320px"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-emerald-deep/85 via-transparent to-transparent"
                      aria-hidden
                    />
                    {meal.calories != null ? (
                      <span className="absolute left-3 top-3 rounded-full bg-emerald-deep/80 px-3 py-1.5 text-[0.6875rem] font-bold uppercase tracking-wider text-gold-soft backdrop-blur">
                        {meal.calories} kcal
                      </span>
                    ) : null}
                    <h3 className="font-heading absolute inset-x-4 bottom-4 text-xl font-semibold leading-snug text-white drop-shadow">
                      {meal.title}
                    </h3>
                  </div>
                  <div className="px-2.5 pb-3.5 pt-4">
                    <MacroBar meal={meal} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ── One clear CTA ── */}
        <div data-menu-fade className="mt-10 flex justify-center">
          <Link
            href="/menu"
            className="group inline-flex h-14 items-center gap-3 rounded-full bg-gold-soft px-9 text-base font-semibold text-emerald-deep transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105"
          >
            See the full menu
            <span
              className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
              aria-hidden
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};
