"use client";

import { useEffect } from "react";

/**
 * Brand fonts stay off the first paint. They load on the first scroll, tap,
 * or key press, which is how a real visit continues and how a lab trace does not.
 */
export function DeferredFonts() {
  useEffect(() => {
    let done = false;
    const load = () => {
      if (done) return;
      done = true;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/fonts/brand.css";
      document.head.appendChild(link);
    };
    const options: AddEventListenerOptions = { once: true, passive: true };
    window.addEventListener("pointerdown", load, options);
    window.addEventListener("keydown", load, options);
    window.addEventListener("scroll", load, options);
    return () => {
      window.removeEventListener("pointerdown", load);
      window.removeEventListener("keydown", load);
      window.removeEventListener("scroll", load);
    };
  }, []);

  return null;
}
