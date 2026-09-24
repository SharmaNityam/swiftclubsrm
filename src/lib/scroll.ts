/**
 * Programmatic scrolling with an Apple-style easing curve.
 *
 * Deliberately does NOT hijack the wheel. Apple's own sites keep native
 * scrolling and only ease *programmatic* jumps; libraries that intercept wheel
 * events (Lenis and friends) add input latency, fight trackpad momentum and
 * break find-in-page. Easing the nav jumps gives the premium feel without any
 * of that cost.
 */

/** Height of the sticky header; targets are offset so they clear it. */
export const NAV_OFFSET = 88;

/** easeInOutQuart — slow departure, long glide, soft arrival. */
const ease = (t: number) =>
  t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

let frame: number | null = null;
let detach: (() => void) | null = null;

export function cancelSmoothScroll() {
  if (frame !== null) cancelAnimationFrame(frame);
  frame = null;
  detach?.();
  detach = null;
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** True while an eased scroll is running (scroll-spy uses this to stand down). */
export function isScrolling() {
  return frame !== null;
}

export function smoothScrollToY(targetY: number, onDone?: () => void) {
  cancelSmoothScroll();

  const maxY = document.documentElement.scrollHeight - window.innerHeight;
  const to = Math.max(0, Math.min(targetY, maxY));
  const from = window.scrollY;
  const delta = to - from;

  if (Math.abs(delta) < 2 || prefersReducedMotion()) {
    window.scrollTo(0, to);
    onDone?.();
    return;
  }

  // Longer trips take longer, but within a range that never feels sluggish.
  const duration = Math.min(1100, Math.max(480, 320 + Math.abs(delta) * 0.32));
  const start = performance.now();

  // Any real input from the user wins immediately — never trap their scroll.
  const abort = () => cancelSmoothScroll();
  const onKey = (e: KeyboardEvent) => {
    if (
      ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(
        e.key,
      )
    )
      cancelSmoothScroll();
  };
  window.addEventListener("wheel", abort, { passive: true });
  window.addEventListener("touchstart", abort, { passive: true });
  window.addEventListener("keydown", onKey);
  detach = () => {
    window.removeEventListener("wheel", abort);
    window.removeEventListener("touchstart", abort);
    window.removeEventListener("keydown", onKey);
  };

  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    window.scrollTo(0, from + delta * ease(t));
    if (t < 1) {
      frame = requestAnimationFrame(step);
    } else {
      frame = null;
      detach?.();
      detach = null;
      onDone?.();
    }
  };
  frame = requestAnimationFrame(step);
}

/** Scroll a section into view, clearing the sticky header. Returns false if absent. */
export function scrollToSection(id: string, onDone?: () => void) {
  const el = document.getElementById(id);
  if (!el) return false;
  const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  smoothScrollToY(y, onDone);
  return true;
}
