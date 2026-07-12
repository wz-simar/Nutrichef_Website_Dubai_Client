import { STARTING_PRICE_PER_DAY_AED } from "./site-config";

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What makes NutriChef different from other meal delivery services in Dubai?",
    answer:
      "NutriChef is built to a private-chef standard, not a meal-prep standard. Every dish is designed by fine-dining-trained chefs, signed off by our Head Nutritionist, cooked fresh the same morning, and delivered across Dubai, Abu Dhabi, and Sharjah before 10 AM. You get 80+ rotating dishes a week, fully personalised macros, compostable premium packaging, and a concierge team on WhatsApp — with the freedom to pause, skip, or redirect deliveries anytime, penalty-free.",
  },
  {
    question: "How much does a NutriChef meal plan cost in Dubai and the UAE?",
    answer: `Plans start from AED ${STARTING_PRICE_PER_DAY_AED} per day — less than a single business lunch in DIFC — with delivery included across Dubai, Abu Dhabi, and Sharjah. Your exact price depends on your goal, meals per day, and subscription length, and longer commitments unlock preferential rates. There are no hidden fees and no lock-in contracts. Build your exact plan and see live pricing at nutrichef.ae/plans.`,
  },
  {
    question: "Which areas does NutriChef deliver to in the UAE?",
    answer:
      "We deliver every morning across Dubai — Emirates Hills, Palm Jumeirah, Downtown, DIFC, Business Bay, Dubai Marina, JLT, Jumeirah, Al Barsha, Mirdif, The Springs — plus Abu Dhabi and Sharjah. Villa, penthouse, or office reception: your meals arrive chilled in temperature-controlled bags before 10 AM, seven days a week. Not sure about your address? Our concierge confirms on WhatsApp within minutes.",
  },
  {
    question: "Is NutriChef available in Saudi Arabia, Qatar, or Kuwait?",
    answer:
      "Not yet — the UAE is our flagship market, and Saudi Arabia (Riyadh, Jeddah, Khobar), Qatar (Doha, Lusail), and Kuwait (Kuwait City, Salmiya) are next. Join the priority list on each market page — nutrichef.ae/saudi-arabia, /qatar, and /kuwait — and you'll be first at the table when we open, with founding-member pricing.",
  },
  {
    question: "Can NutriChef build a plan around my exact macros and goals?",
    answer:
      "Yes — that's the core of what we do. Whether you're cutting for a triathlon, building muscle, managing energy through a brutal travel schedule, or simply eating impeccably, our Head Nutritionist calibrates your calories, protein, carbs, and fat to your body and ambition. Choose High Protein, Low Carb, Balanced, Chef's Picks, or go fully bespoke with Custom Macros.",
  },
  {
    question: "Are the meals actually restaurant quality?",
    answer:
      "Our chefs come from fine-dining kitchens, and it shows. The menu rotates through 80+ dishes weekly — think miso-glazed salmon, saffron chicken, wagyu-style lean beef bowls — cooked fresh every morning with premium ingredients, never frozen, never reheated. The only difference from your favourite restaurant: every plate is macro-engineered and arrives before your first meeting.",
  },
  {
    question: "I travel constantly. How flexible is the subscription?",
    answer:
      "Completely. Pause, skip days, or change your delivery address from your dashboard in seconds — heading to Riyadh on Tuesday and back Thursday costs you nothing. There are no penalties, no phone calls required, and no lock-in. Your plan resumes exactly where you left it, and our concierge team is one WhatsApp message away if you'd rather have it handled for you.",
  },
  {
    question: "Are meals cooked fresh daily or frozen?",
    answer:
      "Fresh, always. Every meal is cooked the same morning it's delivered — never frozen, never batch-reheated, never preserved. Meals travel in insulated, temperature-controlled bags and keep for up to three days refrigerated. Three minutes in the microwave or oven and you're eating at a level most people book a table for.",
  },
  {
    question: "Does NutriChef cater to offices and corporate teams?",
    answer:
      "Yes. We deliver daily to executive floors and teams across DIFC, Business Bay, Downtown Dubai, JLT, and Dubai Marina — individually labelled meals at your reception before 10 AM. Corporate and family group plans are available with dedicated account management. Message our concierge on WhatsApp to structure a plan for your team or household staff.",
  },
  {
    question: "How do I start, and how fast can my first delivery arrive?",
    answer:
      "Design your plan at nutrichef.ae/plans — goal, meals per day, delivery days — in about two minutes. Check out securely with Stripe, and your first delivery typically arrives the next morning. Prefer a human? Our nutrition concierge will build the entire plan for you over WhatsApp.",
  },
];
