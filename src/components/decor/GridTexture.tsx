import { cn } from "@/lib/utils";

/**
 * The faint graph-paper texture behind the Domains section. Built from two
 * repeating gradients and faded out with a mask so it dissolves into the page
 * rather than ending on a hard edge.
 */
export function GridTexture({
  className,
  size = 26,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      aria-hidden
      className={cn("theme-decorative-background pointer-events-none absolute", className)}
      style={{
        backgroundImage: `
          repeating-linear-gradient(to right,  rgba(249,78,30,0.16) 0 1px, transparent 1px ${size}px),
          repeating-linear-gradient(to bottom, rgba(249,78,30,0.16) 0 1px, transparent 1px ${size}px)
        `,
        maskImage:
          "radial-gradient(ellipse at 30% 50%, rgba(0,0,0,0.9), transparent 70%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at 30% 50%, rgba(0,0,0,0.9), transparent 70%)",
      }}
    />
  );
}
