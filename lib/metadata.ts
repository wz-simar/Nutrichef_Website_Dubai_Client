import type { Metadata } from "next";
import { HOME_META, SITE_NAME, SITE_URL } from "./site-config";
import { REGIONS } from "./regions";

const DEFAULT_OG_IMAGE = `${SITE_URL}/HeroSection.jpeg`;

/**
 * hreflang alternates for every GCC market (en-XX + ar-XX per market).
 * English pages self-canonicalize; Arabic variants resolve via the on-site
 * language selector (`?lang=ar`) so crawlers can discover the localized view.
 */
function buildLanguageAlternates(canonical: string): Record<string, string> {
  const languages: Record<string, string> = { "x-default": canonical };
  for (const region of REGIONS) {
    const [en, ar] = region.locales;
    languages[en] = canonical;
    languages[ar] = `${canonical}${canonical.includes("?") ? "&" : "?"}lang=ar`;
  }
  return languages;
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  ogImage,
  absoluteTitle,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  /** Use exact title tag text — skips the layout `%s | NutriChef` template. */
  absoluteTitle?: boolean;
}): Metadata {
  const canonical = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const image = ogImage ?? DEFAULT_OG_IMAGE;

  const resolvedTitle = absoluteTitle
    ? { absolute: title }
    : title.includes(SITE_NAME)
      ? { absolute: title }
      : title;

  return {
    title: resolvedTitle,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: {
      canonical,
      languages: buildLanguageAlternates(canonical),
    },
    openGraph: {
      type: "website",
      locale: "en_AE",
      alternateLocale: ["ar_AE", "en_SA", "ar_SA", "en_QA", "ar_QA", "en_KW", "ar_KW"],
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — private-chef meal plans delivered across the UAE and GCC`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
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
    languages: buildLanguageAlternates(SITE_URL),
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    alternateLocale: ["ar_AE", "en_SA", "ar_SA", "en_QA", "ar_QA", "en_KW", "ar_KW"],
    url: SITE_URL,
    siteName: SITE_NAME,
    title: HOME_META.title,
    description: HOME_META.description,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — private-chef meal plans delivered across the UAE and GCC`,
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
