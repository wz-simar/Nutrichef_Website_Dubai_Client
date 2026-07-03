import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/blog/types";
import { formatBlogDate } from "@/lib/blog/utils";

interface BlogPostHeroProps {
  post: BlogPost;
}

export function BlogPostHero({ post }: BlogPostHeroProps) {
  return (
    <section className="border-b border-border-subtle bg-bg-light pt-28 pb-10 sm:pt-32 sm:pb-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-secondary-text">
            <li>
              <Link href="/" className="transition hover:text-primary">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-secondary-text/50">
              /
            </li>
            <li>
              <Link href={`/blogs/${post.slug}`} className="transition hover:text-primary">
                Blog
              </Link>
            </li>
            <li aria-hidden className="text-secondary-text/50">
              /
            </li>
            <li className="font-medium text-foreground" aria-current="page">
              {post.category}
            </li>
          </ol>
        </nav>

        <div className="mx-auto max-w-3xl">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-secondary-text">
            {post.category}
          </p>
          <h1 className="font-heading mt-3 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-secondary-text sm:text-xl">
            {post.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border-subtle pt-8 text-sm text-secondary-text">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 font-heading text-sm font-semibold text-primary">
                {post.author.name.charAt(0)}
              </span>
              <div>
                <p className="font-semibold text-foreground">{post.author.name}</p>
                {post.author.role ? (
                  <p className="text-xs text-secondary-text">{post.author.role}</p>
                ) : null}
              </div>
            </div>
            <span className="hidden h-4 w-px bg-border-subtle sm:block" aria-hidden />
            <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
            <span aria-hidden>·</span>
            <span>{post.readTimeMinutes} min read</span>
          </div>
        </div>

        {post.coverImage ? (
          <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-sm">
            <Image
              src={post.coverImage.src}
              alt={post.coverImage.alt}
              width={1536}
              height={1024}
              priority
              className="h-auto w-full"
              sizes="(max-width: 1280px) 100vw, 1024px"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
