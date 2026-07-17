import React from "react";
import { ProseBlock } from "@/components/landing/shared/ProseBlock";
import { realProblem } from "@/content/best-healthy-meal-subscription-dubai";

export function ProblemSection() {
  return (
    <section className="border-b border-border-subtle bg-surface py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <ProseBlock
              eyebrow="The real problem"
              heading={realProblem.heading}
              paragraphs={[realProblem.intro]}
            />
          </div>
          <ol className="lg:col-span-7 lg:pt-10">
            {realProblem.painPoints.map((point, index) => (
              <li
                key={point.slice(0, 40)}
                className="flex gap-4 border-b border-border-subtle py-6 first:pt-0 last:border-b-0 last:pb-0"
              >
                <span className="font-heading flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-bg-light text-sm font-bold text-primary">
                  {index + 1}
                </span>
                <p className="text-[0.9375rem] leading-relaxed text-secondary-text sm:text-base">
                  {point}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
