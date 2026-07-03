import type { BlogPost } from "@/lib/blog/types";
import { top5HealthyMealDeliveryServicesInDubai } from "@/content/blogs/top-5-healthy-meal-delivery-services-in-dubai";

/** Central registry — add every published blog post here. */
export const BLOG_REGISTRY: Record<string, BlogPost> = {
  [top5HealthyMealDeliveryServicesInDubai.slug]: top5HealthyMealDeliveryServicesInDubai,
};

export const BLOG_SLUGS = Object.keys(BLOG_REGISTRY);

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_REGISTRY[slug];
}

export function getAllBlogPosts(): BlogPost[] {
  return Object.values(BLOG_REGISTRY);
}
