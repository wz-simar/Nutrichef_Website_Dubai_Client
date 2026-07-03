/** Public asset paths for blog images. Filename slug should match the related H2/H3 heading. */
export function blogImagePath(slugFolder: string, filename: string): string {
  return `/blogs/${slugFolder}/${filename}`;
}

export const TOP5_BLOG_ASSETS = {
  slugFolder: "top-5-healthy-meal-delivery-services-in-dubai",
  /** H1 / title — Top 5 Healthy Meal Delivery Services */
  hero: blogImagePath(
    "top-5-healthy-meal-delivery-services-in-dubai",
    "top-5-healthy-meal-delivery-services.webp",
  ),
  /** H2 — 1. NutriChef — Best Overall Healthy Meal Delivery in Dubai */
  nutrichef: blogImagePath(
    "top-5-healthy-meal-delivery-services-in-dubai",
    "1-nutrichef-best-overall-healthy-meal-delivery-in-dubai.webp",
  ),
  /** H3 — Ramadan Meal Plans in Dubai */
  ramadan: blogImagePath(
    "top-5-healthy-meal-delivery-services-in-dubai",
    "ramadan-meal-plans-in-dubai.webp",
  ),
} as const;
