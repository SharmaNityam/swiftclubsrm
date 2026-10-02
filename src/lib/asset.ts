import fs from "node:fs";
import path from "node:path";

/**
 * Does this file exist under /public?
 *
 * Called from Server Components, so for a statically-rendered page this
 * resolves at build time - letting sections fall back to a coded placeholder
 * with no client-side cost, no `onError` flash and no layout shift.
 */
export function hasAsset(publicPath: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", publicPath));
  } catch {
    return false;
  }
}
