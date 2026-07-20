"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useRequireAuth } from "@/lib/useRequireAuth";
import { useAuth } from "@/contexts/AuthContext";
import { useTenant } from "@/contexts/TenantContext";
import { formatMinorUnits, formatMajorUnits } from "@/lib/formatCurrency";
import { PlanIconBadge } from "@/components/PlanIconBadge";
import { PlanPreviewModal } from "@/components/PlanPreviewModal";
import {
  collectRawDurationKeysFromPricing,
  daysForDurationKey,
  isPlanDurationDayKey,
  planDurationListTitle,
  planDurationShortTitle,
  supportedDurationKeysPresent,
} from "@/lib/mealPlanDurationTiers";

const GOAL_EMOJIS: Record<string, string> = {
  "fat loss": "🔥",
  fat_loss: "🔥",
  lose_weight: "🔥",
  "muscle gain": "💪",
  muscle_gain: "💪",
  gain_muscle: "💪",
  "balanced diet": "🥗",
  balanced: "🥗",
  maintain: "🥗",
  diabetic: "❤️",
  "diabetic friendly": "❤️",
  detox: "🌿",
  "body detox": "🌿",
  gut: "🦠",
  "gut health": "🦠",
  "age reverse": "⏳",
  age_reverse: "⏳",
  custom: "👨‍🍳",
  "customized meal plan": "👨‍🍳",
  "custom macros": "👨‍🍳",
  pcos: "🌸",
  pcod: "🌸",
  "pcod / pcos care": "🌸",
  "pcod pcos": "🌸",
  thyroid: "🦋",
  "thyroid care": "🦋",
  pregnancy: "🤰",
  "pregnancy nutrition": "🤰",
};

interface BackendPlan {
  _id: string;
  title: string;
  goalType?: string;
  dietType?: string;
  structure: Record<string, unknown> & {
    nutrition?: { calories?: number; protein?: number; carbs?: number; fat?: number };
  };
  pricing?: {
    breakfast?: Record<string, number>;
    lunch?: Record<string, number>;
    dinner?: Record<string, number>;
  };
}

interface PlanType {
  id: string;
  title: string;
  desc: string;
  emoji: string;
  style: string;
  /** Daily calorie target of the plan, when known. */
  kcal?: number | null;
}

function planCalories(p: BackendPlan): number | null {
  const n = p.structure?.nutrition;
  if (!n) return null;
  if (n.calories && n.calories > 0) return Math.round(n.calories);
  const kcal = (n.protein ?? 0) * 4 + (n.carbs ?? 0) * 4 + (n.fat ?? 0) * 9;
  return kcal > 0 ? Math.round(kcal) : null;
}

interface Cycle {
  id: string;
  title: string;
  subtext: string;
  priceDisplay: string;
  save: string | null;
  amount: number;
}

const FALLBACK_PLAN_TYPES: PlanType[] = [
  { id: "fat-loss", title: "Fat Loss", desc: "Calorie-controlled meals that melt fat, not muscle", emoji: "🔥", style: "default" },
  { id: "muscle-gain", title: "Muscle Gain", desc: "Protein-forward plates built for strength", emoji: "💪", style: "default" },
  { id: "balanced", title: "Balanced Diet", desc: "Everyday nutrition, perfectly proportioned", emoji: "🥗", style: "default" },
  { id: "diabetic", title: "Diabetic Friendly", desc: "Low-GI meals that keep blood sugar steady", emoji: "❤️", style: "default" },
  { id: "detox", title: "Body Detox", desc: "Clean, plant-rich meals that reset your system", emoji: "🌿", style: "default" },
  { id: "gut", title: "Gut Health", desc: "Fibre and ferment-rich food for a happy gut", emoji: "🦠", style: "default" },
  { id: "age", title: "Age Reverse", desc: "Antioxidant-dense menus for longevity", emoji: "⏳", style: "default" },
  { id: "custom", title: "Customized Meal Plan", desc: "Built with our chef around your exact needs", emoji: "👨‍🍳", style: "custom" },
  { id: "pcod-pcos", title: "PCOD / PCOS Care", desc: "Hormone-balancing meals for PCOD & PCOS", emoji: "🌸", style: "default" },
  { id: "thyroid", title: "Thyroid Care", desc: "Nutrient-targeted meals that support thyroid function", emoji: "🦋", style: "default" },
  { id: "pregnancy", title: "Pregnancy Nutrition", desc: "Wholesome, doctor-informed meals for every trimester", emoji: "🤰", style: "default" },
];

/** New pricing model: price = per-meal rate × meals/day × days. */
const MEALS_PER_DAY_OPTIONS = [2, 3, 4, 5];

const FALLBACK_CYCLES: Cycle[] = [
  { id: "20", title: "20 days", subtext: "Programme length", priceDisplay: "—", save: null, amount: 0 },
  { id: "24", title: "24 days", subtext: "Programme length", priceDisplay: "—", save: null, amount: 0 },
  { id: "30", title: "30 days", subtext: "Programme length", priceDisplay: "—", save: null, amount: 0 },
  { id: "90", title: "90 days", subtext: "Programme length", priceDisplay: "—", save: null, amount: 0 },
];

const PLANS_SUB_BANNER_DISMISSED_KEY = "nutrichef_plans_sub_banner_dismissed";

interface SubscriptionTemplateRef {
  _id: string;
  title?: string;
  goalType?: string;
  dietType?: string;
}

interface ActiveSubscriptionPayload {
  _id?: string;
  status?: string;
  templateId?: string | SubscriptionTemplateRef;
  amount?: number;
  currency?: string;
  type?: string;
}

function resolveSubscribedTemplateId(data: ActiveSubscriptionPayload | null): string | null {
  if (!data?.templateId) return null;
  const t = data.templateId;
  if (typeof t === "string" && t.trim()) return t.trim();
  if (typeof t === "object" && t != null && typeof t._id === "string" && t._id.trim()) return t._id.trim();
  return null;
}

function resolveSubscriptionPlanTitle(data: ActiveSubscriptionPayload | null): string | null {
  const t = data?.templateId;
  if (t && typeof t === "object" && typeof t.title === "string" && t.title.trim()) {
    return t.title.trim();
  }
  return null;
}

function isActiveSubscriptionStatus(status: string | undefined): boolean {
  return typeof status === "string" && status.trim().toLowerCase() === "active";
}

function formatApiLabel(value: string | undefined): string {
  if (!value?.trim()) return "";
  return value
    .replace(/[-_]+/g, " ")
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function buildPlanDescription(goalType?: string, dietType?: string): string {
  const goal = formatApiLabel(goalType);
  const diet = formatApiLabel(dietType);
  if (goal && diet) return `${goal} • ${diet}`;
  return goal || diet || "Customized meal plan";
}

/** Per-slot prices are stored as `perMealRate × days`; total = slot price × meals/day. */
function slotPriceForDuration(
  pricing: NonNullable<BackendPlan["pricing"]>,
  dur: string
): number | null {
  for (const slot of ["lunch", "breakfast", "dinner"] as const) {
    const v = pricing[slot]?.[dur];
    if (v != null && v > 0) return v;
  }
  return null;
}

function buildCycles(
  pricing: BackendPlan["pricing"],
  mealsPerDay: number,
  currency: string
): { cycles: Cycle[]; unsupportedLegacyOnly: boolean } {
  if (!pricing) {
    return { cycles: FALLBACK_CYCLES, unsupportedLegacyOnly: false };
  }

  const raw = collectRawDurationKeysFromPricing(pricing, ["breakfast", "lunch", "dinner"]);
  const sorted = supportedDurationKeysPresent(raw);

  if (sorted.length === 0) {
    if (raw.size > 0) {
      return { cycles: [], unsupportedLegacyOnly: true };
    }
    return { cycles: FALLBACK_CYCLES, unsupportedLegacyOnly: false };
  }

  const cycles: Cycle[] = [];
  for (const dur of sorted) {
    const slotPrice = slotPriceForDuration(pricing, dur);
    const days = daysForDurationKey(dur);
    if (slotPrice == null || days == null) continue;
    const total = slotPrice * mealsPerDay;
    const perMeal = total / (mealsPerDay * days);
    cycles.push({
      id: dur,
      title: planDurationListTitle(dur),
      subtext: `${formatMajorUnits(total, currency)} for ${days} days`,
      priceDisplay: `${formatMajorUnits(perMeal, currency, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}/meal`,
      save: null,
      amount: Math.round(total * 100),
    });
  }

  if (cycles.length === 0) {
    return { cycles: [], unsupportedLegacyOnly: true };
  }

  return { cycles, unsupportedLegacyOnly: false };
}

export default function PlansPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
  const { isAuthenticated: loggedIn } = useAuth();
  const { currency } = useTenant();

  const [backendPlans, setBackendPlans] = useState<BackendPlan[]>([]);
  const [planTypes, setPlanTypes] = useState<PlanType[]>(FALLBACK_PLAN_TYPES);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [mealsPerDay, setMealsPerDay] = useState<number>(3);
  const [selectedCycle, setSelectedCycle] = useState("");
  const [cycles, setCycles] = useState<Cycle[]>(FALLBACK_CYCLES);
  const [unsupportedDurationTiers, setUnsupportedDurationTiers] = useState(false);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [activeSubscription, setActiveSubscription] = useState<ActiveSubscriptionPayload | null>(null);
  const [subscriptionFetched, setSubscriptionFetched] = useState(false);
  const [subscriptionBannerDismissed, setSubscriptionBannerDismissed] = useState(false);
  const [previewPlanId, setPreviewPlanId] = useState<string | null>(null);

  const fetchPlans = useCallback(async () => {
    try {
      const res = await api.get<BackendPlan[]>("/menu/plans");
      const plans = Array.isArray(res.data) ? res.data : [];
      if (plans.length > 0) {
        setBackendPlans(plans);
        const mapped: PlanType[] = plans.map((p) => {
          const key = (p.dietType || p.goalType || p.title || "").toLowerCase();
          return {
            id: p._id,
            title: p.title,
            desc: buildPlanDescription(p.goalType, p.dietType),
            emoji: GOAL_EMOJIS[key] || "🍽️",
            style: key.includes("custom") ? "custom" : "default",
            kcal: planCalories(p),
          };
        });
        setPlanTypes(mapped);
        setSelectedPlan(mapped[0].id);
      } else {
        setSelectedPlan(FALLBACK_PLAN_TYPES[0].id);
      }
    } catch {
      setSelectedPlan(FALLBACK_PLAN_TYPES[0].id);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPlans();
    }
  }, [isAuthenticated, fetchPlans]);

  useEffect(() => {
    if (typeof sessionStorage === "undefined") return;
    if (sessionStorage.getItem(PLANS_SUB_BANNER_DISMISSED_KEY) === "1") {
      setSubscriptionBannerDismissed(true);
    }
  }, []);

  const fetchSubscription = useCallback(async () => {
    try {
      const res = await api.get<ActiveSubscriptionPayload>("/payment/subscription");
      const data = res.data;
      if (data && isActiveSubscriptionStatus(data.status)) {
        setActiveSubscription(data);
      } else {
        setActiveSubscription(null);
      }
    } catch {
      setActiveSubscription(null);
    } finally {
      setSubscriptionFetched(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      void fetchSubscription();
    }
  }, [isAuthenticated, fetchSubscription]);

  const dismissSubscriptionBanner = () => {
    setSubscriptionBannerDismissed(true);
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem(PLANS_SUB_BANNER_DISMISSED_KEY, "1");
    }
  };

  useEffect(() => {
    const plan = backendPlans.find((p) => p._id === selectedPlan);
    if (!plan?.pricing) {
      setCycles(FALLBACK_CYCLES);
      setUnsupportedDurationTiers(false);
      if (!FALLBACK_CYCLES.find((cy) => cy.id === selectedCycle)) {
        setSelectedCycle(FALLBACK_CYCLES[0]?.id ?? "");
      }
      return;
    }
    const { cycles: c, unsupportedLegacyOnly } = buildCycles(plan.pricing, mealsPerDay, currency);
    setCycles(c);
    setUnsupportedDurationTiers(unsupportedLegacyOnly);
    if (c.length > 0 && !c.find((cy) => cy.id === selectedCycle)) {
      setSelectedCycle(c[0].id);
    }
    if (c.length === 0) {
      setSelectedCycle("");
    }
  }, [selectedPlan, mealsPerDay, backendPlans, selectedCycle, currency]);

  const getSelectedPlanTitle = () =>
    planTypes.find((p) => p.id === selectedPlan)?.title || "";

  const getCurrentCycle = () => cycles.find((c) => c.id === selectedCycle);

  const handleCheckout = async () => {
    if (!loggedIn) {
      router.push("/auth/login?redirect=/plans");
      return;
    }

    const cycle = getCurrentCycle();
    if (!cycle || cycle.amount <= 0) return;

    setCheckoutLoading(true);
    try {
      const templateId = backendPlans.find((p) => p._id === selectedPlan)?._id || selectedPlan;
      const durationLabel = isPlanDurationDayKey(cycle.id)
        ? planDurationShortTitle(cycle.id)
        : cycle.title;
      const res = await api.post<{ url: string; orderId: string }>(
        "/checkout/session",
        {
          templateId,
          amount: cycle.amount,
          currency: currency.toLowerCase(),
          productName: `${getSelectedPlanTitle()} — ${durationLabel} · ${mealsPerDay} meals/day`,
          successUrl: `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/payment/cancel`,
          /** Ask Stripe to always attach a Customer so /payment/success can resolve stripeCustomerId. */
          customer_creation: "always",
        },
        { noAuth: true }
      );

      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Checkout failed";
      alert(message);
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const subscribedTemplateId = activeSubscription ? resolveSubscribedTemplateId(activeSubscription) : null;
  const subscribedPlanTitle = activeSubscription ? resolveSubscriptionPlanTitle(activeSubscription) : null;
  const showSubscriptionBanner =
    subscriptionFetched &&
    activeSubscription &&
    !subscriptionBannerDismissed &&
    isActiveSubscriptionStatus(activeSubscription.status);

  return (
    <div className="min-h-screen w-full bg-background pb-24 pt-28 sm:pt-32">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {showSubscriptionBanner ? (
          <div
            className="relative mb-8 flex flex-col gap-4 rounded-2xl border-2 border-primary/30 bg-primary/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5"
            role="status"
            aria-live="polite"
          >
            <button
              type="button"
              onClick={dismissSubscriptionBanner}
              className="absolute right-3 top-3 rounded-lg p-1.5 text-secondary-text transition hover:bg-background/80 hover:text-foreground"
              aria-label="Dismiss subscription notice"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
            <div className="pr-10 sm:pr-0">
              <p className="font-heading text-base font-semibold text-foreground sm:text-lg">
                {subscribedPlanTitle
                  ? `You're subscribed to ${subscribedPlanTitle}.`
                  : "You have an active meal plan subscription."}
              </p>
              {activeSubscription?.amount != null &&
              activeSubscription.amount > 0 &&
              typeof activeSubscription.currency === "string" &&
              activeSubscription.currency.trim() ? (
                <p className="mt-1.5 text-sm font-medium text-secondary-text">
                  Current plan billing:{" "}
                  {formatMinorUnits(activeSubscription.amount, activeSubscription.currency)}
                </p>
              ) : null}
            </div>
            <div className="flex shrink-0 flex-wrap gap-3 sm:pl-4">
              {subscribedTemplateId ? (
                <Link
                  href={`/meal-plans/${subscribedTemplateId}`}
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover"
                >
                  View your meal plan
                </Link>
              ) : (
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border border-border-subtle bg-background px-6 py-2.5 text-sm font-semibold text-foreground transition hover:bg-bg-light"
                >
                  Browse meal plans
                </Link>
              )}
            </div>
          </div>
        ) : null}

        {/* Header */}
        <div className="mb-14">
          <h1 className="font-heading text-[34px] font-semibold leading-[1.05] tracking-tight text-foreground md:text-[44px]">
            Built Around You.
            <br />
            Down to the Gram.
          </h1>
          <p className="mt-4 max-w-xl text-[15px] font-medium leading-relaxed text-secondary-text">
            Choose your programme, your meals, and your rhythm — our chefs and
            nutritionist handle everything after checkout.
          </p>
        </div>

        {/* Plan preference heading sits above the two-column row so the
            pricing card aligns with the first row of plan cards. */}
        <h2 className="font-heading mb-6 text-[26px] font-semibold tracking-tight text-foreground">
          What kind of meals do you prefer?
        </h2>

        {/* Two Column Layout: left scrolls with the page, right stays sticky */}
        <div className="relative flex flex-col gap-[60px] lg:flex-row lg:items-start lg:gap-[80px]">
          {/* Left Column */}
          <div className="flex min-w-0 flex-1 flex-col gap-14">
            {/* Section 1: Plan Preferences */}
            <section>
              {loading ? (
                <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="min-h-[170px] animate-pulse rounded-[24px] border-2 border-border-subtle bg-bg-light p-[22px]"
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
                  {planTypes.map((plan) => {
                    const isActive = selectedPlan === plan.id;
                    return (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`relative flex min-h-[170px] cursor-pointer flex-col justify-between rounded-[24px] border-2 p-[22px] transition-all ${
                          isActive
                            ? "border-primary bg-primary/10 shadow-sm"
                            : "border-border-subtle bg-surface shadow-sm hover:border-foreground/15"
                        }`}
                      >
                        <div className="mb-6 flex items-start justify-between">
                          <div className="pr-4">
                            <h3 className="mb-1.5 text-[17px] font-semibold text-foreground">
                              {plan.title}
                            </h3>
                            <p className="pr-1 text-[13px] font-medium leading-[1.4] text-secondary-text">
                              {plan.desc}
                            </p>
                            {plan.kcal ? (
                              <span
                                className={`mt-2 inline-block rounded-full px-2.5 py-1 text-[11px] font-bold ${
                                  isActive
                                    ? "bg-primary/15 text-primary"
                                    : "bg-bg-light text-secondary-text"
                                }`}
                              >
                                ~{plan.kcal.toLocaleString()} kcal/day
                              </span>
                            ) : null}
                          </div>
                          <div className="text-[42px] leading-none">{plan.emoji}</div>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreviewPlanId(plan.id);
                            }}
                            className="flex items-center gap-1 text-[13px] font-semibold text-primary underline-offset-2 hover:underline"
                          >
                            Learn More{" "}
                            <span className="text-[12px] font-medium">&rarr;</span>
                          </button>
                          {isActive ? (
                            <div className="flex items-center gap-1.5 rounded-full bg-primary-hover px-3 py-[7px] text-white shadow-sm">
                              <svg
                                className="ml-0.5 h-3 w-3"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                              <span className="mr-1 text-[11.5px] font-[800] tracking-tight">
                                Selected
                              </span>
                            </div>
                          ) : plan.style === "custom" ? (
                            <div className="rounded-full bg-primary/10 px-[18px] py-[7px] text-primary">
                              <span className="text-[12px] font-semibold tracking-tight">
                                Build my plan
                              </span>
                            </div>
                          ) : (
                            <div className="rounded-full bg-primary/10 px-[18px] py-[7px] text-primary transition-colors hover:bg-primary/15">
                              <span className="text-[12px] font-[800] tracking-tight">
                                Select Plan
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Section 2: Meals per day (pricing = rate × meals × days) */}
            <section>
              <h2 className="font-heading mb-2 text-[26px] font-semibold tracking-tight text-foreground">
                How many meals per day?
              </h2>
              <p className="mb-6 text-[14px] font-medium text-secondary-text">
                Our chefs compose your day around your count — mains, sides, and
                snacks included.
              </p>
              <div className="grid grid-cols-2 gap-[18px] sm:grid-cols-4">
                {MEALS_PER_DAY_OPTIONS.map((count) => {
                  const isActive = mealsPerDay === count;
                  return (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setMealsPerDay(count)}
                      className={`flex cursor-pointer flex-col items-center justify-center rounded-[16px] border-2 px-5 py-6 transition-colors ${
                        isActive
                          ? "border-primary bg-primary/10"
                          : "border-border-subtle bg-surface shadow-sm hover:border-foreground/15"
                      }`}
                    >
                      <span className="font-heading text-[28px] font-semibold leading-none text-foreground">
                        {count}
                      </span>
                      <span className="mt-2 text-[13px] font-semibold text-secondary-text">
                        meals / day
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Section 4: Plan duration (API tiers: 7 / 14 / 28 days) */}
            <section>
              <h2 className="font-heading mb-[26px] text-[26px] font-semibold tracking-tight text-foreground">
                Plan duration
              </h2>
              {unsupportedDurationTiers ? (
                <p
                  className="mb-6 rounded-2xl border border-amber-200/80 bg-amber-50 px-4 py-3 text-[13px] font-medium leading-relaxed text-amber-950"
                  role="status"
                >
                  This plan&apos;s pricing is still on an older format we no longer support here. Please refresh
                  later or pick another plan. Once plans are re-saved in admin, the 20, 24, 30, and 90-day
                  programmes will appear.
                </p>
              ) : null}
              <div className="mb-[24px] flex flex-col gap-[18px]">
                {cycles.map((cycle) => {
                  const isActive = selectedCycle === cycle.id;
                  return (
                    <div
                      key={cycle.id}
                      onClick={() => setSelectedCycle(cycle.id)}
                      className={`flex cursor-pointer items-center justify-between rounded-[16px] border-2 px-6 py-5 transition-colors ${
                        isActive
                          ? "border-primary bg-primary/10"
                          : "border-border-subtle bg-surface shadow-sm hover:border-foreground/15"
                      }`}
                    >
                      <div className="flex flex-col">
                        <div className="mb-1.5 flex items-center gap-[12px]">
                          <span className="text-[15px] font-semibold text-foreground">
                            {cycle.title}
                          </span>
                          {cycle.save && (
                            <span className="rounded-full bg-primary px-[10px] py-[3px] text-[10px] font-semibold uppercase tracking-tight text-white">
                              Save {cycle.save}
                            </span>
                          )}
                        </div>
                        <span className="text-[12px] font-semibold tracking-tight text-secondary-text">
                          {cycle.subtext}
                        </span>
                      </div>
                      <div className="flex items-center gap-[14px]">
                        <span className="text-[13px] font-semibold text-foreground">
                          {cycle.priceDisplay}
                        </span>
                        {isActive ? (
                          <div className="flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-full border-[5px] border-surface bg-primary ring-1 ring-primary">
                            <div className="h-full w-full rounded-full bg-primary" />
                          </div>
                        ) : (
                          <div className="h-[22px] w-[22px] flex-shrink-0 rounded-full border-2 border-border-subtle bg-surface" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right Column — sticky so pricing stays visible while browsing plans */}
          <aside className="w-full shrink-0 self-start lg:sticky lg:top-32 lg:w-[360px]">
            <div className="rounded-[32px] border border-border-subtle bg-bg-light p-7 shadow-[0px_4px_24px_rgba(27,48,34,0.06)]">
              <div className="mb-8 flex items-start justify-between">
                <div className="flex-1 pr-[18px]">
                  <h3 className="font-heading mb-[14px] text-[20px] font-semibold tracking-tight text-foreground">
                    Your package, your way
                  </h3>
                  <p className="text-[13.5px] font-semibold leading-[1.6] text-secondary-text">
                    {getSelectedPlanTitle()}, {mealsPerDay} meals/day
                    {selectedCycle ? `, ${getCurrentCycle()?.title ?? ""}` : ""}
                  </p>
                </div>
                <PlanIconBadge size={64} />
              </div>

              {/* Promo Code */}
              <div className="mb-8 flex gap-[10px]">
                <div className="relative flex-1">
                  <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                    <svg
                      className="h-[18px] w-[18px] rotate-90 text-secondary-text"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="4" y1="9" x2="20" y2="9"></line>
                      <line x1="4" y1="15" x2="20" y2="15"></line>
                      <line x1="10" y1="3" x2="8" y2="21"></line>
                      <line x1="16" y1="3" x2="14" y2="21"></line>
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Add promotion code"
                    className="w-full rounded-[14px] border border-border-subtle bg-surface py-[15px] pl-[38px] pr-4 text-[13px] font-semibold text-foreground placeholder:text-secondary-text/70 transition-shadow focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button
                  type="button"
                  className="rounded-[14px] bg-bg-light px-6 py-[15px] text-[13px] font-semibold tracking-tight text-secondary-text transition-colors hover:bg-foreground/10"
                >
                  Apply
                </button>
              </div>

              {/* Rate note */}
              <div className="mb-10 flex items-center gap-3 rounded-[14px] border border-dashed border-border-subtle bg-surface p-4">
                <span className="text-[18px]" aria-hidden>
                  👨‍🍳
                </span>
                <span className="text-[12px] font-semibold leading-[1.5] text-secondary-text">
                  Every programme includes free morning delivery and
                  nutritionist sign-off.
                </span>
              </div>

              {/* Payment Summary */}
              <div className="mb-[28px] flex flex-col gap-[14px]">
                <h4 className="mb-1 text-[14px] font-semibold tracking-tight text-foreground">
                  Payment summary
                </h4>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold tracking-tight text-secondary-text">
                    Plan price
                  </span>
                  <span className="text-[13px] font-semibold text-foreground">
                    {getCurrentCycle()
                      ? formatMinorUnits(getCurrentCycle()!.amount, currency)
                      : "--"}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-border-subtle pb-[18px]">
                  <span className="text-[13px] font-semibold tracking-tight text-secondary-text">
                    Delivery fee
                  </span>
                  <span className="text-[13px] font-semibold text-foreground">
                    {formatMinorUnits(0, currency)}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="font-heading text-[16px] font-semibold tracking-tight text-foreground">
                    Total
                  </span>
                  <span className="font-heading text-[16px] font-semibold tracking-tight text-foreground">
                    {getCurrentCycle()
                      ? formatMinorUnits(getCurrentCycle()!.amount, currency)
                      : "--"}
                  </span>
                </div>
              </div>

              {/* Checkout Btn */}
              <button
                type="button"
                onClick={handleCheckout}
                disabled={checkoutLoading || !selectedCycle}
                className="w-full rounded-full bg-primary py-[16px] text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover disabled:bg-primary/60"
              >
                {checkoutLoading ? "Processing..." : "Continue"}
              </button>
            </div>
          </aside>
        </div>
      </div>

      <PlanPreviewModal
        open={previewPlanId != null}
        planId={previewPlanId}
        planTitle={planTypes.find((p) => p.id === previewPlanId)?.title}
        planEmoji={planTypes.find((p) => p.id === previewPlanId)?.emoji}
        onClose={() => setPreviewPlanId(null)}
        onSelectPlan={(id) => setSelectedPlan(id)}
      />
    </div>
  );
}
