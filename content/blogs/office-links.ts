import { whatsappLink } from "@/lib/site-config";

const OFFICE_WHATSAPP_URL = whatsappLink(
  "Hi NutriChef, I'd like a quote for office meal delivery.",
);

/** Hyperlink anchors extracted from office nutrichef.pdf */
export const OFFICE_BLOG_LINKS = [
  {
    anchor: "cooked fresh that same morning",
    url: "https://www.nutrichef.ae/menu",
  },
  {
    anchor: "Why offices trust nutrichef",
    url: "https://www.nutrichef.ae/why-us",
  },
  {
    anchor: "Packaging compostable bagasse",
    url: "https://www.nutrichef.ae/why-us",
  },
  {
    anchor: "Dr. Fatima Al Hashimi",
    url: "https://www.nutrichef.ae/why-us",
  },
  {
    anchor: "Nutritionist designed",
    url: "https://www.nutrichef.ae/why-us",
  },
  {
    anchor: "nutritionist designed",
    url: "https://www.nutrichef.ae/why-us",
  },
  {
    anchor: "Message us on WhatsApp",
    url: OFFICE_WHATSAPP_URL,
  },
  { anchor: "Read our full FAQ", url: "https://www.nutrichef.ae/faq" },
  { anchor: "Individual plans", url: "https://www.nutrichef.ae/plans" },
  { anchor: "nutrichef.ae", url: "https://www.nutrichef.ae/" },
  { anchor: "wa.me/971501234567", url: OFFICE_WHATSAPP_URL },
  { anchor: "wa.me/971585831374", url: OFFICE_WHATSAPP_URL },
] as const;
