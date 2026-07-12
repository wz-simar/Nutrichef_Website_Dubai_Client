"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { REGIONS } from "@/lib/regions";
import { useRegion } from "@/contexts/RegionContext";
import {
  parseGoogtransTarget,
  setGoogtransCookie,
  getGoogleCombo,
  syncComboToLang,
  dispatchLanguageChange,
  LANGUAGE_CHANGE_EVENT,
} from "@/lib/googleTranslateShared";

const LANGS = [
  { code: "", label: "English", native: "EN" },
  { code: "ar", label: "Arabic", native: "العربية" },
] as const;

type Props = {
  /** Render style for transparent hero navbars vs solid. */
  onTransparent?: boolean;
};

/**
 * Header country + language selector. UAE always listed first.
 * Selecting a market routes to its landing page; selecting Arabic drives the
 * existing Google Website Translator cookie flow (see googleTranslateShared).
 */
export function RegionSelector({ onTransparent = false }: Props) {
  const { region, setRegionCode } = useRegion();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLang(parseGoogtransTarget() === "ar" ? "ar" : "");
    const onExternal = (e: Event) => {
      const code = (e as CustomEvent<{ code: string }>).detail?.code;
      if (typeof code === "string") setLang(code === "ar" ? "ar" : "");
    };
    window.addEventListener(LANGUAGE_CHANGE_EVENT, onExternal);
    return () => window.removeEventListener(LANGUAGE_CHANGE_EVENT, onExternal);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const selectRegion = (code: string, path: string) => {
    setRegionCode(code);
    setOpen(false);
    router.push(path);
  };

  const selectLang = (code: string) => {
    setLang(code);
    setOpen(false);
    const combo = getGoogleCombo();
    if (combo && combo.options.length > 0) {
      syncComboToLang(combo, code);
      combo.dispatchEvent(new Event("change", { bubbles: true }));
      dispatchLanguageChange(code);
      return;
    }
    setGoogtransCookie(code);
    dispatchLanguageChange(code);
    window.location.reload();
  };

  return (
    <div ref={wrapRef} className="notranslate relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Region: ${region.name}. Language: ${lang === "ar" ? "Arabic" : "English"}. Change region or language`}
        className={`flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-semibold transition ${
          onTransparent
            ? "bg-white/12 text-white backdrop-blur hover:bg-white/22"
            : "bg-bg-light text-foreground hover:bg-foreground/10"
        }`}
      >
        <span className="text-base leading-none" aria-hidden>
          {region.flag}
        </span>
        <span className="hidden sm:inline">{region.nameShort}</span>
        <span
          className={`hidden text-[0.6875rem] font-bold uppercase tracking-wide sm:inline ${
            onTransparent ? "text-white/65" : "text-secondary-text"
          }`}
        >
          · {lang === "ar" ? "ع" : "EN"}
        </span>
        <svg
          className={`h-3.5 w-3.5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open ? (
        <div className="absolute right-0 top-full z-[90] mt-2 w-[280px] overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-[0_24px_64px_-16px_rgba(18,42,30,0.28)]">
          <p className="px-4 pb-1 pt-3.5 text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-secondary-text">
            Choose your market
          </p>
          <ul role="listbox" aria-label="Country">
            {REGIONS.map((r) => {
              const active = r.code === region.code;
              return (
                <li key={r.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => selectRegion(r.code, r.path)}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-bg-light ${
                      active ? "bg-primary/[0.07]" : ""
                    }`}
                  >
                    <span className="text-xl leading-none" aria-hidden>
                      {r.flag}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-foreground">
                        {r.name}
                      </span>
                      <span className="block text-xs text-secondary-text">
                        {r.status === "live"
                          ? `Delivering now · ${r.currency}`
                          : "Opening soon · Priority list"}
                      </span>
                    </span>
                    {active ? (
                      <svg
                        className="h-4 w-4 shrink-0 text-primary"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="border-t border-border-subtle px-4 pb-1 pt-3 text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-secondary-text">
            Language
          </p>
          <div className="flex gap-2 px-4 pb-4 pt-1">
            {LANGS.map((l) => {
              const active = lang === l.code;
              return (
                <button
                  key={l.code || "en"}
                  type="button"
                  onClick={() => selectLang(l.code)}
                  className={`flex-1 rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                    active
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border-subtle text-foreground hover:bg-bg-light"
                  }`}
                >
                  {l.native}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
