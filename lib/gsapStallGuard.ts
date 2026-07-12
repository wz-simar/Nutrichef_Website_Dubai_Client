import gsap from "gsap";

/**
 * Fallback for environments where requestAnimationFrame is starved (hidden
 * tabs, suspended webviews, headless captures): GSAP's ticker never advances,
 * which would trap elements in their animation from-states (invisible).
 *
 * If the ticker frame count hasn't moved after `ms`, the context is reverted —
 * all inline animation styles are removed and the section renders in its
 * final, static CSS state. In any actively rendered browser the ticker
 * advances within a frame or two and this is a no-op.
 *
 * Returns a cleanup that cancels the watchdog.
 */
export function guardAgainstRafStall(ctx: gsap.Context, ms = 1200): () => void {
  const startFrame = gsap.ticker.frame;
  const id = window.setTimeout(() => {
    if (gsap.ticker.frame === startFrame) {
      ctx.revert();
    }
  }, ms);
  return () => window.clearTimeout(id);
}
