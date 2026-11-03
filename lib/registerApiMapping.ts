/**
 * Maps onboarding UI values to `/auth/register` payload.
 *
 * Backend checklist (confirm enums with your API and adjust `*_OPTIONS` if requests fail):
 * - `type`: set via `NEXT_PUBLIC_REGISTER_USER_TYPE` only if required (e.g. `client`).
 * - `goal`: e.g. fatloss, health, weight_gain, muscle_gain, maintenance.
 * - `activityLevel`: e.g. sedentary, light, moderate, active, very_active.
 * - `dietPreference`: e.g. vegetarian, non_vegetarian, eggetarian, vegan.
 * - `macroGoal`: UI only until the API exposes a field name and allowed values.
 */

/** If set (e.g. "client"), sent as `type`. Omit from env to exclude the field. */
export const REGISTER_BODY_TYPE =
  typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_REGISTER_USER_TYPE?.trim() || undefined
    : undefined;

export const REGISTER_TOTAL_STEPS = 12;

/** Diet plan categories — collected only in register questions (not on /plans). */
export const GOAL_OPTIONS = [
  {
    api: "fatloss",
    label: "Fat Loss",
    desc: "Calorie-controlled meals that melt fat, not muscle.",
  },
  {
    api: "muscle_gain",
    label: "Muscle Gain",
    desc: "Protein-forward plates built for strength.",
  },
  {
    api: "maintenance",
    label: "Balanced Diet",
    desc: "Everyday nutrition, perfectly proportioned.",
  },
  {
    api: "diabetic",
    label: "Diabetic Friendly",
    desc: "Low-GI meals that keep blood sugar steady.",
  },
  {
    api: "gut_health",
    label: "Gut Health",
    desc: "Fibre and ferment-rich food for a happy gut.",
  },
  {
    api: "age_reverse",
    label: "Age Reverse",
    desc: "Antioxidant-dense menus for longevity.",
  },
  {
    api: "pcos_pcod",
    label: "PCOD / PCOS Care",
    desc: "Hormone-balancing meals for PCOD & PCOS.",
  },
  {
    api: "thyroid",
    label: "Thyroid Care",
    desc: "Nutrient-targeted meals that support thyroid function.",
  },
  {
    api: "pregnancy",
    label: "Pregnancy Nutrition",
    desc: "Wholesome, doctor-informed meals for every trimester.",
  },
  {
    api: "anti_inflammatory",
    label: "Anti-Inflammatory",
    desc: "Meals that calm chronic inflammation.",
  },
  {
    api: "endometriosis",
    label: "Endometriosis",
    desc: "Anti-inflammatory support for endometriosis.",
  },
  {
    api: "hormonal_balance",
    label: "PCOS, Hormonal Balancing",
    desc: "Hormone-balancing meals for PCOS.",
  },
  {
    api: "glp1",
    label: "GLP-1 Support",
    desc: "High-protein plates for GLP-1 support.",
  },
  {
    api: "custom",
    label: "Customized Meal Plan",
    desc: "Built with our chef around your exact needs.",
  },
  {
    api: "health",
    label: "Eat Healthy",
    desc: "Whole foods and balanced meals tailored to you.",
  },
  {
    api: "weight_gain",
    label: "Gain Weight",
    desc: "Nutrient-dense meals with comfortable portions.",
  },
] as const;

export const ACTIVITY_OPTIONS = [
  {
    api: "sedentary",
    label: "Sedentary",
    desc: "Mostly sitting; little structured exercise.",
  },
  {
    api: "light",
    label: "Lightly Active",
    desc: "Light workouts or walking a few times a week.",
  },
  {
    api: "moderate",
    label: "Moderately Active",
    desc: "Regular sessions most days of the week.",
  },
  {
    api: "active",
    label: "Very Active",
    desc: "Hard training or long sessions most days.",
  },
  {
    api: "very_active",
    label: "Extra Active",
    desc: "Athlete-level training or a very physical job.",
  },
] as const;

export const DIET_OPTIONS = [
  { api: "vegetarian", label: "Vegetarian", desc: "Plant-based with dairy options." },
  {
    api: "non_vegetarian",
    label: "Non Vegetarian",
    desc: "Includes meat and fish where you choose.",
  },
  { api: "eggetarian", label: "Eggetarian", desc: "Vegetarian plus eggs." },
  { api: "vegan", label: "Vegan", desc: "Fully plant-based selections." },
] as const;

/** Shown in nutrition step; not sent until API documents a field. */
export const MACRO_GOAL_OPTIONS = [
  {
    id: "balanced",
    label: "Balanced",
    desc: "Even split across protein, carbs, and fats.",
  },
  {
    id: "custom_macros",
    label: "Custom Macros",
    desc: "You set targets; we align portions.",
  },
  {
    id: "low_carbs",
    label: "Low Carbs",
    desc: "Fewer carbs, satisfying protein and fats.",
  },
  {
    id: "high_protein",
    label: "High Protein",
    desc: "Extra protein for recovery and satiety.",
  },
] as const;

export type MacroGoalId = (typeof MACRO_GOAL_OPTIONS)[number]["id"];

export const ALLERGY_PRESETS = [
  { api: "dairy", label: "Dairy" },
  { api: "shellfish", label: "Shellfish" },
  { api: "gluten", label: "Gluten" },
  { api: "soy", label: "Soy" },
  { api: "eggs", label: "Eggs" },
  { api: "peanuts", label: "Peanuts" },
  { api: "tree_nuts", label: "Tree nuts" },
  { api: "fish", label: "Fish" },
  { api: "sesame", label: "Sesame" },
] as const;

export const CONDITION_PRESETS = [
  { api: "diabetes", label: "Diabetes" },
  { api: "hypertension", label: "Hypertension" },
  { api: "ibs", label: "IBS" },
  { api: "celiac", label: "Celiac disease" },
  { api: "thyroid", label: "Thyroid" },
  { api: "pcos", label: "PCOS" },
] as const;

export const NONE_ALLERGY = "none";
export const NONE_CONDITION = "none";

export type RegisterWizardState = {
  name: string;
  email: string;
  age: number;
  heightCm: number;
  weightKg: number;
  heightUnit: "cm" | "ft";
  weightUnit: "kg" | "lb";
  targetWeightKg: number;
  gender: "" | "male" | "female";
  goal: string;
  activityLevel: string;
  dietPreference: string;
  macroGoal: MacroGoalId | "";
  allergies: string[];
  conditions: string[];
  termsAccepted: boolean;
};

export const defaultRegisterWizardState = (): RegisterWizardState => ({
  name: "",
  email: "",
  age: 28,
  heightCm: 175,
  weightKg: 74.5,
  heightUnit: "cm",
  weightUnit: "kg",
  targetWeightKg: 72,
  gender: "",
  goal: "",
  activityLevel: "",
  dietPreference: "",
  macroGoal: "balanced",
  allergies: [],
  conditions: [],
  termsAccepted: false,
});

/** BMI from kg and cm. */
export function bmiFromMetric(weightKg: number, heightCm: number): number {
  const h = heightCm / 100;
  if (h <= 0) return 0;
  return weightKg / (h * h);
}

export function bmiCategory(
  bmi: number,
): "underweight" | "healthy" | "overweight" | "obese" {
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "healthy";
  if (bmi < 30) return "overweight";
  return "obese";
}

export function bmiCategoryLabel(cat: ReturnType<typeof bmiCategory>): string {
  switch (cat) {
    case "underweight":
      return "Underweight";
    case "healthy":
      return "Healthy";
    case "overweight":
      return "Overweight";
    default:
      return "Obese";
  }
}

/** Rough “healthy” weight band from height (BMI 18.5–24.9); UI hint only. */
export function recommendedWeightRangeKg(heightCm: number): { min: number; max: number } {
  const h = heightCm / 100;
  const min = 18.5 * h * h;
  const max = 24.9 * h * h;
  return { min: Math.round(min * 10) / 10, max: Math.round(max * 10) / 10 };
}

/**
 * Approximate DOB from age: same calendar month/day as today, year shifted back.
 * Replace with a real date picker if the API requires exact DOB.
 */
export function ageToDobIso(age: number): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() - Math.max(0, Math.min(120, age)));
  return d.toISOString().slice(0, 10);
}

export function cmToFeetInches(cm: number): { ft: number; inch: number } {
  const totalIn = Math.round(cm / 2.54);
  return { ft: Math.floor(totalIn / 12), inch: totalIn % 12 };
}

export function feetInchesToCm(ft: number, inch: number): number {
  return Math.round((ft * 12 + inch) * 2.54 * 10) / 10;
}

export function kgToLb(kg: number): number {
  return Math.round(kg * 2.20462 * 10) / 10;
}

export function lbToKg(lb: number): number {
  return Math.round((lb / 2.20462) * 10) / 10;
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export type RegisterApiBody = {
  registrationToken: string;
  type?: string;
  name: string;
  email?: string;
  gender: string;
  dob: string;
  heightCm: number;
  weightKg: number;
  targetWeightKg: number;
  goal: string;
  activityLevel: string;
  dietPreference: string;
  allergies: string[];
  conditions: string[];
};

export function buildRegisterBody(
  registrationToken: string,
  state: RegisterWizardState,
): RegisterApiBody {
  return {
    ...(REGISTER_BODY_TYPE ? { type: REGISTER_BODY_TYPE } : {}),
    registrationToken,
    name: state.name.trim(),
    email: state.email.trim() || undefined,
    gender: state.gender,
    dob: ageToDobIso(state.age),
    heightCm: Math.round(state.heightCm),
    weightKg: round1(state.weightKg),
    targetWeightKg: round1(state.targetWeightKg),
    goal: state.goal,
    activityLevel: state.activityLevel,
    dietPreference: state.dietPreference,
    allergies: [...state.allergies].filter((a) => a && a !== NONE_ALLERGY),
    conditions: [...state.conditions].filter((c) => c && c !== NONE_CONDITION),
  };
}
