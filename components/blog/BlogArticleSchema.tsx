import type { BlogPost } from "@/lib/blog/types";
import { SITE_URL } from "@/lib/site-config";

interface BlogArticleSchemaProps {
  post: BlogPost;
  path: string;
}

export function BlogArticleSchema({ post, path }: BlogArticleSchemaProps) {
  const url = `${SITE_URL}${path}`;
  const image = post.coverImage
    ? `${SITE_URL}${post.coverImage.src}`
    : `${SITE_URL}/HeroSection.jpeg`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Organization",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "NutriChef",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.jpg`,
      },
    },
    image,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
