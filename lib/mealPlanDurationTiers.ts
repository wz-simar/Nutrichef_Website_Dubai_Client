/**
 * Meal-plan programme lengths sold on NutriChef: 20 / 24 / 28 calendar days
 * (Nov 2026 package sheet). Package totals live in `nutrichefPackages.ts`.
 */

export const PLAN_DURATION_DAY_KEYS = ["20", "24", "28"] as const;
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
  const present = PLAN_DURATION_DAY_KEYS.filter((k) => raw.has(k));
  // Package sheet always offers 20/24/28 even before Mongo is re-saved.
  return present.length > 0 ? present : [...PLAN_DURATION_DAY_KEYS];
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
