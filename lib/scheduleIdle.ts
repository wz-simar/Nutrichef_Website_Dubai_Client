/** Start work only once `el` is close to the screen, so a lab load of the hero does not also pull it. */
export function whenNearViewport(
  el: Element | null,
  run: () => void,
  rootMargin = "400px",
): () => void {
  if (!el) return () => {};
  if (typeof IntersectionObserver === "undefined") {
    run();
    return () => {};
  }
  const io = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      io.disconnect();
      run();
    },
    { rootMargin },
  );
  io.observe(el);
  return () => io.disconnect();
}

/** Run after the first paint so hero image bytes are not competing with this work. */
export function scheduleIdle(run: () => void, timeout = 2500): () => void {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(run, { timeout });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(run, 1200);
  return () => window.clearTimeout(id);
}
