import { cn } from "@/lib/utils";

/**
 * Hand-drawn marker strokes. All stroke-only and `currentColor`-driven so the
 * colour comes from the parent's text colour, and all `aria-hidden` - they are
 * ornament, never information.
 */

/** Curved arrow pointing from a margin note toward the thing it annotates. */
export function SketchArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 80"
      className={cn("block", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M95 7C72 3 38 9 21 33c-6 8-8 18-5 28" />
      <path d="M16 61 8 49M16 61l12-5" />
    </svg>
  );
}

/** Loose underline swoosh, as beneath the About photo and the hand notes. */
export function Squiggle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 20"
      className={cn("block", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M3 13c14-9 26 6 39-2s24-9 37-1 25 4 38-5" />
    </svg>
  );
}

/** Hand-drawn bolt that punctuates the Domains heading. */
export function Spark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("block", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M64 4 27 51l23-3-19 45 42-49-24 3 15-43Z" />
    </svg>
  );
}

/** Short underline bar with a hand-drawn wobble, used under hand notes. */
export function Underswoosh({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 14"
      className={cn("block", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M4 10c22-6 44-8 66-6s44 6 66-2" />
    </svg>
  );
}
