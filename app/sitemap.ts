import type { MetadataRoute } from "next";
import { fetchMealPlanTemplateIds } from "@/lib/fetchMealPlanTemplateIds";
import { SITE_URL } from "@/lib/site-config";

export const revalidate = 3600;

const staticRoutes = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/menu", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/plans", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/why-us", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/community", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/faq", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/contact-us", priority: 0.8, changeFrequency: "monthly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticEntries = staticRoutes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));

  const templateIds = await fetchMealPlanTemplateIds();
  const mealPlanEntries = templateIds.map((id) => ({
    url: `${SITE_URL}/meal-plans/${id}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...staticEntries, ...mealPlanEntries];
}
