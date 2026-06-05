import type { Metadata } from "next";
import Link from "next/link";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FAQ_ITEMS } from "@/lib/faqs";
import { buildPageMetadata } from "@/lib/metadata";
import { CONTACT } from "@/lib/site-config";

export const metadata: Metadata = buildPageMetadata({
  title: "FAQ — NutriChef Healthy Meal Delivery Dubai",
  description:
    "Answers to common questions about NutriChef meal plans in Dubai — pricing, delivery areas, weight loss, high protein, keto, pause & cancel, and more.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border-subtle bg-bg-light pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-10">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-secondary-text">
            Support
          </p>
          <h1 className="font-heading mt-3 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            Frequently asked questions
          </h1>
          <p className="mt-4 text-lg text-secondary-text">
            Everything you need to know about NutriChef meal delivery in Dubai
            and the UAE.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-10">
          <FAQAccordion items={FAQ_ITEMS} defaultOpenIndex={0} />
          <p className="mt-12 text-center text-secondary-text">
            Still have questions?{" "}
            <Link
              href="/contact-us"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              Contact us
            </Link>{" "}
            or message us on{" "}
            <a
              href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              WhatsApp
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
