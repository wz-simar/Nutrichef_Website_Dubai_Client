/**
 * Maps onboarding `user.goal` (set in register questions) to a meal-plan template.
 * Programme category is collected only in questions — /plans must not re-ask.
 */

export type GoalResolvablePlan = {
  _id: string;
  title?: string;
  goalType?: string;
  dietType?: string;
};

/** Tokens that identify a template for a given register/profile goal api value. */
const GOAL_MATCHERS: Record<string, string[]> = {
  fatloss: ["lose_weight", "fat loss", "fatloss", "weight loss"],
  muscle_gain: ["gain_muscle", "muscle gain", "muscle_gain", "build muscle"],
  weight_gain: ["gain_muscle", "muscle gain", "weight gain"],
  maintenance: ["maintain", "balanced"],
  health: ["balanced", "maintain", "health"],
  diabetic: ["diabetic"],
  gut_health: ["gut health", "gut"],
  age_reverse: ["age reverse", "age_reverse"],
  custom: ["custom"],
  pcos_pcod: ["pcod", "pcos_pcod", "pcos / pcod"],
  thyroid: ["thyroid"],
  pregnancy: ["pregnancy"],
  anti_inflammatory: ["anti_inflammatory", "anti-inflammatory"],
  endometriosis: ["endometriosis"],
  hormonal_balance: ["hormonal", "hormonal_balance"],
  glp1: ["glp1", "glp-1", "glp 1"],
};

function haystack(p: GoalResolvablePlan): string {
  return [p.goalType, p.dietType, p.title]
    .filter(Boolean)
    .map((s) => String(s).toLowerCase())
    .join(" | ");
}

function scorePlan(p: GoalResolvablePlan, tokens: string[]): number {
  const h = haystack(p);
  let score = 0;
  for (const t of tokens) {
    if (!t) continue;
    if (h.includes(t)) score += t.length;
  }
  return score;
}

/** Pick the best matching template for a user goal; falls back to first plan. */
export function resolvePlanIdForGoal<T extends GoalResolvablePlan>(
  plans: T[],
  goal: string | null | undefined,
): string {
  if (!plans.length) return "";
  const key = (goal || "").trim().toLowerCase();
  if (!key) return plans[0]._id;

  const tokens = GOAL_MATCHERS[key] ?? [key.replace(/_/g, " "), key];
  let best = plans[0];
  let bestScore = -1;
  for (const p of plans) {
    const s = scorePlan(p, tokens);
    if (s > bestScore) {
      bestScore = s;
      best = p;
    }
  }
  return best._id;
}

export function planTitleForGoal<T extends GoalResolvablePlan>(
  plans: T[],
  goal: string | null | undefined,
): string {
  const id = resolvePlanIdForGoal(plans, goal);
  return plans.find((p) => p._id === id)?.title || "Your programme";
}
