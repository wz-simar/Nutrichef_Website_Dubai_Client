import type { BlogBlock, BlogPost } from "@/lib/blog/types";
import { blogImagePath } from "@/lib/blog/assets";

/**
 * Copy this file when adding a new blog post.
 * See .cursor/rules/blog-posts.mdc for the full SOP.
 */
export const exampleBlogPost: BlogPost = {
  slug: "Your-Blog-Slug-In-PascalCase",
  title: "Your H1 Title Here",
  description: "Meta description — 150–160 chars, include primary keyword and NutriChef differentiator.",
  publishedAt: "YYYY-MM-DD",
  readTimeMinutes: 10,
  category: "Guides",
  author: {
    name: "Dr. Fatima Al Hashimi",
    role: "Head Nutritionist & Culinary Director",
  },
  coverImage: {
    src: blogImagePath("your-slug-kebab", "hero-image.webp"),
    alt: "Descriptive alt text for the hero image",
  },
  blocks: [
    { type: "heading", level: 2, text: "Introduction", id: "introduction" },
    { type: "paragraph", text: "Opening paragraph…" },
    { type: "heading", level: 2, text: "Section Title", id: "section-title" },
    {
      type: "image",
      src: blogImagePath("your-slug-kebab", "section-image.webp"),
      alt: "Alt matching the H2/H3 heading",
      caption: "Section Title",
    },
    { type: "paragraph", text: "Section body…" },
    {
      type: "table",
      caption: "Optional table footnote.",
      headers: ["Column A", "Column B"],
      rows: [["Row 1 A", "Row 1 B"]],
    },
    {
      type: "callout",
      variant: "highlight",
      text: "Optional highlighted callout.",
    },
    {
      type: "richParagraph",
      parts: [
        { type: "text", value: "Link to " },
        { type: "link", href: "/plans", label: "NutriChef plans" },
        { type: "text", value: " inline." },
      ],
    },
  ] satisfies BlogBlock[],
  cta: {
    heading: "Ready to try NutriChef?",
    text: "Explore plans from AED 45/meal — pause or cancel anytime.",
    buttonLabel: "See plans",
    buttonHref: "/plans",
  },
};
