import type { Metadata } from "next";
import { BlogArticleBody } from "@/components/blog/BlogArticleBody";
import { BlogArticleSchema } from "@/components/blog/BlogArticleSchema";
import { BlogCtaSection } from "@/components/blog/BlogCtaSection";
import { BlogPostHero } from "@/components/blog/BlogPostHero";
import { BlogPostLayout } from "@/components/blog/BlogPostLayout";
import { kidsMealPlanDubai } from "@/content/blogs/kids-meal-plan-dubai";
import { extractTableOfContents } from "@/lib/blog/utils";
import { buildPageMetadata } from "@/lib/metadata";

const PATH = "/kids-meal-plan-dubai";
const post = kidsMealPlanDubai;

const faqItems = post.blocks.reduce<
  { question: string; answer: string }[]
>((acc, block, index, blocks) => {
  if (block.type !== "heading" || block.level !== 3) return acc;
  if (!block.id?.startsWith("faq-")) return acc;
  const next = blocks[index + 1];
  if (next?.type !== "paragraph") return acc;
  acc.push({ question: block.text, answer: next.text });
  return acc;
}, []);

export const metadata: Metadata = buildPageMetadata({
  title: post.metaTitle ?? post.title,
  description: post.description,
  path: PATH,
  absoluteTitle: post.metaTitle != null,
  keywords: [
    "kids meal plan Dubai",
    "healthy kids meals Dubai",
    "children meal delivery UAE",
    "school lunch box Dubai",
    "picky eater meal plan",
    "NutriChef kids",
  ],
});

function FaqSchema() {
  if (faqItems.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function KidsMealPlanDubaiPage() {
  const toc = extractTableOfContents(post.blocks);

  return (
    <>
      <FaqSchema />
      <div className="flex min-h-screen flex-col bg-background">
        <BlogArticleSchema post={post} path={PATH} />
        <BlogPostHero post={post} showBlogCrumb={false} />
        <BlogPostLayout post={post} toc={toc}>
          <BlogArticleBody blocks={post.blocks} linkAnchors={post.linkAnchors} />
        </BlogPostLayout>
        <BlogCtaSection cta={post.cta} />
      </div>
    </>
  );
}
