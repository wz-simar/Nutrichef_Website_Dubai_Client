/**
 * NutriChef Nov 2026 package sheet — source of truth for Plan A/B/C totals.
 * Weight Loss family covers Fat Loss, GLP-1, PCOS, Diabetic, and other non-muscle programmes.
 * Muscle Gain is its own family. Durations are 20 / 24 / 28 days.
 */

export const PACKAGE_DURATION_KEYS = ["20", "24", "28"] as const;
export type PackageDurationKey = (typeof PACKAGE_DURATION_KEYS)[number];

export type PackageCode = "A" | "B" | "C";
export type PackageFamily = "weight_loss" | "muscle_gain";
export type PackageAddOn = "pm_meal" | "soup";

export interface PackageMacros {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
}

export interface PackageDefinition {
  code: PackageCode;
  title: string;
  summary: string;
  /** Slots sent to fulfilment / structure filtering. */
  mealSlots: readonly string[];
  /** Package total in AED (major) by duration. */
  pricesAed: Record<PackageDurationKey, number>;
  macros: PackageMacros;
}

const WEIGHT_LOSS_PACKAGES: Record<PackageCode, PackageDefinition> = {
  A: {
    code: "A",
    title: "Plan A",
    summary: "2 meals + 1 snack + 1 detox · Breakfast + lunch",
    mealSlots: ["breakfast", "lunch", "am_meal"],
    pricesAed: { "20": 1699, "24": 1899, "28": 2099 },
    macros: {
      calories: "600–700 kcal",
      protein: "50–55 g",
      carbs: "45 g",
      fat: "25 g",
    },
  },
  B: {
    code: "B",
    title: "Plan B",
    summary: "2 meals + 1 snack + 1 detox · Lunch + dinner",
    mealSlots: ["lunch", "dinner", "am_meal"],
    pricesAed: { "20": 1749, "24": 1949, "28": 2249 },
    macros: {
      calories: "700–800 kcal",
      protein: "71 g",
      carbs: "53 g",
      fat: "25 g",
    },
  },
  C: {
    code: "C",
    title: "Plan C",
    summary: "3 meals + 2 snacks + 1 drink · Full day",
    mealSlots: ["breakfast", "lunch", "dinner", "am_meal", "pm_meal"],
    pricesAed: { "20": 2349, "24": 2649, "28": 2949 },
    macros: {
      calories: "1000–1100 kcal",
      protein: "85–95 g",
      carbs: "100 g",
      fat: "35 g",
    },
  },
};

const MUSCLE_GAIN_PACKAGES: Record<PackageCode, PackageDefinition> = {
  A: {
    code: "A",
    title: "Plan A",
    summary: "2 meals + 1 snack + 1 detox · Breakfast + lunch",
    mealSlots: ["breakfast", "lunch", "am_meal"],
    pricesAed: { "20": 1899, "24": 2199, "28": 2599 },
    macros: {
      calories: "900–1000 kcal",
      protein: "87 g",
      carbs: "79 g",
      fat: "27 g",
    },
  },
  B: {
    code: "B",
    title: "Plan B",
    summary: "2 meals + 1 snack + 1 detox · Lunch + dinner",
    mealSlots: ["lunch", "dinner", "am_meal"],
    pricesAed: { "20": 2299, "24": 2699, "28": 3049 },
    macros: {
      calories: "1200 kcal",
      protein: "100–110 g",
      carbs: "130 g",
      fat: "32 g",
    },
  },
  C: {
    code: "C",
    title: "Plan C",
    summary: "3 meals + 2 snacks + 1 detox · Full day",
    mealSlots: ["breakfast", "lunch", "dinner", "am_meal", "pm_meal"],
    pricesAed: { "20": 2649, "24": 3049, "28": 3549 },
    macros: {
      calories: "1700–1900 kcal",
      protein: "145–152 g",
      carbs: "120–130 g",
      fat: "50–60 g",
    },
  },
};

/** Floor package on the sheet (WL Plan A · 20 days). */
export const PACKAGE_STARTING_AED = WEIGHT_LOSS_PACKAGES.A.pricesAed["20"];

/**
 * Marketing compare-at: sale is 20% off list (matches checkout mock Weekly/Total strikes).
 * Charged amount stays the sheet/sale total — list is display-only.
 */
export const PACKAGE_SALE_OF_LIST = 0.8;

/** List (was) price in AED major units from the sale/package total. */
export function compareAtListAed(saleAed: number): number {
  if (!Number.isFinite(saleAed) || saleAed <= 0) return 0;
  return Math.round(saleAed / PACKAGE_SALE_OF_LIST);
}

/** Weekly share of a programme total (calendar days → weeks). */
export function weeklyShareAed(totalAed: number, durationDays: number): number {
  if (!Number.isFinite(totalAed) || totalAed <= 0 || !Number.isFinite(durationDays) || durationDays <= 0) {
    return 0;
  }
  return Math.round((totalAed * 7) / durationDays);
}

export interface PriceComparePair {
  saleAed: number;
  listAed: number;
  weeklySaleAed: number;
  weeklyListAed: number;
}

export function buildPriceCompare(saleAed: number, durationDays: number): PriceComparePair | null {
  if (!Number.isFinite(saleAed) || saleAed <= 0 || !durationDays) return null;
  const listAed = compareAtListAed(saleAed);
  return {
    saleAed: Math.round(saleAed),
    listAed,
    weeklySaleAed: weeklyShareAed(saleAed, durationDays),
    weeklyListAed: weeklyShareAed(listAed, durationDays),
  };
}

export function isPackageDurationKey(value: string | number): value is PackageDurationKey {
  return PACKAGE_DURATION_KEYS.includes(String(value) as PackageDurationKey);
}

export function isPackageCode(value: string): value is PackageCode {
  return value === "A" || value === "B" || value === "C";
}

/** Muscle Gain only. Everything else uses the Weight Loss family sheet. */
export function resolvePackageFamily(input: {
  title?: string | null;
  goalType?: string | null;
  dietType?: string | null;
}): PackageFamily {
  const blob = `${input.title ?? ""} ${input.goalType ?? ""} ${input.dietType ?? ""}`.toLowerCase();
  if (/muscle/.test(blob)) return "muscle_gain";
  return "weight_loss";
}

export function getPackagesForFamily(family: PackageFamily): PackageDefinition[] {
  const map = family === "muscle_gain" ? MUSCLE_GAIN_PACKAGES : WEIGHT_LOSS_PACKAGES;
  return [map.A, map.B, map.C];
}

export function getPackage(
  family: PackageFamily,
  code: PackageCode,
): PackageDefinition {
  return (family === "muscle_gain" ? MUSCLE_GAIN_PACKAGES : WEIGHT_LOSS_PACKAGES)[code];
}

export function packagePriceAed(
  family: PackageFamily,
  code: PackageCode,
  durationDays: number,
): number | null {
  if (!isPackageDurationKey(durationDays)) return null;
  return getPackage(family, code).pricesAed[String(durationDays) as PackageDurationKey];
}

export function pmMealAddOnAed(family: PackageFamily, durationDays: number): number | null {
  if (!isPackageDurationKey(durationDays)) return null;
  const key = String(durationDays) as PackageDurationKey;
  if (family === "muscle_gain") {
    return { "20": 299, "24": 399, "28": 499 }[key];
  }
  return { "20": 249, "24": 349, "28": 449 }[key];
}

export const SOUP_ADD_ON_AED = 99;

export function soupAddOnAed(family: PackageFamily): number | null {
  return family === "weight_loss" ? SOUP_ADD_ON_AED : null;
}

export function packageAllowsPmAddOn(code: PackageCode): boolean {
  return code === "A" || code === "B";
}

export function packageTotalMinor(input: {
  family: PackageFamily;
  packageCode: PackageCode;
  durationDays: number;
  addOns?: readonly PackageAddOn[] | null;
}): number | null {
  const base = packagePriceAed(input.family, input.packageCode, input.durationDays);
  if (base == null) return null;
  let total = base;
  const addOns = input.addOns ?? [];
  if (addOns.includes("pm_meal")) {
    if (!packageAllowsPmAddOn(input.packageCode)) return null;
    const pm = pmMealAddOnAed(input.family, input.durationDays);
    if (pm == null) return null;
    total += pm;
  }
  if (addOns.includes("soup")) {
    const soup = soupAddOnAed(input.family);
    if (soup == null) return null;
    total += soup;
  }
  return Math.round(total * 100);
}

export function mealSlotsForPackage(
  family: PackageFamily,
  code: PackageCode,
  addOns?: readonly PackageAddOn[] | null,
): string[] {
  const slots = [...getPackage(family, code).mealSlots];
  if ((addOns ?? []).includes("pm_meal") && packageAllowsPmAddOn(code) && !slots.includes("pm_meal")) {
    slots.push("pm_meal");
  }
  const order = ["breakfast", "am_meal", "lunch", "pm_meal", "dinner"];
  return slots.sort((a, b) => order.indexOf(a) - order.indexOf(b));
}
