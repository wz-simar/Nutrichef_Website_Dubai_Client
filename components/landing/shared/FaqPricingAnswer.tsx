"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { useTenant } from "@/contexts/TenantContext";
import { formatMajorUnits } from "@/lib/formatCurrency";
import { getMinimumDailyPrice, type LandingPlanPricing } from "@/lib/landingPricing";

const FALLBACK_DAILY_PRICE = 2.5;

export function FaqPricingAnswer() {
  const { currency } = useTenant();
  const [dailyPrice, setDailyPrice] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  const fetchPricing = useCallback(async () => {
    try {
      const res = await api.get<LandingPlanPricing[]>("/menu/plans", { noAuth: true });
      const plans = Array.isArray(res.data) ? res.data : [];
      setDailyPrice(getMinimumDailyPrice(plans));
    } catch {
      setDailyPrice(null);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    void fetchPricing();
  }, [fetchPricing]);

  const price =
    dailyPrice ??
    (loaded ? FALLBACK_DAILY_PRICE : null);

  if (!loaded) {
    return (
      <span className="inline-block h-5 w-48 animate-pulse rounded bg-border-subtle" />
    );
  }

  const formatted = formatMajorUnits(price ?? FALLBACK_DAILY_PRICE, currency, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });

  return (
    <>
      NutriChef meal plans start from {formatted} per day depending on your goal, number of
      meals, and subscription length. Delivery is included across all covered areas with no hidden
      fees.{" "}
      <Link href="/plans" className="font-semibold text-primary underline-offset-2 hover:underline">
        See plans for current pricing
      </Link>
      .
    </>
  );
}
