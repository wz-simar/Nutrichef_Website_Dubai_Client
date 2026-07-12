/** Central site constants for SEO, contact, and social links. */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.nutrichef.ae";

export const SITE_NAME = "NutriChef";

/** Brand line used across metadata and hero copy. */
export const SITE_TAGLINE = "Private-Chef Nutrition, Delivered";

export const STARTING_PRICE_PER_DAY_AED = 99;

export const CONTACT = {
  phone: "+971 4 123 4567",
  phoneTel: "+97141234567",
  whatsapp: "+971501234567",
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
  "Delivering across Dubai, Abu Dhabi & Sharjah — Saudi Arabia, Qatar & Kuwait next";

export const NUTRITIONIST = {
  name: "Dr. Fatima Al Hashimi",
  title: "Head Nutritionist & Culinary Director",
  bio: "With over 12 years in sports nutrition and clinical dietetics across the UAE, Dr. Fatima personally signs off every menu that leaves our kitchen — macro-balanced, chef-crafted, and engineered for people whose performance is non-negotiable.",
  image: "/HeroSection.jpeg",
} as const;

export const HOME_META = {
  title: "Private-Chef Meal Plans Dubai & UAE | NutriChef — Executive Nutrition, Delivered",
  description: `Chef-crafted, nutritionist-signed meal plans delivered to your villa, penthouse, or office across Dubai, Abu Dhabi & Sharjah before 10 AM. 80+ rotating dishes, macros engineered to your goals, pause anytime. From AED ${STARTING_PRICE_PER_DAY_AED}/day. Expanding to KSA, Qatar & Kuwait.`,
} as const;

/** Concierge WhatsApp deep-link with a pre-filled message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
