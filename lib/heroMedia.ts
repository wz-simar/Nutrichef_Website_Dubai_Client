/**
 * Full-screen hero slides — client assets from /public/hero (source:
 * /public/new_assets). Each slide pairs its media with its own overlay copy,
 * so photo and text change together.
 *
 * Slide order per client: video → Farhana Bodi (brand ambassador) →
 * video → Chef Radhey → ambassador with juices.
 *
 * Behaviour: video slides play to the end, then auto-advance; image slides
 * hold for `durationMs`. `objectPosition` frames the wide desktop crop and
 * `objectPositionMobile` keeps the subject in frame on tall phone screens.
 */

export interface HeroSlide {
  media:
    | { type: "image"; src: string }
    | { type: "video"; src: string; poster: string };
  alt: string;
  eyebrow: string;
  headline?: [string, string];
  sub?: string;
  /** CSS object-position for the desktop (wide) crop. */
  objectPosition?: string;
  /** CSS object-position for phone screens (tall crop of a wide image). */
  objectPositionMobile?: string;
  /** Hold time for image slides, ms. Videos play to their end instead. */
  durationMs: number;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    media: {
      type: "video",
      src: "/hero/breakfast.mp4",
      poster: "/hero/breakfast-poster.jpg",
    },
    alt: "NutriChef breakfast being prepared fresh in the kitchen",
    eyebrow: "MBR NutriChef Cafe · Dubai",
    headline: ["Eat clean.", "Live well."],
    sub: "Chef-crafted meals, fresh every morning across the UAE.",
    durationMs: 9000,
  },
  {
    media: { type: "image", src: "/hero/farhana-bodi.jpg" },
    alt: "NutriChef brand ambassador Farhana Bodi with fresh meal bowls and a green juice",
    eyebrow: "Farhana Bodi · Brand Ambassador",
    headline: ["Your goals,", "on the menu."],
    sub: "Every meal signed off to your macros — championed by our brand ambassador, Farhana Bodi.",
    objectPosition: "center 25%",
    objectPositionMobile: "42% center",
    durationMs: 6500,
  },
  {
    media: {
      type: "video",
      src: "/hero/strawberry-matcha.mp4",
      poster: "/hero/strawberry-matcha-poster.jpg",
    },
    alt: "Strawberry matcha being crafted at the NutriChef cafe bar",
    eyebrow: "From our cafe bar",
    headline: ["Fuel your body.", "Nourish your life."],
    sub: "Cold-pressed juices, matcha & more — made in-house daily.",
    durationMs: 9000,
  },
  {
    media: { type: "image", src: "/hero/chef-plating.jpg" },
    alt: "Celebrity Chef Radhey plating NutriChef dishes in Dubai",
    eyebrow: "Our celebrity chef",
    headline: ["Crafted by", "Chef Radhey."],
    sub: "Fine-dining plates, engineered for your goals.",
    objectPosition: "center 30%",
    objectPositionMobile: "68% center",
    durationMs: 6500,
  },
  {
    media: { type: "image", src: "/hero/ambassador-juices.jpg" },
    alt: "NutriChef ready-to-eat meal box and cold-pressed juices",
    eyebrow: "Delivered daily · Dubai, Abu Dhabi, Sharjah & Ajman",
    headline: ["Fresh. Daily.", "Yours."],
    sub: "Meals and cold-pressed juices at your door by 10 AM.",
    objectPosition: "center 30%",
    objectPositionMobile: "62% center",
    durationMs: 6500,
  },
];
