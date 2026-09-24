"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { scrollToSection, smoothScrollToY } from "@/lib/scroll";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  /* Passive listener: the nav only needs a boolean, so we avoid reading layout
     properties on every frame and never trigger a synchronous reflow. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock the page behind the mobile sheet. */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /**
   * Section links are real hrefs (/about, /domains, ...) so they work without
   * JS and can be opened in a new tab. When the target section is on this page
   * we intercept, ease to it, and push the same clean URL — no reload, no hash.
   */
  const onHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (!document.getElementById("top")) return;
    e.preventDefault();
    smoothScrollToY(0);
    window.history.pushState(null, "", "/");
    setOpen(false);
  };

  const onSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    // Let the browser handle modified clicks (new tab, download, etc.)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (!scrollToSection(href.slice(1))) return; // not on this page — navigate
    e.preventDefault();
    window.history.pushState(null, "", href);
    setOpen(false);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-hairline/70 bg-cream/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-[88px] max-w-[1320px] items-center justify-between px-6 md:px-10"
      >
        <Link
          href="/"
          onClick={onHomeClick}
          className="flex items-center gap-2.5"
        >
          {/* Same official mark as the hero, so the logo stays consistent */}
          <Image
            src="/images/logo-swift.png"
            alt=""
            width={447}
            height={447}
            className="size-10 rounded-[9px]"
          />
          <span className="font-display text-[1.1875rem] tracking-[-0.02em] text-ink">
            {site.name}
          </span>
        </Link>

        <ul className="hidden items-center gap-9 lg:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={(e) => onSectionClick(e, item.href)}
                className="text-[0.9375rem] text-muted transition-colors duration-200 hover:text-ink"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <ThemeToggle />

          <Button
            href={site.joinUrl}
            variant="dark"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Join Us
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full text-ink lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-hairline bg-cream/97 backdrop-blur-md lg:hidden"
      >
        <ul className="mx-auto flex max-w-[1320px] flex-col px-6 py-3">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={(e) => onSectionClick(e, item.href)}
                className="block border-b border-hairline/70 py-3.5 text-[0.9375rem] text-ink last:border-0"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-4 sm:hidden">
            <Button href={site.joinUrl} variant="dark" size="sm">
              Join Us
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
