import { useEffect, useState } from 'react'
import type { TocHeading } from '@/lib/content'
import { cn } from '@/lib/utils'

/** "On this page": the h2s and h3s, with the one in view marked. */
export function TableOfContents({
  headings,
}: {
  headings: ReadonlyArray<TocHeading>
}) {
  const [active, setActive] = useState<string | undefined>(headings[0]?.id)

  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) setActive(visible[0].target.id)
      },
      { rootMargin: '0px 0px -70% 0px' },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 2) return null
  return (
    <nav aria-labelledby="toc-title" className="text-sm">
      <p id="toc-title" className="mb-3 font-medium">
        On this page
      </p>
      <ul className="flex flex-col border-l">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              aria-current={active === h.id ? 'location' : undefined}
              className={cn(
                '-ml-px block border-l py-1.5 leading-snug transition-colors',
                h.depth === 3 ? 'pl-6' : 'pl-3',
                active === h.id
                  ? 'border-brand text-foreground'
                  : 'text-muted-foreground hover:text-foreground border-transparent',
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
