import React from "react";
import { ImagePlaceholder } from "@/components/landing/shared/ImagePlaceholder";
import { ProseBlock } from "@/components/landing/shared/ProseBlock";
import { whyChoose } from "@/content/healthy-meal-delivery-dubai";

export function WhyChooseSection() {
  return (
    <section className="border-b border-border-subtle bg-bg-light py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="lg:col-span-7">
            <ProseBlock
              heading={whyChoose.heading}
              paragraphs={whyChoose.paragraphs}
            />
          </div>
          <div className="lg:col-span-5">
            <ImagePlaceholder
              label="Healthy meal delivery in Dubai"
              aspect="portrait"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
