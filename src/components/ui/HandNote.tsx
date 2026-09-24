import { cn } from "@/lib/utils";

type HandNoteProps = {
  /** Each string renders on its own line, as in the mockup's margin notes. */
  lines: readonly string[];
  className?: string;
  /** Slight rotation sells the "written in the margin" feel. */
  rotate?: number;
  size?: "sm" | "md" | "lg";
};

const SIZES = {
  sm: "text-[1.25rem] lg:text-[1.625rem]",
  md: "text-[1.5rem] lg:text-[1.875rem]",
  lg: "text-[2rem] lg:text-[3rem]",
} as const;

/**
 * The handwritten marginalia ("Same students. Bigger possibilities.",
 * "More than code / A community", "You here? Maybe soon :)").
 *
 * Rendered as real text rather than an image so it stays crisp at any zoom,
 * remains selectable, and is read aloud by screen readers.
 */
export function HandNote({
  lines,
  className,
  rotate = -4,
  size = "md",
}: HandNoteProps) {
  return (
    <p
      className={cn(
        "font-hand leading-[1.15] text-flame",
        SIZES[size],
        className,
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </p>
  );
}
