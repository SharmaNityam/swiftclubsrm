"use client";

import { useEffect } from "react";
import { Contrast, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export const THEME_KEY = "theme";
type Theme = "light" | "dark" | "apple";

/**
 * Three-state color mode switch.
 *
 * Holds no React state for the current theme, and that is deliberate: the theme
 * is already on `<html data-theme>` before hydration (see the init script in
 * layout.tsx). Mirroring it into state would either mismatch during hydration
 * or force a "mounted" guard that flashes the wrong icon. Instead all three icons
 * render every time and CSS picks one via the `dark:` variant — so the markup
 * is identical on server and client, and the button is correct on first paint.
 *
 * Holding no state is also why there is no `setState` here: the only effect
 * subscribes to the OS preference, which is exactly what effects are for.
 */
export function ThemeToggle({ className }: { className?: string }) {
  /* Keep following the OS until the user actually expresses a preference. */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem(THEME_KEY);
      } catch {}
      if (saved === "light" || saved === "dark" || saved === "apple") return; // user overrode the OS
      apply(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const current = document.documentElement.dataset.theme;
    const next: Theme =
      current === "light" ? "dark" : current === "dark" ? "apple" : "light";
    apply(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "grid size-10 place-items-center rounded-full text-ink",
        "transition-colors duration-200 hover:bg-hairline/70",
        className,
      )}
    >
      {/* CSS, not state, decides which icon shows — no hydration mismatch. */}
      <Moon className="theme-icon-moon size-[1.15rem]" aria-hidden />
      <Sun className="theme-icon-sun size-[1.15rem]" aria-hidden />
      <Contrast className="theme-icon-apple size-[1.15rem]" aria-hidden />

      <span className="sr-only">Cycle color mode</span>
    </button>
  );
}

/** Sets the attribute and keeps the mobile browser chrome in step. */
function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute(
      "content",
      theme === "apple" ? "#000000" : theme === "dark" ? "#121011" : "#fffcfa",
    );
}
