/**
 * Market configuration for NutriChef's four GCC markets.
 * UAE is the live flagship market; Saudi Arabia, Qatar, and Kuwait are
 * priority-waitlist markets. Every market carries its own SEO locale pair
 * (en-XX / ar-XX) so hreflang alternates can be generated per page.
 */

export type RegionCode = "ae" | "sa" | "qa" | "kw";

export interface Region {
  code: RegionCode;
  /** Emoji flag rendered in the header selector and footer. */
  flag: string;
  name: string;
  nameShort: string;
  /** Local language name, shown alongside English in selectors. */
  nameArabic: string;
  currency: string;
  /** hreflang locale codes for this market. */
  locales: [string, string];
  /** Marketing landing route for the market. */
  path: string;
  /** Signature cities called out in copy and structured data. */
  cities: string[];
  /** Live = ordering open. Waitlist = priority list via concierge. */
  status: "live" | "waitlist";
  /** One-line market positioning used on landing pages and cards. */
  tagline: string;
}

export const REGIONS: Region[] = [
  {
    code: "ae",
    flag: "🇦🇪",
    name: "United Arab Emirates",
    nameShort: "UAE",
    nameArabic: "الإمارات",
    currency: "AED",
    locales: ["en-AE", "ar-AE"],
    path: "/uae",
    cities: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman"],
    status: "live",
    tagline:
      "Our flagship kitchen. Private-chef nutrition delivered every morning across Dubai, Abu Dhabi, and Sharjah.",
  },
  {
    code: "sa",
    flag: "🇸🇦",
    name: "Saudi Arabia",
    nameShort: "KSA",
    nameArabic: "السعودية",
    currency: "SAR",
    locales: ["en-SA", "ar-SA"],
    path: "/saudi-arabia",
    cities: ["Riyadh", "Jeddah", "Khobar"],
    status: "waitlist",
    tagline:
      "Riyadh, Jeddah, and Khobar are next. Join the priority list and be first at the table.",
  },
  {
    code: "qa",
    flag: "🇶🇦",
    name: "Qatar",
    nameShort: "Qatar",
    nameArabic: "قطر",
    currency: "QAR",
    locales: ["en-QA", "ar-QA"],
    path: "/qatar",
    cities: ["Doha", "Lusail", "The Pearl"],
    status: "waitlist",
    tagline:
      "Doha, Lusail, and The Pearl — chef-crafted nutrition is on its way. Reserve your place.",
  },
  {
    code: "kw",
    flag: "🇰🇼",
    name: "Kuwait",
    nameShort: "Kuwait",
    nameArabic: "الكويت",
    currency: "KWD",
    locales: ["en-KW", "ar-KW"],
    path: "/kuwait",
    cities: ["Kuwait City", "Salmiya", "Jabriya"],
    status: "waitlist",
    tagline:
      "Kuwait City, Salmiya, and Jabriya join the NutriChef map soon. Secure priority access.",
  },
];

export const DEFAULT_REGION = REGIONS[0];

export function getRegion(code: string | null | undefined): Region {
  return REGIONS.find((r) => r.code === code) ?? DEFAULT_REGION;
}

export function getRegionByPath(path: string): Region | undefined {
  return REGIONS.find((r) => r.path === path);
}

/** All hreflang locales across markets, used for metadata alternates. */
export const ALL_LOCALES = REGIONS.flatMap((r) => r.locales);
