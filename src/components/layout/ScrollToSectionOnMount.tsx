"use client";

import { useEffect } from "react";
import { NAV_OFFSET } from "@/lib/scroll";

/**
 * Lands a direct visit to /about on the About section.
 *
 * Jumps instantly rather than easing: an eased scroll only reads as motion when
 * it answers a click. On a cold load it would just look like the page was
 * still settling. The rAF pair waits for layout so offsets are final.
 */
export function ScrollToSectionOnMount({ id }: { id: string }) {
  useEffect(() => {
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (!el) return;
        window.scrollTo(
          0,
          el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET,
        );
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [id]);

  return null;
}
