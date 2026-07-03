import type { BlogBlock } from "./types";

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function resolveHeadingId(block: Extract<BlogBlock, { type: "heading" }>): string {
  return block.id ?? slugifyHeading(block.text);
}

export function extractTableOfContents(blocks: BlogBlock[]) {
  return blocks
    .filter((block): block is Extract<BlogBlock, { type: "heading" }> => block.type === "heading")
    .filter((block) => block.level === 2)
    .map((block) => ({
      id: resolveHeadingId(block),
      text: block.text,
    }));
}

export function formatBlogDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-AE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}
