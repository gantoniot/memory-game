// lib/responsive.ts
// ─── Responsive utilities — synced with Tailwind v4 @theme breakpoints ────────
// If you change breakpoints in globals.css @theme, update this file too.

"use client";

import { useState, useEffect, useCallback } from "react";

// Mirrors --breakpoint-* values defined in globals.css @theme
export const breakpoints = {
  sm:   480,   // 30rem
  md:   768,   // 48rem
  lg:   992,   // 62rem
  xl:   1280,  // 80rem
  "2xl":1536,  // 96rem
} as const;

export type Breakpoint = keyof typeof breakpoints;

/**
 * Returns the currently active breakpoint key.
 *
 * @example
 * const bp = useBreakpoint();
 * // bp === "md"
 */
export function useBreakpoint(): Breakpoint | "base" {
  const [current, setCurrent] = useState<Breakpoint | "base">("base");

  const update = useCallback(() => {
    const w = window.innerWidth;
    if      (w >= breakpoints["2xl"]) setCurrent("2xl");
    else if (w >= breakpoints.xl)     setCurrent("xl");
    else if (w >= breakpoints.lg)     setCurrent("lg");
    else if (w >= breakpoints.md)     setCurrent("md");
    else if (w >= breakpoints.sm)     setCurrent("sm");
    else                              setCurrent("base");
  }, []);

  useEffect(() => {
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, [update]);

  return current;
}

/**
 * Semantic device-type flags derived from the active breakpoint.
 *
 * @example
 * const { isMobile, isDesktop } = useDevice();
 */
export function useDevice() {
  const bp = useBreakpoint();

  return {
    isMobile:  bp === "base" || bp === "sm",
    isTablet:  bp === "md",
    isDesktop: bp === "lg" || bp === "xl" || bp === "2xl",
    isWide:    bp === "xl" || bp === "2xl",
  };
}

/**
 * Returns true when the viewport is at least the given breakpoint.
 *
 * @example
 * const isAboveMd = useMinWidth("md");
 */
export function useMinWidth(bp: Breakpoint): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${breakpoints[bp]}px)`);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [bp]);

  return matches;
}

/**
 * System-level media preference detection.
 *
 * @example
 * const { prefersReducedMotion } = useSystemPreferences();
 */
export function useSystemPreferences() {
  const [prefs, setPrefs] = useState({
    prefersDark:          false,
    prefersReducedMotion: false,
    prefersHighContrast:  false,
    isTouch:              false,
  });

  useEffect(() => {
    const queries = {
      prefersDark:          window.matchMedia("(prefers-color-scheme: dark)"),
      prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)"),
      prefersHighContrast:  window.matchMedia("(prefers-contrast: more)"),
      isTouch:              window.matchMedia("(hover: none) and (pointer: coarse)"),
    };

    const update = () =>
      setPrefs({
        prefersDark:          queries.prefersDark.matches,
        prefersReducedMotion: queries.prefersReducedMotion.matches,
        prefersHighContrast:  queries.prefersHighContrast.matches,
        isTouch:              queries.isTouch.matches,
      });

    update();
    Object.values(queries).forEach((q) => q.addEventListener("change", update));
    return () =>
      Object.values(queries).forEach((q) => q.removeEventListener("change", update));
  }, []);

  return prefs;
}

// ─── Responsive class usage reference ────────────────────────────────────────
//
// Standard mobile-first (min-width):
//   <div className="text-sm md:text-base xl:text-lg" />
//
// Max-width breakpoints (new in v4, no config needed):
//   <div className="max-md:hidden" />           → hidden below md
//   <nav className="max-lg:flex-col" />         → column layout below lg
//
// Container queries (native in v4, no plugin required):
//   <div className="@container">
//     <p className="text-sm @md:text-base @xl:text-lg">...</p>
//   </div>
//
// Fluid text (from @layer utilities in globals.css):
//   <h1 className="text-fluid-2xl font-display" />
//   <p  className="text-fluid-sm" />
