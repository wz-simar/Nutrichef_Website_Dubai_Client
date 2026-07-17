import React from "react";
import { ProseBlock } from "@/components/landing/shared/ProseBlock";
import { promise } from "@/content/best-healthy-meal-subscription-dubai";

export function PromiseSection() {
  return (
    <section className="border-b border-border-subtle bg-bg-light py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <ProseBlock
            eyebrow="The promise"
            heading={promise.heading}
            paragraphs={[promise.paragraph]}
            headingClassName="mx-auto"
          />
        </div>
      </div>
    </section>
  );
}
