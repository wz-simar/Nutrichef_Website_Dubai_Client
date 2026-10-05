"use client";

type Props = {
  className?: string;
  priority?: boolean;
  /** Light chip so the logo reads on dark footers */
  onDark?: boolean;
};

export function NutrichefLogo({
  className = "",
  priority = false,
  onDark = false,
}: Props) {
  const eager = priority && !onDark;
  const image = (
    <img
      src="/brand/logo.webp"
      alt="Nutrichef"
      width={480}
      height={115}
      fetchPriority={eager ? "high" : "auto"}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={
        onDark
          ? `h-9 w-auto max-w-[200px] object-contain object-left sm:h-10 ${className}`
          : `h-8 w-auto max-w-[min(200px,62vw)] object-contain object-left sm:h-9 lg:h-10 ${className}`
      }
    />
  );

  if (onDark) {
    return (
      <span className="inline-flex rounded-xl bg-surface p-2.5 shadow-sm ring-1 ring-white/15">
        {image}
      </span>
    );
  }

  return image;
}
