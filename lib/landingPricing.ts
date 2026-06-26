import { isPlanDurationDayKey } from "@/lib/mealPlanDurationTiers";

export interface LandingPlanPricing {
  pricing?: {
    [slot: string]: Record<string, number> | undefined;
  };
}

/** Lowest per-day price across all plans, meal slots, and supported duration tiers. */
export function getMinimumDailyPrice(plans: LandingPlanPricing[]): number | null {
  let min: number | null = null;

  for (const plan of plans) {
    if (!plan.pricing) continue;
    for (const tiers of Object.values(plan.pricing)) {
      if (!tiers) continue;
      for (const [durKey, total] of Object.entries(tiers)) {
        if (!isPlanDurationDayKey(durKey) || total <= 0) continue;
        const days = parseInt(durKey, 10);
        const perDay = total / days;
        if (min === null || perDay < min) {
          min = perDay;
        }
      }
    }
  }

  return min;
}
