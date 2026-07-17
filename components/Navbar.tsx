"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NutrichefLogo } from "@/components/NutrichefLogo";
import { MenuOverlay } from "./MenuOverlay";
import { RegionSelector } from "@/components/RegionSelector";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/why-us", label: "Why us" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact-us", label: "Contact" },
  {
    href: "/blogs/Top-5-Healthy-Meal-Delivery-Services-in-Dubai",
    label: "Compare plans",
  },
] as const;

const LG = "(min-width: 1024px)";

const DRAWER_TOP = "calc(env(safe-area-inset-top, 0px) + 4.25rem)";

const NAVBAR_HEIGHT_PX = 68;

/** One instance per mount: the same JSX was rendered twice (lg / not-lg) with a shared ref, so `ref` only attached to one hidden node and outside-click closed the visible menu before `click` fired — logout never ran. */
function NavbarUserMenu() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated, logout } = useAuth();

  const initials = user?.name
    ? user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
    : "U";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex shrink-0 items-center gap-2">
      {isAuthenticated ? (
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 rounded-full bg-primary px-2 py-1.5 text-white shadow-sm transition hover:bg-primary-hover"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
              {initials}
            </div>
            <span className="hidden max-w-[100px] truncate text-xs font-semibold sm:inline">
              {user?.name || "Account"}
            </span>
            <svg
              className={`h-3.5 w-3.5 shrink-0 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
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

          {isDropdownOpen ? (
            <div className="absolute right-0 top-full z-[80] mt-2 w-[220px] rounded-2xl border border-border-subtle bg-surface py-2 shadow-lg">
              <div className="border-b border-border-subtle px-4 py-3">
                <p className="truncate text-sm font-semibold text-foreground">
                  {user?.name || "User"}
                </p>
                <p className="truncate text-xs text-secondary-text">
                  {user?.email ||
                    (user?.phone
                      ? `+${user.countryCode} ${user.phone}`
                      : "")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  logout();
                  setIsDropdownOpen(false);
                }}
                className="w-full px-4 py-2.5 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                Log out
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <Link
          href="/auth/login"
          className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover"
        >
          Sign up
        </Link>
      )}
    </div>
  );
}

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [fullMenuOpen, setFullMenuOpen] = useState(false);
  const [overHero, setOverHero] = useState(false);
  const panelCloseRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia(LG);
    const closeIfDesktop = () => {
      if (mq.matches) setOpen(false);
    };
    closeIfDesktop();
    mq.addEventListener("change", closeIfDesktop);
    return () => mq.removeEventListener("change", closeIfDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => panelCloseRef.current?.focus(), 0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /**
   * Track whether the navbar currently sits above a hero section (e.g. on the
   * homepage). Pages without `#hero` always render the solid navbar. We use a
   * scroll listener with `getBoundingClientRect` so we can react the moment
   * the hero scrolls past the navbar — which lines up with the user reaching
   * the "Discover our daily-changing menu" section that follows it.
   */
  useEffect(() => {
    let frame = 0;

    const evaluate = () => {
      const hero = document.getElementById("hero");
      if (!hero) {
        setOverHero(false);
        return;
      }
      const rect = hero.getBoundingClientRect();
      setOverHero(rect.bottom > NAVBAR_HEIGHT_PX);
    };

    frame = window.requestAnimationFrame(evaluate);

    const onScroll = () => evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  const transparent = overHero && !open;

  return (
    <header className="fixed top-0 z-50 w-full pt-[env(safe-area-inset-top,0px)]">
      {open ? (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-[55] bg-foreground/25 backdrop-blur-[2px] lg:hidden"
            onClick={() => setOpen(false)}
          />
          <div
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed right-0 z-[60] flex w-full max-w-[min(100vw,20rem)] flex-col overflow-hidden rounded-l-2xl border-l border-t border-border-subtle bg-surface shadow-[0_24px_64px_-16px_rgba(27,48,34,0.18)] sm:max-w-[19rem] lg:hidden"
            style={{
              top: DRAWER_TOP,
              height:
                "calc(100dvh - env(safe-area-inset-top, 0px) - 4.25rem - env(safe-area-inset-bottom, 0px))",
            }}
          >
            <div className="flex items-center justify-between gap-3 border-b border-border-subtle bg-bg-light/50 px-4 py-3.5 sm:px-5">
              <NutrichefLogo className="!h-[1.85rem] max-w-[min(150px,48vw)] sm:!h-8" />
              <button
                ref={panelCloseRef}
                type="button"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background text-foreground transition hover:bg-bg-light"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <svg
                  className="h-5 w-5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <nav
              className="flex flex-1 flex-col gap-0.5 overflow-y-auto overscroll-contain px-3 py-4 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] sm:px-4"
              aria-label="Mobile menu"
            >
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="font-heading flex min-h-12 items-center rounded-xl px-4 text-base font-medium text-foreground/90 transition hover:bg-bg-light hover:text-foreground"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/plans"
                className="mt-4 flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover"
                onClick={() => setOpen(false)}
              >
                See plans
              </Link>
              <button
                type="button"
                className="mt-3 flex min-h-11 items-center justify-center rounded-xl border border-border-subtle px-5 text-sm font-semibold text-foreground transition hover:bg-bg-light"
                onClick={() => {
                  setFullMenuOpen(true);
                  setOpen(false);
                }}
              >
                Full site menu
              </button>
            </nav>
          </div>
        </>
      ) : null}

      <nav
        className={`relative z-[70] transition-[background-color,border-color,box-shadow] duration-300 ${transparent
            ? "border-b border-transparent bg-transparent"
            : "border-b border-border-subtle bg-background"
          } ${open && !transparent ? "shadow-sm" : ""}`}
        aria-label="Main"
      >
        <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-3 px-5 sm:px-8 lg:gap-4 lg:px-10">
          <Link
            href="/"
            className="flex min-h-10 min-w-0 shrink-0 items-center py-1"
            onClick={() => setOpen(false)}
          >
            <NutrichefLogo
              priority
              className={`!h-8 max-w-[min(190px,58vw)] transition-[filter] duration-300 sm:!h-9 lg:!h-10 ${
                transparent ? "brightness-0 invert" : ""
              }`}
            />
          </Link>

          <div className="hidden min-w-0 flex-1 items-center justify-end gap-1 lg:flex">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`rounded-full px-3 py-2 text-sm font-medium transition ${transparent
                    ? "text-white/85 hover:bg-white/10 hover:text-white"
                    : "text-foreground/65 hover:bg-bg-light hover:text-foreground"
                  }`}
              >
                {label}
              </Link>
            ))}
            <div className="ml-1">
              <RegionSelector onTransparent={transparent} />
            </div>
            <Link
              href="/plans"
              className="ml-1 inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover"
            >
              See plans
            </Link>
            <div className="ml-2 pl-2">
              <NavbarUserMenu />
            </div>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <RegionSelector onTransparent={transparent} />
            <NavbarUserMenu />
            <button
              type="button"
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition ${transparent
                  ? "bg-white/15 text-white backdrop-blur hover:bg-white/25"
                  : "bg-bg-light text-foreground hover:bg-bg-light/80"
                }`}
              aria-expanded={open}
              aria-controls={open ? menuId : undefined}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <svg
                  className="h-5 w-5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      <MenuOverlay
        isOpen={fullMenuOpen}
        onClose={() => setFullMenuOpen(false)}
      />
    </header>
  );
};
