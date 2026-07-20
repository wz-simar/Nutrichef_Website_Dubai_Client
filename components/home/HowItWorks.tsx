"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../Button";

const steps = [
  {
    id: 1,
    title: "Tell us your goal",
    description: "Two minutes. Your goals become a plan with your name on it.",
    image: "/how-it-works/step-1-meals.png",
    alt: "NutriChef meal spread with salads, grilled chicken, steak, dessert and smoothie",
  },
  {
    id: 2,
    title: "We cook",
    description: "Fresh that morning, checked against your macros.",
    image: "/how-it-works/step-2-protein-wrap.png",
    alt: "Fresh protein wrap with grilled chicken, avocado and greens",
  },
  {
    id: 3,
    title: "You eat",
    description: "At your door before 10 AM. Three minutes to plate.",
    image: "/how-it-works/step-3-beverages.png",
    alt: "Iced coffee beverages and light bites ready to enjoy",
  },
];

export const HowItWorks = () => {
  const router = useRouter();
  return (
    <section className="w-full bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="font-heading text-[36px] font-semibold tracking-tight text-foreground md:text-[44px]">
            How it works
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6 lg:gap-10 lg:px-4">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col">
              <div className="relative mb-6">
                <div className="absolute -left-[14px] -top-[18px] z-10 flex h-[42px] w-[42px] items-center justify-center rounded-full border-[5px] border-surface bg-emerald-deep text-[18px] font-black text-gold-soft shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                  {step.id}
                </div>
                <div className="relative aspect-[1/1.05] w-full overflow-hidden rounded-[28px] bg-bg-light shadow-sm">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>

              <h3 className="font-heading mb-2 text-[20px] font-semibold leading-tight tracking-tight text-foreground lg:text-[22px]">
                {step.title}
              </h3>
              <p className="text-[15px] font-medium leading-[1.6] text-secondary-text">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Button type="button" size="lg" onClick={() => router.push("/plans")}>
            Start my plan →
          </Button>
        </div>
      </div>
    </section>
  );
};
