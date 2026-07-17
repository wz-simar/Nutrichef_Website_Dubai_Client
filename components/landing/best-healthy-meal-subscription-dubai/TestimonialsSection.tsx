import React from "react";
import Link from "next/link";
import { testimonials } from "@/content/best-healthy-meal-subscription-dubai";

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
            Reviews
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            {testimonials.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-secondary-text sm:text-lg">
            {testimonials.intro}
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.items.map((item) => (
            <article
              key={item.name}
              className="rounded-2xl border border-border-subtle bg-bg-light p-6 sm:p-8"
            >
              <StarRating />
              <blockquote className="mt-4 text-[0.9375rem] leading-relaxed text-secondary-text">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <footer className="mt-6 border-t border-border-subtle pt-4">
                <p className="font-heading font-semibold text-foreground">
                  {item.name}
                </p>
                <p className="mt-1 text-sm text-secondary-text">
                  {item.goal} · {item.area}
                </p>
              </footer>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href={testimonials.reviewsLink.href}
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            {testimonials.reviewsLink.label} →
          </Link>
        </div>
      </div>
    </section>
  );
}
