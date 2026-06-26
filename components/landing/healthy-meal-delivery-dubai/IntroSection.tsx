import React from "react";
import { ProseBlock } from "@/components/landing/shared/ProseBlock";
import { intro } from "@/content/healthy-meal-delivery-dubai";

export function IntroSection() {
  return (
    <section className="border-b border-border-subtle bg-surface py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <ProseBlock paragraphs={intro.paragraphs} />
        </div>
      </div>
    </section>
  );
}
