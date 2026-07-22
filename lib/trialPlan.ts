/** Fixed Taste Trial SKU — one-time Stripe Checkout at AED 99. */

export const TRIAL_PLAN = {
  /** Stripe minor units (fils): AED 99.00 */
  amountMinor: 9900,
  currency: "aed",
  productName: "Taste Trial — 2 meals + 1 detox + 1 snack",
  title: "Taste Trial",
  tagline: "Try NutriChef for one day — no long commitment.",
  includes: [
    { label: "2 chef meals", detail: "Breakfast + lunch or dinner" },
    { label: "1 detox juice", detail: "Cold-pressed, nutritionist-approved" },
    { label: "1 snack", detail: "Macro-balanced bite between meals" },
  ],
  badge: "Most popular way to start",
} as const;

export type TrialPlanConfig = typeof TRIAL_PLAN;

/** Prefer dedicated trial template, then title match, then a fallback programme id. */
export function resolveTrialTemplateId(
  plans: Array<{ _id: string; title?: string }>,
  fallbackId?: string | null,
): string | null {
  const envId = process.env.NEXT_PUBLIC_TRIAL_TEMPLATE_ID?.trim();
  if (envId) return envId;

  const byTitle = plans.find((p) => /trial/i.test(p.title ?? ""));
  if (byTitle?._id) return byTitle._id;

  if (fallbackId?.trim()) return fallbackId.trim();
  return plans[0]?._id ?? null;
}
