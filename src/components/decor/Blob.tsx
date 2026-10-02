import { cn } from "@/lib/utils";

/**
 * A soft coral gradient wash. Rendered as a blurred radial-gradient rather than
 * a PNG so it scales to any viewport without banding and recolours from tokens.
 */
export function Blob({
  className,
  from = "rgba(249,78,30,0.30)",
  to = "rgba(255,122,69,0)",
}: {
  className?: string;
  from?: string;
  to?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "theme-decorative-background pointer-events-none absolute rounded-full blur-[70px] dark:opacity-40",
        className,
      )}
      style={{ background: `radial-gradient(circle at 50% 50%, ${from}, ${to} 70%)` }}
    />
  );
}

/**
 * The rotated rounded-square motif that bleeds off the left edge of the About
 * section and sits behind the hero card - a flattened echo of the logo tile.
 */
export function TileShape({
  className,
  tone = "flame",
}: {
  className?: string;
  tone?: "flame" | "peach" | "blush";
}) {
  const TONES = {
    flame: "bg-flame",
    peach: "bg-peach/80",
    blush: "bg-blush",
  } as const;

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-[22%]", TONES[tone], className)}
    />
  );
}
