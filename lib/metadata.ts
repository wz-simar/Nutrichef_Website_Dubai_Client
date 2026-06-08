import type { Metadata } from "next";
import { HOME_META, SITE_NAME, SITE_URL } from "./site-config";

const DEFAULT_OG_IMAGE = `${SITE_URL}/HeroSection.jpeg`;

export function buildPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const canonical = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale: "en_AE",
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — healthy meal delivery in Dubai`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export const defaultSiteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: {
    google: "xEj8gfifSHw6DNTN76uH_Wl-gWiSu7OnaPEIzah_qW8",
  },
  title: {
    default: HOME_META.title,
    template: `%s | ${SITE_NAME}`,
  },
  description: HOME_META.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: HOME_META.title,
    description: HOME_META.description,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — healthy meal delivery in Dubai`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_META.title,
    description: HOME_META.description,
    images: [DEFAULT_OG_IMAGE],
  },
};
