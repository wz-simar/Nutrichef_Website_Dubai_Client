import { CONTACT, SITE_NAME, SITE_URL, SOCIAL_LINKS } from "@/lib/site-config";
import { REGIONS } from "@/lib/regions";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    legalName: CONTACT.name,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.jpg`,
    slogan: "Private-Chef Nutrition, Delivered",
    description:
      "Chef-crafted, nutritionist-signed meal plans delivered fresh every morning across Dubai, Abu Dhabi, and Sharjah — expanding to Saudi Arabia, Qatar, and Kuwait.",
    email: CONTACT.email,
    telephone: CONTACT.phoneTel,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Al Safa park complex - Al Safa 1 - Al Safa",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    areaServed: [
      ...REGIONS.map((r) => ({ "@type": "Country", name: r.name })),
      ...REGIONS.flatMap((r) => r.cities.map((name) => ({ "@type": "City", name }))),
    ],
    sameAs: [
      SOCIAL_LINKS.facebook,
      SOCIAL_LINKS.instagram,
      SOCIAL_LINKS.linkedin,
      SOCIAL_LINKS.x,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
