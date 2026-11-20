import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { PageHeader, SectionTitle } from '@/components/site/page-header'
import { Badge } from '@/components/ui/badge'
import { earlierProjects, projects } from '@/config/projects'
import { site } from '@/config/site'
import { JsonLd, PERSON_ID, breadcrumbJsonLd, graph } from '@/lib/seo/json-ld'
import { absoluteUrl, seo } from '@/lib/seo/meta'

const description =
  'Projects by Jeff Segovia: Bliss, Osamu, Reviu, Worsheep, Abide in the Vine and GateLab — web apps designed, built and shipped end to end — plus earlier work.'

export const Route = createFileRoute('/projects/')({
  head: () => seo({ title: 'Projects', description, path: '/projects' }),
  component: Projects,
})

function Projects() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-14 px-4 pt-16 pb-24 sm:px-6">
      <JsonLd
        data={graph(
          {
            '@type': 'CollectionPage',
            name: `Projects · ${site.name}`,
            url: absoluteUrl('/projects'),
            description,
            author: { '@id': PERSON_ID },
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: projects.map((p, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                url: absoluteUrl(`/projects/${p.slug}`),
                name: p.name,
              })),
            },
          },
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Projects', path: '/projects' },
          ]),
        )}
      />
      <PageHeader title="Projects">
        <p>
          Products I have designed, built and shipped end to end — from the
          database schema to the last pixel. Most run on TanStack Start with
          Postgres.
        </p>
      </PageHeader>

      <section aria-labelledby="featured">
        <SectionTitle id="featured">Featured</SectionTitle>
        <ul className="mt-4 grid gap-5 sm:grid-cols-2">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="group bg-card hover:border-foreground/40 flex h-full flex-col border transition-colors"
              >
                <img
                  src={p.image.src}
                  alt={p.image.alt}
                  width={1200}
                  height={630}
                  loading="lazy"
                  decoding="async"
                  className="bg-muted aspect-[1200/630] w-full border-b object-cover"
                />
                <div className="flex flex-1 flex-col gap-2.5 p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="text-[17px] font-semibold tracking-tight group-hover:underline group-hover:decoration-brand group-hover:underline-offset-4">
                      {p.name}
                    </h2>
                    <span className="text-muted-foreground font-mono text-xs">
                      {p.kind}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {p.description}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                    {p.stack.slice(0, 4).map((s) => (
                      <Badge key={s}>{s}</Badge>
                    ))}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="earlier">
        <SectionTitle id="earlier">
          Earlier work &amp; practice projects
        </SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="text-muted-foreground border-b text-left text-[13px]">
                <th scope="col" className="py-2.5 pr-4 font-medium">
                  Project
                </th>
                <th scope="col" className="py-2.5 pr-4 font-medium">
                  About
                </th>
                <th scope="col" className="py-2.5 font-medium">
                  Built with
                </th>
              </tr>
            </thead>
            <tbody>
              {earlierProjects.map((p) => (
                <tr key={p.name} className="border-b align-top">
                  <td className="py-3 pr-4 font-medium whitespace-nowrap">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-1 hover:underline hover:decoration-brand hover:underline-offset-4"
                    >
                      {p.name}
                      <ArrowUpRight
                        className="text-muted-foreground size-3.5"
                        aria-hidden="true"
                      />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </td>
                  <td className="text-muted-foreground py-3 pr-4 leading-relaxed">
                    {p.summary}
                  </td>
                  <td className="text-muted-foreground py-3 font-mono text-xs whitespace-nowrap">
                    {p.stack}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
