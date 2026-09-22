import { STARTING_PRICE_PER_MEAL_AED } from "./site-config";

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
    answer: `Simple, transparent pricing: AED ${STARTING_PRICE_PER_MEAL_AED} per meal on Fat Loss and AED 50 per meal on every other programme, multiplied by your meals per day (2–5) and programme length (20, 24, 30, or 90 days). A 3-meal, 20-day Fat Loss plan is AED 2,700 — delivery included, no hidden fees, no lock-in. See live pricing at nutrichef.ae/plans.`,
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
      "Yes — that's the core of what we do. Choose from programmes including Fat Loss, Muscle Gain, Balanced Diet, Diabetic Friendly, Gut Health, Age Reverse, Customized, Special Care (PCOD/PCOS, thyroid, pregnancy), plus Anti-Inflammatory, Endometriosis, PCOS Hormonal Balancing, and GLP-1 Support — and our Head Nutritionist calibrates every meal to your body and goals.",
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

export const VEGETARIAN_FAQ_ITEMS: FaqItem[] = [
  {
    question: "Does NutriChef have a dedicated vegetarian meal plan in Dubai?",
    answer:
      "Yes — a genuine vegetarian rotation, not a single fallback dish repeated all week. Every NutriChef programme (Fat Loss, Muscle Gain, Balanced Diet, and the rest) includes a dedicated plant-based menu with dairy, no meat, fish, or eggs, so you choose your goal and eat vegetarian throughout, without a separate, more limited \"veg plan\" menu.",
  },
  {
    question: "How many calories are in each vegetarian meal?",
    answer:
      "Most vegetarian meals fall between 350 and 450 calories, macro-balanced by our Head Nutritionist to fit whichever programme you're on. Exact calories and macros are shown on every dish before you subscribe.",
  },
  {
    question: "Can I customize the vegetarian plan for allergies or dislikes?",
    answer:
      "Yes. Tell us about any allergies, intolerances, or disliked ingredients when you set up your plan, and our kitchen adjusts your rotation accordingly. Message our concierge on WhatsApp any time to fine-tune it further.",
  },
  {
    question: "Can I pause or freeze my vegetarian plan?",
    answer:
      "Anytime, with no penalties. Pause, skip a day, or redirect a delivery in seconds from your dashboard or over WhatsApp — your remaining days simply wait for you.",
  },
  {
    question: "Is the vegetarian plan available in Abu Dhabi and Sharjah?",
    answer:
      "Yes — the full vegetarian rotation delivers daily across Dubai, Abu Dhabi, and Sharjah before 10 AM, on every programme. Saudi Arabia, Qatar, and Kuwait are next.",
  },
];
