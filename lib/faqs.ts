import { STARTING_PRICE_PER_DAY_AED } from "./site-config";

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Does NutriChef deliver healthy meal plans in Dubai?",
    answer:
      "Yes, NutriChef delivers fresh, chef-crafted meal plans daily across Dubai including JLT, Dubai Marina, Business Bay, Downtown Dubai, DIFC, Jumeirah, Al Barsha, Mirdif, Deira, and The Springs. Meals are prepared fresh every morning and delivered to your door or office between 6 AM and 10 AM in temperature-controlled bags, seven days a week including weekends.",
  },
  {
    question: "How much does a meal plan cost in Dubai?",
    answer: `NutriChef meal plans in Dubai start from AED ${STARTING_PRICE_PER_DAY_AED} per day, depending on your goal, number of meals, and subscription duration. Delivery is included across all areas, JLT, Marina, Business Bay, Downtown Dubai, Jumeirah, Mirdif, The Springs, and beyond. No hidden fees, no lock-in contracts. View full pricing at nutrichef.ae/plans.`,
  },
  {
    question: "Which areas in Dubai and the UAE does NutriChef deliver to?",
    answer:
      "NutriChef covers a wide range of locations across the UAE. In Dubai, we deliver to JLT, Dubai Marina, Business Bay, Downtown Dubai, DIFC, Jumeirah, Al Barsha, The Springs, Mirdif, Deira, and surrounding communities. We also deliver to Abu Dhabi. Not sure if your area is covered? Message us on WhatsApp and we'll confirm within minutes.",
  },
  {
    question: "Is NutriChef good for weight loss in Dubai?",
    answer:
      "Yes. NutriChef's calorie-controlled meal plans are nutritionist-designed for healthy, sustainable weight loss. Whether you live in Jumeirah, The Springs, Downtown, or Abu Dhabi, your meals arrive fresh at your door every morning — macro-tracked, chef-prepared, and ready to heat and eat in under 3 minutes. No cooking, no calorie counting, no guesswork.",
  },
  {
    question: "Can I get a high protein meal delivery in Dubai for muscle gain?",
    answer:
      "Absolutely. NutriChef's High Protein plan is built for gym-goers across Dubai — from the fitness studios of JLT and Dubai Marina to gyms in Business Bay and Downtown. Every meal is macro-tracked with 150g+ protein options, rotating across 80+ weekly meals so you never eat the same thing twice. Fresh daily delivery, just heat and eat.",
  },
  {
    question: "Is there a keto or low carb meal plan delivery in Dubai?",
    answer:
      "Yes. NutriChef's Low Carb and Keto plan delivers macro-calculated, chef-prepared meals daily across Dubai and Abu Dhabi. Whether you're in The Springs, Mirdif, Jumeirah, or JLT, your keto meals arrive fresh every morning with zero prep required. The menu rotates weekly across 80+ options so you stay in ketosis without ever getting bored.",
  },
  {
    question: "Can I pause or cancel my NutriChef meal plan subscription?",
    answer:
      "Yes, complete flexibility is built into every NutriChef plan. Pause, skip, or cancel anytime directly from your dashboard with no fees and no lock-in. Moving from Downtown to Business Bay or Jumeirah to Abu Dhabi? Simply update your delivery address and everything continues without interruption.",
  },
  {
    question: "Are NutriChef meals freshly cooked or frozen?",
    answer:
      "All NutriChef meals are prepared fresh daily — never frozen, never reheated, never preserved. Meals are cooked every morning and delivered across Dubai and Abu Dhabi the same day in insulated, temperature-controlled bags. They stay fresh in your fridge for up to 3 days. Heat in the microwave for 2–3 minutes and eat.",
  },
  {
    question:
      "Does NutriChef deliver healthy meals to offices in Business Bay, DIFC, and Downtown Dubai?",
    answer:
      "Yes. NutriChef is a popular healthy lunch delivery choice for offices and corporate teams across Business Bay, DIFC, Downtown Dubai, JLT, and Dubai Marina. Fresh meals are delivered to your office reception every morning before 10 AM. Corporate group plans are available. Message us on WhatsApp to discuss pricing for your team.",
  },
  {
    question:
      "How is NutriChef different from other meal delivery services in Dubai?",
    answer:
      "NutriChef stands out in three ways. First, variety, 80+ rotating weekly meals means you never eat the same thing twice, whether you're ordering from Marina, Jumeirah, Mirdif, The Springs, or Abu Dhabi. Second, flexibility, pause, skip, or swap meals anytime with zero penalties. Third, packaging, NutriChef uses bagasse (compostable sugar cane) containers, making it one of the most eco-friendly meal plan services in the UAE. And unlike many competitors, your macros are fully customisable to your exact goals.",
  },
];
