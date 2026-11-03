"use client";

import Link from "next/link";
import { NutrichefLogo } from "@/components/NutrichefLogo";

type Props = {
  children: React.ReactNode;
  /** When set, shown inside the card above children */
  title?: string;
  subtitle?: React.ReactNode;
  maxWidthClass?: string;
};

export function AuthPageShell({
  children,
  title,
  subtitle,
  maxWidthClass = "max-w-[440px]",
}: Props) {
  const showHeader = title != null || subtitle != null;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background px-4 pb-16 pt-28 sm:pt-32">
      <div
        className="pointer-events-none absolute -right-40 top-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div className={`relative mx-auto w-full ${maxWidthClass}`}>
        <div className="mb-8 flex flex-col items-center text-center">
          <Link
            href="/"
            className="inline-block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <NutrichefLogo className="!h-9 sm:!h-10" priority />
          </Link>
        </div>
        <div className="overflow-x-clip rounded-2xl border border-border-subtle bg-surface p-5 shadow-[0_24px_64px_-24px_rgba(27,48,34,0.12)] sm:p-8">
          {showHeader ? (
            <div className="mb-8 text-center">
              {title ? (
                <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]">
                  {title}
                </h1>
              ) : null}
              {subtitle ? (
                <div className="mt-2 text-[0.9375rem] font-medium leading-relaxed text-secondary-text">
                  {subtitle}
                </div>
              ) : null}
            </div>
          ) : null}
          {children}
        </div>
      </div>
    </div>
  );
}
