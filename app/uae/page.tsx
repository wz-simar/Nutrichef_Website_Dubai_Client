import type { Metadata } from "next";
import { MarketLanding } from "@/components/markets/MarketLanding";
import { buildPageMetadata } from "@/lib/metadata";
import { getRegion } from "@/lib/regions";
import { STARTING_PRICE_PER_MEAL_AED } from "@/lib/site-config";

const region = getRegion("ae");

export const metadata: Metadata = buildPageMetadata({
  title: "Premium Meal Plan Delivery UAE | Dubai, Abu Dhabi & Sharjah — NutriChef",
  description: `Private-chef meal plans delivered fresh every morning across Dubai, Abu Dhabi & Sharjah. 80+ rotating dishes, nutritionist-signed macros, delivery before 10 AM. From AED ${STARTING_PRICE_PER_MEAL_AED}/meal — pause anytime.`,
  path: region.path,
  keywords: [
    "meal plan delivery UAE",
    "premium meal delivery Dubai",
    "healthy food subscription Abu Dhabi",
    "chef meal plans Sharjah",
    "luxury meal prep UAE",
  ],
});

export default function UaePage() {
  return <MarketLanding region={region} />;
}
