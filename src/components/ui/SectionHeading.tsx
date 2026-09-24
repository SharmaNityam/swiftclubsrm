import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  /** The "01" / "02" marker. */
  index: string;
  title: string;
  className?: string;
  /** Underline bar width. The mockup uses a short accent under each title. */
  align?: "left" | "center";
};

/**
 * The numbered section marker used by About / Domains / Team / Gallery /
 * Recruitments. One component guarantees the index, the vertical flame rule and
 * the display title stay in identical relationship across all five sections.
 */
export function SectionHeading({
  index,
  title,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <Reveal className={cn("flex gap-5 md:gap-10", className)}>
      {/* Fixed width so heading + body copy share one indent (see md:ml-[8.5rem]) */}
      <div className="flex w-8 shrink-0 flex-col items-center pt-1 md:w-24">
        <span className="font-mono text-[0.8125rem] font-medium tracking-wide text-flame">
          {index}
        </span>
        <span
          className="mt-3 w-px flex-1 bg-flame/60 min-h-12 md:min-h-16"
          aria-hidden
        />
      </div>

      <div className={cn(align === "center" && "text-center")}>
        <h2 className="display-tight text-[clamp(1.9rem,8vw,5.75rem)] uppercase">
          {title}
        </h2>
        <span
          className={cn(
            "mt-4 block h-[3px] w-14 rounded-full bg-flame",
            align === "center" && "mx-auto",
          )}
          aria-hidden
        />
      </div>
    </Reveal>
  );
}
