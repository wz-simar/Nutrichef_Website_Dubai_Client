import { whatsappLink } from "@/lib/site-config";

/** Hyperlink anchors from diabetic-meal-plans-dubai.pdf */
export const DIABETIC_MEAL_PLANS_DUBAI_LINKS = [
  {
    anchor: "our Head Nutritionist and Culinary Director, Dr. Fatima Al Hashimi",
    url: "https://www.nutrichef.ae/why-us",
  },
  {
    anchor: "The CDC's guidance on diabetes meal planning",
    url: "https://www.cdc.gov/diabetes/healthy-eating/diabetes-meal-planning.html",
  },
  {
    anchor: "American Diabetes Association",
    url: "https://diabetes.org/food-nutrition/meal-planning",
  },
  {
    anchor: "building your own plan with live pricing",
    url: "https://www.nutrichef.ae/plans",
  },
  {
    anchor: "Design your diabetic friendly meal plan today",
    url: "https://www.nutrichef.ae/plans",
  },
  {
    anchor: "talk to our concierge team",
    url: "https://www.nutrichef.ae/contact-us",
  },
  {
    anchor: "weekly rotating menu",
    url: "https://www.nutrichef.ae/menu",
  },
  {
    anchor: "Dubai, Abu Dhabi, and Sharjah",
    url: "https://www.nutrichef.ae/uae",
  },
  {
    anchor: "WhatsApp",
    url: whatsappLink(
      "Hi NutriChef, I'd like help with a diabetic friendly meal plan.",
    ),
  },
] as const;
