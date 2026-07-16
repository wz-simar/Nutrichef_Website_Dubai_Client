/** Shared meal-plan template helpers (home carousel + /meal-plans/[id]). */

export const GOAL_EMOJIS: Record<string, string> = {
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

export interface ApiTemplate {
  _id: string;
  title: string;
  goalType?: string;
  dietType?: string;
  structure: Record<string, unknown>;
  coverImageUrl?: string;
}

/** Recipe row from GET /menu/list (joined to template meals via recipeId). */
export interface ApiRecipe {
  _id: string;
  title: string;
  category?: string;
  prepTime?: number;
  ingredients?: string[];
  steps?: string[];
  cost?: number;
  nutrition?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
    fiber?: number;
  };
  tags?: string[];
  allergenFlags?: string[];
  media?: string[];
  status?: string;
}

export interface CarouselPlanCard {
  id: string;
  title: string;
  icon: string;
  image: string | null;
  macros: { protein: number; carbs: number; fat: number };
  labels: { p: string; c: string; f: string };
  useGramLabels: boolean;
}

export function iconForTemplate(t: Pick<ApiTemplate, "title" | "goalType" | "dietType">): string {
  const keys = [t.dietType, t.goalType, t.title].filter(Boolean).map((k) => String(k).toLowerCase());
  for (const k of keys) {
    if (GOAL_EMOJIS[k]) return GOAL_EMOJIS[k];
  }
  for (const k of keys) {
    for (const [pattern, emoji] of Object.entries(GOAL_EMOJIS)) {
      if (k.includes(pattern)) return emoji;
    }
  }
  return "🍽️";
}

function extractImage(structure: Record<string, unknown>): string | null {
  if (typeof structure.coverImage === "string") return structure.coverImage;
  if (typeof structure.heroImage === "string") return structure.heroImage;
  if (Array.isArray(structure.media) && typeof structure.media[0] === "string") {
    return structure.media[0];
  }
  return null;
}

export function resolveTemplateImage(t: ApiTemplate): string | null {
  const url = t.coverImageUrl?.trim();
  if (url) return url;
  return extractImage(t.structure ?? {});
}

export function sumInlineMealMacros(structure: Record<string, unknown>): {
  p: number;
  c: number;
  f: number;
} | null {
  const n = structure.nutrition as { protein?: number; carbs?: number; fat?: number } | undefined;
  if (n && (n.protein != null || n.carbs != null || n.fat != null)) {
    const p = n.protein ?? 0;
    const c = n.carbs ?? 0;
    const f = n.fat ?? 0;
    if (p + c + f <= 0) return null;
    return { p, c, f };
  }

  const days = (structure.days as Array<{ meals?: Array<Record<string, unknown>> }>) ?? [];
  let p = 0;
  let c = 0;
  let f = 0;
  for (const day of days) {
    for (const meal of day.meals ?? []) {
      const mult = typeof meal.portion === "number" ? meal.portion : 1;
      const mp = Number(meal.protein ?? 0) * mult;
      const mc = Number(meal.carbs ?? 0) * mult;
      const mf = Number(meal.fat ?? 0) * mult;
      if (mp === 0 && mc === 0 && mf === 0) continue;
      p += mp;
      c += mc;
      f += mf;
    }
  }
  if (p + c + f <= 0) return null;
  return { p, c, f };
}

export function gramsToDisplay(g: { p: number; c: number; f: number }): {
  macros: { protein: number; carbs: number; fat: number };
  labels: { p: string; c: string; f: string };
  useGramLabels: boolean;
} {
  const total = g.p + g.c + g.f;
  const maxG = Math.max(g.p, g.c, g.f);
  const useGramLabels = maxG >= 35;

  if (useGramLabels) {
    return {
      macros: {
        protein: Math.min(100, Math.round((g.p / total) * 100)),
        carbs: Math.min(100, Math.round((g.c / total) * 100)),
        fat: Math.min(100, Math.round((g.f / total) * 100)),
      },
      labels: {
        p: `${Math.round(g.p)}g Protein`,
        c: `${Math.round(g.c)}g Carbs`,
        f: `${Math.round(g.f)}g Fat`,
      },
      useGramLabels: true,
    };
  }

  const pp = Math.round((g.p / total) * 100);
  const pc = Math.round((g.c / total) * 100);
  let pf = Math.round((g.f / total) * 100);
  const drift = 100 - (pp + pc + pf);
  if (drift !== 0) {
    pf += drift;
  }

  return {
    macros: { protein: pp, carbs: pc, fat: pf },
    labels: {
      p: `${pp}% Protein`,
      c: `${pc}% Carbs`,
      f: `${pf}% Fat`,
    },
    useGramLabels: false,
  };
}

export function templateToCard(t: ApiTemplate): CarouselPlanCard {
  const struct = t.structure ?? {};
  const grams = sumInlineMealMacros(struct);
  const image = resolveTemplateImage(t);

  if (!grams) {
    return {
      id: t._id,
      title: t.title,
      icon: iconForTemplate(t),
      image,
      macros: { protein: 34, carbs: 33, fat: 33 },
      labels: { p: "—", c: "—", f: "—" },
      useGramLabels: false,
    };
  }

  const { macros, labels, useGramLabels } = gramsToDisplay(grams);
  return {
    id: t._id,
    title: t.title,
    icon: iconForTemplate(t),
    image,
    macros,
    labels,
    useGramLabels,
  };
}

/** Keys we never surface for individual dishes (pricing / money). */
function isPriceRelatedKey(key: string): boolean {
  const k = key.toLowerCase();
  if (k.includes("price")) return true;
  if (k === "cost" || k.endsWith("cost")) return true;
  if (k === "subtotal" || k === "linetotal" || k === "totalprice" || k === "unitprice") return true;
  if (k.includes("fee") && k !== "feedback") return true;
  return false;
}

export interface NormalizedDay {
  label: string;
  meals: Record<string, unknown>[];
}

export function normalizeDaysMeals(structure: Record<string, unknown>): NormalizedDay[] {
  const days = structure.days;
  if (Array.isArray(days) && days.length > 0) {
    return days.map((day, i) => {
      const d = day as Record<string, unknown>;
      const label =
        (typeof d.label === "string" && d.label.trim()) ||
        (typeof d.name === "string" && d.name.trim()) ||
        (typeof d.title === "string" && d.title.trim()) ||
        `Day ${i + 1}`;
      const rawMeals = Array.isArray(d.meals) ? d.meals : [];
      const meals = rawMeals.filter((m): m is Record<string, unknown> => m != null && typeof m === "object");
      return { label, meals };
    });
  }
  const flat = structure.meals;
  if (Array.isArray(flat) && flat.length > 0) {
    const meals = flat.filter((m): m is Record<string, unknown> => m != null && typeof m === "object");
    return [{ label: "Meals", meals }];
  }
  return [];
}

function asRecord(v: unknown): Record<string, unknown> | null {
  return v != null && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : null;
}

export function mealPrimaryImage(meal: Record<string, unknown>): string | null {
  if (typeof meal.image === "string" && meal.image.trim()) return meal.image.trim();
  if (typeof meal.photo === "string" && meal.photo.trim()) return meal.photo.trim();
  if (Array.isArray(meal.media) && typeof meal.media[0] === "string") return meal.media[0];
  const recipe = asRecord(meal.recipe);
  if (recipe) {
    if (typeof recipe.image === "string" && recipe.image.trim()) return recipe.image.trim();
    if (Array.isArray(recipe.media) && typeof recipe.media[0] === "string") return recipe.media[0];
  }
  return null;
}

export function mealPrimaryTitle(meal: Record<string, unknown>): string {
  const candidates = [meal.title, meal.name, meal.recipeTitle, meal.dishName];
  for (const c of candidates) {
    if (typeof c === "string" && c.trim()) return c.trim();
  }
  const recipe = asRecord(meal.recipe);
  if (recipe && typeof recipe.title === "string" && recipe.title.trim()) return recipe.title.trim();
  return "Meal";
}

export function resolveRecipeId(meal: Record<string, unknown>): string | null {
  const id = meal.recipeId;
  if (typeof id === "string" && id.trim()) return id.trim();
  return null;
}

export function displayMealTitle(meal: Record<string, unknown>, recipe: ApiRecipe | null | undefined): string {
  const t = recipe?.title?.trim();
  if (t) return t;
  return mealPrimaryTitle(meal);
}

export function displayMealImage(meal: Record<string, unknown>, recipe: ApiRecipe | null | undefined): string | null {
  const m = recipe?.media;
  if (Array.isArray(m) && typeof m[0] === "string" && m[0].trim()) return m[0].trim();
  return mealPrimaryImage(meal);
}

function formatLabelPart(value: string): string {
  return value
    .replace(/[-_]+/g, " ")
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export function displayMealDescription(
  meal: Record<string, unknown>,
  recipe: ApiRecipe | null | undefined,
): string | null {
  const fromMeal = mealDescription(meal);
  if (fromMeal) return fromMeal;
  if (!recipe) return null;
  const bits: string[] = [];
  if (typeof recipe.category === "string" && recipe.category.trim()) {
    bits.push(formatLabelPart(recipe.category.trim()));
  }
  if (typeof recipe.prepTime === "number" && recipe.prepTime > 0) {
    bits.push(`${recipe.prepTime} min prep`);
  }
  return bits.length ? bits.join(" · ") : null;
}

const SLOT_ORDER = ["breakfast", "lunch", "dinner", "snack"] as const;

export function slotSortIndex(slot: unknown): number {
  const s = typeof slot === "string" ? slot.toLowerCase().trim() : "";
  const i = (SLOT_ORDER as readonly string[]).indexOf(s);
  return i === -1 ? 99 : i;
}

export function sortMealsBySlot(meals: Record<string, unknown>[]): Record<string, unknown>[] {
  return [...meals].sort((a, b) => slotSortIndex(a.slot) - slotSortIndex(b.slot));
}

export function formatSlotLabel(slot: unknown): string | null {
  if (typeof slot !== "string" || !slot.trim()) return null;
  return formatLabelPart(slot.trim());
}

export function recipeNonEmptyLines(arr: string[] | undefined): string[] {
  return (arr ?? []).map((s) => (typeof s === "string" ? s.trim() : "")).filter(Boolean);
}

export function mergedMealTags(meal: Record<string, unknown>, recipe: ApiRecipe | null | undefined): string[] {
  const fromMeal = mealTags(meal);
  const fromRecipe = (recipe?.tags ?? []).filter((t) => typeof t === "string" && t.trim());
  const seen = new Set<string>();
  const out: string[] = [];
  for (const t of [...fromMeal, ...fromRecipe]) {
    const k = t.trim().toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(t.trim());
  }
  if (recipe?.category?.trim()) {
    const cat = formatLabelPart(recipe.category.trim());
    const ck = cat.toLowerCase();
    if (!seen.has(ck)) {
      seen.add(ck);
      out.push(cat);
    }
  }
  return out;
}

export function mealDescription(meal: Record<string, unknown>): string | null {
  const candidates = [meal.description, meal.desc, meal.notes, meal.summary];
  for (const c of candidates) {
    if (typeof c === "string" && c.trim()) return c.trim();
  }
  const recipe = asRecord(meal.recipe);
  if (recipe) {
    if (typeof recipe.description === "string" && recipe.description.trim()) return recipe.description.trim();
    if (typeof recipe.summary === "string" && recipe.summary.trim()) return recipe.summary.trim();
  }
  return null;
}

export function mealTags(meal: Record<string, unknown>): string[] {
  const raw = meal.tags;
  if (!Array.isArray(raw)) return [];
  return raw.filter((t): t is string => typeof t === "string" && t.trim().length > 0);
}

export function mealNumericField(meal: Record<string, unknown>, key: string): number | null {
  const v = meal[key];
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim() !== "") {
    const n = parseFloat(v);
    if (Number.isFinite(n)) return n;
  }
  return null;
}

/** Remaining primitive fields for “show everything else”, excluding price keys and already-handled keys. */
export function mealExtraPrimitives(
  meal: Record<string, unknown>,
  already: Set<string>,
): Array<{ key: string; value: string }> {
  const out: Array<{ key: string; value: string }> = [];
  for (const [key, val] of Object.entries(meal)) {
    if (already.has(key) || isPriceRelatedKey(key)) continue;
    if (key === "recipe" || key === "media") continue;
    if (key === "recipeId" || key === "slot") continue;
    if (val == null) continue;
    if (typeof val === "string" || typeof val === "number" || typeof val === "boolean") {
      out.push({ key, value: String(val) });
    }
  }
  return out;
}

