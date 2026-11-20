import { Link, createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '@/components/site/page-header'
import { site } from '@/config/site'
import { snippets } from '@/lib/content'
import { JsonLd, PERSON_ID, breadcrumbJsonLd, graph } from '@/lib/seo/json-ld'
import { absoluteUrl, seo } from '@/lib/seo/meta'
import { ContentTabs } from '@/routes/blogs/index'

const description =
  'Code snippets by Jeff Segovia: React hooks, Zod and Yup validation schemas and a collection of regular expressions.'

export const Route = createFileRoute('/snippets/')({
  head: () => seo({ title: 'Snippets', description, path: '/snippets' }),
  component: Snippets,
})

function Snippets() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 pt-16 pb-24 sm:px-6">
      <JsonLd
        data={graph(
          {
            '@type': 'CollectionPage',
            name: `Snippets · ${site.name}`,
            url: absoluteUrl('/snippets'),
            description,
            author: { '@id': PERSON_ID },
          },
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Snippets', path: '/snippets' },
          ]),
        )}
      />
      <PageHeader title="Snippets">
        <p>
          Code I have used or found essential in my coding journey. I hope these
          help you be more productive, too.
        </p>
      </PageHeader>
      <ContentTabs current="snippets" />
      <ul className="grid gap-4 sm:grid-cols-2">
        {snippets.map((s) => (
          <li key={s.slug}>
            <Link
              to="/snippets/$slug"
              params={{ slug: s.slug }}
              className="group hover:border-foreground/40 flex h-full flex-col gap-2 border p-5 transition-colors"
            >
              <h2 className="font-medium group-hover:underline group-hover:decoration-brand group-hover:underline-offset-4">
                {s.title}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {s.description}
              </p>
              <span className="text-muted-foreground mt-auto pt-1 font-mono text-xs">
                {s.tags.join(' · ')}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
