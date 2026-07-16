import React from "react";
import Link from "next/link";
import { NutrichefLogo } from "@/components/NutrichefLogo";
import { GoogleTranslate } from "@/components/GoogleTranslate";
import { SocialLinks } from "@/components/SocialLinks";
import { CONTACT, whatsappLink } from "@/lib/site-config";
import { REGIONS } from "@/lib/regions";

const planLinks = [
  { href: "/plans", label: "Build Your Meal Plan" },
  { href: "/menu", label: "This Week's Menu" },
  { href: "/subscribe", label: "Subscribe & Save" },
  { href: "/plans", label: "High-Protein Meal Plans" },
  { href: "/plans", label: "Low-Carb & Keto Plans" },
  { href: "/plans", label: "Custom Macro Plans" },
] as const;

const companyLinks = [
  { href: "/why-us", label: "Why NutriChef" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact-us", label: "Contact & Concierge" },
] as const;

const resourceLinks = [
  { href: "/healthy-meal-delivery-dubai", label: "Healthy Meal Delivery Dubai" },
  {
    href: "/blogs/Top-5-Healthy-Meal-Delivery-Services-in-Dubai",
    label: "Top 5 Meal Delivery Services in Dubai",
  },
  {
    href: "/blogs/Office-Meal-Delivery-Dubai",
    label: "Office Meal Delivery Dubai",
  },
] as const;

export const Footer = () => {
  return (
    <footer className="border-t border-border-subtle bg-emerald-deep text-background">
      {/* Conversion band: subscribe CTA above the link columns */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="max-w-xl">
            <h2 className="font-heading text-2xl font-semibold leading-tight text-white sm:text-3xl">
              Your chef is ready. Your table is set.
            </h2>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/65">
              Never think about &ldquo;what&rsquo;s for lunch&rdquo; again.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/plans"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover"
            >
              Start my plan
            </Link>
            <Link
              href="/subscribe"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 px-7 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Subscribe &amp; save
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link href="/" className="mb-8 inline-block" aria-label="NutriChef home">
              <NutrichefLogo onDark />
            </Link>
            <p className="max-w-sm text-[0.9375rem] leading-relaxed text-background/70">
              Private-chef nutrition, delivered. Nutritionist-signed, chef-crafted
              meal plans at your door before 10 AM — across Dubai, Abu Dhabi, and
              Sharjah today; Saudi Arabia, Qatar, and Kuwait next.
            </p>
            <div className="mt-6">
              <SocialLinks onDark />
            </div>
            <div className="mt-8 max-w-[280px] rounded-xl border border-background/15 bg-background/[0.06] p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-background/50">
                Language
              </p>
              <GoogleTranslate />
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-3">
            <nav aria-label="Meal plans">
              <h3 className="font-heading mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-background/50">
                Meal Plans
              </h3>
              <ul className="space-y-3 text-sm">
                {planLinks.map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-background/75 transition hover:text-gold-soft"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Company">
              <h3 className="font-heading mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-background/50">
                Company
              </h3>
              <ul className="space-y-3 text-sm">
                {companyLinks.map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-background/75 transition hover:text-gold-soft"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <h3 className="font-heading mb-5 mt-9 text-sm font-semibold uppercase tracking-[0.2em] text-background/50">
                Guides
              </h3>
              <ul className="space-y-3 text-sm">
                {resourceLinks.map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-background/75 transition hover:text-gold-soft"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Markets">
              <h3 className="font-heading mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-background/50">
                Our Markets
              </h3>
              <ul className="space-y-3 text-sm">
                {REGIONS.map((r) => (
                  <li key={r.code}>
                    <Link
                      href={r.path}
                      className="inline-flex items-center gap-2 text-background/75 transition hover:text-gold-soft"
                    >
                      <span aria-hidden>{r.flag}</span>
                      <span>
                        {r.name}
                        {r.status === "waitlist" ? (
                          <span className="ml-1.5 rounded-full border border-background/25 px-1.5 py-px text-[0.625rem] font-semibold uppercase tracking-wide text-background/55">
                            Soon
                          </span>
                        ) : null}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-heading mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-background/50">
              Concierge
            </h3>
            <ul className="space-y-4 text-sm text-background/75">
              <li>
                <span className="block text-xs uppercase tracking-wider text-background/45">
                  Phone
                </span>
                <a
                  href={`tel:${CONTACT.phoneTel}`}
                  className="mt-1 inline-block transition hover:text-gold-soft"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <span className="block text-xs uppercase tracking-wider text-background/45">
                  Email
                </span>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="mt-1 inline-block transition hover:text-gold-soft"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <span className="block text-xs uppercase tracking-wider text-background/45">
                  WhatsApp
                </span>
                <a
                  href={whatsappLink("Hi NutriChef, I'd like to speak to your nutrition concierge.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block transition hover:text-gold-soft"
                >
                  {CONTACT.whatsapp}
                </a>
              </li>
              <li>
                <span className="block text-xs uppercase tracking-wider text-background/45">
                  Kitchen &amp; HQ
                </span>
                <p className="mt-1 leading-relaxed">{CONTACT.address}</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-background/10 pt-10 text-sm text-background/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} NutriChef. Private-chef nutrition,
            delivered across the GCC. All rights reserved.
          </p>
          <p className="text-xs text-background/40">
            🇦🇪 UAE · 🇸🇦 KSA · 🇶🇦 Qatar · 🇰🇼 Kuwait
          </p>
        </div>
      </div>
    </footer>
  );
};
