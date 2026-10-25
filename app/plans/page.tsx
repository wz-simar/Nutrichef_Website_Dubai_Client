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
import { iconForTemplate } from "@/lib/mealPlanTemplateDisplay";
import { TRIAL_PLAN, resolveTrialTemplateId } from "@/lib/trialPlan";
import {
  collectRawDurationKeysFromPricing,
  daysForDurationKey,
  isPlanDurationDayKey,
  planDurationListTitle,
  supportedDurationKeysPresent,
} from "@/lib/mealPlanDurationTiers";
import {
  COOLER_BAG_FEE_AED,
  MEAL_SLOT_OPTIONS,
  OUTSIDE_DUBAI_FEE_AED,
  UAE_EMIRATES,
  WEEKDAYS,
  apiErrorMessage,
  formatLongDate,
  lastDeliveryDate,
  incompleteAddressMessage,
  loadSavedAddress,
  saveAddress,
  tomorrowInput,
  weekdayOf,
  EMPTY_ADDRESS,
  type BagType,
  type DeliveryAddressDraft,
  type Emirate,
  type MealSlotId,
  type QuoteResponse,
} from "@/lib/orderDraft";

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
    am_meal?: Record<string, number>;
    pm_meal?: Record<string, number>;
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
  { id: "pcod-pcos", title: "PCOS / Hormonal health", desc: "Hormone-balancing meals", emoji: "🌸", style: "default" },
  { id: "thyroid", title: "Thyroid Care", desc: "Nutrient-targeted meals that support thyroid function", emoji: "🦋", style: "default" },
  { id: "pregnancy", title: "Pregnancy Nutrition", desc: "Wholesome, doctor-informed meals for every trimester", emoji: "🤰", style: "default" },
  { id: "anti-inflammatory", title: "Anti-Inflammatory", desc: "Meals that calm chronic inflammation", emoji: "🫒", style: "default" },
  { id: "glp1", title: "GLP-1 Support", desc: "High-protein plates for GLP-1 support", emoji: "⚖️", style: "default" },
];

const DEFAULT_MEAL_SLOTS: MealSlotId[] = ["breakfast", "lunch", "dinner"];
const MIN_MEALS = 2;

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

/**
 * Per-slot prices are stored as `perMealRate × days`. Total = sum of the chosen slots;
 * a slot without its own price uses the first priced of lunch / breakfast / dinner (same rule as the server).
 */
function planPriceForDuration(
  pricing: NonNullable<BackendPlan["pricing"]>,
  dur: string,
  slots: readonly MealSlotId[]
): number | null {
  const priceOf = (slot: string): number | null => {
    const v = (pricing as Record<string, Record<string, number> | undefined>)[slot]?.[dur];
    return v != null && v > 0 ? v : null;
  };
  const fallback = priceOf("lunch") ?? priceOf("breakfast") ?? priceOf("dinner");
  let total = 0;
  for (const slot of slots) {
    const v = priceOf(slot) ?? fallback;
    if (v == null) return null;
    total += v;
  }
  return slots.length ? total : null;
}

function buildCycles(
  pricing: BackendPlan["pricing"],
  slots: readonly MealSlotId[],
  currency: string
): { cycles: Cycle[]; unsupportedLegacyOnly: boolean } {
  const mealsPerDay = Math.max(1, slots.length);
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
    const total = planPriceForDuration(pricing, dur, slots);
    const days = daysForDurationKey(dur);
    if (total == null || days == null) continue;
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
  const [mealSlots, setMealSlots] = useState<MealSlotId[]>(DEFAULT_MEAL_SLOTS);
  const mealsPerDay = mealSlots.length;
  const [startDate, setStartDate] = useState<string>(() => tomorrowInput());
  const [offDays, setOffDays] = useState<number[]>([]);
  const [address, setAddress] = useState<DeliveryAddressDraft>(EMPTY_ADDRESS);
  const [bagType, setBagType] = useState<BagType>("paper");
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [selectedCycle, setSelectedCycle] = useState("");
  const [cycles, setCycles] = useState<Cycle[]>(FALLBACK_CYCLES);
  const [unsupportedDurationTiers, setUnsupportedDurationTiers] = useState(false);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [trialCheckoutLoading, setTrialCheckoutLoading] = useState(false);
  const [trialDate, setTrialDate] = useState<string>(() => tomorrowInput());
  const [trialQuote, setTrialQuote] = useState<QuoteResponse | null>(null);
  const [trialError, setTrialError] = useState<string | null>(null);
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
            emoji: iconForTemplate(p),
            style: key.includes("custom") ? "custom" : "default",
            kcal: planCalories(p),
          };
        });
        let keptHormonal = false;
        const visible = mapped.flatMap((plan) => {
          if (!/endometriosis|pcod|pcos/i.test(`${plan.title} ${plan.desc}`)) return [plan];
          if (keptHormonal) return [];
          keptHormonal = true;
          return [{ ...plan, title: "PCOS / Hormonal health", desc: "Hormone-balancing meals" }];
        });
        setPlanTypes(visible);
        setSelectedPlan(visible[0]?.id ?? mapped[0].id);
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
    const { cycles: c, unsupportedLegacyOnly } = buildCycles(plan.pricing, mealSlots, currency);
    setCycles(c);
    setUnsupportedDurationTiers(unsupportedLegacyOnly);
    if (c.length > 0 && !c.find((cy) => cy.id === selectedCycle)) {
      setSelectedCycle(c[0].id);
    }
    if (c.length === 0) {
      setSelectedCycle("");
    }
  }, [selectedPlan, mealSlots, backendPlans, selectedCycle, currency]);

  useEffect(() => {
    setAddress(loadSavedAddress());
  }, []);

  const isBackendPlan = backendPlans.some((p) => p._id === selectedPlan);
  const durationDays = isPlanDurationDayKey(selectedCycle) ? Number(selectedCycle) : null;
  const startWeekday = weekdayOf(startDate);
  const startOnOffDay = startWeekday != null && offDays.includes(startWeekday);
  const planEnd = durationDays ? lastDeliveryDate(startDate, durationDays, offDays) : null;
  const outsideDubai = address.emirate !== "Dubai";

  useEffect(() => {
    if (!isAuthenticated || !isBackendPlan || !durationDays || mealSlots.length < MIN_MEALS || !startDate || startOnOffDay) {
      setQuote(null);
      setQuoteError(null);
      return;
    }
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      setQuoteLoading(true);
      try {
        const res = await api.post<QuoteResponse>("/checkout/quote", {
          templateId: selectedPlan,
          durationDays,
          mealSlots,
          startDate,
          offDays,
          address: { emirate: address.emirate },
          bagType,
          ...(appliedCoupon ? { couponCode: appliedCoupon } : {}),
        });
        if (!cancelled) {
          setQuote(res.data);
          setQuoteError(null);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setQuote(null);
          setQuoteError(apiErrorMessage(err, "Could not price this plan"));
        }
      } finally {
        if (!cancelled) setQuoteLoading(false);
      }
    }, 350);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [
    isAuthenticated,
    isBackendPlan,
    selectedPlan,
    durationDays,
    mealSlots,
    startDate,
    startOnOffDay,
    offDays,
    address.emirate,
    bagType,
    appliedCoupon,
  ]);

  useEffect(() => {
    const templateId = resolveTrialTemplateId(backendPlans, selectedPlan);
    if (!isAuthenticated || !templateId) {
      setTrialQuote(null);
      return;
    }
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      try {
        const res = await api.post<QuoteResponse>("/checkout/quote", {
          planType: "trial",
          templateId,
          address: { emirate: address.emirate },
        });
        if (!cancelled) setTrialQuote(res.data);
      } catch {
        if (!cancelled) setTrialQuote(null);
      }
    }, 300);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [isAuthenticated, backendPlans, selectedPlan, address.emirate]);

  const toggleSlot = (slot: MealSlotId) => {
    setMealSlots((prev) => {
      if (prev.includes(slot)) {
        return prev.length <= MIN_MEALS ? prev : prev.filter((s) => s !== slot);
      }
      const order = MEAL_SLOT_OPTIONS.map((o) => o.id);
      return [...prev, slot].sort((a, b) => order.indexOf(a) - order.indexOf(b));
    });
  };

  const toggleOffDay = (day: number) => {
    setOffDays((prev) => {
      if (prev.includes(day)) return prev.filter((d) => d !== day);
      if (prev.length >= 6) return prev;
      return [...prev, day].sort((a, b) => a - b);
    });
  };

  const updateAddress = (patch: Partial<DeliveryAddressDraft>) => {
    setAddress((prev) => ({ ...prev, ...patch }));
    setTrialError(null);
  };

  const applyCoupon = () => {
    setAppliedCoupon(couponInput.trim().toUpperCase());
  };

  const couponAccepted = Boolean(quote?.couponCode && appliedCoupon && quote.couponCode === appliedCoupon);

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

    const problem = !isBackendPlan
      ? "Please pick a plan above."
      : !durationDays
        ? "Please pick a plan duration."
        : mealSlots.length < MIN_MEALS
          ? `Choose at least ${MIN_MEALS} meals.`
          : !startDate || startDate < tomorrowInput()
            ? "Choose a start date from tomorrow."
            : startOnOffDay
              ? "Your start date is one of your off days. Pick another date or off day."
              : incompleteAddressMessage(address)
                ? incompleteAddressMessage(address)
                : appliedCoupon && !couponAccepted
                    ? quote?.couponError || "Remove the promo code that did not apply."
                    : null;
    if (problem) {
      setFormError(problem);
      document.getElementById("delivery-details")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setFormError(null);

    setCheckoutLoading(true);
    try {
      saveAddress(address);
      const res = await api.post<{ url: string; orderId: string }>(
        "/checkout/session",
        {
          templateId: selectedPlan,
          currency: currency.toLowerCase(),
          successUrl: `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/payment/cancel`,
          planType: "standard",
          durationDays,
          mealSlots,
          startDate,
          offDays,
          address: {
            emirate: address.emirate,
            area: address.area.trim() || undefined,
            building: address.building.trim(),
            line1: address.line1.trim(),
            postalCode: address.postalCode.trim(),
            landmark: address.landmark.trim() || undefined,
            mapsUrl: address.mapsUrl.trim() || undefined,
          },
          bagType,
          ...(appliedCoupon ? { couponCode: appliedCoupon } : {}),
          customer_creation: "always",
        }
      );

      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (err: unknown) {
      setFormError(apiErrorMessage(err, "Checkout failed. Please try again."));
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleTrialCheckout = async () => {
    const problem =
      incompleteAddressMessage(address) ||
      (!trialDate || trialDate < tomorrowInput()
        ? "Choose a delivery date from tomorrow."
        : null);
    if (problem) {
      setTrialError(problem);
      document.getElementById("trial-delivery")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setTrialError(null);
    saveAddress(address);

    if (!loggedIn) {
      router.push("/auth/login?redirect=/plans#trial");
      return;
    }

    const templateId = resolveTrialTemplateId(backendPlans, selectedPlan);
    if (!templateId) {
      setTrialError("Trial checkout is not available yet. Please pick a programme below or try again shortly.");
      return;
    }

    setTrialCheckoutLoading(true);
    try {
      const res = await api.post<{ url: string; orderId: string }>(
        "/checkout/session",
        {
          templateId,
          productName: TRIAL_PLAN.productName,
          successUrl: `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/payment/cancel`,
          planType: "trial",
          durationDays: 1,
          startDate: trialDate,
          address: {
            emirate: address.emirate,
            area: address.area.trim() || undefined,
            building: address.building.trim(),
            line1: address.line1.trim(),
            postalCode: address.postalCode.trim(),
            landmark: address.landmark.trim() || undefined,
            mapsUrl: address.mapsUrl.trim() || undefined,
          },
          customer_creation: "always",
        }
      );

      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (err: unknown) {
      setTrialError(apiErrorMessage(err, "Trial checkout failed. Please try again."));
    } finally {
      setTrialCheckoutLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const trialOutside = address.emirate !== "Dubai";
  const trialFeeMinor =
    trialQuote?.lines.find((line) => line.code === "outside_dubai")?.amountMinor ??
    (trialOutside ? OUTSIDE_DUBAI_FEE_AED * 100 : 0);
  const trialTotalMinor = trialQuote?.totalMinor ?? TRIAL_PLAN.amountMinor + (trialOutside ? trialFeeMinor : 0);
  const trialPriceLabel = formatMajorUnits(trialTotalMinor / 100, "AED", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
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
        <div className="mb-10">
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

        {/* Taste Trial — fixed AED 99 Stripe checkout */}
        <section
          id="trial"
          className="relative mb-14 overflow-hidden rounded-[28px] border border-primary/25 bg-[linear-gradient(135deg,#12291c_0%,#1c6b45_48%,#145234_100%)] p-6 text-white shadow-[0_20px_50px_rgba(18,41,28,0.22)] sm:p-8"
        >
          <div
            className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(184,145,46,0.35),transparent_70%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_70%)]"
            aria-hidden
          />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-stretch lg:justify-between">
            <div className="min-w-0 flex-1">
              <div className="mb-4 flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-gold/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-gold-soft">
                  {TRIAL_PLAN.badge}
                </span>
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white/90">
                  One-day taste
                </span>
              </div>

              <h2 className="font-heading text-[28px] font-semibold leading-tight tracking-tight sm:text-[34px]">
                {TRIAL_PLAN.title}
              </h2>
              <p className="mt-2 max-w-xl text-[15px] font-medium leading-relaxed text-white/80">
                {TRIAL_PLAN.tagline} Buy one trial for{" "}
                <span className="font-semibold text-gold-soft">AED 99</span> — then upgrade to a full
                programme whenever you&apos;re ready.
              </p>

              <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                {TRIAL_PLAN.includes.map((item) => (
                  <li
                    key={item.label}
                    className="rounded-[16px] border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-[2px]"
                  >
                    <p className="text-[14px] font-semibold text-white">{item.label}</p>
                    <p className="mt-1 text-[12px] font-medium leading-snug text-white/70">
                      {item.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex w-full shrink-0 flex-col justify-between rounded-[22px] border border-white/15 bg-white/95 p-5 text-foreground shadow-lg sm:max-w-[280px] lg:w-[280px]">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-wide text-secondary-text">
                  Trial price
                </p>
                <p className="font-heading mt-1 text-[40px] font-semibold leading-none tracking-tight text-foreground">
                  {trialPriceLabel}
                </p>
                <p className="mt-2 text-[13px] font-medium text-secondary-text">
                  2 meals + 1 detox + 1 snack
                </p>
                <p className="mt-3 text-[12px] font-semibold text-primary">
                  {trialOutside
                    ? `Includes ${formatMajorUnits(trialFeeMinor / 100, "AED", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} delivery outside Dubai`
                    : "Free delivery inside Dubai"}
                </p>
                {trialError ? (
                  <p className="mt-3 text-[12px] font-semibold text-red-700" role="alert">
                    {trialError}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => void handleTrialCheckout()}
                disabled={trialCheckoutLoading || checkoutLoading}
                className="mt-6 min-h-[48px] w-full rounded-full bg-primary py-[15px] text-[15px] font-semibold text-white shadow-sm transition hover:bg-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:bg-primary/60"
              >
                {trialCheckoutLoading ? "Opening Stripe…" : `Buy trial — ${trialPriceLabel} →`}
              </button>
            </div>
          </div>

          <div id="trial-delivery" className="relative mt-8 rounded-[22px] bg-white p-5 text-foreground sm:p-6">
            <h3 className="font-heading text-[20px] font-semibold tracking-tight">Where should we deliver it?</h3>
            <p className="mt-1 text-[13px] font-medium text-secondary-text">
              Delivery is included in Dubai. Outside Dubai, the delivery charge is added in the trial price.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-[13px] font-semibold text-foreground">Delivery date</span>
                <input
                  type="date"
                  value={trialDate}
                  min={tomorrowInput()}
                  onChange={(e) => {
                    setTrialDate(e.target.value);
                    setTrialError(null);
                  }}
                  className="min-h-[48px] rounded-[14px] border border-border-subtle bg-surface px-4 text-[14px] font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[13px] font-semibold text-foreground">Emirate</span>
                <select
                  value={address.emirate}
                  onChange={(e) => updateAddress({ emirate: e.target.value as Emirate })}
                  className="min-h-[48px] rounded-[14px] border border-border-subtle bg-surface px-4 text-[14px] font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {UAE_EMIRATES.map((emirate) => (
                    <option key={emirate} value={emirate}>
                      {emirate}
                    </option>
                  ))}
                </select>
              </label>
              {(
                [
                  { key: "area", label: "Area / community", placeholder: "e.g. JLT, Al Nahda", auto: "address-level2" },
                  { key: "building", label: "Building / villa name", placeholder: "e.g. Lake Tower 2", auto: "address-line2" },
                  { key: "line1", label: "Flat, villa or street", placeholder: "e.g. Flat 1204, Cluster D", auto: "address-line1" },
                  { key: "postalCode", label: "PIN / postal code", placeholder: "e.g. 00000", auto: "postal-code" },
                  { key: "landmark", label: "Landmark (optional)", placeholder: "e.g. Next to Carrefour", auto: "off" },
                ] as const
              ).map((field) => (
                <label key={field.key} className="flex flex-col gap-2">
                  <span className="text-[13px] font-semibold text-foreground">{field.label}</span>
                  <input
                    type="text"
                    value={address[field.key]}
                    autoComplete={field.auto}
                    placeholder={field.placeholder}
                    onChange={(e) => updateAddress({ [field.key]: e.target.value })}
                    className="min-h-[48px] rounded-[14px] border border-border-subtle bg-surface px-4 text-[14px] font-semibold text-foreground placeholder:text-secondary-text/70 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </label>
              ))}
              <label className="flex flex-col gap-2 sm:col-span-2">
                <span className="text-[13px] font-semibold text-foreground">Google Maps link (optional)</span>
                <input
                  type="url"
                  inputMode="url"
                  value={address.mapsUrl}
                  placeholder="Paste a pin link to help our driver"
                  onChange={(e) => updateAddress({ mapsUrl: e.target.value })}
                  className="min-h-[48px] rounded-[14px] border border-border-subtle bg-surface px-4 text-[14px] font-semibold text-foreground placeholder:text-secondary-text/70 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </label>
            </div>
          </div>
        </section>

        <div className="mb-6 flex flex-wrap items-center gap-2 rounded-2xl border border-primary/20 bg-primary/10 px-5 py-3.5 text-sm text-foreground">
          <span aria-hidden>🌱</span>
          <span>
            Following a vegetarian diet? Every plan below includes a dedicated
            vegetarian rotation —{" "}
            <Link
              href="/vegetarian-meal-plan-dubai"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              see this week&rsquo;s vegetarian menu
            </Link>
            .
          </span>
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

            {/* Section 2: Which meals (price = sum of chosen meal slots × days) */}
            <section>
              <h2 className="font-heading mb-2 text-[26px] font-semibold tracking-tight text-foreground">
                Which meals do you want each day?
              </h2>
              <p className="mb-6 text-[14px] font-medium text-secondary-text">
                Pick at least {MIN_MEALS}. You have {mealsPerDay} meals a day.
              </p>
              <div className="grid grid-cols-2 gap-[14px] sm:grid-cols-3" role="group" aria-label="Meals each day">
                {MEAL_SLOT_OPTIONS.map((slot) => {
                  const isActive = mealSlots.includes(slot.id);
                  const locked = isActive && mealSlots.length <= MIN_MEALS;
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => toggleSlot(slot.id)}
                      title={locked ? `Keep at least ${MIN_MEALS} meals` : undefined}
                      className={`flex min-h-[56px] cursor-pointer items-center justify-between gap-3 rounded-[16px] border-2 px-5 py-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        isActive
                          ? "border-primary bg-primary/10"
                          : "border-border-subtle bg-surface shadow-sm hover:border-foreground/15"
                      }`}
                    >
                      <span className="text-[15px] font-semibold text-foreground">{slot.label}</span>
                      <span
                        aria-hidden
                        className={`flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-md border-2 ${
                          isActive ? "border-primary bg-primary text-white" : "border-border-subtle bg-surface"
                        }`}
                      >
                        {isActive ? (
                          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : null}
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

            {/* Section 5: Delivery schedule — off days push the end date */}
            <section id="delivery-details" className="scroll-mt-32">
              <h2 className="font-heading mb-2 text-[26px] font-semibold tracking-tight text-foreground">
                When should we deliver?
              </h2>
              <p className="mb-6 text-[14px] font-medium text-secondary-text">
                Pick your first delivery day and any weekly off days. Off days move your end
                date later, so you still get every day you paid for.
              </p>
              <div className="grid gap-6 sm:grid-cols-[220px_1fr]">
                <label className="flex flex-col gap-2">
                  <span className="text-[13px] font-semibold text-foreground">Start date</span>
                  <input
                    type="date"
                    value={startDate}
                    min={tomorrowInput()}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="min-h-[48px] rounded-[14px] border border-border-subtle bg-surface px-4 text-[14px] font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </label>
                <div className="flex flex-col gap-2">
                  <span className="text-[13px] font-semibold text-foreground" id="off-days-label">
                    Weekly off days (no delivery)
                  </span>
                  <div className="flex flex-wrap gap-2" role="group" aria-labelledby="off-days-label">
                    {WEEKDAYS.map((day) => {
                      const isOff = offDays.includes(day.id);
                      return (
                        <button
                          key={day.id}
                          type="button"
                          aria-pressed={isOff}
                          onClick={() => toggleOffDay(day.id)}
                          className={`min-h-[44px] min-w-[52px] rounded-full border-2 px-3 text-[13px] font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                            isOff
                              ? "border-foreground bg-foreground text-background"
                              : "border-border-subtle bg-surface text-foreground hover:border-foreground/20"
                          }`}
                        >
                          {day.short}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-[13px] font-semibold text-secondary-text" aria-live="polite">
                {startOnOffDay
                  ? "Your start date is an off day. Choose another start date or off day."
                  : planEnd && durationDays
                    ? `${durationDays} delivery days, from ${formatLongDate(new Date(`${startDate}T00:00:00Z`))} to ${formatLongDate(planEnd)}.`
                    : ""}
              </p>
            </section>

            {/* Section 6: Delivery address */}
            <section>
              <h2 className="font-heading mb-2 text-[26px] font-semibold tracking-tight text-foreground">
                Delivery address
              </h2>
              <p className="mb-6 text-[14px] font-medium text-secondary-text">
                Free delivery in Dubai. Outside Dubai, the delivery charge is added in the payment summary.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-[13px] font-semibold text-foreground">Emirate</span>
                  <select
                    value={address.emirate}
                    onChange={(e) => updateAddress({ emirate: e.target.value as Emirate })}
                    className="min-h-[48px] rounded-[14px] border border-border-subtle bg-surface px-4 text-[14px] font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {UAE_EMIRATES.map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                </label>
                {(
                  [
                    { key: "area", label: "Area / community", placeholder: "e.g. JLT, Al Nahda", auto: "address-level2" },
                    { key: "building", label: "Building / villa name", placeholder: "e.g. Lake Tower 2", auto: "address-line2" },
                    { key: "line1", label: "Flat, villa or street", placeholder: "e.g. Flat 1204, Cluster D", auto: "address-line1" },
                    { key: "postalCode", label: "PIN / postal code", placeholder: "e.g. 00000", auto: "postal-code" },
                    { key: "landmark", label: "Landmark (optional)", placeholder: "e.g. Next to Carrefour", auto: "off" },
                  ] as const
                ).map((f) => (
                  <label key={f.key} className="flex flex-col gap-2">
                    <span className="text-[13px] font-semibold text-foreground">{f.label}</span>
                    <input
                      type="text"
                      value={address[f.key]}
                      autoComplete={f.auto}
                      placeholder={f.placeholder}
                      onChange={(e) => updateAddress({ [f.key]: e.target.value })}
                      className="min-h-[48px] rounded-[14px] border border-border-subtle bg-surface px-4 text-[14px] font-semibold text-foreground placeholder:text-secondary-text/70 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </label>
                ))}
                <label className="flex flex-col gap-2 sm:col-span-2">
                  <span className="text-[13px] font-semibold text-foreground">Google Maps link (optional)</span>
                  <input
                    type="url"
                    inputMode="url"
                    value={address.mapsUrl}
                    placeholder="Paste a pin link to help our driver"
                    onChange={(e) => updateAddress({ mapsUrl: e.target.value })}
                    className="min-h-[48px] rounded-[14px] border border-border-subtle bg-surface px-4 text-[14px] font-semibold text-foreground placeholder:text-secondary-text/70 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </label>
              </div>
            </section>

            {/* Section 7: Packaging */}
            <section>
              <h2 className="font-heading mb-6 text-[26px] font-semibold tracking-tight text-foreground">
                How should we pack it?
              </h2>
              <div className="grid gap-[14px] sm:grid-cols-2" role="radiogroup" aria-label="Packaging">
                {(
                  [
                    { id: "paper", title: "Paper bag", detail: "Recyclable bag, free", price: "Free" },
                    {
                      id: "cooler",
                      title: "Cooler bag",
                      detail: "Insulated bag that keeps meals cold, yours to keep",
                      price: `+AED ${COOLER_BAG_FEE_AED}`,
                    },
                  ] as const
                ).map((opt) => {
                  const isActive = bagType === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      role="radio"
                      aria-checked={isActive}
                      onClick={() => setBagType(opt.id)}
                      className={`flex min-h-[72px] items-center justify-between gap-4 rounded-[16px] border-2 px-5 py-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        isActive
                          ? "border-primary bg-primary/10"
                          : "border-border-subtle bg-surface shadow-sm hover:border-foreground/15"
                      }`}
                    >
                      <span>
                        <span className="block text-[15px] font-semibold text-foreground">{opt.title}</span>
                        <span className="mt-1 block text-[12px] font-medium text-secondary-text">{opt.detail}</span>
                      </span>
                      <span className="text-[13px] font-semibold text-foreground">{opt.price}</span>
                    </button>
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
                    aria-label="Promotion code"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") applyCoupon();
                    }}
                    className="w-full rounded-[14px] border border-border-subtle bg-surface py-[15px] pl-[38px] pr-4 text-[13px] font-semibold uppercase text-foreground placeholder:normal-case placeholder:text-secondary-text/70 transition-shadow focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                {appliedCoupon ? (
                  <button
                    type="button"
                    onClick={() => {
                      setAppliedCoupon("");
                      setCouponInput("");
                    }}
                    className="rounded-[14px] bg-surface px-5 py-[15px] text-[13px] font-semibold tracking-tight text-foreground ring-1 ring-border-subtle transition-colors hover:bg-foreground/5"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={applyCoupon}
                    disabled={!couponInput.trim()}
                    className="rounded-[14px] bg-foreground/5 px-6 py-[15px] text-[13px] font-semibold tracking-tight text-foreground transition-colors hover:bg-foreground/10 disabled:text-secondary-text"
                  >
                    Apply
                  </button>
                )}
              </div>
              {appliedCoupon && !quoteLoading ? (
                <p
                  className={`-mt-6 mb-8 text-[12px] font-semibold ${couponAccepted ? "text-primary" : "text-red-700"}`}
                  role="status"
                >
                  {couponAccepted
                    ? `${appliedCoupon} applied.`
                    : quote?.couponError || (quoteError ? "" : "Checking code…")}
                </p>
              ) : null}
              {outsideDubai && !appliedCoupon ? (
                <p className="-mt-6 mb-8 text-[12px] font-semibold text-secondary-text">
                  First order outside Dubai? Use WELCOME200 for AED 200 off.
                </p>
              ) : null}

              {/* Rate note */}
              <div className="mb-10 flex items-center gap-3 rounded-[14px] border border-dashed border-border-subtle bg-surface p-4">
                <span className="text-[18px]" aria-hidden>
                  👨‍🍳
                </span>
                <span className="text-[12px] font-semibold leading-[1.5] text-secondary-text">
                  Every programme includes morning delivery (free in Dubai) and
                  nutritionist sign-off.
                </span>
              </div>

              {/* Payment Summary */}
              <div className="mb-[28px] flex flex-col gap-[14px]">
                <h4 className="mb-1 text-[14px] font-semibold tracking-tight text-foreground">
                  Payment summary
                </h4>
                {(quote
                  ? quote.lines.map((l) => ({
                      key: l.code,
                      label: l.code === "plan" ? "Plan price" : l.label,
                      amountMinor: l.amountMinor,
                    }))
                  : [
                      { key: "plan", label: "Plan price", amountMinor: getCurrentCycle()?.amount ?? 0 },
                      ...(outsideDubai
                        ? [{ key: "outside_dubai", label: "Outside Dubai delivery", amountMinor: OUTSIDE_DUBAI_FEE_AED * 100 }]
                        : []),
                      ...(bagType === "cooler"
                        ? [{ key: "cooler_bag", label: "Cooler bag", amountMinor: COOLER_BAG_FEE_AED * 100 }]
                        : []),
                    ]
                ).map((line) => (
                  <div key={line.key} className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold tracking-tight text-secondary-text">
                      {line.label}
                    </span>
                    <span
                      className={`text-[13px] font-semibold ${line.amountMinor < 0 ? "text-primary" : "text-foreground"}`}
                    >
                      {line.amountMinor < 0 ? "−" : ""}
                      {getCurrentCycle() ? formatMinorUnits(Math.abs(line.amountMinor), currency) : "--"}
                    </span>
                  </div>
                ))}
                {!outsideDubai ? (
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold tracking-tight text-secondary-text">
                      Delivery in Dubai
                    </span>
                    <span className="text-[13px] font-semibold text-foreground">Free</span>
                  </div>
                ) : null}
                <div className="flex items-center justify-between border-t border-border-subtle pt-[18px]">
                  <span className="font-heading text-[16px] font-semibold tracking-tight text-foreground">
                    Total
                  </span>
                  <span className="font-heading text-[16px] font-semibold tracking-tight text-foreground" aria-live="polite">
                    {quote
                      ? formatMinorUnits(quote.totalMinor, currency)
                      : getCurrentCycle()
                        ? formatMinorUnits(
                            (getCurrentCycle()?.amount ?? 0) +
                              (outsideDubai ? OUTSIDE_DUBAI_FEE_AED * 100 : 0) +
                              (bagType === "cooler" ? COOLER_BAG_FEE_AED * 100 : 0),
                            currency
                          )
                        : "--"}
                  </span>
                </div>
                {quoteLoading ? (
                  <p className="text-[12px] font-medium text-secondary-text">Updating price…</p>
                ) : quoteError ? (
                  <p className="text-[12px] font-semibold text-red-700" role="alert">
                    {quoteError}
                  </p>
                ) : null}
              </div>

              {formError ? (
                <p
                  className="mb-4 rounded-[14px] border border-red-200 bg-red-50 px-4 py-3 text-[13px] font-semibold text-red-800"
                  role="alert"
                >
                  {formError}
                </p>
              ) : null}

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
