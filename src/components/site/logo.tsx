import { cn } from '@/lib/utils'

/** The mark: a heavy J and a full stop — the ".dev" period, and a solder
 * node. The J takes `currentColor`; the dot is the brand accent. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={cn('size-6', className)}
    >
      <path
        d="M36 10 V40 a12 12 0 0 1 -24 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="9"
      />
      <circle cx="50" cy="48" r="5.5" className="fill-brand" />
    </svg>
  )
}
