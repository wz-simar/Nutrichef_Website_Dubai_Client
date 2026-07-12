import type { Metadata } from "next";
import Link from "next/link";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FAQ_ITEMS } from "@/lib/faqs";
import { buildPageMetadata } from "@/lib/metadata";
import { whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = buildPageMetadata({
  title: "FAQ — Private-Chef Meal Plans in Dubai, UAE & the GCC | NutriChef",
  description:
    "Everything discerning clients ask before subscribing to NutriChef: pricing from AED 99/day, delivery areas across Dubai, Abu Dhabi & Sharjah, custom macros, pause & cancel policy, and GCC expansion to KSA, Qatar & Kuwait.",
  path: "/faq",
  keywords: [
    "NutriChef FAQ",
    "meal plan questions Dubai",
    "meal delivery pricing UAE",
    "pause meal subscription Dubai",
  ],
});

function FaqSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-background">
      <FaqSchema />
      <section className="border-b border-border-subtle bg-bg-light pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-10">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            Support
          </p>
          <h1 className="font-heading mt-3 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            Questions worth asking
          </h1>
          <p className="mt-4 text-lg text-secondary-text">
            Straight answers on pricing, delivery, flexibility, and our GCC
            expansion — before you commit a single dirham.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-10">
          <FAQAccordion items={FAQ_ITEMS} defaultOpenIndex={0} />
          <p className="mt-12 text-center text-secondary-text">
            Prefer a human?{" "}
            <Link
              href="/contact-us"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              Contact our concierge
            </Link>{" "}
            or message us on{" "}
            <a
              href={whatsappLink("Hi NutriChef, I have a question before I subscribe.")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              WhatsApp
            </a>{" "}
            — replies in minutes, not days. Ready now?{" "}
            <Link
              href="/plans"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              Design your plan
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
