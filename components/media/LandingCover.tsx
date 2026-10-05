/**
 * Full-bleed landing photo. Phone and desktop are different crops, so each
 * breakpoint preloads only its own file. Masters stay at
 * /complete_background.png and /complete_background_mobile.png.
 */
export const LANDING_COVER = {
  mobileAvif: "/bg/opt/cover-mobile.avif",
  desktopAvif: "/bg/opt/cover-desktop.avif",
  mobileWebp: "/bg/opt/cover-mobile.webp",
  desktopWebp: "/bg/opt/cover-desktop.webp",
} as const;

type Props = {
  alt: string;
};

export function LandingCover({ alt }: Props) {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={LANDING_COVER.mobileAvif}
        type="image/avif"
        media="(max-width: 639px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href={LANDING_COVER.desktopAvif}
        type="image/avif"
        media="(min-width: 640px)"
        fetchPriority="high"
      />
      <picture className="absolute inset-0 -z-20">
        <source
          media="(max-width: 639px)"
          srcSet={LANDING_COVER.mobileAvif}
          type="image/avif"
        />
        <source
          media="(min-width: 640px)"
          srcSet={LANDING_COVER.desktopAvif}
          type="image/avif"
        />
        <source
          media="(max-width: 639px)"
          srcSet={LANDING_COVER.mobileWebp}
          type="image/webp"
        />
        <source
          media="(min-width: 640px)"
          srcSet={LANDING_COVER.desktopWebp}
          type="image/webp"
        />
        <img
          src={LANDING_COVER.desktopWebp}
          alt={alt}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
      </picture>
    </>
  );
}
