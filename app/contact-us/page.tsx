import type { Metadata } from "next";
import Link from "next/link";
import { GoogleMapsEmbed } from "@/components/GoogleMapsEmbed";
import { SocialLinks } from "@/components/SocialLinks";
import { buildPageMetadata } from "@/lib/metadata";
import { CONTACT, DELIVERY_ZONES_TEXT } from "@/lib/site-config";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact & Concierge — NutriChef | Private-Chef Meal Plans UAE",
  description:
    "Reach the NutriChef concierge by phone, email, or WhatsApp — plan advice, delivery coverage, corporate and family accounts. Delivering across Dubai, Abu Dhabi & Sharjah; KSA, Qatar & Kuwait next.",
  path: "/contact-us",
  keywords: [
    "contact NutriChef",
    "meal plan concierge Dubai",
    "corporate meal delivery UAE contact",
  ],
});

export default function ContactUsPage() {
  const whatsappHref = `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hi NutriChef, I have a question about your meal plans.")}`;

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border-subtle bg-bg-light pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            Concierge
          </p>
          <h1 className="font-heading mt-3 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            A human answers. Always.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-secondary-text">
            {DELIVERY_ZONES_TEXT}. Plan advice, delivery coverage, corporate and
            family accounts — our concierge replies in minutes.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-heading text-2xl font-semibold text-foreground">
                Get in touch
              </h2>
              <ul className="mt-8 space-y-6 text-[0.9375rem] leading-relaxed text-secondary-text sm:text-base">
                <li>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-foreground/60">
                    Phone
                  </span>
                  <a
                    href={`tel:${CONTACT.phoneTel}`}
                    className="mt-1 inline-block font-semibold text-foreground transition hover:text-primary"
                  >
                    {CONTACT.phone}
                  </a>
                </li>
                <li>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-foreground/60">
                    Email
                  </span>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="mt-1 inline-block font-semibold text-foreground transition hover:text-primary"
                  >
                    {CONTACT.email}
                  </a>
                </li>
                <li>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-foreground/60">
                    WhatsApp
                  </span>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block font-semibold text-foreground transition hover:text-primary"
                  >
                    {CONTACT.whatsapp}
                  </a>
                </li>
                <li>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-foreground/60">
                    Address
                  </span>
                  <p className="mt-1 font-semibold text-foreground">
                    {CONTACT.address}
                  </p>
                </li>
                <li>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-foreground/60">
                    Delivery zones
                  </span>
                  <p className="mt-1 font-semibold text-foreground">
                    {DELIVERY_ZONES_TEXT}
                  </p>
                </li>
              </ul>

              <div className="mt-10">
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground/60">
                  Follow us
                </p>
                <SocialLinks />
              </div>

              <p className="mt-10 text-sm text-secondary-text">
                Looking for answers? Check our{" "}
                <Link
                  href="/faq"
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  FAQ page
                </Link>
                .
              </p>
            </div>

            <div>
              <h2 className="font-heading mb-6 text-2xl font-semibold text-foreground">
                Our location
              </h2>
              <GoogleMapsEmbed />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
