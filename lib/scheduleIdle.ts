/** Run after the first paint so hero image bytes are not competing with this work. */
export function scheduleIdle(run: () => void, timeout = 2500): () => void {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(run, { timeout });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(run, 1200);
  return () => window.clearTimeout(id);
}
