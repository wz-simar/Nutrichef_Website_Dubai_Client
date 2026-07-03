import type { BlogPost } from "@/lib/blog/types";

interface BlogTableOfContentsProps {
  items: { id: string; text: string }[];
}

export function BlogTableOfContents({ items }: BlogTableOfContentsProps) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-2xl border border-border-subtle bg-surface p-6 shadow-sm"
    >
      <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-secondary-text">
        On this page
      </p>
      <ol className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-sm leading-snug text-secondary-text transition hover:text-primary"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

interface BlogPostLayoutProps {
  post: BlogPost;
  toc: { id: string; text: string }[];
  children: React.ReactNode;
}

export function BlogPostLayout({ post, toc, children }: BlogPostLayoutProps) {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_260px]">
          <div className="min-w-0 max-w-3xl lg:max-w-none">{children}</div>

          <aside className="hidden lg:block">
            <div className="sticky top-32 space-y-8">
              <BlogTableOfContents items={toc} />

              <div className="rounded-2xl border border-primary/25 bg-primary/[0.06] p-6">
                <p className="font-heading text-lg font-semibold leading-snug text-foreground">
                  {post.cta.heading}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-secondary-text">
                  {post.cta.text}
                </p>
                <a
                  href={post.cta.buttonHref}
                  className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-white transition hover:bg-primary-hover"
                >
                  {post.cta.buttonLabel}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
