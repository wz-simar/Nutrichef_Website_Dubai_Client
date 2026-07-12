import type { Metadata } from "next";
import { MarketLanding } from "@/components/markets/MarketLanding";
import { buildPageMetadata } from "@/lib/metadata";
import { getRegion } from "@/lib/regions";

const region = getRegion("qa");

export const metadata: Metadata = buildPageMetadata({
  title: "Premium Meal Plan Delivery Qatar | Doha & Lusail — NutriChef",
  description:
    "NutriChef is bringing private-chef meal plans to Qatar — Doha, Lusail & The Pearl. Chef-crafted, macro-engineered meals delivered fresh daily. Join the priority list for founding-member pricing.",
  path: region.path,
  keywords: [
    "meal plan delivery Qatar",
    "healthy meal delivery Doha",
    "meal subscription Lusail",
    "premium meal prep Qatar",
    "chef meal plans Doha",
  ],
});

export default function QatarPage() {
  return <MarketLanding region={region} />;
}
