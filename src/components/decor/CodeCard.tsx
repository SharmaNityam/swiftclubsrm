import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * The dark snippet card floating beside the hero.
 *
 * Built from real text rather than a screenshot: it stays sharp on any display,
 * scales with the layout, and the copy lives in `site.ts` with everything else.
 */
export function CodeCard({ className }: { className?: string }) {
  const { declaration, values, close } = site.hero.code;

  return (
    <div
      className={cn(
        "rounded-[10px] border border-white/10 bg-[#17171A] px-4 py-3.5",
        "font-mono text-[0.625rem] leading-[1.7] shadow-[0_10px_24px_-16px_rgba(11,11,12,0.45)]",
        "sm:text-[0.6875rem]",
        className,
      )}
    >
      <pre className="text-[#E6E6E9]">
        <code>
          <span className="text-[#FF9E6B]">let</span> ideas{" "}
          <span className="text-[#8F8F98]">=</span> {declaration.slice(-1)}
          {values.map((v) => (
            <span key={v} className="block pl-4 text-[#FFB27A]">
              &quot;{v}&quot;
              <span className="text-[#8F8F98]">,</span>
            </span>
          ))}
          <span className="block">{close}</span>
        </code>
      </pre>
    </div>
  );
}
