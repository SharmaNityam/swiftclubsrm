import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "flame" | "dark" | "outline";
  size?: "sm" | "md";
  /** Trailing arrow, as on every CTA in the design. */
  arrow?: boolean;
  className?: string;
};

const VARIANTS = {
  flame: "bg-flame text-white hover:bg-[#e04315]",
  // Both tokens flip together, so the pair stays inverted in either theme.
  // `text-white` here would be white-on-near-white once --color-ink flips.
  dark: "bg-ink text-cream hover:opacity-85",
  outline: "border border-hairline bg-surface text-ink hover:border-flame hover:text-flame",
} as const;

const SIZES = {
  sm: "h-11 px-6 text-[0.9375rem] gap-2",
  md: "h-[58px] px-8 text-[1.0625rem] gap-2.5",
} as const;

export function Button({
  href,
  children,
  variant = "flame",
  size = "md",
  arrow = true,
  className,
}: ButtonProps) {
  const isExternal = href.startsWith("http");

  const content = (
    <>
      <span>{children}</span>
      {arrow ? (
        <ArrowRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden
        />
      ) : null}
    </>
  );

  const classes = cn(
    "group inline-flex items-center justify-center rounded-full font-medium",
    "transition-all duration-300 ease-out active:scale-[0.98]",
    VARIANTS[variant],
    SIZES[size],
    className,
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
