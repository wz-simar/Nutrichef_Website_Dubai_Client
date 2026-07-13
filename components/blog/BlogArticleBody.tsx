import Link from "next/link";
import Image from "next/image";
import type { BlogBlock, ParagraphPart } from "@/lib/blog/types";
import { isExternalBlogHref } from "@/lib/blog/linkify";
import { linkifyText } from "@/lib/blog/linkify";
import type { LinkAnchorDefinition } from "@/lib/blog/linkify";
import { resolveHeadingId } from "@/lib/blog/utils";

interface BlogArticleBodyProps {
  blocks: BlogBlock[];
  linkAnchors?: readonly LinkAnchorDefinition[];
}

function RichParagraph({ parts, as: Tag = "p" }: { parts: ParagraphPart[]; as?: "p" | "span" | "div" }) {
  const className =
    Tag === "p" || Tag === "div"
      ? "text-base leading-relaxed text-secondary-text sm:text-lg"
      : undefined;

  const linkClass =
    "font-semibold text-primary underline underline-offset-4 transition hover:text-primary-hover";

  return (
    <Tag className={className}>
      {parts.map((part, index) =>
        part.type === "text" ? (
          <span key={`${part.value.slice(0, 24)}-${index}`}>{part.value}</span>
        ) : isExternalBlogHref(part.href) ? (
          <a
            key={`${part.href}-${index}`}
            href={part.href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            {part.label}
          </a>
        ) : (
          <Link key={`${part.href}-${index}`} href={part.href} className={linkClass}>
            {part.label}
          </Link>
        ),
      )}
    </Tag>
  );
}

function renderLinkifiedText(
  text: string,
  linkAnchors: readonly LinkAnchorDefinition[] | undefined,
  as: "p" | "span" | "div" = "p",
) {
  if (!linkAnchors?.length) {
    if (as === "p") {
      return (
        <p className="text-base leading-relaxed text-secondary-text sm:text-lg">{text}</p>
      );
    }
    return <>{text}</>;
  }

  const parts = linkifyText(text, linkAnchors);
  const hasLink = parts.some((part) => part.type === "link");
  if (!hasLink) {
    if (as === "p") {
      return (
        <p className="text-base leading-relaxed text-secondary-text sm:text-lg">{text}</p>
      );
    }
    return <>{text}</>;
  }

  return <RichParagraph as={as} parts={parts} />;
}

function BlogBlockRenderer({
  block,
  linkAnchors,
}: {
  block: BlogBlock;
  linkAnchors?: readonly LinkAnchorDefinition[];
}) {
  switch (block.type) {
    case "paragraph":
      return renderLinkifiedText(block.text, linkAnchors, "p");

    case "richParagraph":
      return <RichParagraph parts={block.parts} />;

    case "heading": {
      const id = resolveHeadingId(block);
      const headingClass =
        block.level === 2
          ? "scroll-mt-32 font-heading text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl"
          : "scroll-mt-32 font-heading text-xl font-semibold leading-snug tracking-tight text-foreground sm:text-2xl";
      const Tag = block.level === 2 ? "h2" : "h3";

      if (linkAnchors?.length) {
        const parts = linkifyText(block.text, linkAnchors);
        const hasLink = parts.some((part) => part.type === "link");
        if (hasLink) {
          return (
            <Tag id={id} className={headingClass}>
              <RichParagraph as="span" parts={parts} />
            </Tag>
          );
        }
      }

      return (
        <Tag id={id} className={headingClass}>
          {block.text}
        </Tag>
      );
    }

    case "list": {
      const ListTag = block.style === "ordered" ? "ol" : "ul";
      const listClass =
        block.style === "ordered"
          ? "list-decimal space-y-3 pl-6 text-base leading-relaxed text-secondary-text sm:text-lg marker:font-semibold marker:text-primary"
          : "space-y-3 text-base leading-relaxed text-secondary-text sm:text-lg";

      return (
        <ListTag className={listClass}>
          {block.items.map((item) => {
            const parts =
              linkAnchors?.length ? linkifyText(item, linkAnchors) : null;
            const hasLink = parts?.some((part) => part.type === "link");

            return (
              <li
                key={item.slice(0, 48)}
                className={
                  block.style === "unordered"
                    ? "relative pl-6 before:absolute before:left-0 before:top-[0.65em] before:h-2 before:w-2 before:rounded-full before:bg-primary"
                    : undefined
                }
              >
                {hasLink && parts ? <RichParagraph as="span" parts={parts} /> : item}
              </li>
            );
          })}
        </ListTag>
      );
    }

    case "table":
      return (
        <figure className="overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border-subtle bg-bg-light">
                  {block.headers.map((header) => (
                    <th
                      key={header}
                      scope="col"
                      className="px-4 py-3 font-heading text-xs font-semibold uppercase tracking-wider text-foreground sm:px-5 sm:py-4 sm:text-sm"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, rowIndex) => (
                  <tr
                    key={row.join("-").slice(0, 48)}
                    className={
                      rowIndex % 2 === 0
                        ? "border-b border-border-subtle bg-surface"
                        : "border-b border-border-subtle bg-background"
                    }
                  >
                    {row.map((cell, cellIndex) => {
                      const parts =
                        linkAnchors?.length ? linkifyText(cell, linkAnchors) : null;
                      const hasLink = parts?.some((part) => part.type === "link");

                      return (
                        <td
                          key={`${rowIndex}-${cellIndex}`}
                          className={`px-4 py-3 align-top text-secondary-text sm:px-5 sm:py-4 ${
                            cellIndex === 0 ? "font-semibold text-foreground" : ""
                          }`}
                        >
                          {hasLink && parts ? (
                            <RichParagraph as="span" parts={parts} />
                          ) : (
                            cell
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption ? (
            <figcaption className="border-t border-border-subtle px-5 py-3 text-xs leading-relaxed text-secondary-text">
              {renderLinkifiedText(block.caption, linkAnchors, "span")}
            </figcaption>
          ) : null}
        </figure>
      );

    case "image":
      return (
        <figure className="overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-sm">
          <Image
            src={block.src}
            alt={block.alt}
            width={1536}
            height={1024}
            className="h-auto w-full"
            sizes="(max-width: 768px) 100vw, 768px"
          />
          {block.caption ? (
            <figcaption className="border-t border-border-subtle px-5 py-3 text-sm text-secondary-text">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      );

    case "callout":
      return (
        <aside
          className={`rounded-2xl border px-6 py-5 sm:px-8 sm:py-6 ${
            block.variant === "highlight"
              ? "border-primary/30 bg-primary/[0.08]"
              : "border-border-subtle bg-bg-light"
          }`}
        >
          {block.title ? (
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {block.title}
            </p>
          ) : null}
          <div className={`${block.title ? "mt-2" : ""} text-base leading-relaxed text-foreground sm:text-lg`}>
            {renderLinkifiedText(block.text, linkAnchors, "span")}
          </div>
        </aside>
      );

    case "divider":
      return <hr className="border-border-subtle" aria-hidden />;

    default:
      return null;
  }
}

export function BlogArticleBody({ blocks, linkAnchors }: BlogArticleBodyProps) {
  return (
    <article className="space-y-8 sm:space-y-10">
      {blocks.map((block, index) => (
        <BlogBlockRenderer
          key={`${block.type}-${index}`}
          block={block}
          linkAnchors={linkAnchors}
        />
      ))}
    </article>
  );
}
