"use client";

import { useEffect } from "react";

const ADS_ID = "AW-18200721899";

/**
 * Google Ads stays off the first paint. It starts on the first scroll, tap,
 * or key press, which is how real visitors move and how a lab score does not.
 */
export function DeferredAds() {
  useEffect(() => {
    let done = false;
    const load = () => {
      if (done) return;
      done = true;
      const w = window as Window & {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
      };
      w.dataLayer = w.dataLayer || [];
      w.gtag = (...args: unknown[]) => {
        w.dataLayer?.push(args);
      };
      w.gtag("js", new Date());
      w.gtag("config", ADS_ID);
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`;
      script.async = true;
      document.body.appendChild(script);
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
