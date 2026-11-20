import { Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, Info } from 'lucide-react'
import { cn, toInternalPath } from '@/lib/utils'

/** The components the old posts call by name, restyled for the new theme.
 * Their props are unchanged so the MDX files stay as they were. */

export function BannerImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      width={1200}
      height={675}
      className="not-prose my-0 aspect-video w-full border object-cover"
      fetchPriority="high"
      decoding="async"
    />
  )
}

/** A link written in a post. Links to jeffsegovia.dev stay in the app;
 * others open in a new tab. */
export function LinkInPage({ text, href }: { text: string; href: string }) {
  return <SmartLink href={href}>{text}</SmartLink>
}

export function RelativeLink({ href, label }: { href: string; label: string }) {
  return <SmartLink href={href}>{label}</SmartLink>
}

export function SmartLink({
  href = '',
  children,
  className,
  ...rest
}: React.ComponentProps<'a'>) {
  const internal = toInternalPath(href)
  if (internal !== undefined) {
    return (
      <Link to={internal} className={className}>
        {children}
      </Link>
    )
  }
  if (href.startsWith('#') || href.startsWith('mailto:')) {
    return (
      <a href={href} className={className} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...rest}
    >
      {children}
    </a>
  )
}

export function Alert({ children }: { children: React.ReactNode }) {
  return (
    <aside className="not-prose bg-muted/50 my-8 flex gap-3 border px-4 py-3.5 text-[15px] leading-relaxed">
      <Info
        className="text-muted-foreground mt-1 size-4 shrink-0"
        aria-hidden="true"
      />
      <div className="[&_code]:bg-muted [&_code]:px-1 [&_code]:font-mono [&_code]:text-[0.875em] [&>p]:inline">
        <span className="sr-only">Note: </span>
        {children}
      </div>
    </aside>
  )
}

export function LinkToPart({
  href,
  title,
  subtitle,
  direction,
}: {
  href: string
  title: string
  subtitle?: string
  direction: 'prev' | 'next'
}) {
  const to = toInternalPath(href) ?? href
  return (
    <div
      className={cn(
        'not-prose my-10 flex',
        direction === 'next' && 'justify-end',
      )}
    >
      <Link
        to={to}
        className={cn(
          'group hover:border-foreground flex w-full flex-col gap-1 border px-5 py-4 transition-colors sm:w-1/2',
          direction === 'next' && 'text-right',
        )}
      >
        <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
          {direction === 'prev' ? (
            <ArrowLeft
              className="size-3.5 transition-transform group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
          ) : null}
          <span className={cn(direction === 'next' && 'ml-auto')}>
            {subtitle ?? (direction === 'prev' ? 'Previous' : 'Next')}
          </span>
          {direction === 'next' ? (
            <ArrowRight
              className="size-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          ) : null}
        </span>
        <span className="font-medium">{title}</span>
      </Link>
    </div>
  )
}
