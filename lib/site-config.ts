/** Central site constants for SEO, contact, and social links. */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.nutrichef.ae";

export const SITE_NAME = "NutriChef";

/** Brand line used across metadata and hero copy. */
export const SITE_TAGLINE = "Private-Chef Nutrition, Delivered";

/** Floor from the Nov 2026 package sheet: Weight Loss Plan A · 20 days · 2 main meals. */
export const STARTING_PRICE_PER_MEAL_AED = 42;
/** Floor day rate: Weight Loss Plan A · 20 days (AED 1,699 ÷ 20). */
export const STARTING_PRICE_PER_DAY_AED = 85;
/** Lowest full package on the sheet (AED). */
export const STARTING_PACKAGE_AED = 1699;

export const CONTACT = {
  /** Registered contact entity for the brand. */
  name: "MBR NutriChef Cafe",
  phone: "+971 58 607 2720",
  phoneTel: "+971586072720",
  whatsapp: "+971586072720",
  email: "hello@nutrichef.ae",
  address: "Al Safa park complex - Al Safa 1 - Al Safa - Dubai - United Arab Emirates",
  addressShort: "Dubai, United Arab Emirates",
} as const;

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/nutrichefuae",
  instagram: "https://www.instagram.com/nutrichefuae",
  linkedin: "https://www.linkedin.com/company/nutrichef",
  x: "https://x.com/nutrichefuae",
} as const;

export const GOOGLE_MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=Al+Safa+park+complex,+Al+Safa+1,+Dubai,+UAE&t=&z=13&ie=UTF8&iwloc=&output=embed";

export const DELIVERY_ZONES_TEXT =
  "Delivering across Dubai, Abu Dhabi, Sharjah & Ajman — Saudi Arabia, Qatar & Kuwait next";

export const NUTRITIONIST = {
  name: "Dr. Fatima Al Hashimi",
  title: "Head Nutritionist & Culinary Director",
  bio: "12+ years in clinical and sports nutrition across the UAE. Every menu that leaves our kitchen carries her sign-off.",
  image: "/HeroSection.jpeg",
} as const;

export const HOME_META = {
  title: "Private-Chef Meal Plans Dubai & UAE | NutriChef — Executive Nutrition, Delivered",
  description: `Chef-crafted, nutritionist-signed meal plans delivered to your villa, penthouse, or office across Dubai, Abu Dhabi & Sharjah before 10 AM. 80+ rotating dishes, macros engineered to your goals, pause anytime. From AED ${STARTING_PRICE_PER_MEAL_AED}/meal. Expanding to KSA, Qatar & Kuwait.`,
} as const;

/** Shared brand YouTube clip (homepage + landing embeds). */
export const BRAND_YOUTUBE = {
  id: "aFkzxaaZOAk",
  query: "si=CLSKx90TbQ_nikoY",
  iframeTitle: "NutriChef healthy food delivery Dubai — YouTube video",
} as const;

/** Concierge WhatsApp deep-link with a pre-filled message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

/**
 * Phone line in the lead WhatsApp contract. Prefixes +971 when the user
 * typed a national number. Does not change login/OTP storage.
 */
export function leadPhoneForContract(raw: string, defaultCc = "971"): string {
  const trimmed = String(raw ?? "").trim();
  if (!trimmed) return "";
  let digits = trimmed.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("00")) digits = digits.slice(2);
  const cc = defaultCc.replace(/\D/g, "") || "971";
  const looksInternational = trimmed.startsWith("+") || trimmed.startsWith("00");
  if (looksInternational) return `+${digits}`;
  if (digits.startsWith(cc) && digits.length >= cc.length + 6) return `+${digits}`;
  digits = digits.replace(/^0+/, "");
  return `+${cc}${digits}`;
}
