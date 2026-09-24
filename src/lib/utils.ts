import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge conditional class names, with later Tailwind utilities winning over
 * earlier conflicting ones (`px-4` + `px-6` → `px-6`). Lets components expose a
 * `className` prop that can genuinely override internal defaults.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
