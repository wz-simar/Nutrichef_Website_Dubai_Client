import React from "react";
import { ImagePlaceholder } from "@/components/landing/shared/ImagePlaceholder";
import { testimonials } from "@/content/healthy-meal-delivery-dubai";

function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-primary" aria-hidden>
          ★
        </span>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="border-b border-border-subtle bg-surface py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-secondary-text">
            Testimonials
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            {testimonials.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-secondary-text sm:text-lg">
            {testimonials.intro}
          </p>
        </div>

        <div className="mt-10 flex justify-start">
          <ImagePlaceholder
            label="Google review rating badge"
            aspect="wide"
            className="h-20 w-48"
          />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.placeholders.map((review) => (
            <article
              key={review.location}
              className="rounded-2xl border border-border-subtle bg-bg-light p-6 sm:p-8"
            >
              <div className="flex items-center gap-4">
                <ImagePlaceholder
                  label="Customer photo"
                  aspect={null}
                  className="h-14 w-14 shrink-0 rounded-full text-[10px]"
                />
                <div>
                  <p className="font-heading font-semibold text-foreground">
                    {review.name}
                  </p>
                  <p className="text-sm text-secondary-text">{review.location}</p>
                </div>
              </div>
              <div className="mt-4">
                <StarRating />
              </div>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-secondary-text italic">
                Review coming soon
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
