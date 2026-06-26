import React from "react";

type AspectRatio = "square" | "video" | "wide" | "portrait";

const aspectClasses: Record<AspectRatio, string> = {
  square: "aspect-square",
  video: "aspect-video",
  wide: "aspect-[16/10]",
  portrait: "aspect-[4/5]",
};

interface ImagePlaceholderProps {
  label?: string;
  aspect?: AspectRatio | null;
  className?: string;
}

export function ImagePlaceholder({
  label = "Image placeholder",
  aspect = "video",
  className = "",
}: ImagePlaceholderProps) {
  const aspectClass = aspect ? aspectClasses[aspect] : "";

  return (
    <div
      className={`flex items-center justify-center rounded-2xl border-2 border-dashed border-border-subtle bg-bg-light text-secondary-text ${aspectClass} ${className}`}
      role="img"
      aria-label={label}
    >
      <span className="px-4 text-center text-sm font-medium">{label}</span>
    </div>
  );
}
