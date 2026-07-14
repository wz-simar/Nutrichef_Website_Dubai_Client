"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../Button";
import { api } from "@/lib/api";
import { useTenant } from "@/contexts/TenantContext";
import { formatMajorUnits } from "@/lib/formatCurrency";
import {
  type ApiTemplate,
  type CarouselPlanCard,
  templateToCard,
} from "@/lib/mealPlanTemplateDisplay";

export const MealPlansSection = () => {
  const router = useRouter();
  const { currency } = useTenant();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [plans, setPlans] = useState<CarouselPlanCard[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTemplates = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get<{ templates: ApiTemplate[] }>("/menu/list?type=templates", {
        noAuth: true,
      });
      const list = res.data?.templates ?? [];
      setPlans(list.map((t) => templateToCard(t)));
    } catch {
      setPlans([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchTemplates();
  }, [fetchTemplates]);

  const hasPlans = plans.length > 0;

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -360 : 360;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 bg-surface overflow-hidden w-full">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 w-full mb-10 lg:mb-12">
        <h2 className="font-heading text-[36px] md:text-[44px] font-semibold text-foreground mb-2 tracking-tight">
          Find your plan
        </h2>
        <p className="text-secondary-text font-semibold text-[15px] mb-8">
          From{" "}
          {formatMajorUnits(45, currency, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          /meal
        </p>

        <div className="flex justify-between items-center w-full">
          <Button
            type="button"
            onClick={() => router.push("/plans")}
            className="px-8 rounded-full h-[46px] text-[15px]"
          >
            Start my plan →
          </Button>

          <div className="flex gap-3 hidden md:flex">
            <button
              onClick={() => scroll("left")}
              className="w-[44px] h-[44px] rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-colors"
              aria-label="Scroll left"
              type="button"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-[44px] h-[44px] rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-colors"
              aria-label="Scroll right"
              type="button"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="w-full">
        <style>{`
                    .no-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .no-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}</style>
        {loading ? (
          <div className="flex gap-[18px] md:gap-[24px] overflow-hidden pl-4 sm:pl-6 lg:pl-12 pr-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="min-w-[280px] md:min-w-[320px] lg:min-w-[340px] h-[360px] rounded-[28px] bg-[#E5E7EB] animate-pulse shrink-0"
              />
            ))}
          </div>
        ) : !hasPlans ? (
          <p className="text-center text-[15px] text-[#878E99] font-medium px-6 pb-8">
            No meal plan templates yet.
          </p>
        ) : (
          <div
            ref={scrollContainerRef}
            className="flex gap-[18px] md:gap-[24px] overflow-x-auto no-scrollbar pb-8 snap-x pl-4 sm:pl-6 lg:pl-12 2xl:pl-[calc((100vw-1400px)/2+48px)] pr-4 sm:pr-6 lg:pr-12"
          >
            {plans.map((plan) => (
              <Link
                key={plan.id}
                href={`/meal-plans/${plan.id}`}
                className="min-w-[280px] md:min-w-[320px] lg:min-w-[340px] snap-start relative rounded-[28px] overflow-hidden aspect-[4/4.5] md:aspect-[4/5] bg-[#F7F7F8] flex-shrink-0 group cursor-pointer shadow-sm block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#249B60] focus-visible:ring-offset-2"
              >
                {plan.image ? (
                  <Image
                    src={plan.image}
                    alt={plan.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 340px"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#ECEFF1]" aria-hidden />
                )}

                <div className="absolute inset-x-3 bottom-3 md:inset-x-4 md:bottom-4 bg-white/95 backdrop-blur-sm rounded-[24px] p-[14px] md:p-4 flex items-center shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                  <div className="w-[38px] h-[38px] md:w-[44px] md:h-[44px] shrink-0 bg-[#F7F7F8] rounded-full flex items-center justify-center text-[20px] md:text-[22px] shadow-sm mr-3 md:mr-4 border border-gray-100/50">
                    {plan.icon}
                  </div>
                  <div className="flex-1 w-full overflow-hidden">
                    <h3 className="text-[#2F3337] font-extrabold text-[13px] md:text-[14px] mb-[6px] truncate">
                      {plan.title}
                    </h3>

                    <div className="flex w-full h-[5px] rounded-full overflow-hidden mb-[6px] gap-[2px] bg-gray-100">
                      <div style={{ width: `${plan.macros.protein}%` }} className="h-full bg-[#8b5cf6]" />
                      <div style={{ width: `${plan.macros.carbs}%` }} className="h-full bg-[#f59e0b]" />
                      <div style={{ width: `${plan.macros.fat}%` }} className="h-full bg-[#60a5fa]" />
                    </div>

                    <div
                      className={`flex w-full text-[8.5px] md:text-[9.5px] font-bold text-[#878E99] ${
                        plan.labels.p === "—" ? "justify-center" : "justify-between"
                      }`}
                    >
                      {plan.labels.p === "—" ? (
                        <span className="text-[9px]">Macros on request</span>
                      ) : (
                        <>
                          <span className={plan.useGramLabels ? "truncate min-w-0 mr-0.5" : ""}>
                            {plan.labels.p}
                          </span>
                          <span className={plan.useGramLabels ? "truncate min-w-0 mx-0.5 text-center" : ""}>
                            {plan.labels.c}
                          </span>
                          <span className={plan.useGramLabels ? "truncate min-w-0 ml-0.5 text-right" : ""}>
                            {plan.labels.f}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
