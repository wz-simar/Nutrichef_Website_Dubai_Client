"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { api } from "@/lib/api";
import {
  type ApiRecipe,
  type ApiTemplate,
  displayMealDescription,
  displayMealImage,
  displayMealTitle,
  formatSlotLabel,
  iconForTemplate,
  mealNumericField,
  mergedMealTags,
  normalizeDaysMeals,
  resolveRecipeId,
  resolveTemplateImage,
  sortMealsBySlot,
  sumInlineMealMacros,
} from "@/lib/mealPlanTemplateDisplay";

type PreviewStatus = "idle" | "loading" | "ready" | "not_found" | "error";

interface PlanPreviewModalProps {
  planId: string | null;
  planTitle?: string;
  planEmoji?: string;
  open: boolean;
  onClose: () => void;
  onSelectPlan?: (planId: string) => void;
}

function useIsClient() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}

function MealPreviewCard({
  meal,
  recipe,
}: {
  meal: Record<string, unknown>;
  recipe: ApiRecipe | undefined;
}) {
  const title = displayMealTitle(meal, recipe);
  const imageUrl = displayMealImage(meal, recipe);
  const slotLabel = formatSlotLabel(meal.slot);
  const desc = displayMealDescription(meal, recipe);
  const tags = mergedMealTags(meal, recipe).slice(0, 3);
  const cal = mealNumericField(meal, "calories");
  const protein = mealNumericField(meal, "protein");
  const carbs = mealNumericField(meal, "carbs");
  const fat = mealNumericField(meal, "fat");

  const macroBits: string[] = [];
  if (cal != null) macroBits.push(`${Math.round(cal)} kcal`);
  if (protein != null) macroBits.push(`${Math.round(protein)}g P`);
  if (carbs != null) macroBits.push(`${Math.round(carbs)}g C`);
  if (fat != null) macroBits.push(`${Math.round(fat)}g F`);

  return (
    <article className="group overflow-hidden rounded-[20px] border border-border-subtle bg-surface shadow-[0_2px_12px_rgba(18,41,28,0.04)] transition hover:border-primary/25 hover:shadow-[0_8px_24px_rgba(28,107,69,0.1)]">
      <div className="relative aspect-[16/10] w-full bg-bg-light">
        {slotLabel ? (
          <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-surface/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary shadow-sm backdrop-blur-sm">
            {slotLabel}
          </span>
        ) : null}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 50vw, 220px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-3xl text-secondary-text/40" aria-hidden>
            🍽️
          </div>
        )}
      </div>
      <div className="p-3.5">
        <h4 className="line-clamp-2 font-heading text-[14px] font-semibold leading-snug text-foreground">
          {title}
        </h4>
        {macroBits.length > 0 ? (
          <p className="mt-1.5 text-[11px] font-semibold leading-relaxed text-secondary-text">
            {macroBits.join(" · ")}
          </p>
        ) : null}
        {desc ? (
          <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-secondary-text">{desc}</p>
        ) : null}
        {tags.length > 0 ? (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function PlanPreviewModal({
  planId,
  planTitle,
  planEmoji,
  open,
  onClose,
  onSelectPlan,
}: PlanPreviewModalProps) {
  const mounted = useIsClient();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<PreviewStatus>("idle");
  const [template, setTemplate] = useState<ApiTemplate | null>(null);
  const [recipes, setRecipes] = useState<ApiRecipe[]>([]);
  const [canScrollMore, setCanScrollMore] = useState(false);

  const recipeById = useMemo(() => {
    const m = new Map<string, ApiRecipe>();
    for (const r of recipes) m.set(r._id, r);
    return m;
  }, [recipes]);

  const load = useCallback(async (id: string) => {
    setStatus("loading");
    setTemplate(null);
    setRecipes([]);
    try {
      const res = await api.get<{ recipes?: ApiRecipe[]; templates?: ApiTemplate[] }>("/menu/list", {
        noAuth: true,
      });
      const list = res.data?.templates ?? [];
      const t = list.find((x) => x._id === id) ?? null;
      if (!t) {
        setStatus("not_found");
        return;
      }
      setTemplate(t);
      setRecipes(res.data?.recipes ?? []);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    if (!open || !planId) {
      setStatus("idle");
      return;
    }
    void load(planId);
  }, [open, planId, load]);

  useEffect(() => {
    if (!mounted || !open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mounted, open, onClose]);

  const updateScrollHint = useCallback(() => {
    const el = scrollRef.current;
    if (!el) {
      setCanScrollMore(false);
      return;
    }
    const remaining = el.scrollHeight - el.scrollTop - el.clientHeight;
    setCanScrollMore(remaining > 24);
  }, []);

  useEffect(() => {
    if (status !== "ready") return;
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = 0;
    const frame = requestAnimationFrame(updateScrollHint);
    el.addEventListener("scroll", updateScrollHint, { passive: true });
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateScrollHint) : null;
    ro?.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", updateScrollHint);
      ro?.disconnect();
    };
  }, [status, template, updateScrollHint]);

  if (!mounted || !open || !planId) return null;

  const cover = template ? resolveTemplateImage(template) : null;
  const icon = template ? iconForTemplate(template) : planEmoji || "🍽️";
  const title = template?.title || planTitle || "Meal plan";
  const goalLine = template
    ? [template.goalType, template.dietType].filter(Boolean).join(" · ")
    : null;
  const grams = template ? sumInlineMealMacros(template.structure ?? {}) : null;
  const nutrition = template?.structure?.nutrition as
    | { calories?: number; protein?: number; carbs?: number; fat?: number }
    | undefined;
  const calories =
    nutrition?.calories && nutrition.calories > 0
      ? Math.round(nutrition.calories)
      : grams
        ? Math.round(grams.p * 4 + grams.c * 4 + grams.f * 9)
        : null;

  const days = template
    ? normalizeDaysMeals(template.structure ?? {}).map((d) => ({
        label: d.label,
        meals: sortMealsBySlot(d.meals),
      }))
    : [];
  const totalMeals = days.reduce((n, d) => n + d.meals.length, 0);

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center p-0 sm:items-center sm:p-5 md:p-8"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close plan preview"
        className="absolute inset-0 bg-foreground/45 backdrop-blur-[4px] transition-opacity"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="plan-preview-title"
        className="relative z-10 flex max-h-[94vh] w-full max-w-[720px] flex-col overflow-hidden rounded-t-[28px] border border-border-subtle bg-background shadow-[0_28px_90px_rgba(18,41,28,0.28)] sm:rounded-[28px]"
      >
        {/* Hero */}
        <div className="relative h-[150px] shrink-0 overflow-hidden bg-bg-light sm:h-[180px]">
          {status === "ready" && cover ? (
            <Image
              src={cover}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 720px) 100vw, 720px"
              priority
            />
          ) : (
            <div
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(28,107,69,0.2),transparent_55%),linear-gradient(160deg,#f0ede3_0%,#e8f0ea_100%)]"
              aria-hidden
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent" />

          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-surface/95 text-foreground shadow-sm backdrop-blur-sm transition hover:bg-bg-light"
            aria-label="Close"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-5 flex items-end gap-3.5 sm:left-7">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border-subtle bg-surface text-[28px] shadow-md">
              {icon}
            </div>
            <div className="pb-0.5">
              <h2
                id="plan-preview-title"
                className="font-heading text-[22px] font-semibold leading-tight tracking-tight text-foreground drop-shadow-sm sm:text-[26px]"
              >
                {title}
              </h2>
              {goalLine ? (
                <p className="mt-0.5 text-[12px] font-semibold text-secondary-text">{goalLine}</p>
              ) : null}
            </div>
          </div>
        </div>

        {/* Scrollable body — all meals */}
        <div className="relative min-h-0 flex-1">
          <div
            ref={scrollRef}
            className="h-full max-h-[min(58vh,560px)] overflow-y-auto overscroll-contain px-5 pb-8 pt-4 sm:max-h-[min(60vh,620px)] sm:px-7"
          >
            {status === "loading" ? (
              <div className="flex flex-col items-center gap-3 py-16">
                <div className="h-9 w-9 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <p className="text-[13px] font-medium text-secondary-text">Loading full menu…</p>
              </div>
            ) : null}

            {status === "error" ? (
              <div className="mt-4 rounded-[18px] border border-dashed border-border-subtle bg-bg-light px-5 py-8 text-center">
                <p className="text-[14px] font-medium text-secondary-text">
                  We couldn&apos;t load this plan right now. Open the full page for details.
                </p>
              </div>
            ) : null}

            {status === "not_found" ? (
              <div className="mt-4 rounded-[18px] border border-dashed border-border-subtle bg-bg-light px-5 py-8 text-center">
                <p className="text-[14px] font-medium text-secondary-text">
                  Detailed meals for this plan aren&apos;t available yet. You can still select it and continue.
                </p>
              </div>
            ) : null}

            {status === "ready" && template ? (
              <>
                <div className="flex flex-wrap gap-2">
                  {calories != null && calories > 0 ? (
                    <span className="rounded-full bg-primary/10 px-3 py-1.5 text-[11px] font-bold text-primary">
                      ~{calories.toLocaleString()} kcal/day
                    </span>
                  ) : null}
                  {grams ? (
                    <>
                      <span className="rounded-full bg-bg-light px-3 py-1.5 text-[11px] font-bold text-secondary-text">
                        {Math.round(grams.p)}g protein
                      </span>
                      <span className="rounded-full bg-bg-light px-3 py-1.5 text-[11px] font-bold text-secondary-text">
                        {Math.round(grams.c)}g carbs
                      </span>
                      <span className="rounded-full bg-bg-light px-3 py-1.5 text-[11px] font-bold text-secondary-text">
                        {Math.round(grams.f)}g fat
                      </span>
                    </>
                  ) : null}
                  {days.length > 0 ? (
                    <span className="rounded-full bg-bg-light px-3 py-1.5 text-[11px] font-bold text-secondary-text">
                      {days.length} day{days.length === 1 ? "" : "s"} · {totalMeals} meals
                    </span>
                  ) : null}
                </div>

                <p className="mt-3 text-[13px] font-medium leading-relaxed text-secondary-text">
                  Full menu for this programme — scroll to browse every dish. Free morning delivery
                  and nutritionist sign-off included.
                </p>

                {days.length > 0 && totalMeals > 0 ? (
                  <div className="mt-6 space-y-8">
                    {days.map((day) => (
                      <section key={day.label}>
                        <div className="sticky top-0 z-[1] -mx-1 mb-3.5 flex items-center justify-between gap-3 border-b border-border-subtle/80 bg-background/95 px-1 py-2.5 backdrop-blur-sm">
                          <h3 className="font-heading text-[16px] font-semibold tracking-tight text-foreground">
                            {day.label}
                          </h3>
                          <span className="rounded-full bg-bg-light px-2.5 py-1 text-[11px] font-bold text-secondary-text">
                            {day.meals.length} meal{day.meals.length === 1 ? "" : "s"}
                          </span>
                        </div>
                        {day.meals.length === 0 ? (
                          <p className="rounded-[16px] border border-dashed border-border-subtle bg-bg-light px-4 py-5 text-center text-[13px] font-medium text-secondary-text">
                            No meals listed for this day yet.
                          </p>
                        ) : (
                          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            {day.meals.map((meal, i) => {
                              const rid = resolveRecipeId(meal) ?? "";
                              const recipe = rid ? recipeById.get(rid) : undefined;
                              return (
                                <MealPreviewCard
                                  key={`${day.label}-${rid || i}-${i}`}
                                  meal={meal}
                                  recipe={recipe}
                                />
                              );
                            })}
                          </div>
                        )}
                      </section>
                    ))}
                  </div>
                ) : (
                  <div className="mt-6 rounded-[18px] border border-dashed border-border-subtle bg-bg-light px-5 py-6 text-center">
                    <p className="text-[13px] font-medium text-secondary-text">
                      Meal lineup is being finalized — open the full page for the latest menu.
                    </p>
                  </div>
                )}
              </>
            ) : null}
          </div>

          {/* Bottom scroll fade hint */}
          <div
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-background via-background/80 to-transparent transition-opacity duration-300 ${
              canScrollMore ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden
          />
          {canScrollMore ? (
            <p className="pointer-events-none absolute inset-x-0 bottom-2 text-center text-[11px] font-semibold tracking-wide text-secondary-text">
              Scroll for more meals
            </p>
          ) : null}
        </div>

        {/* Footer actions */}
        <div className="shrink-0 border-t border-border-subtle bg-surface/95 px-5 py-4 backdrop-blur-sm sm:px-7">
          <div className="flex flex-col gap-2.5 sm:flex-row-reverse sm:items-center">
            <Link
              href={`/meal-plans/${planId}`}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-[14px] font-semibold text-white shadow-sm transition hover:bg-primary-hover"
            >
              Open on big screen
              <span aria-hidden className="text-[13px]">
                →
              </span>
            </Link>
            {onSelectPlan ? (
              <button
                type="button"
                onClick={() => {
                  onSelectPlan(planId);
                  onClose();
                }}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-border-subtle bg-background px-6 py-3.5 text-[14px] font-semibold text-foreground transition hover:bg-bg-light"
              >
                Select this plan
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-border-subtle bg-background px-6 py-3.5 text-[14px] font-semibold text-foreground transition hover:bg-bg-light"
              >
                Keep browsing
              </button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
