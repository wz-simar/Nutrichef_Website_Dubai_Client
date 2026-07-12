import type { Metadata } from "next";
import Link from "next/link";
import { CommunitySection } from "@/components/home/CommunitySection";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { SubscribeCTA } from "@/components/home/SubscribeCTA";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Client Stories — The NutriChef Community | Dubai & UAE",
  description:
    "Founders, executives, athletes, and families across Dubai and the UAE share their NutriChef results — real members of the private-chef meal plan trusted across the Emirates.",
  path: "/community",
  keywords: [
    "NutriChef reviews",
    "meal plan results Dubai",
    "NutriChef community UAE",
  ],
});

export default function CommunityPage() {
  return (
    <div className="flex flex-col">
      <section className="border-b border-border-subtle bg-surface pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            In good company
          </p>
          <h1 className="font-heading mt-3 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            The company you&rsquo;ll keep
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-secondary-text">
            Founders, executives, athletes, and families across the Emirates run
            their nutrition on NutriChef. Their results speak in their own words
            — and their own photos.
          </p>
          <div className="mt-8">
            <Link
              href="/plans"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover"
            >
              Join them — design my plan
            </Link>
          </div>
        </div>
      </section>
      <CommunitySection />
      <SubscribeCTA />
      <InstagramFeed />
    </div>
  );
}
