import { GOOGLE_MAPS_EMBED_URL } from "@/lib/site-config";

interface GoogleMapsEmbedProps {
  title?: string;
  className?: string;
}

export function GoogleMapsEmbed({
  title = "NutriChef Dubai location on Google Maps",
  className = "h-[400px] w-full rounded-2xl border border-border-subtle",
}: GoogleMapsEmbedProps) {
  return (
    <iframe
      title={title}
      src={GOOGLE_MAPS_EMBED_URL}
      className={className}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}
