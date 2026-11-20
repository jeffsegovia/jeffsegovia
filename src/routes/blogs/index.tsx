import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { PageHeader } from '@/components/site/page-header'
import { SocialIcon } from '@/components/site/social-icon'
import { site } from '@/config/site'
import { formatDate, postTags, posts, snippets } from '@/lib/content'
import { JsonLd, PERSON_ID, breadcrumbJsonLd, graph } from '@/lib/seo/json-ld'
import { absoluteUrl, seo } from '@/lib/seo/meta'
import { cn } from '@/lib/utils'

const description =
  'Tutorials and notes by Jeff Segovia on React, TypeScript, Node.js, REST APIs and Tailwind CSS.'

export const Route = createFileRoute('/blogs/')({
  validateSearch: (search: Record<string, unknown>): { tag?: string } =>
    typeof search.tag === 'string' ? { tag: search.tag } : {},
  head: () => seo({ title: 'Blog', description, path: '/blogs' }),
  component: Blog,
})

export function ContentTabs({ current }: { current: 'posts' | 'snippets' }) {
  const tab = (active: boolean) =>
    cn(
      'py-2.5 text-sm transition-colors',
      active
        ? 'text-foreground font-medium shadow-[inset_0_-2px_0_var(--foreground)]'
        : 'text-muted-foreground hover:text-foreground',
    )
  return (
    <nav aria-label="Writing" className="flex gap-6 border-b">
      <Link
        to="/blogs"
        className={tab(current === 'posts')}
        aria-current={current === 'posts' ? 'page' : undefined}
      >
        Posts{' '}
        <span className="text-muted-foreground font-mono text-xs">
          {posts.length}
        </span>
      </Link>
      <Link
        to="/snippets"
        className={tab(current === 'snippets')}
        aria-current={current === 'snippets' ? 'page' : undefined}
      >
        Snippets{' '}
        <span className="text-muted-foreground font-mono text-xs">
          {snippets.length}
        </span>
      </Link>
    </nav>
  )
}

function Blog() {
  const { tag } = Route.useSearch()
  const navigate = useNavigate({ from: '/blogs/' })
  const [query, setQuery] = useState('')

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return posts.filter(
      (p) =>
        (!tag || p.tags.includes(tag)) &&
        (!q ||
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))),
    )
  }, [tag, query])

  const chip = (active: boolean) =>
    cn(
      'h-8 border px-3 text-[13px] font-medium transition-colors',
      active
        ? 'bg-foreground text-background border-foreground'
        : 'hover:bg-accent',
    )

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 pt-16 pb-24 sm:px-6">
      <JsonLd
        data={graph(
          {
            '@type': 'Blog',
            name: `${site.name} — Blog`,
            url: absoluteUrl('/blogs'),
            description,
            author: { '@id': PERSON_ID },
            blogPost: posts.map((p) => ({
              '@type': 'BlogPosting',
              headline: p.title,
              url: absoluteUrl(`/blogs/${p.slug}`),
              datePublished: p.date,
            })),
          },
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blogs' },
          ]),
        )}
      />
      <div className="flex items-start justify-between gap-4">
        <PageHeader title="Blog">
          <p>
            Tutorials and notes on React, TypeScript, Node.js and CSS — written
            to help other developers ship with more confidence.
          </p>
        </PageHeader>
        <a
          href="/rss.xml"
          className="text-muted-foreground hover:text-foreground mt-2 inline-flex shrink-0 items-center gap-1.5 text-sm"
        >
          <SocialIcon icon="rss" className="size-3.5" /> RSS
        </a>
      </div>

      <ContentTabs current="posts" />

      <div className="flex flex-col gap-4">
        <div className="relative">
          <label htmlFor="post-search" className="sr-only">
            Search posts
          </label>
          <Search
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
            aria-hidden="true"
          />
          <input
            id="post-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts"
            className="border-input bg-background placeholder:text-muted-foreground focus-visible:border-foreground h-10 w-full border pr-3 pl-9 text-sm outline-none"
          />
        </div>
        <div
          role="group"
          aria-label="Filter by topic"
          className="flex flex-wrap gap-2"
        >
          <button
            type="button"
            className={chip(!tag)}
            aria-pressed={!tag}
            onClick={() =>
              navigate({ search: {}, replace: true, resetScroll: false })
            }
          >
            All
          </button>
          {postTags.map(({ tag: t }) => (
            <button
              key={t}
              type="button"
              className={chip(tag === t)}
              aria-pressed={tag === t}
              onClick={() =>
                navigate({
                  search: tag === t ? {} : { tag: t },
                  replace: true,
                  resetScroll: false,
                })
              }
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {shown.length} {shown.length === 1 ? 'post' : 'posts'} shown
      </p>
      <ol>
        {shown.map((p) => (
          <li key={p.slug}>
            <Link
              to="/blogs/$slug"
              params={{ slug: p.slug }}
              className="group grid gap-1 border-b py-5 sm:grid-cols-[120px_1fr] sm:gap-5"
            >
              <time
                dateTime={p.date}
                className="text-muted-foreground pt-0.5 font-mono text-xs"
              >
                {formatDate(p.date, 'short')}
              </time>
              <span className="flex flex-col gap-1.5">
                <h2 className="font-medium leading-snug group-hover:underline group-hover:decoration-brand group-hover:underline-offset-4">
                  {p.title}
                </h2>
                <span className="text-muted-foreground text-sm leading-relaxed">
                  {p.description}
                </span>
                <span className="text-muted-foreground font-mono text-xs">
                  {p.tags.join(' · ')}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
      {shown.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No posts match. Try another topic or search.
        </p>
      ) : null}
    </div>
  )
}
