import Image from "next/image";

type Props = {
  /** Badge size in px — controls both the container and the inner mark. */
  size?: number;
  className?: string;
  shape?: "rounded" | "circle";
};

/**
 * Branded stand-in for the old per-plan emoji glyphs (🔥💪🥗🛍️…): the
 * NutriChef leaf mark on a soft brand-gradient badge. Used everywhere a plan
 * icon appears — builder cards, order summary, home carousel, pricing
 * picker, plan detail hero — so the icon language stays on-brand instead of
 * mismatched system emoji.
 */
export function PlanIconBadge({ size = 44, className = "", shape = "rounded" }: Props) {
  const innerSize = Math.round(size * 0.56);
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${
        shape === "circle" ? "rounded-full" : "rounded-2xl"
      } bg-gradient-to-br from-primary/12 via-accent-warm/10 to-gold/15 shadow-[0_6px_16px_-6px_rgba(28,107,69,0.4)] ring-1 ring-primary/10 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/fav/android-chrome-512x512.png"
        alt=""
        width={innerSize}
        height={innerSize}
        className="object-contain"
      />
    </span>
  );
}
