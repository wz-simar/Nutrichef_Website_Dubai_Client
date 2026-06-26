import React from "react";

interface ProseBlockProps {
  eyebrow?: string;
  heading?: string;
  paragraphs: string[];
  className?: string;
  headingClassName?: string;
}

export function ProseBlock({
  eyebrow,
  heading,
  paragraphs,
  className = "",
  headingClassName = "",
}: ProseBlockProps) {
  return (
    <div className={className}>
      {eyebrow ? (
        <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-secondary-text">
          {eyebrow}
        </p>
      ) : null}
      {heading ? (
        <h2
          className={`font-heading mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] ${headingClassName}`}
        >
          {heading}
        </h2>
      ) : null}
      <div className={`space-y-5 ${heading || eyebrow ? "mt-6" : ""}`}>
        {paragraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 48)}
            className="text-base leading-relaxed text-secondary-text sm:text-lg"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
