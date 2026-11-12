interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  className?: string;
  /** Optional query params after the video id (e.g. si=…). */
  query?: string;
}

/** Responsive 16:9 YouTube iframe — privacy-friendly attrs, lazy-loaded. */
export function YouTubeEmbed({
  videoId,
  title = "YouTube video player",
  className = "",
  query,
}: YouTubeEmbedProps) {
  const src = query
    ? `https://www.youtube.com/embed/${videoId}?${query.replace(/^\?/, "")}`
    : `https://www.youtube.com/embed/${videoId}`;

  return (
    <div
      className={`relative aspect-video w-full overflow-hidden rounded-2xl border border-border-subtle bg-black shadow-sm ${className}`}
    >
      <iframe
        className="absolute inset-0 h-full w-full"
        src={src}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
