/**
 * Full-screen hero slides — client photography from /public/hero (source:
 * /public/new_assets). Each slide pairs its photo with its own overlay copy,
 * written to match what's happening in that specific image, so photo and
 * text always change together.
 *
 * Image-only (videos removed per client request). Auto-advances on a timer;
 * `objectPosition` frames the wide desktop crop and `objectPositionMobile`
 * keeps the subject in frame on tall phone screens.
 */

export interface HeroSlide {
  src: string;
  alt: string;
  eyebrow: string;
  headline: [string, string];
  sub: string;
  /** CSS object-position for the desktop (wide) crop. */
  objectPosition?: string;
  /** CSS object-position for phone screens (tall crop of a wide image). */
  objectPositionMobile?: string;
  /** Hold time before auto-advancing, ms. */
  durationMs: number;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    src: "/hero/farhana.png",
    alt: "NutriChef brand ambassador Farhana Bodi with fresh meal bowls and a green juice",
    eyebrow: "Farhana Bodi · Brand Ambassador",
    headline: ["Your goals,", "on the menu."],
    sub: "Every meal signed off to your macros — championed by our brand ambassador, Farhana Bodi.",
    objectPosition: "center 25%",
    objectPositionMobile: "68% center",
    durationMs: 6500,
  },
  {
    src: "/hero/radhey.png",
    alt: "Celebrity Chef Radhey plating NutriChef dishes in Dubai",
    eyebrow: "Our celebrity chef",
    headline: ["Crafted by", "Chef Radhey."],
    sub: "Fine-dining plates, engineered for your goals.",
    objectPosition: "center 30%",
    objectPositionMobile: "68% center",
    durationMs: 6500,
  },
  {
    src: "/hero/hero.png",
    alt: "NutriChef ready-to-eat meal box and cold-pressed juices",
    eyebrow: "Delivered daily · Dubai, Abu Dhabi, Sharjah & Ajman",
    headline: ["Fresh. Daily.", "Yours."],
    sub: "Meals and cold-pressed juices at your door by 10 AM.",
    objectPosition: "center 30%",
    objectPositionMobile: "66% center",
    durationMs: 6500,
  },
];
