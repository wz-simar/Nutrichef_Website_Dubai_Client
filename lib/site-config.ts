/** Central site constants for SEO, contact, and social links. */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.nutrichef.ae";

export const SITE_NAME = "NutriChef";

/** Brand line used across metadata and hero copy. */
export const SITE_TAGLINE = "Private-Chef Nutrition, Delivered";

export const STARTING_PRICE_PER_MEAL_AED = 45;
export const STARTING_PRICE_PER_DAY_AED = 90;

export const CONTACT = {
  /** Registered contact entity for the brand. */
  name: "MBR NutriChef Cafe",
  phone: "+971 58 583 1374",
  phoneTel: "+971585831374",
  whatsapp: "+971585831374",
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

/** Concierge WhatsApp deep-link with a pre-filled message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
