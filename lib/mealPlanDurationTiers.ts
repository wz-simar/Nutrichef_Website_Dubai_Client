/**
 * Meal-plan templates expose per-slot pricing with duration keys "20", "24",
 * "30", "90" (string keys in JSON) — the programme lengths in calendar days.
 *
 * Pricing is linear: each slot's price for a duration equals
 * `perMealRate × days`, so a plan's total is `slotPrice × mealsPerDay`.
 */

export const PLAN_DURATION_DAY_KEYS = ["20", "24", "30", "90"] as const;
export type PlanDurationDayKey = (typeof PLAN_DURATION_DAY_KEYS)[number];

const SUPPORTED = new Set<string>(PLAN_DURATION_DAY_KEYS);

export function isPlanDurationDayKey(key: string): key is PlanDurationDayKey {
  return SUPPORTED.has(key);
}

/** Calendar days for a supported key. */
export function daysForDurationKey(key: string): number | null {
  if (!isPlanDurationDayKey(key)) return null;
  const days = parseInt(key, 10);
  return Number.isFinite(days) && days > 0 ? days : null;
}

/** Fixed display order for tier pickers / price tables. */
export function supportedDurationKeysPresent(rawKeys: Iterable<string>): PlanDurationDayKey[] {
  const raw = new Set<string>();
  for (const k of rawKeys) {
    if (typeof k === "string" && k.trim()) raw.add(k.trim());
  }
  return PLAN_DURATION_DAY_KEYS.filter((k) => raw.has(k));
}

export function planDurationListTitle(key: PlanDurationDayKey): string {
  return `${key} days`;
}

export function planDurationShortTitle(key: PlanDurationDayKey): string {
  return `${key} days`;
}

export function planDurationPeriodPhrase(key: PlanDurationDayKey): string {
  return `for ${key} days`;
}

/** All duration keys present on pricing rows for the selected meal slots (including legacy). */
export function collectRawDurationKeysFromPricing(
  pricing: { [slot: string]: Record<string, number> | undefined } | undefined,
  mealKeysLower: string[],
): Set<string> {
  const durationKeys = new Set<string>();
  if (!pricing) return durationKeys;
  for (const mk of mealKeysLower) {
    const tierObj = pricing[mk];
    if (tierObj) {
      for (const k of Object.keys(tierObj)) {
        if (k.trim()) durationKeys.add(k.trim());
      }
    }
  }
  return durationKeys;
}
