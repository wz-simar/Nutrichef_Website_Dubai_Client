"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { leadCapture } from "@/content/best-healthy-meal-subscription-dubai";
import { whatsappLink } from "@/lib/site-config";

export function LeadCaptureSection() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [goal, setGoal] = useState(leadCapture.goalOptions[0]);
  const [mealsPerWeek, setMealsPerWeek] = useState("10");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      goal: goal.toLowerCase().replace(/\s+/g, "-"),
      meals: mealsPerWeek,
    });
    if (name.trim()) params.set("name", name.trim());
    router.push(`/plans?${params.toString()}`);
  };

  return (
    <section
      id="pricing-form"
      className="border-b border-border-subtle bg-surface py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-secondary-text">
              Get started
            </p>
            <h2 className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
              {leadCapture.heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-secondary-text sm:text-lg">
              {leadCapture.intro}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border-subtle bg-bg-light p-6 shadow-sm sm:p-8 lg:col-span-7"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-foreground">
                  Name
                </span>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-12 w-full rounded-xl border border-border-subtle bg-surface px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Your first name"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-foreground">
                  Goal
                </span>
                <select
                  name="goal"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="h-12 w-full rounded-xl border border-border-subtle bg-surface px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  {leadCapture.goalOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-foreground">
                  Meals per week
                </span>
                <input
                  type="number"
                  name="mealsPerWeek"
                  min={5}
                  max={21}
                  value={mealsPerWeek}
                  onChange={(e) => setMealsPerWeek(e.target.value)}
                  required
                  className="h-12 w-full rounded-xl border border-border-subtle bg-surface px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-foreground">
                  WhatsApp number
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="h-12 w-full rounded-xl border border-border-subtle bg-surface px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="+971 50 123 4567"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex h-14 w-full items-center justify-center rounded-xl bg-primary text-base font-semibold text-white shadow-sm transition hover:bg-primary-hover sm:w-auto sm:px-10"
            >
              {leadCapture.submitLabel}
            </button>

            <p className="mt-4 text-sm text-secondary-text">
              {leadCapture.note}{" "}
              <a
                href={whatsappLink(
                  "Hi NutriChef, I'd like to check my meal plan price.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                Chat on WhatsApp
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
