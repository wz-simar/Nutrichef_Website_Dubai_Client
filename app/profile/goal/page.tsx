"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useRequireAuth } from "@/lib/useRequireAuth";
import { GOAL_OPTIONS } from "@/lib/registerApiMapping";

/**
 * Re-ask diet plan category (questions only). Saves to user.goal — /plans reads it.
 */
export default function ProfileGoalPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
  const { user, refreshUser } = useAuth();
  const [goal, setGoal] = useState(user?.goal || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (user?.goal) setGoal(user.goal);
  }, [user?.goal]);

  if (authLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-secondary-text">
        Loading…
      </div>
    );
  }

  const save = async () => {
    if (!goal) {
      setError("Please choose a diet plan category");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await api.put("/user/profile", { goal });
      await refreshUser();
      router.push("/plans");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Could not save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="mx-auto max-w-xl px-5 py-12 sm:px-8">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-secondary-text">
        Questions
      </p>
      <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-[1.65rem]">
        Which diet plan category?
      </h1>
      <p className="mt-2 text-sm text-secondary-text">
        This is the only place we ask. Your plans page will use this programme for pricing and
        checkout.
      </p>

      <div className="mt-8 flex flex-col gap-3" role="radiogroup" aria-label="Diet plan category">
        {GOAL_OPTIONS.map((g) => {
          const sel = goal === g.api;
          return (
            <button
              key={g.api}
              type="button"
              role="radio"
              aria-checked={sel}
              onClick={() => setGoal(g.api)}
              className={`flex w-full items-start gap-3 rounded-2xl border-2 px-4 py-3.5 text-left transition-colors ${
                sel
                  ? "border-transparent bg-foreground shadow-md"
                  : "border-border-subtle bg-surface hover:border-foreground/15"
              }`}
            >
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-semibold ${sel ? "text-primary" : "text-foreground"}`}>
                  {g.label}
                </p>
                <p
                  className={`mt-0.5 text-xs leading-snug ${sel ? "text-white/75" : "text-secondary-text"}`}
                >
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

      {error ? (
        <p className="mt-4 text-sm font-semibold text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => void save()}
          disabled={saving}
          className="min-h-11 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save & continue to plans"}
        </button>
        <Link
          href="/plans"
          className="inline-flex min-h-11 items-center rounded-full border border-border-subtle px-6 py-3 text-sm font-semibold text-foreground"
        >
          Cancel
        </Link>
      </div>
    </main>
  );
}
