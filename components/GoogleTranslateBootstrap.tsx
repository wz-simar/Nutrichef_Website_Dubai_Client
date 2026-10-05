'use client';

import { useLayoutEffect } from 'react';
import {
  CB_NAME,
  SCRIPT_ID,
  SCRIPT_SRC,
  parseGoogtransTarget,
  scheduleInit,
} from '@/lib/googleTranslateShared';
declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
  }
}

/** Loads the script once and mounts the single `#google_translate_element` host. */
export function GoogleTranslateBootstrap() {
  useLayoutEffect(() => {
    const load = () => {
      const onReady = () => scheduleInit();
      window[CB_NAME] = onReady;

      const existing = document.getElementById(SCRIPT_ID);
      if (!existing) {
        const s = document.createElement('script');
        s.id = SCRIPT_ID;
        s.src = `${SCRIPT_SRC}?cb=${CB_NAME}`;
        s.async = true;
        s.addEventListener('load', onReady, { once: true });
        document.body.appendChild(s);
      }

      onReady();
    };

    if (parseGoogtransTarget()) load();
  }, []);

  return (
    <div
      id="google_translate_element"
      className="google-translate-gadget-layer"
      aria-hidden
    />
  );
}
