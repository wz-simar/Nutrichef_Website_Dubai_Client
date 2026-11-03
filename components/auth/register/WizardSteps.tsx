"use client";

import React, { useState } from "react";
import { HeightScrollPicker } from "@/components/auth/register/HeightScrollPicker";
import { WeightDialScrollPicker } from "@/components/auth/register/WeightDialScrollPicker";
import {
  ACTIVITY_OPTIONS,
  ALLERGY_PRESETS,
  bmiCategory,
  bmiCategoryLabel,
  bmiFromMetric,
  CONDITION_PRESETS,
  DIET_OPTIONS,
  GOAL_OPTIONS,
  MACRO_GOAL_OPTIONS,
  recommendedWeightRangeKg,
  RegisterWizardState,
} from "@/lib/registerApiMapping";

export type WizardStepProps = {
  state: RegisterWizardState;
  setState: React.Dispatch<React.SetStateAction<RegisterWizardState>>;
  goToStep: (n: number) => void;
};

const inputClass =
  "w-full rounded-xl border border-border-subtle bg-surface px-4 py-3.5 text-sm font-medium text-foreground placeholder:text-secondary-text/70 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background";

const bodyMuted = "text-sm font-medium leading-relaxed text-secondary-text";

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function Step1NameEmail({ state, setState }: WizardStepProps) {
  return (
    <div className="space-y-5">
      <header>
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-[1.65rem]">
          Tell us a little about yourself
        </h1>
        <p className={`mt-2 ${bodyMuted}`}>
          We use this to set up your account and personalize your meal plans. You can update
          details anytime in settings.
        </p>
      </header>
      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-foreground">
          Full name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={state.name}
          onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
          placeholder="Your name"
          className={inputClass}
          autoComplete="name"
          autoFocus
        />
      </div>
      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-foreground">
          Email
        </label>
        <input
          type="email"
          value={state.email}
          onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
          placeholder="your@email.com"
          className={inputClass}
          autoComplete="email"
        />
      </div>
    </div>
  );
}

export function Step2Vitals({ state, setState }: WizardStepProps) {
  const bmi = bmiFromMetric(state.weightKg, state.heightCm);

  return (
    <div className="space-y-5">
      <header>
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-[1.65rem]">
          Your vitals
        </h1>
        <p className={`mt-2 ${bodyMuted}`}>
          Adjust the sliders to match you. We use height and weight to estimate energy needs
          and portion sizes.
        </p>
      </header>

      <div className="rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-wide text-foreground">Age</span>
          <span className="text-lg font-semibold text-foreground">
            {state.age}
            <span className="ml-1 text-sm font-semibold text-secondary-text">years</span>
          </span>
        </div>
        <input
          type="range"
          min={13}
          max={90}
          value={state.age}
          onChange={(e) => setState((s) => ({ ...s, age: Number(e.target.value) }))}
          className="h-2 w-full cursor-pointer accent-primary"
        />
      </div>

      <HeightScrollPicker
        heightCm={state.heightCm}
        heightUnit={state.heightUnit}
        onHeightCmChange={(v) => setState((s) => ({ ...s, heightCm: v }))}
        onHeightUnitChange={(next) => {
          setState((s) => {
            if (s.heightUnit === next) return s;
            return { ...s, heightUnit: next };
          });
        }}
      />

      <WeightDialScrollPicker
        weightKg={state.weightKg}
        weightUnit={state.weightUnit}
        onWeightKgChange={(v) => setState((s) => ({ ...s, weightKg: v }))}
        onWeightUnitChange={(next) => {
          setState((s) => {
            if (s.weightUnit === next) return s;
            return { ...s, weightUnit: next };
          });
        }}
      />

      <p className="text-center text-sm text-secondary-text">
        Your estimated BMI is{" "}
        <strong className="font-semibold text-foreground">
          {(Math.round(bmi * 10) / 10).toFixed(1)}
        </strong>
      </p>
    </div>
  );
}

export function Step3Gender({ state, setState }: WizardStepProps) {
  const opts: { id: "male" | "female"; label: string; sym: string }[] = [
    { id: "male", label: "Male", sym: String.fromCodePoint(0x2642) },
    { id: "female", label: "Female", sym: String.fromCodePoint(0x2640) },
  ];
  return (
    <div className="space-y-5">
      <header>
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-[1.65rem]">
          Select your gender
        </h1>
        <p className={`mt-2 ${bodyMuted}`}>
          This helps us tune default nutrition ranges. You can change it later in settings.
        </p>
      </header>
      <div className="grid grid-cols-2 gap-3">
        {opts.map((o) => {
          const sel = state.gender === o.id;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => setState((s) => ({ ...s, gender: o.id }))}
              className={`relative flex flex-col items-center rounded-2xl border-2 px-3 pb-4 pt-5 text-center transition-colors ${
                sel
                  ? "border-primary bg-primary/[0.06] shadow-sm"
                  : "border-border-subtle bg-surface hover:border-foreground/15"
              }`}
            >
              {sel ? (
                <span className="absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                  <CheckIcon className="text-white" />
                </span>
              ) : null}
              <span className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-bg-light text-3xl text-primary">
                {o.sym}
              </span>
              <span
                className={`text-sm font-semibold ${sel ? "text-foreground" : "text-secondary-text"}`}
              >
                {o.label}
              </span>
            </button>
          );
        })}
      </div>
      <p className="text-center text-xs text-secondary-text/90">Can be changed later from settings.</p>
    </div>
  );
}

export function Step4Goals({ state, setState }: WizardStepProps) {
  return (
    <div className="space-y-5">
      <header>
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-[1.65rem]">
          Which diet plan category?
        </h1>
        <p className={`mt-2 ${bodyMuted}`}>
          Choose once here — this sets your programme. You will not be asked again on the plans
          page.
        </p>
      </header>
      <div className="flex flex-col gap-3" role="radiogroup" aria-label="Diet plan category">
        {GOAL_OPTIONS.map((g) => {
          const sel = state.goal === g.api;
          return (
            <button
              key={g.api}
              type="button"
              role="radio"
              aria-checked={sel}
              onClick={() => setState((s) => ({ ...s, goal: g.api }))}
              className={`flex w-full items-start gap-3 rounded-2xl border-2 px-4 py-3.5 text-left transition-colors ${
                sel
                  ? "border-transparent bg-foreground shadow-md"
                  : "border-border-subtle bg-surface hover:border-foreground/15"
              }`}
            >
              <div className="min-w-0 flex-1">
                <p
                  className={`text-sm font-semibold ${sel ? "text-primary" : "text-foreground"}`}
                >
                  {g.label}
                </p>
                <p className={`mt-0.5 text-xs leading-snug ${sel ? "text-white/75" : bodyMuted}`}>
                  {g.desc}
                </p>
              </div>
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  sel ? "border-primary bg-primary" : "border-border-subtle bg-transparent"
                }`}
              >
                {sel ? <span className="h-2 w-2 rounded-full bg-foreground" /> : null}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Step5BmiRecap({ state }: WizardStepProps) {
  const bmi = bmiFromMetric(state.weightKg, state.heightCm);
  const cat = bmiCategory(bmi);
  return (
    <div className="space-y-5">
      <header>
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-[1.65rem]">
          Your BMI status
        </h1>
        <p className={`mt-2 ${bodyMuted}`}>
          BMI is a simple screen based on height and weight. It isn&apos;t diagnostic, but it
          helps us place your starting point on your journey.
        </p>
      </header>
      <div className="rounded-2xl border border-border-subtle bg-surface p-5 text-center shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-secondary-text">
          Current BMI
        </p>
        <p className="mt-1 font-heading text-4xl font-semibold text-foreground">
          {(Math.round(bmi * 10) / 10).toFixed(1)}
        </p>
        <span className="mt-3 inline-block rounded-full bg-[#e2edd1] px-3 py-1 text-xs font-bold uppercase tracking-wide text-foreground">
          {bmiCategoryLabel(cat)}
        </span>
      </div>
    </div>
  );
}

function SemiGauge({ ratio }: { ratio: number }) {
  const r = ratio;
  const clamped = Math.min(1, Math.max(0, r));
  const angle = Math.PI * (1 - clamped);
  const cx = 100;
  const cy = 100;
  const needleLen = 72;
  const nx = cx + needleLen * Math.cos(angle);
  const ny = cy - needleLen * Math.sin(angle);
  return (
    <svg viewBox="0 0 200 120" className="mx-auto w-full max-w-[280px]" aria-hidden>
      <path
        d="M 30 100 A 70 70 0 0 1 170 100"
        fill="none"
        stroke="var(--light-bg)"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M 30 100 A 70 70 0 0 1 170 100"
        fill="none"
        stroke="var(--primary-brand)"
        strokeWidth="14"
        strokeLinecap="round"
        strokeDasharray={`${220 * clamped} 220`}
      />
      <line
        x1={cx}
        y1={cy}
        x2={nx}
        y2={ny}
        stroke="var(--foreground)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r="5" fill="var(--foreground)" />
    </svg>
  );
}

export function Step6TargetWeight({ state, setState }: WizardStepProps) {
  const rec = recommendedWeightRangeKg(state.heightCm);
  const minT = Math.max(35, Math.round(rec.min - 15));
  const maxT = Math.min(200, Math.round(rec.max + 25));
  const bmi = bmiFromMetric(state.weightKg, state.heightCm);
  const ratio = (bmi - 15) / (40 - 15);

  return (
    <div className="space-y-5">
      <header>
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-[1.65rem]">
          Set target weight
        </h1>
        <p className={`mt-2 ${bodyMuted}`}>
          Choose a target that feels realistic. We&apos;ll align daily portions and macros toward
          this number.
        </p>
      </header>

      <div className="relative rounded-2xl border border-border-subtle bg-surface px-3 pb-5 pt-2 shadow-sm">
        <SemiGauge ratio={ratio} />
        <div className="relative -mt-8 mx-auto max-w-[220px] rounded-2xl border border-border-subtle bg-surface px-4 py-3 text-center shadow-md">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-secondary-text">
            Current BMI
          </p>
          <p className="font-heading text-2xl font-semibold text-foreground">
            {(Math.round(bmi * 10) / 10).toFixed(1)}
          </p>
          <span className="mt-1 inline-block rounded-full bg-[#e2edd1] px-2.5 py-0.5 text-[10px] font-bold uppercase text-foreground">
            {bmiCategoryLabel(bmiCategory(bmi))}
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm">
        <div className="mb-3 flex items-baseline justify-center gap-1">
          <span className="text-3xl font-semibold text-primary">
            {(Math.round(state.targetWeightKg * 10) / 10).toFixed(1)}
          </span>
          <span className="text-sm font-semibold text-secondary-text">kg</span>
        </div>
        <input
          type="range"
          min={minT}
          max={maxT}
          step={0.5}
          value={Math.min(maxT, Math.max(minT, state.targetWeightKg))}
          onChange={(e) =>
            setState((s) => ({ ...s, targetWeightKg: Number(e.target.value) }))
          }
          className="h-2 w-full cursor-pointer accent-primary"
        />
        <div
          className="mt-3 flex h-4 items-end justify-between px-0.5"
          aria-hidden
        >
          {Array.from({ length: 13 }).map((_, i) => (
            <span
              key={i}
              className="w-px rounded-full bg-secondary-text/25"
              style={{ height: i % 2 === 0 ? 14 : 8 }}
            />
          ))}
        </div>
        <div className="mt-3 rounded-full bg-[#e2edd1] px-3 py-2 text-center text-[10px] font-bold uppercase leading-snug text-foreground">
          Recommended for your height: {rec.min}–{rec.max} kg
        </div>
      </div>
      <p className="text-center text-xs text-secondary-text/90">
        We will adjust your daily macros and portions to hit the targets daily.
      </p>
    </div>
  );
}

function ActivityIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="5" r="2" fill="currentColor" className="text-primary" />
      <path
        d="M12 8v5l3 3M9 21h6M8 13l-2 5M16 13l2 5"
        stroke="currentColor"
        className="text-primary"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Step7Activity({ state, setState }: WizardStepProps) {
  return (
    <div className="space-y-5">
      <header>
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-[1.65rem]">
          What&apos;s your activity level?
        </h1>
        <p className={`mt-2 ${bodyMuted}`}>
          This sets how much fuel you need on training and rest days. Pick what matches most
          weeks.
        </p>
      </header>
      <div className="flex flex-col gap-3" role="radiogroup" aria-label="Activity level">
        {ACTIVITY_OPTIONS.map((a) => {
          const sel = state.activityLevel === a.api;
          return (
            <button
              key={a.api}
              type="button"
              role="radio"
              aria-checked={sel}
              onClick={() => setState((s) => ({ ...s, activityLevel: a.api }))}
              className={`flex w-full items-start gap-3 rounded-2xl border-2 px-3 py-3 text-left shadow-sm transition-colors ${
                sel
                  ? "border-transparent bg-foreground"
                  : "border-border-subtle bg-surface hover:border-foreground/15"
              }`}
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                  sel ? "bg-white/10 text-primary" : "bg-bg-light text-primary"
                }`}
              >
                <ActivityIcon />
              </span>
              <div className="min-w-0 flex-1">
                <p
                  className={`text-sm font-semibold ${sel ? "text-primary" : "text-foreground"}`}
                >
                  {a.label}
                </p>
                <p className={`mt-0.5 text-xs ${sel ? "text-white/75" : bodyMuted}`}>
                  {a.desc}
                </p>
              </div>
              <span
                className={`mt-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  sel ? "border-primary bg-primary" : "border-border-subtle"
                }`}
              >
                {sel ? <span className="h-2 w-2 rounded-full bg-foreground" /> : null}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function toggleListItem(list: string[], id: string): string[] {
  if (list.includes(id)) return list.filter((x) => x !== id);
  return [...list, id];
}

export function Step8Health({ state, setState }: WizardStepProps) {
  const [extraCondition, setExtraCondition] = useState("");

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-[1.65rem]">
          Health profile
        </h1>
        <p className={`mt-2 ${bodyMuted}`}>
          Select anything that applies. Our kitchen team uses this to keep meals safer and more
          comfortable for you.
        </p>
      </header>

      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-foreground">
          Allergies
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setState((s) => ({ ...s, allergies: [] }))}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${
              state.allergies.length === 0
                ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary/25"
                : "border-transparent bg-bg-light text-foreground hover:border-border-subtle"
            }`}
          >
            {state.allergies.length === 0 ? <CheckIcon /> : null}
            None
          </button>
          {ALLERGY_PRESETS.map((a) => {
            const on = state.allergies.includes(a.api);
            return (
              <button
                key={a.api}
                type="button"
                onClick={() =>
                  setState((s) => ({
                    ...s,
                    allergies: toggleListItem(s.allergies, a.api),
                  }))
                }
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${
                  on
                    ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary/25"
                    : "border-transparent bg-bg-light text-foreground hover:border-border-subtle"
                }`}
              >
                {on ? <CheckIcon /> : null}
                {a.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-foreground">
          Health conditions
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setState((s) => ({ ...s, conditions: [] }))}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${
              state.conditions.length === 0
                ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary/25"
                : "border-transparent bg-bg-light text-foreground hover:border-border-subtle"
            }`}
          >
            {state.conditions.length === 0 ? <CheckIcon /> : null}
            None
          </button>
          {CONDITION_PRESETS.map((c) => {
            const on = state.conditions.includes(c.api);
            return (
              <button
                key={c.api}
                type="button"
                onClick={() =>
                  setState((s) => ({
                    ...s,
                    conditions: toggleListItem(s.conditions, c.api),
                  }))
                }
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${
                  on
                    ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary/25"
                    : "border-transparent bg-bg-light text-foreground hover:border-border-subtle"
                }`}
              >
                {on ? <CheckIcon /> : null}
                {c.label}
              </button>
            );
          })}
          {state.conditions
            .filter((c) => !CONDITION_PRESETS.some((p) => p.api === c))
            .map((c) => {
              const on = true;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() =>
                    setState((s) => ({
                      ...s,
                      conditions: s.conditions.filter((x) => x !== c),
                    }))
                  }
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${
                    on
                      ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary/25"
                      : ""
                  }`}
                >
                  {on ? <CheckIcon /> : null}
                  {c}
                </button>
              );
            })}
        </div>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-3">
          <div className="w-full sm:min-w-0 sm:flex-1">
            <input
              type="text"
              value={extraCondition}
              onChange={(e) => setExtraCondition(e.target.value)}
              placeholder="Other condition"
              className={`${inputClass} box-border min-h-[3.25rem] w-full`}
            />
          </div>
          <button
            type="button"
            onClick={() => {
              const t = extraCondition.trim();
              if (!t) return;
              const slug = t.toLowerCase().replace(/\s+/g, "_");
              setState((s) => ({
                ...s,
                conditions: s.conditions.includes(slug)
                  ? s.conditions
                  : [...s.conditions, slug],
              }));
              setExtraCondition("");
            }}
            className="box-border flex min-h-[3.25rem] w-full shrink-0 items-center justify-center gap-2 rounded-full text-sm font-semibold leading-none text-primary hover:underline sm:w-auto sm:justify-start sm:px-1"
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-primary text-base font-normal leading-none">
              +
            </span>
            <span className="text-left leading-tight">Add another condition</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function Step9Nutrition({ state, setState }: WizardStepProps) {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-[1.65rem]">
          Define your nutrition
        </h1>
        <p className={`mt-2 ${bodyMuted}`}>
          Macro style nudges how we balance plates. Diet preference steers protein sources and
          defaults.
        </p>
      </header>

      <div>
        <p className="mb-2 border-b border-primary/25 pb-1 text-xs font-bold uppercase tracking-wide text-foreground">
          Macronutrient goal
        </p>
        <div className="grid grid-cols-2 gap-3">
          {MACRO_GOAL_OPTIONS.map((m) => {
            const sel = state.macroGoal === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setState((s) => ({ ...s, macroGoal: m.id }))}
                className={`rounded-2xl border-2 p-3 text-left transition-colors ${
                  sel
                    ? "border-transparent bg-foreground shadow-md"
                    : "border-border-subtle bg-surface hover:border-foreground/15"
                }`}
              >
                <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-bg-light text-primary">
                  <ActivityIcon />
                </span>
                <p
                  className={`text-xs font-semibold ${sel ? "text-primary" : "text-foreground"}`}
                >
                  {m.label}
                </p>
                <p className={`mt-0.5 text-[10px] leading-snug ${sel ? "text-white/70" : bodyMuted}`}>
                  {m.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-foreground">
          Dietary preferences
        </p>
        <div className="flex flex-col gap-3" role="radiogroup" aria-label="Diet">
          {DIET_OPTIONS.map((d) => {
            const sel = state.dietPreference === d.api;
            return (
              <button
                key={d.api}
                type="button"
                role="radio"
                aria-checked={sel}
                onClick={() => setState((s) => ({ ...s, dietPreference: d.api }))}
                className={`flex w-full items-center gap-3 rounded-2xl border-2 px-3 py-3 text-left transition-colors ${
                  sel
                    ? "border-transparent bg-foreground shadow-md"
                    : "border-border-subtle bg-surface hover:border-foreground/15"
                }`}
              >
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-bg-light text-xl"
                  aria-hidden
                >
                  {String.fromCodePoint(0x1f37d)}
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-sm font-semibold ${sel ? "text-primary" : "text-foreground"}`}
                  >
                    {d.label}
                  </p>
                  <p className={`text-xs ${sel ? "text-white/75" : bodyMuted}`}>{d.desc}</p>
                </div>
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    sel ? "border-primary bg-primary" : "border-border-subtle"
                  }`}
                >
                  {sel ? <span className="h-2 w-2 rounded-full bg-foreground" /> : null}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ReviewRow({ label, value, onEdit }: { label: string; value: string; onEdit: () => void }) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-xl border border-border-subtle bg-surface px-3 py-2.5">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wide text-secondary-text">{label}</p>
        <p className="mt-0.5 text-sm font-semibold text-foreground">{value}</p>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="shrink-0 text-xs font-semibold text-primary hover:underline"
      >
        Edit
      </button>
    </div>
  );
}

export function Step10Review({ state, goToStep }: WizardStepProps) {
  const goalLabel = GOAL_OPTIONS.find((g) => g.api === state.goal)?.label ?? "—";
  const actLabel =
    ACTIVITY_OPTIONS.find((a) => a.api === state.activityLevel)?.label ?? "—";
  const dietLabel =
    DIET_OPTIONS.find((d) => d.api === state.dietPreference)?.label ?? "—";
  const macroLabel =
    MACRO_GOAL_OPTIONS.find((m) => m.id === state.macroGoal)?.label ?? "—";
  const allergyStr =
    state.allergies.length === 0
      ? "None"
      : state.allergies
          .map(
            (a) =>
              ALLERGY_PRESETS.find((p) => p.api === a)?.label ??
              a.replace(/_/g, " "),
          )
          .join(", ");
  const condStr =
    state.conditions.length === 0
      ? "None"
      : state.conditions
          .map(
            (c) =>
              CONDITION_PRESETS.find((p) => p.api === c)?.label ??
              c.replace(/_/g, " "),
          )
          .join(", ");

  return (
    <div className="space-y-5">
      <header>
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-[1.65rem]">
          Review your profile
        </h1>
        <p className={`mt-2 ${bodyMuted}`}>
          Double-check the essentials. Tap edit to jump back to any step.
        </p>
      </header>
      <div className="flex flex-col gap-2">
        <ReviewRow label="Name" value={state.name || "—"} onEdit={() => goToStep(1)} />
        <ReviewRow
          label="Email"
          value={state.email || "—"}
          onEdit={() => goToStep(1)}
        />
        <ReviewRow
          label="Vitals"
          value={`Age ${state.age}, ${Math.round(state.heightCm)} cm, ${state.weightKg} kg`}
          onEdit={() => goToStep(2)}
        />
        <ReviewRow
          label="Gender"
          value={state.gender ? state.gender.charAt(0).toUpperCase() + state.gender.slice(1) : "—"}
          onEdit={() => goToStep(3)}
        />
        <ReviewRow label="Goal" value={goalLabel} onEdit={() => goToStep(4)} />
        <ReviewRow
          label="Target weight"
          value={`${state.targetWeightKg} kg`}
          onEdit={() => goToStep(6)}
        />
        <ReviewRow label="Activity" value={actLabel} onEdit={() => goToStep(7)} />
        <ReviewRow label="Allergies" value={allergyStr} onEdit={() => goToStep(8)} />
        <ReviewRow label="Conditions" value={condStr} onEdit={() => goToStep(8)} />
        <ReviewRow label="Macro style" value={macroLabel} onEdit={() => goToStep(9)} />
        <ReviewRow label="Diet" value={dietLabel} onEdit={() => goToStep(9)} />
      </div>
    </div>
  );
}

export function Step11Legal({ state, setState }: WizardStepProps) {
  return (
    <div className="space-y-5">
      <header>
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-[1.65rem]">
          Privacy & terms
        </h1>
        <p className={`mt-2 ${bodyMuted}`}>
          Your health data is used to personalize meals and portions. We store it securely and
          never sell it.
        </p>
      </header>
      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border-subtle bg-surface p-4">
        <input
          type="checkbox"
          checked={state.termsAccepted}
          onChange={(e) =>
            setState((s) => ({ ...s, termsAccepted: e.target.checked }))
          }
          className="mt-1 h-4 w-4 rounded border-border-subtle text-primary focus:ring-primary"
        />
        <span className="text-sm font-medium text-foreground">
          I agree to the processing of my data for account setup and meal personalization, and I
          confirm I have read the relevant terms and privacy information.
        </span>
      </label>
    </div>
  );
}

export function Step12Submit() {
  return (
    <div className="space-y-4 text-center">
      <header>
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-[1.65rem]">
          You&apos;re ready
        </h1>
        <p className={`mt-2 ${bodyMuted}`}>
          Tap create account to finish. You can refine preferences anytime in your profile.
        </p>
      </header>
      <p className="text-xs text-secondary-text/90">Don&apos;t worry, your data is secure with us.</p>
    </div>
  );
}
