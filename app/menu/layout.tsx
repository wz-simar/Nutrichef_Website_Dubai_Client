import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "This Week's Menu — 80+ Chef-Crafted Dishes | NutriChef Dubai & UAE",
  description:
    "Browse NutriChef's rotating weekly menu: 80+ restaurant-calibre, macro-engineered dishes — high protein, low carb, keto, balanced, and vegetarian — cooked fresh each morning and delivered across Dubai, Abu Dhabi & Sharjah.",
  path: "/menu",
  keywords: [
    "healthy menu Dubai",
    "weekly meal menu UAE",
    "high protein meals Dubai",
    "keto meals Dubai menu",
  ],
});

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
