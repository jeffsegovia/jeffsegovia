import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { MdxBody } from '@/components/site/mdx-body'
import { Badge } from '@/components/ui/badge'
import { site } from '@/config/site'
import { getSnippet, loadSnippetBody } from '@/lib/content'
import { JsonLd, PERSON_ID, breadcrumbJsonLd, graph } from '@/lib/seo/json-ld'
import { absoluteUrl, seo } from '@/lib/seo/meta'

export const Route = createFileRoute('/snippets/$slug')({
  loader: async ({ params }) => {
    const snippet = getSnippet(params.slug)
    if (!snippet) throw notFound()
    await loadSnippetBody(snippet.slug)
    return { slug: snippet.slug }
  },
  head: ({ loaderData }) => {
    const s = loaderData && getSnippet(loaderData.slug)
    if (!s) return {}
    return seo({
      title: s.title,
      description: s.description,
      path: `/snippets/${s.slug}`,
      type: 'article',
      tags: s.tags,
    })
  },
  component: SnippetPage,
})

function SnippetPage() {
  const { slug } = Route.useLoaderData()
  const s = getSnippet(slug)!
  const url = absoluteUrl(`/snippets/${s.slug}`)
  return (
    <div className="mx-auto max-w-3xl px-4 pt-10 pb-24 sm:px-6">
      <JsonLd
        data={graph(
          {
            '@type': 'TechArticle',
            headline: s.title,
            description: s.description,
            url,
            keywords: s.tags.join(', '),
            inLanguage: 'en',
            author: {
              '@type': 'Person',
              '@id': PERSON_ID,
              name: site.name,
              url: site.url,
            },
          },
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Snippets', path: '/snippets' },
            { name: s.title, path: `/snippets/${s.slug}` },
          ]),
        )}
      />
      <Link
        to="/snippets"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors"
      >
        <ArrowLeft className="size-3.5" aria-hidden="true" /> All snippets
      </Link>
      <article className="mt-8">
        <header className="mb-8 flex flex-col gap-4">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {s.title}
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {s.description}
          </p>
          <ul className="flex flex-wrap gap-1.5" aria-label="Topics">
            {s.tags.map((t) => (
              <li key={t}>
                <Badge>{t}</Badge>
              </li>
            ))}
          </ul>
        </header>
        <div className="prose-site">
          <MdxBody kind="snippet" slug={s.slug} />
        </div>
      </article>
    </div>
  )
}
