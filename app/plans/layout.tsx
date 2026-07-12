import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Design Your Meal Plan — Live Pricing & Custom Macros | NutriChef UAE",
  description:
    "Build your private-chef meal plan in two minutes: balanced, high protein, low-carb, keto, or fully custom macros. Live pricing, flexible 1–4 week subscriptions, free morning delivery across Dubai, Abu Dhabi & Sharjah.",
  path: "/plans",
  keywords: [
    "meal plan pricing Dubai",
    "custom macro meal plan UAE",
    "build meal plan Dubai",
    "meal subscription pricing UAE",
  ],
});

export default function PlansLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
