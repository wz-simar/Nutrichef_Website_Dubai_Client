"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { caloBlogImage } from "@/lib/calo-images";
import { Button } from "../Button";

const steps = [
  {
    id: 1,
    title: "Tell us your ambition",
    description:
      "Two minutes. Your goals, your schedule, your non-negotiables. Our nutritionist turns them into a plan with your name on it.",
    image: caloBlogImage("imaghe-37.webp"),
  },
  {
    id: 2,
    title: "Your brigade gets to work",
    description:
      "Every dish is cooked fresh that morning by our chef team — never frozen, never batch-warmed — and signed off against your macros.",
    image: caloBlogImage("imaghe-9-1.webp"),
  },
  {
    id: 3,
    title: "It's at your door by 10 AM",
    description:
      "Villa, penthouse, or boardroom — your meals arrive chilled and ready before your day begins. Three minutes to plate. Zero thought required.",
    image: caloBlogImage("imaghe-7.webp"),
  },
];

export const HowItWorks = () => {
  const router = useRouter();
  return (
    <section className="w-full bg-surface py-24">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20 flex flex-col items-center text-center">
          <p className="font-heading mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            Effortless by design
          </p>
          <h2 className="font-heading mb-4 text-[36px] font-semibold tracking-tight text-foreground md:text-[44px]">
            From first call to first bite
          </h2>
          <p className="mb-8 text-[17px] font-medium text-secondary-text md:text-[18px]">
            Three steps. Then your nutrition runs itself — forever.
          </p>
          <Button type="button" size="lg" onClick={() => router.push("/plans")}>
            Design my plan
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-10 pt-2 md:grid-cols-3 md:gap-6 lg:gap-10 lg:px-4">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col">
              <div className="relative mb-7">
                <div className="absolute -left-[14px] -top-[18px] z-10 flex h-[42px] w-[42px] items-center justify-center rounded-full border-[5px] border-surface bg-emerald-deep text-[18px] font-black text-gold-soft shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                  {step.id}
                </div>
                <div className="relative aspect-[1/1.05] w-full overflow-hidden rounded-[28px] bg-bg-light shadow-sm">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>

              <h3 className="font-heading mb-3 text-[20px] font-semibold leading-tight tracking-tight text-foreground lg:text-[22px]">
                {step.title}
              </h3>
              <p className="text-[15px] font-medium leading-[1.6] text-secondary-text">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
