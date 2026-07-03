import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticleBody } from "@/components/blog/BlogArticleBody";
import { BlogArticleSchema } from "@/components/blog/BlogArticleSchema";
import { BlogCtaSection } from "@/components/blog/BlogCtaSection";
import { BlogPostHero } from "@/components/blog/BlogPostHero";
import { BlogPostLayout } from "@/components/blog/BlogPostLayout";
import { buildPageMetadata } from "@/lib/metadata";
import { extractTableOfContents } from "@/lib/blog/utils";
import { BLOG_SLUGS, getBlogPost } from "@/lib/blog/registry";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return buildPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blogs/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const path = `/blogs/${post.slug}`;
  const toc = extractTableOfContents(post.blocks);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BlogArticleSchema post={post} path={path} />
      <BlogPostHero post={post} />
      <BlogPostLayout post={post} toc={toc}>
        <BlogArticleBody blocks={post.blocks} linkAnchors={post.linkAnchors} />
      </BlogPostLayout>
      <BlogCtaSection cta={post.cta} />
    </div>
  );
}
