import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Weekly Menu — NutriChef Dubai",
  description:
    "Browse NutriChef's rotating weekly menu of 80+ chef-crafted meals. High protein, keto, balanced, and vegetarian options delivered fresh daily in Dubai.",
  path: "/menu",
});

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
