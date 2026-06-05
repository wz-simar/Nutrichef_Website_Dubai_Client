"use client";

import React, { useState } from "react";
import type { FaqItem } from "@/lib/faqs";

interface FAQAccordionProps {
  items: FaqItem[];
  defaultOpenIndex?: number | null;
}

export function FAQAccordion({
  items,
  defaultOpenIndex = 0,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <div className="border-t border-border-subtle">
      {items.map((faq, idx) => {
        const open = openIndex === idx;
        return (
          <div key={faq.question} className="border-b border-border-subtle">
            <button
              type="button"
              className="w-full py-6 text-left transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:py-7"
              onClick={() => setOpenIndex(open ? null : idx)}
              aria-expanded={open}
            >
              <span className="flex items-center gap-4 sm:gap-6">
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-lg border text-sm font-bold transition sm:size-9 ${
                    open
                      ? "border-primary bg-primary text-white"
                      : "border-border-subtle bg-surface text-secondary-text"
                  }`}
                  aria-hidden
                >
                  {open ? "−" : "+"}
                </span>
                <span
                  className={`font-heading flex-1 text-lg font-semibold leading-snug sm:text-xl ${
                    open ? "text-primary" : "text-foreground"
                  }`}
                >
                  {faq.question}
                </span>
              </span>
              <div
                className={`grid pl-12 transition-[grid-template-rows] duration-300 ease-out sm:pl-[3.75rem] ${
                  open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="min-h-0 overflow-hidden">
                  <p className="pt-4 text-[0.9375rem] leading-relaxed text-secondary-text sm:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}
