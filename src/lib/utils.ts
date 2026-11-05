import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/** Deploy base path without a trailing slash: "" at a domain root, "/egor.website" on GitHub Pages. */
export const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, "")

/** Prefixes an app-absolute path ("/ru/about") with the deploy base path. */
export const withBase = (path: string) => `${BASE_PATH}${path}`

/** Removes the deploy base path from a browser pathname. */
export const stripBase = (path: string) =>
  BASE_PATH && path.startsWith(BASE_PATH) ? path.slice(BASE_PATH.length) || "/" : path

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
