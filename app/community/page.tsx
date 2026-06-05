import type { Metadata } from "next";
import { CommunitySection } from "@/components/home/CommunitySection";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Community — NutriChef Dubai Meal Plans",
  description:
    "Real results, real stories from the NutriChef community across Dubai and the UAE. See how our customers hit their health and fitness goals.",
  path: "/community",
});

export default function CommunityPage() {
  return (
    <div className="flex flex-col">
      <section className="border-b border-border-subtle bg-surface pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-secondary-text">
            Community
          </p>
          <h1 className="font-heading mt-3 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            From the NutriChef community
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-secondary-text">
            Real results, real stories from customers across Dubai and the UAE.
          </p>
        </div>
      </section>
      <CommunitySection />
      <InstagramFeed />
    </div>
  );
}
