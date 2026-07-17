export interface BlogAuthor {
  name: string;
  role?: string;
}

export interface BlogCoverImage {
  src: string;
  alt: string;
}

export type ParagraphPart =
  | { type: "text"; value: string }
  | { type: "link"; href: string; label: string };

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "richParagraph"; parts: ParagraphPart[] }
  | { type: "heading"; level: 2 | 3; text: string; id?: string }
  | { type: "list"; style: "unordered" | "ordered"; items: string[] }
  | {
      type: "callout";
      title?: string;
      text: string;
      variant?: "default" | "highlight";
    }
  | {
      type: "table";
      caption?: string;
      headers: string[];
      rows: string[][];
    }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
    }
  | { type: "divider" };

export interface BlogPost {
  slug: string;
  /** On-page H1 (hero heading). */
  title: string;
  /** Browser tab / Google title tag. Falls back to `title` when omitted. */
  metaTitle?: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  readTimeMinutes: number;
  category: string;
  author: BlogAuthor;
  coverImage?: BlogCoverImage;
  /** Optional Word-doc hyperlinks — auto-applied to plain `paragraph` blocks. */
  linkAnchors?: readonly { anchor: string; url: string }[];
  blocks: BlogBlock[];
  cta: {
    heading: string;
    text: string;
    buttonLabel: string;
    buttonHref: string;
  };
}
