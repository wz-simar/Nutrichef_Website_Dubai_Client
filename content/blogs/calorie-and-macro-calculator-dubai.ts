import type { BlogBlock, BlogPost } from "@/lib/blog/types";
import { CALORIE_MACRO_CALCULATOR_DUBAI_LINKS } from "@/content/blogs/calorie-and-macro-calculator-dubai-links";

export const calorieAndMacroCalculatorDubai: BlogPost = {
  slug: "Calorie-and-Macro-Calculator-Dubai",
  metaTitle: "Calorie and Macro Calculator Dubai | NutriChef",
  title:
    "How Many Calories and Macros Do You Need Each Day? A Simple Calculator Guide for Dubai",
  description:
    "Find out how many calories and macros you need each day. Follow four easy steps, see two worked examples, and get nutritionist reviewed advice made for life in Dubai.",
  publishedAt: "2026-11-09",
  readTimeMinutes: 11,
  category: "Guides",
  author: {
    name: "Dr. Fatima Al Hashimi",
    role: "Head Nutritionist & Culinary Director",
  },
  coverImage: {
    src: "/HeroSection.jpeg",
    alt: "Calorie and macro calculator guide for Dubai — NutriChef meal plans",
  },
  linkAnchors: CALORIE_MACRO_CALCULATOR_DUBAI_LINKS,
  blocks: [
    {
      type: "paragraph",
      text: "Reviewed by Dr. Fatima Al Hashimi, Head Nutritionist and Culinary Director",
    },
    {
      type: "paragraph",
      text: "You type “how many calories do I need?” into Google. Ten tools give you ten different answers. Some ask for your email before they show a number. Most show a number and nothing else, so you get no math, no safe limits, and no idea what to eat next.",
    },
    {
      type: "paragraph",
      text: "This guide fixes that. You will find your daily calories and macros in four easy steps. You will see the math, learn the safety limits, and turn grams into real meals you can find in Dubai. There is no email wall and no sign-up.",
    },
    {
      type: "callout",
      variant: "default",
      title: "Quick answer",
      text: "Most adults need roughly 1,600 to 3,000 calories a day to keep their weight steady, depending on age, size, and activity. To find your own number, work out your resting calories, multiply by your activity level, adjust for your goal, and then set your protein first. The four steps below show exactly how.",
    },
    {
      type: "heading",
      level: 2,
      text: "Calories, Macros, BMR, and TDEE in Plain Words",
      id: "calories-macros-bmr-tdee",
    },
    {
      type: "paragraph",
      text: "These four terms confuse many people, so here is the short version.",
    },
    {
      type: "list",
      style: "ordered",
      items: [
        "Calories measure the energy in food and drink.",
        "Macros are the three big nutrients that give you calories: protein, carbohydrates, and fat. Protein and carbs give 4 calories per gram. Fat gives 9 calories per gram.",
        "BMR is the energy your body burns at rest, just to stay alive.",
        "TDEE, or maintenance calories, is your BMR plus everything you burn by moving, working, and exercising. Eat this much and your weight stays about the same.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Step One, Find Your BMR",
      id: "step-one-find-your-bmr",
    },
    {
      type: "paragraph",
      text: "Use the Mifflin St Jeor equation. Researchers published it in 1990, and many nutrition professionals still use it. The UAE Ministry of Health and Prevention uses the same equation in its free daily calorie calculator, so you can check your result there.",
    },
    {
      type: "paragraph",
      text: "For men: 10 times your weight in kilograms, plus 6.25 times your height in centimetres, minus 5 times your age, plus 5.",
    },
    {
      type: "paragraph",
      text: "For women: 10 times your weight in kilograms, plus 6.25 times your height in centimetres, minus 5 times your age, minus 161.",
    },
    {
      type: "heading",
      level: 2,
      text: "Step Two, Multiply by Your Activity Level",
      id: "step-two-activity-level",
    },
    {
      type: "paragraph",
      text: "Pick the one that matches your real week, not your best week.",
    },
    {
      type: "list",
      style: "ordered",
      items: [
        "Sedentary, 1.2: desk job, little or no exercise",
        "Lightly active, 1.375: light exercise one to three days a week",
        "Moderately active, 1.55: moderate exercise three to five days a week",
        "Very active, 1.725: hard exercise six to seven days a week",
        "Extra active, 1.9: very hard training or a physical job",
      ],
    },
    {
      type: "paragraph",
      text: "Multiply your BMR by that number. The result is your maintenance calories.",
    },
    {
      type: "callout",
      variant: "highlight",
      title: "A Dubai tip",
      text: "Many people here drive to work, sit in air conditioned offices, and walk mostly in malls. That usually fits the first or second group, even on busy days. If you feel unsure, choose the lower number. Picking an activity level that is too high is one of the most common mistakes.",
    },
    {
      type: "heading",
      level: 2,
      text: "Step Three, Set Your Goal Number",
      id: "step-three-goal-number",
    },
    {
      type: "paragraph",
      text: "Your goal decides whether you eat at, below, or above your maintenance calories.",
    },
    {
      type: "list",
      style: "ordered",
      items: [
        "Keep your weight: eat your maintenance calories.",
        "Lose weight: eat 300 to 500 calories below maintenance. CDC and NHLBI guidance describes a steady pace of 1 to 2 pounds, about 0.5 to 1 kilogram, per week, which matches a deficit of 500 to 1,000 calories a day. We suggest starting at the gentle end, since small cuts are easier to keep and protect your muscle.",
        "Build muscle: eat 200 to 300 calories above maintenance, and train with weights.",
      ],
    },
    {
      type: "callout",
      variant: "highlight",
      title: "Safety limits",
      text: "Many health guidelines advise adults not to eat below about 1,200 calories (women) or 1,500 calories (men) a day without medical supervision. Very low calorie diets under 800 calories belong only in supervised programs. These are common guidelines, not rules for every body, so if your result falls below them, aim for a smaller cut and speak to a professional.",
    },
    {
      type: "heading",
      level: 2,
      text: "Step Four, Set Your Macros, Protein First",
      id: "step-four-macros-protein-first",
    },
    {
      type: "paragraph",
      text: "Always start with protein. It keeps you full and protects your muscle.",
    },
    {
      type: "paragraph",
      text: "The official minimum to prevent a deficiency is 0.8 grams per kilogram of body weight. For people who exercise to build or keep muscle, the International Society of Sports Nutrition says 1.4 to 2.0 grams per kilogram is enough for most. That advice is for healthy, exercising adults. If you have kidney problems or another health condition, ask your doctor before you raise your protein.",
    },
    {
      type: "paragraph",
      text: "Then follow these three moves:",
    },
    {
      type: "list",
      style: "ordered",
      items: [
        "Protein: multiply your weight in kilograms by your chosen number, such as 1.6. Multiply the grams by 4 to get protein calories.",
        "Fat: choose about 25 to 30 percent of your total calories. Divide those calories by 9 to get grams. Healthy ranges for fat sit between 20 and 35 percent of calories.",
        "Carbs: use all the calories that remain. Divide them by 4 to get grams.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Two Worked Examples",
      id: "two-worked-examples",
    },
    {
      type: "paragraph",
      text: "These are example people, so you can see the math in action.",
    },
    {
      type: "heading",
      level: 3,
      text: "Example one: a woman who wants to lose weight gently",
      id: "example-one-woman-lose-weight",
    },
    {
      type: "paragraph",
      text: "She is 32 years old, weighs 65 kg, stands 165 cm tall, and is lightly active.",
    },
    {
      type: "list",
      style: "ordered",
      items: [
        "BMR: 650 plus 1,031 minus 160 minus 161 equals about 1,360 calories.",
        "Maintenance: 1,360 times 1.375 equals about 1,870 calories.",
        "Goal: she cuts about 400 calories, so she eats about 1,470 calories.",
        "Protein: 65 times 1.6 equals about 104 grams, or 416 calories.",
        "Fat: 30 percent of 1,470 is about 441 calories, or 49 grams.",
        "Carbs: the remaining 613 calories equal about 153 grams.",
      ],
    },
    {
      type: "heading",
      level: 3,
      text: "Example two: a man who wants to build muscle",
      id: "example-two-man-build-muscle",
    },
    {
      type: "paragraph",
      text: "He is 35 years old, weighs 80 kg, stands 178 cm tall, and is moderately active.",
    },
    {
      type: "list",
      style: "ordered",
      items: [
        "BMR: 800 plus 1,112 minus 175 plus 5 equals about 1,743 calories.",
        "Maintenance: 1,743 times 1.55 equals about 2,700 calories.",
        "Goal: he adds about 250 calories, so he eats about 2,950 calories.",
        "Protein: 80 times 1.8 equals 144 grams, or 576 calories.",
        "Fat: 25 percent of 2,950 is about 738 calories, or 82 grams.",
        "Carbs: the remaining 1,636 calories equal about 409 grams.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "See Your Numbers on a Plate",
      id: "see-your-numbers-on-a-plate",
    },
    {
      type: "paragraph",
      text: "Grams only help when you can picture them. Here are rough guides for common foods. Labels and brands vary, so check the packet when you can.",
    },
    {
      type: "heading",
      level: 3,
      text: "Protein",
      id: "protein-portion-guides",
    },
    {
      type: "list",
      style: "ordered",
      items: [
        "Two eggs: about 12 grams",
        "A small tub of Greek yoghurt: about 15 grams",
        "100 grams of grilled chicken: about 30 grams",
        "100 grams of grilled fish: about 20 to 25 grams",
        "A cup of cooked lentils: about 18 grams",
        "A glass of milk: about 8 grams",
      ],
    },
    {
      type: "heading",
      level: 3,
      text: "Carbs",
      id: "carb-portion-guides",
    },
    {
      type: "list",
      style: "ordered",
      items: [
        "A cup of cooked rice: about 45 grams",
        "A medium banana: about 25 grams",
        "One Medjool date: about 18 grams",
      ],
    },
    {
      type: "heading",
      level: 3,
      text: "Fat",
      id: "fat-portion-guides",
    },
    {
      type: "list",
      style: "ordered",
      items: [
        "One tablespoon of olive oil: about 14 grams",
        "Half an avocado: about 15 grams",
      ],
    },
    {
      type: "paragraph",
      text: "So a 30 gram protein meal could be 100 grams of grilled chicken with rice and vegetables. It could also be two eggs and a small tub of Greek yoghurt for breakfast.",
    },
    {
      type: "heading",
      level: 2,
      text: "Why Your Result Is Only an Estimate",
      id: "why-your-result-is-only-an-estimate",
    },
    {
      type: "paragraph",
      text: "Every calculator guesses. Two people with the same height, weight, and age can burn different amounts of energy. Your sleep, stress, and muscle all change the answer. Treat your number as a starting point, not a verdict.",
    },
    {
      type: "paragraph",
      text: "Here is a simple two week test:",
    },
    {
      type: "list",
      style: "ordered",
      items: [
        "Eat at your target for two weeks.",
        "Weigh yourself at the same time, three times a week, and look at the average.",
        "If nothing changes and you want it to, adjust by 100 to 200 calories. Do not slash it.",
      ],
    },
    {
      type: "paragraph",
      text: "Scale weight also moves with water, salt, and hormones, so judge the trend, not one morning.",
    },
    {
      type: "heading",
      level: 2,
      text: "Six Common Mistakes to Avoid",
      id: "six-common-mistakes",
    },
    {
      type: "list",
      style: "ordered",
      items: [
        "Choosing an activity level that is too high. Be honest about your week.",
        "Cutting too deep. Big cuts cost you muscle, energy, and patience.",
        "Skipping protein. Protein is the one macro most people undereat.",
        "Forgetting liquid calories. Karak, juices, lattes, and soft drinks add up fast.",
        "Copying someone else’s numbers. Your body is not theirs.",
        "Trusting a tool that hides its math. If a calculator will not show how it works, question it.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "When to Skip the Calculator and Speak to a Professional",
      id: "when-to-speak-to-a-professional",
    },
    {
      type: "paragraph",
      text: "This guide suits healthy adults. Speak to a doctor or dietitian first if any of these apply to you:",
    },
    {
      type: "list",
      style: "ordered",
      items: [
        "You are under 18, pregnant, or breastfeeding",
        "You live with diabetes, kidney disease, or heart disease. Our page on diabetic friendly meal plans in Dubai explains more about eating for blood sugar.",
        "You take GLP1 medication, which changes appetite. Read our guide on what to eat on GLP1 medication in Dubai.",
        "You have a history of disordered eating, or counting numbers makes you anxious",
      ],
    },
    {
      type: "paragraph",
      text: "If numbers stress you out, that is a good reason to skip counting. A professional can guide you in a calmer way.",
    },
    {
      type: "heading",
      level: 2,
      text: "Turn Your Numbers Into Meals",
      id: "turn-your-numbers-into-meals",
    },
    {
      type: "paragraph",
      text: "Knowing your calories is step one. Eating to match them every day is the hard part, and that is where planning helps.",
    },
    {
      type: "paragraph",
      text: "NutriChef is a meal plan service, so here is what we offer. You can build a balanced, high protein, low carb, keto, or custom macro plan on our plans page. Every dish on the weekly menu shows its macros, so you can match meals to your targets. Dr. Fatima Al Hashimi signs off every menu, and meals arrive fresh before 10 AM across Dubai, Abu Dhabi, and Sharjah. Not sure which plan fits your numbers? Our concierge team can help.",
    },
    {
      type: "paragraph",
      text: "If you prefer to cook at home, use these numbers anyway. They work with any food. For help choosing a provider, read our buyer’s guide to healthy meal plans in Dubai.",
    },
    {
      type: "heading",
      level: 2,
      text: "Frequently Asked Questions",
      id: "frequently-asked-questions",
    },
    {
      type: "heading",
      level: 3,
      text: "How many calories do I need per day?",
      id: "faq-calories-per-day",
    },
    {
      type: "paragraph",
      text: "Most adults need roughly 1,600 to 3,000 calories to keep their weight steady. Your exact number depends on your age, size, sex, and activity. Use the four steps above.",
    },
    {
      type: "heading",
      level: 3,
      text: "How do I calculate my maintenance calories?",
      id: "faq-maintenance-calories",
    },
    {
      type: "paragraph",
      text: "Work out your BMR with the Mifflin St Jeor equation, then multiply it by your activity factor, from 1.2 to 1.9.",
    },
    {
      type: "heading",
      level: 3,
      text: "How much protein do I need per day?",
      id: "faq-protein-per-day",
    },
    {
      type: "paragraph",
      text: "The official minimum is 0.8 grams per kilogram of body weight. People who exercise to build or keep muscle often aim for 1.4 to 2.0 grams per kilogram. Ask your doctor or dietitian for a personal target.",
    },
    {
      type: "heading",
      level: 3,
      text: "Are online calorie calculators accurate?",
      id: "faq-calculator-accuracy",
    },
    {
      type: "paragraph",
      text: "They give a good starting estimate, not an exact answer. Test your result for two weeks and adjust by 100 to 200 calories if needed.",
    },
    {
      type: "heading",
      level: 3,
      text: "How many calories should I cut to lose weight safely?",
      id: "faq-safe-calorie-cut",
    },
    {
      type: "paragraph",
      text: "A cut of 300 to 500 calories below maintenance suits most healthy adults, and guidelines describe a pace of about 0.5 to 1 kilogram a week. Avoid going below 1,200 calories (women) or 1,500 calories (men) without medical supervision.",
    },
    {
      type: "heading",
      level: 3,
      text: "Do I need to count macros?",
      id: "faq-count-macros",
    },
    {
      type: "paragraph",
      text: "Not always. Many people do well by focusing on protein and sensible portions first. Counting macros helps most when you have a specific goal, such as building muscle.",
    },
    {
      type: "heading",
      level: 3,
      text: "Is it safe to eat below 1,200 calories?",
      id: "faq-below-1200",
    },
    {
      type: "paragraph",
      text: "For most adults, not without medical supervision. Very low calorie diets can cause muscle loss, tiredness, and nutrient gaps.",
    },
    {
      type: "heading",
      level: 2,
      text: "Get Your Numbers on a Plate",
      id: "get-your-numbers-on-a-plate",
    },
    {
      type: "paragraph",
      text: "You have your calories and your macros. Now make eating them easy. Send my numbers on WhatsApp, and our team will point you to meals that fit.",
    },
    {
      type: "richParagraph",
      parts: [
        { type: "link", href: "/plans", label: "Build my meal plan" },
        { type: "text", value: " →" },
      ],
    },
  ] satisfies BlogBlock[],
  cta: {
    heading: "Get your numbers on a plate",
    text: "Send your calorie and macro targets on WhatsApp, or build a plan that matches them.",
    buttonLabel: "Build my meal plan",
    buttonHref: "/plans",
  },
};
