import { cn } from "@/lib/utils";

/**
 * The Swift bird, traced directly from the supplied swift-card.png (contour
 * extracted, card tilt flattened, normalised to a 0-100 viewBox) so the mark is
 * accurate rather than approximated. Inlined to inherit `currentColor` and stay
 * crisp at any size; used in the navbar tile, the recruitment card watermark and
 * as the hero card's fallback.
 */
export function SwiftMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("block", className)}
      fill="currentColor"
      aria-hidden
    >
      <path d="M27.8 9.7L46.6 27.5L74.0 50.5L75.7 47.7L77.5 40.9L77.4 32.2L73.6 18.6L69.8 10.7L65.1 3.6L76.4 12.1L83.3 18.7L88.1 24.3L91.0 28.5L95.6 37.5L96.7 42.1L97.3 42.5L98.8 50.9L98.5 59.7L97.1 65.8L94.9 70.7L97.9 75.3L100.0 84.1L99.7 89.0L97.1 96.4L96.4 93.2L93.5 89.5L90.6 87.3L85.3 85.6L82.4 85.4L74.1 87.4L70.6 89.2L56.8 92.0L47.8 91.2L37.3 87.9L27.9 82.9L18.5 76.0L13.5 71.3L5.4 62.1L0.0 53.7L3.6 56.7L11.6 61.6L19.2 65.1L28.1 67.8L35.7 68.9L42.0 68.9L51.6 66.6L55.5 64.6L56.7 63.4L50.1 58.2L36.1 44.5L24.6 30.8L13.9 16.4L50.5 43.5L50.8 43.0L49.9 41.2L39.9 27.6Z" />
    </svg>
  );
}
