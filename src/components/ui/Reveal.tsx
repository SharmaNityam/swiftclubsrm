"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger sibling reveals by passing an increasing delay. */
  delay?: number;
  /** Travel distance in px. Use 0 for a pure fade. */
  y?: number;
  as?: "div" | "li" | "section";
};

/**
 * The single scroll-reveal primitive for the whole page.
 *
 * Centralising it means the `prefers-reduced-motion` escape hatch is written
 * once: when the user has asked for less motion we render a plain element with
 * no transform and no opacity transition, rather than a "faster" animation.
 *
 * The JS branch alone is not sufficient under SSR. On the server the hook
 * cannot know the preference, so motion serialises `opacity:0` into the HTML;
 * when the client flips to the plain element React reuses the same DOM node and
 * leaves motion's imperatively-set inline style in place, stranding the content
 * at opacity 0. The `data-reveal` hook in globals.css overrides that at the CSS
 * level, which holds during SSR, hydration and after.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
}: RevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    const Tag = as;
    return (
      <Tag className={className} data-reveal="">
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      data-reveal=""
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
