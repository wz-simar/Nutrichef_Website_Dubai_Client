import React from "react";
import { ProseBlock } from "@/components/landing/shared/ProseBlock";
import { appExperience } from "@/content/best-healthy-meal-subscription-dubai";

export function AppExperienceSection() {
  return (
    <section className="border-b border-border-subtle bg-bg-light py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <ProseBlock
            eyebrow="Ordering"
            heading={appExperience.heading}
            paragraphs={[appExperience.paragraph]}
          />
        </div>
      </div>
    </section>
  );
}
