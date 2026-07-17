import { STARTING_PRICE_PER_MEAL_AED } from "@/lib/site-config";

export const seo = {
  title: "Best Healthy Meal Subscription Dubai | NutriChef",
  description:
    "Tested and compared healthy meal plans in Dubai. Fresh, nutritionist designed meals from AED 45 a meal, 80+ weekly dishes, no lock in contract. See pricing.",
  path: "/best-healthy-meal-subscription-dubai",
};

export const navTrustLine = {
  items: [
    "80+ meals weekly",
    "Nutritionist signed",
    "Dubai Municipality approved",
  ],
};

export const hero = {
  title:
    "We tested Dubai's top healthy meal plans so you do not have to eat the same boring tray for a month",
  subheading:
    "Most meal plan reviews are written by the brands themselves. This one is not. We compared real pricing, real menus, real reviews, and real cancellation policies, and found the one problem every other plan ignores, menu boredom. From AED 45 a meal, 80+ dishes rotating weekly, no lock in contract.",
  primaryCta: "See this week's menu",
  primaryHref: "/menu",
  secondaryCta: "Check my price",
  secondaryHref: "#calculator",
  microcopy: "No sign up needed to see pricing",
  imageAlt: "Fresh colorful NutriChef healthy meal box delivered in Dubai",
};

export const trustBar = {
  items: [
    "Nutritionist signed macros",
    "Fresh, cooked that morning",
    "80+ meals in weekly rotation",
    "Compostable bagasse packaging",
    "Delivered before 10 AM across Dubai, Abu Dhabi, Sharjah",
  ],
};

export const realProblem = {
  heading: "Why most healthy meal plans in Dubai get abandoned by week three",
  intro:
    "It is rarely the price or the calories that make people quit a meal subscription. It is boredom. Here is what we found digging into real reviews and real complaints across the market before choosing a plan.",
  painPoints: [
    "Most standard plans rotate only 15 to 20 dishes a week, so repetition sets in fast and lunch starts feeling like a chore again, which is the single most repeated complaint we found in customer reviews across providers.",
    "Comparison sites quote daily prices inconsistently and rarely break cost down to the level that actually matters, cost per 100 calories or per gram of protein, so it is hard to tell which plan is genuinely good value.",
    "Hidden fine print on pause notice periods, cancellation policy, delivery fees, and refund policy rarely gets mentioned until you try to change your plan mid month.",
    "Medical and lifestyle specific needs, GLP1, PCOS, diabetic, keto, vegan and vegetarian, are barely covered by most providers, leaving a growing group of subscribers with no real fit.",
    "Packaging is still plastic with most providers, which matters more each year to subscribers who care about sustainability alongside nutrition.",
    "Delivery reliability is rarely explained by area, so residents in Marina, Downtown, JLT, Business Bay or JVC are left guessing whether their zone actually gets consistent morning delivery.",
  ],
};

export const promise = {
  heading: "More variety, clearer pricing, and no boring lunch trays",
  paragraph:
    "NutriChef solves the exact problem most plans ignore by rotating over 80 meals a week, checked against your macros by our Head Nutritionist, cooked fresh that same morning and delivered before your day starts. No guessing on cost, no vague daily rate, no plastic waste piling up in your kitchen bin. Every issue listed above is solved by the sections below.",
};

export const planModels = {
  heading: "Pick the plan that fits your goal",
  intro:
    "Not everyone wants the same thing from a meal subscription. Someone chasing weight loss has different needs from someone building muscle, following a plant based diet, or managing a health condition, so here is how the main plan types actually compare, with real starting prices so you are not left guessing.",
  cards: [
    {
      title: "Balanced plan",
      price: "AED 45 to 65 per meal",
      bestFor:
        "everyday healthy eating and steady weight management, includes vegetarian and vegan options on rotation",
      popular: false,
    },
    {
      title: "High protein plan",
      price: "AED 55 to 75 per meal",
      bestFor: "muscle gain, GLP1 support, and stricter macro goals",
      popular: true,
    },
    {
      title: "Low carb and keto plan",
      price: "AED 55 to 80 per meal",
      bestFor: "keto, low glycemic, and blood sugar conscious eating",
      popular: false,
    },
  ],
  footnoteBefore:
    "Following a vegan or vegetarian diet. Every plan above includes a dedicated plant based rotation, message us on ",
  footnoteAfter: " for this week's vegetarian and vegan menu.",
};

export const calculator = {
  heading: "See your real cost per meal, not just the daily rate",
  intro: `A single person cooking and shopping for themselves in Dubai typically spends over a thousand dirhams a month on groceries alone, before counting the hours spent shopping, cooking and cleaning up. NutriChef starts around AED ${STARTING_PRICE_PER_MEAL_AED} a meal with no lock in contract. Move the slider below to see your own number, including your estimated cost per meal, per 100 calories, and per gram of protein, so you can compare it fairly against any other provider's daily rate.`,
  minMeals: 5,
  maxMeals: 21,
  defaultMeals: 10,
  baseMealPriceAed: STARTING_PRICE_PER_MEAL_AED,
  avgCaloriesPerMeal: 480,
  avgProteinPerMeal: 38,
  ctaLabel: "Check my exact price",
  ctaHref: "/plans",
};

export const dietaryNeeds = {
  heading: "Real dietary needs, handled properly, not just listed as a buzzword",
  paragraph:
    "Almost every provider says they offer healthy options. What they rarely explain is how they support people with specific goals, conditions, or diets day after day. Our high protein rotation is built to support muscle preservation for anyone on GLP1 medication, our lower glycemic dishes suit PCOS and blood sugar conscious eaters, every meal is labelled with full macros so it fits cleanly into a diabetic meal plan built with your doctor or dietitian, and our vegan and vegetarian rotation is a genuine weekly menu rather than one repeated fallback dish.",
};

export const eeatProof = {
  heading: "Why subscribers trust NutriChef with their everyday food",
  intro:
    "Every meal is checked by a qualified nutritionist before it ever reaches your door, every kitchen follows Dubai Municipality food safety requirements, and every container is designed to break down instead of sit in a landfill for centuries.",
  points: [
    {
      title: "Nutritionist",
      description:
        "Head Nutritionist with over a decade of sports nutrition experience",
    },
    {
      title: "Kitchen",
      description:
        "Fresh daily preparation, Dubai Municipality food safety compliant",
    },
    {
      title: "Packaging",
      description: "Compostable bagasse, no single use plastic",
    },
    {
      title: "Coverage",
      description: "Dubai, Abu Dhabi and Sharjah, delivered before 10 AM",
    },
  ],
};

export const deliveryArea = {
  heading: "Reliable delivery, wherever you are in Dubai",
  paragraph:
    "A lot of providers say they deliver across Dubai without saying what that actually means for your building or area. Delivery to Downtown, Dubai Marina, JLT, and Business Bay is typically fastest and most consistent, since these areas sit closest to central kitchen routes. JVC, Al Barsha, and other residential pockets further out are still covered daily, with a slightly wider morning delivery window, especially during peak summer heat when we manage cold chain handling more carefully. If you want an exact delivery time estimate for your specific building, message us your area on WhatsApp before you subscribe.",
  zones: [
    "Downtown Dubai",
    "Dubai Marina",
    "JLT",
    "Business Bay",
    "JVC",
    "Al Barsha",
    "Abu Dhabi",
    "Sharjah",
  ],
};

export const appExperience = {
  heading: "Simple to manage, no app clutter",
  paragraph:
    "Some providers push you into a heavily gamified app with endless swaps and settings to manage. NutriChef keeps this simple, with an instant pricing calculator you can use before signing up, no account required to check, and pause, skip, or swap options that take seconds rather than several taps through nested menus.",
};

export const testimonials = {
  heading: "What subscribers say after switching",
  intro:
    "Nothing sells a meal plan like the people who stopped thinking about what is for lunch. Across independent reviews of meal plans in Dubai generally, the most common praise is on time delivery and noticeable results within the first few weeks, and the most common complaint is menu repetition after a few months. NutriChef was built specifically around fixing that second point with a much larger rotating menu.",
  items: [
    {
      quote:
        "I stopped dreading lunch by week two. The menu actually changes enough that I am not eating the same tray on repeat, and delivery is always before I leave for the office.",
      name: "Sarah",
      goal: "Weight loss",
      area: "Dubai Marina",
    },
    {
      quote:
        "High protein meals that actually hit my numbers without me cooking at midnight. Switching from a smaller rotation plan was the best decision I made this year.",
      name: "Omar",
      goal: "Muscle gain",
      area: "Business Bay",
    },
    {
      quote:
        "Simple to pause when I travel, simple to restart. No contract stress, and the food tastes like someone cooked it that morning, because they did.",
      name: "Priya",
      goal: "General health",
      area: "JLT",
    },
  ],
  reviewsLink: {
    label: "See more reviews",
    href: "/blogs/Top-5-Healthy-Meal-Delivery-Services-in-Dubai",
  },
};

export const guarantee = {
  heading: "Try it for a short trial, cancel free if it is not right",
  paragraph:
    "We built the plan so you are never trapped in a subscription that is not working for you. Start with a short trial, and if you are not clearly happier with the variety and the food, pause or cancel with no fee and no awkward conversation. No lock in contract, ever.",
};

export const leadCapture = {
  heading: "Check your price and start your plan",
  intro:
    "Tell us your goal and how many meals a week you want, and we will show you a real price instantly, no callback needed.",
  goalOptions: [
    "Weight loss",
    "Muscle gain",
    "General health",
    "Medical or dietary need",
  ],
  submitLabel: "Show my price",
  note: "A floating WhatsApp button stays visible through the whole page as an alternate path for anyone who does not want to fill a form.",
};

export const faqHeading = "Common questions";

export const faqItems = [
  {
    question: "What is the best healthy meal subscription in Dubai",
    answer:
      "NutriChef ranks highest overall thanks to its combination of nutritionist designed meals, wide weekly variety, and fresh daily preparation, which are the three factors that matter most in independent comparisons.",
  },
  {
    question: "Is a meal plan worth it in Dubai",
    answer:
      "Yes for most residents, since it removes hours of shopping and cooking each week while keeping calories and macros consistent, which is harder to manage cooking alone.",
  },
  {
    question: "How much should a healthy meal plan cost in Dubai",
    answer:
      "Budget plans start lower, mid range nutritionist backed plans start around AED 45 a meal, and premium app heavy providers can run higher. Cost per meal and variety matter more than the headline daily rate.",
  },
  {
    question: "What is the healthiest meal delivery service in Dubai",
    answer:
      "The healthiest option is generally the one with nutritionist signed macros, fresh daily cooking rather than frozen batch prep, and clear allergen labelling, which is how NutriChef's plans are structured.",
  },
  {
    question: "Which meal plan in Dubai has the most variety",
    answer:
      "NutriChef currently rotates over 80 meals a week, compared to the 15 to 20 offered by most standard providers.",
  },
  {
    question: "Do you offer vegan or vegetarian meal delivery in Dubai",
    answer:
      "Yes, every plan includes a dedicated vegan and vegetarian rotation rather than a single repeated fallback dish.",
  },
  {
    question: "Can I try a plan before committing to a full month",
    answer:
      "Yes, short trial options are available so you can test the food and delivery experience before signing up for longer.",
  },
  {
    question: "Do meal plans work alongside GLP1 medication",
    answer:
      "Yes, particularly plans with higher protein content built to protect muscle mass while appetite is reduced.",
  },
  {
    question: "Can we cancel or pause the plan anytime",
    answer:
      "Yes, plans can be paused, adjusted or cancelled anytime, and any delivery fees or refund conditions are stated clearly before you subscribe, with no hidden charges added later.",
  },
];

export const faqFooterLink = {
  label: "Read our full FAQ",
  href: "/faq",
};

export const finalCta = {
  text: "Ready to stop eating the same boring lunch",
  buttonLabel: "Check my price on WhatsApp",
};
