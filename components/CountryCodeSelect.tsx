"use client";

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  decodeCountryCodeSelection,
  encodeCountryCodeSelection,
  filterCountryCodeRows,
  findRowBySelection,
  type CountryCodeRow,
} from "@/lib/countryCodes";

export type CountryCodeSelectProps = {
  value: string;
  onChange: (encodedSelection: string) => void;
  className?: string;
  id?: string;
};

export function CountryCodeSelect({ value, onChange, className = "", id }: CountryCodeSelectProps) {
  const autoId = useId();
  const listboxId = id ?? `country-code-${autoId}`;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = findRowBySelection(value);
  const displayDial = selected?.dialCode ?? decodeCountryCodeSelection(value)?.dialCode ?? "";

  const filtered = filterCountryCodeRows(query);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    if (!open) return;
    const t = requestAnimationFrame(() => searchRef.current?.focus());
    return () => cancelAnimationFrame(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  const pick = (row: CountryCodeRow) => {
    onChange(encodeCountryCodeSelection(row.isoCode, row.dialCode));
    close();
  };

  const triggerClasses =
    "flex w-[5.75rem] shrink-0 cursor-pointer items-center justify-between gap-1 rounded-xl border border-border-subtle bg-surface px-2.5 py-3.5 text-left text-[14px] font-semibold text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 sm:w-[110px] sm:px-3";

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        className={triggerClasses}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="truncate">{displayDial || "—"}</span>
        <span className="shrink-0 text-[10px] text-secondary-text" aria-hidden>
          ▼
        </span>
      </button>

      {open && (
        <div
          id={listboxId}
          role="listbox"
          className="absolute left-0 top-full z-50 mt-1 w-[min(100vw-2rem,280px)] rounded-xl border border-border-subtle bg-surface py-2 shadow-lg"
        >
          <div className="px-2 pb-2">
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country or code"
              className="w-full rounded-lg border border-border-subtle px-3 py-2 text-[13px] font-medium text-foreground placeholder:text-secondary-text/70 focus:outline-none focus:ring-2 focus:ring-primary"
              autoComplete="off"
              aria-label="Search country codes"
            />
          </div>
          <ul
            className="max-h-[min(50vh,240px)] overflow-y-auto px-1"
            role="presentation"
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-[13px] text-secondary-text">No matches</li>
            ) : (
              filtered.map((row) => {
                const encoded = encodeCountryCodeSelection(row.isoCode, row.dialCode);
                const isSelected = value === encoded;
                return (
                  <li key={`${row.isoCode}-${row.dialCode}`} role="presentation">
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      className={`flex w-full flex-col items-start gap-0.5 rounded-lg px-3 py-2 text-left text-[13px] transition-colors ${
                        isSelected
                          ? "bg-primary/10 font-semibold text-primary"
                          : "text-foreground hover:bg-bg-light"
                      }`}
                      onClick={() => pick(row)}
                    >
                      <span className="font-semibold">{row.dialCode}</span>
                      <span className="text-[12px] font-medium text-secondary-text">
                        {row.name}
                      </span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
