"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../Button";
import { MENU_FILTERS } from "@/components/menu/FilterBar";
import { api } from "@/lib/api";
import type { PlanFilterId } from "@/lib/planFromMacros";
import { derivePlanFilterIdFromMacros } from "@/lib/planFromMacros";

const chips = [
  "NATURAL INGREDIENTS",
  "ALLERGEN-FRIENDLY",
  "VEGETARIAN OPTIONS",
];

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
  calories: string | null;
  protein?: number;
  carbs?: number;
  fat?: number;
  customText?: string;
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
  const hasAnyMacro = hasP || hasC || hasF;
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
    calories: hasCalories ? `${caloriesNum} Cal` : null,
    protein: hasP ? p : undefined,
    carbs: hasC ? c : undefined,
    fat: hasF ? f : undefined,
    customText: !hasAnyMacro ? "Macros on request" : undefined,
    planFilterId,
  };
}

function mealMatchesTab(meal: PreviewMeal, tabId: string): boolean {
  if (tabId === "all") return true;
  return meal.planFilterId === tabId;
}

function macroLine(meal: PreviewMeal): string | null {
  const parts: string[] = [];
  if (meal.protein != null) parts.push(`${Math.round(meal.protein)}g P`);
  if (meal.carbs != null) parts.push(`${Math.round(meal.carbs)}g C`);
  if (meal.fat != null) parts.push(`${Math.round(meal.fat)}g F`);
  return parts.length ? parts.join(" | ") : null;
}

export const MenuPreview = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [meals, setMeals] = useState<PreviewMeal[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <section
      id="menu"
      className="relative overflow-hidden bg-foreground py-20 text-background sm:py-24 lg:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-background/50">
              Weekly rotation
            </p>
            <h2 className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
              Discover our daily-changing menu
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-background/65">
              80+ new meals options every week, you&apos;ll never get bored.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {chips.map((label) => (
              <span
                key={label}
                className="rounded-lg border border-background/20 px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-wider text-background/85"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 overflow-x-auto pb-1 hide-scrollbar">
          <div
            role="tablist"
            aria-label="Menu categories"
            className="flex w-max gap-1 rounded-xl border border-background/15 bg-background/[0.06] p-1"
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
                  className={`flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold transition sm:px-5 sm:text-[0.9375rem] ${
                    selected
                      ? "bg-background text-foreground shadow-sm"
                      : "text-background/55 hover:text-background"
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

        {loading ? (
          <div className="mt-10 flex snap-x gap-5 overflow-x-auto pb-4 hide-scrollbar lg:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-[min(100%,280px)] shrink-0 snap-start sm:w-[300px] lg:w-[min(24vw,320px)]"
              >
                <div className="overflow-hidden rounded-2xl border border-background/15 bg-background/[0.06] p-2">
                  <div className="aspect-[5/6] animate-pulse rounded-xl bg-background/10" />
                  <div className="px-2 pb-3 pt-4">
                    <div className="h-5 w-3/4 animate-pulse rounded bg-background/10" />
                    <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-background/10" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : visibleMeals.length === 0 ? (
          <p className="mt-10 text-center text-base text-background/65">
            {meals.length === 0
              ? "No recipes in the menu yet."
              : "No dishes match this filter."}
          </p>
        ) : (
          <div className="mt-10 flex snap-x gap-5 overflow-x-auto pb-4 hide-scrollbar lg:gap-6">
            {visibleMeals.map((meal) => {
              const macros = macroLine(meal);
              return (
                <article
                  key={meal.id}
                  className="w-[min(100%,280px)] shrink-0 snap-start sm:w-[300px] lg:w-[min(24vw,320px)]"
                >
                  <div className="overflow-hidden rounded-2xl border border-border-subtle bg-surface p-2 shadow-lg shadow-black/20">
                    <div className="relative aspect-[5/6] overflow-hidden rounded-xl bg-bg-light">
                      <Image
                        src={meal.image}
                        alt={meal.title}
                        fill
                        className="object-cover transition duration-500 hover:scale-[1.03]"
                        sizes="320px"
                      />
                    </div>
                    <div className="px-2 pb-3 pt-4">
                      <h3 className="font-heading truncate text-lg font-semibold leading-snug text-foreground">
                        {meal.title}
                      </h3>
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                        {meal.calories ? (
                          <span className="rounded-md bg-bg-light px-2.5 py-1 font-medium text-foreground">
                            {meal.calories}
                          </span>
                        ) : null}
                        {macros ? (
                          <span className="text-secondary-text">{macros}</span>
                        ) : meal.customText ? (
                          <span className="text-secondary-text">
                            {meal.customText}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="mt-12 flex justify-center lg:justify-start">
          <Button
            type="button"
            variant="onDark"
            size="lg"
            onClick={() => router.push("https://qr.emenu.ae/nutrichef/#/en/home")}
          >
            See full menu
          </Button>
        </div>
      </div>
    </section>
  );
};
