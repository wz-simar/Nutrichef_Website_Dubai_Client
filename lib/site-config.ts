/** Central site constants for SEO, contact, and social links. */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://nutrichef.ae";

export const SITE_NAME = "NutriChef";

export const STARTING_PRICE_PER_DAY_AED = 99;

export const CONTACT = {
  phone: "+971 4 123 4567",
  phoneTel: "+97141234567",
  whatsapp: "+971501234567",
  email: "hello@nutrichef.ae",
  address: "Warehouse 12, Al Quoz Industrial Area 3, Dubai, United Arab Emirates",
  addressShort: "Dubai, United Arab Emirates",
} as const;

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/nutrichefuae",
  instagram: "https://www.instagram.com/nutrichefuae",
  linkedin: "https://www.linkedin.com/company/nutrichef",
  x: "https://x.com/nutrichefuae",
} as const;

export const GOOGLE_MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=Business+Bay,+Dubai,+UAE&t=&z=13&ie=UTF8&iwloc=&output=embed";

export const DELIVERY_ZONES_TEXT =
  "We deliver to Dubai, Abu Dhabi, Sharjah";

export const NUTRITIONIST = {
  name: "Dr. Fatima Al Hashimi",
  title: "Head Nutritionist & Culinary Director",
  bio: "With over 12 years of experience in sports nutrition and clinical dietetics across the UAE, Dr. Fatima leads NutriChef's menu development — ensuring every meal is macro-balanced, chef-crafted, and designed for real results.",
  image: "/HeroSection.jpeg",
} as const;

export const HOME_META = {
  title: "Healthy Meal Delivery Dubai | 80+ Meals · Fresh Daily — NutriChef",
  description: `Chef-crafted meal plans delivered fresh daily in Dubai. 80+ rotating meals for muscle gain, weight loss & balance. Heat & eat. Pause anytime. Starting from AED ${STARTING_PRICE_PER_DAY_AED}/day.`,
} as const;
