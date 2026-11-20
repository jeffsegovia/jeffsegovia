import { clsx } from 'clsx'
import type { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

/** Same-site links written as absolute URLs in the old posts become
 * relative paths, so they stay inside the app. */
export function toInternalPath(href: string): string | undefined {
  const match = /^https?:\/\/(?:www\.)?jeffsegovia\.dev(\/[^#?]*)?/.exec(href)
  if (match) return match[1] || '/'
  return href.startsWith('/') ? href : undefined
}
