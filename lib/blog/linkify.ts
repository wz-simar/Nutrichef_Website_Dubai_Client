import type { ParagraphPart } from "@/lib/blog/types";
import { SITE_URL } from "@/lib/site-config";

const SITE_HOSTS = ["www.nutrichef.ae", "nutrichef.ae"];

/** Map SEO doc paths to live routes when a dedicated page does not exist yet. */
const INTERNAL_PATH_ALIASES: Record<string, string> = {
  "/delivery": "/healthy-meal-delivery-dubai",
  "/account": "/plans",
};

export function normalizeBlogHref(url: string): string {
  try {
    const parsed = new URL(url);
    if (SITE_HOSTS.includes(parsed.hostname)) {
      const path = parsed.pathname.replace(/\/$/, "") || "/";
      return INTERNAL_PATH_ALIASES[path] ?? path;
    }
  } catch {
    if (url.startsWith("/")) {
      return INTERNAL_PATH_ALIASES[url] ?? url;
    }
  }
  return url;
}

export function isExternalBlogHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

export interface LinkAnchorDefinition {
  anchor: string;
  url: string;
}

/**
 * Split plain text into text/link parts using longest-anchor-first matching.
 * Each anchor is linked at most once per paragraph (SEO doc convention).
 */
export function linkifyText(
  text: string,
  definitions: readonly LinkAnchorDefinition[],
): ParagraphPart[] {
  const anchors = [...definitions]
    .map(({ anchor, url }) => ({
      anchor,
      href: normalizeBlogHref(url),
    }))
    .sort((a, b) => b.anchor.length - a.anchor.length);

  const parts: ParagraphPart[] = [];
  let cursor = 0;

  while (cursor < text.length) {
    let matched: { anchor: string; href: string; index: number } | null = null;

    for (const { anchor, href } of anchors) {
      const index = text.indexOf(anchor, cursor);
      if (index === -1) continue;
      if (!matched || index < matched.index) {
        matched = { anchor, href, index };
      }
    }

    if (!matched) {
      parts.push({ type: "text", value: text.slice(cursor) });
      break;
    }

    if (matched.index > cursor) {
      parts.push({ type: "text", value: text.slice(cursor, matched.index) });
    }

    parts.push({
      type: "link",
      href: matched.href,
      label: matched.anchor,
    });

    cursor = matched.index + matched.anchor.length;
  }

  if (parts.length === 0) {
    parts.push({ type: "text", value: text });
  }

  return parts;
}

export function absoluteBlogHref(href: string): string {
  if (isExternalBlogHref(href)) return href;
  return `${SITE_URL.replace(/\/$/, "")}${href.startsWith("/") ? href : `/${href}`}`;
}
