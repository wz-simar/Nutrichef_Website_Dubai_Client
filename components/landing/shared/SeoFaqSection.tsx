"use client";

import React, { useState } from "react";
import { FaqPricingAnswer } from "@/components/landing/shared/FaqPricingAnswer";

export interface FaqItem {
  question: string;
  answer?: string;
  answerKey?: "pricing";
}

interface SeoFaqSectionProps {
  heading: string;
  items: FaqItem[];
}

function renderAnswerContent(item: FaqItem) {
  if (item.answerKey === "pricing") {
    return <FaqPricingAnswer />;
  }
  return item.answer;
}

export function SeoFaqSection({ heading, items }: SeoFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="border-t border-border-subtle bg-background py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:max-w-6xl lg:px-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4 lg:pt-2">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-secondary-text">
              Support
            </p>
            <h2 className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
              {heading}
            </h2>
          </div>

          <div className="mt-12 border-t border-border-subtle lg:col-span-8 lg:mt-0">
            {items.map((faq, idx) => {
              const open = openIndex === idx;
              const answerContent = renderAnswerContent(faq);

              return (
                <div key={faq.question} className="border-b border-border-subtle">
                  <button
                    type="button"
                    className="flex w-full items-start gap-4 py-6 text-left transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:gap-6 sm:py-7"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={open}
                  >
                    <span
                      className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-sm font-bold transition sm:h-9 sm:w-9 ${
                        open
                          ? "border-primary bg-primary text-white"
                          : "border-border-subtle bg-surface text-secondary-text"
                      }`}
                      aria-hidden
                    >
                      {open ? "−" : "+"}
                    </span>
                    <span className="flex-1">
                      <span
                        className={`font-heading block text-lg font-semibold leading-snug sm:text-xl ${
                          open ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {faq.question}
                      </span>
                      <div
                        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <div className="pt-4 text-[0.9375rem] leading-relaxed text-secondary-text sm:text-base">
                            {answerContent}
                          </div>
                        </div>
                      </div>
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
