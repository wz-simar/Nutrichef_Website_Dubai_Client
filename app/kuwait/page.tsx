import type { Metadata } from "next";
import { MarketLanding } from "@/components/markets/MarketLanding";
import { buildPageMetadata } from "@/lib/metadata";
import { getRegion } from "@/lib/regions";

const region = getRegion("kw");

export const metadata: Metadata = buildPageMetadata({
  title: "Premium Meal Plan Delivery Kuwait | Kuwait City & Salmiya — NutriChef",
  description:
    "NutriChef is bringing private-chef meal plans to Kuwait — Kuwait City, Salmiya & Jabriya. Chef-crafted, nutritionist-signed meals delivered fresh daily. Join the priority list for founding-member pricing.",
  path: region.path,
  keywords: [
    "meal plan delivery Kuwait",
    "healthy meal delivery Kuwait City",
    "meal subscription Salmiya",
    "premium meal prep Kuwait",
    "chef meal plans Kuwait",
  ],
});

export default function KuwaitPage() {
  return <MarketLanding region={region} />;
}
