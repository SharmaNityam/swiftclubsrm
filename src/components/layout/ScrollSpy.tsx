"use client";

import { useEffect } from "react";
import { site } from "@/content/site";
import { isScrolling, NAV_OFFSET } from "@/lib/scroll";

const SECTION_IDS = site.nav.map((n) => n.href.slice(1));

/**
 * Rewrites the address bar to match the section in view, so scrolling to
 * Domains leaves you on `/domains` and that URL is shareable.
 *
 * Uses replaceState, never pushState: scrolling past five sections must not
 * stack five entries the Back button has to chew through.
 */
export function ScrollSpy() {
  useEffect(() => {
    let current = window.location.pathname;

    const sync = () => {
      // Stand down while a nav click's eased scroll is flying past sections.
      if (isScrolling()) return;

      const top = window.scrollY + NAV_OFFSET + 1;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      let path = "/";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= top) path = `/${id}`;
      }
      // The last section is short; treat page-bottom as being inside it.
      if (atBottom) path = `/${SECTION_IDS[SECTION_IDS.length - 1]}`;
      if (window.scrollY < 40) path = "/";

      if (path !== current) {
        current = path;
        window.history.replaceState(null, "", path);
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        sync();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
