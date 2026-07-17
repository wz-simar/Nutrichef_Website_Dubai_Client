"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { calculator } from "@/content/best-healthy-meal-subscription-dubai";

function formatAed(value: number): string {
  return `AED ${Math.round(value).toLocaleString("en-AE")}`;
}

export function CostCalculatorSection() {
  const [mealsPerWeek, setMealsPerWeek] = useState(calculator.defaultMeals);

  const stats = useMemo(() => {
    const weeksPerMonth = 4.33;
    const mealPrice = calculator.baseMealPriceAed;
    const monthlyMeals = mealsPerWeek * weeksPerMonth;
    const monthlyCost = monthlyMeals * mealPrice;
    const costPerMeal = mealPrice;
    const costPer100Cal =
      (mealPrice / calculator.avgCaloriesPerMeal) * 100;
    const costPerGramProtein =
      mealPrice / calculator.avgProteinPerMeal;

    return {
      monthlyCost,
      costPerMeal,
      costPer100Cal,
      costPerGramProtein,
    };
  }, [mealsPerWeek]);

  return (
    <section
      id="calculator"
      className="border-b border-border-subtle bg-bg-light py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-secondary-text">
            True cost
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            {calculator.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-secondary-text sm:text-lg">
            {calculator.intro}
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-border-subtle bg-surface p-6 shadow-sm sm:p-10">
          <label
            htmlFor="meals-per-week"
            className="font-heading block text-lg font-semibold text-foreground"
          >
            Meals per week:{" "}
            <span className="text-primary">{mealsPerWeek}</span>
          </label>
          <input
            id="meals-per-week"
            type="range"
            min={calculator.minMeals}
            max={calculator.maxMeals}
            step={1}
            value={mealsPerWeek}
            onChange={(e) => setMealsPerWeek(Number(e.target.value))}
            className="mt-6 h-2 w-full cursor-pointer appearance-none rounded-full bg-bg-light accent-primary"
            aria-valuemin={calculator.minMeals}
            aria-valuemax={calculator.maxMeals}
            aria-valuenow={mealsPerWeek}
          />
          <div className="mt-2 flex justify-between text-xs text-secondary-text">
            <span>{calculator.minMeals} meals</span>
            <span>{calculator.maxMeals} meals</span>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "Estimated monthly cost",
                value: formatAed(stats.monthlyCost),
              },
              {
                label: "Cost per meal",
                value: formatAed(stats.costPerMeal),
              },
              {
                label: "Cost per 100 calories",
                value: formatAed(stats.costPer100Cal),
              },
              {
                label: "Cost per gram of protein",
                value: formatAed(stats.costPerGramProtein),
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border-subtle bg-bg-light p-5"
              >
                <p className="text-sm text-secondary-text">{stat.label}</p>
                <p className="font-heading mt-2 text-2xl font-semibold text-foreground">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href={calculator.ctaHref}
              className="inline-flex h-14 items-center justify-center rounded-xl bg-primary px-8 text-base font-semibold text-white shadow-sm transition hover:bg-primary-hover"
            >
              {calculator.ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
