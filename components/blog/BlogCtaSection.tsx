"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { BlogPost } from "@/lib/blog/types";
import { Button } from "@/components/Button";

interface BlogCtaSectionProps {
  cta: BlogPost["cta"];
}

export function BlogCtaSection({ cta }: BlogCtaSectionProps) {
  const router = useRouter();

  return (
    <section className="border-t border-border-subtle bg-bg-light py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <h2 className="font-heading text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
          {cta.heading}
        </h2>
        <p className="mt-5 text-base leading-relaxed text-secondary-text sm:text-lg">
          {cta.text}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button type="button" size="lg" onClick={() => router.push(cta.buttonHref)}>
            {cta.buttonLabel}
          </Button>
          <Link
            href="/menu"
            className="text-sm font-semibold text-primary underline-offset-4 transition hover:underline"
          >
            Browse menu
          </Link>
        </div>
      </div>
    </section>
  );
}
