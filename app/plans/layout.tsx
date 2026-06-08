import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Meal Plans & Pricing — NutriChef Dubai",
  description:
    "Choose your perfect NutriChef meal plan in Dubai. Balanced, high protein, low-carb, keto, and custom macro plans with flexible subscriptions and free delivery.",
  path: "/plans",
});

export default function PlansLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
