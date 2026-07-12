import type { Metadata } from "next";
import { MarketLanding } from "@/components/markets/MarketLanding";
import { buildPageMetadata } from "@/lib/metadata";
import { getRegion } from "@/lib/regions";

const region = getRegion("sa");

export const metadata: Metadata = buildPageMetadata({
  title: "Premium Meal Plan Delivery Saudi Arabia | Riyadh & Jeddah — NutriChef",
  description:
    "NutriChef is bringing private-chef meal plans to Saudi Arabia — Riyadh, Jeddah & Khobar. Chef-crafted, nutritionist-signed meals delivered fresh daily. Join the priority list for founding-member pricing.",
  path: region.path,
  keywords: [
    "meal plan delivery Saudi Arabia",
    "healthy meal delivery Riyadh",
    "meal subscription Jeddah",
    "premium meal prep KSA",
    "chef meal plans Riyadh",
  ],
});

export default function SaudiArabiaPage() {
  return <MarketLanding region={region} />;
}
