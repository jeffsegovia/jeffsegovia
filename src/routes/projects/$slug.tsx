import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { getProject, projects } from '@/config/projects'
import { JsonLd, PERSON_ID, breadcrumbJsonLd, graph } from '@/lib/seo/json-ld'
import { absoluteUrl, seo } from '@/lib/seo/meta'

export const Route = createFileRoute('/projects/$slug')({
  loader: ({ params }) => {
    const project = getProject(params.slug)
    if (!project) throw notFound()
    return { slug: project.slug }
  },
  head: ({ loaderData }) => {
    const p = loaderData && getProject(loaderData.slug)
    if (!p) return {}
    return seo({
      title: `${p.name} — ${p.summary.replace(/\.$/, '')}`,
      description: `${p.name}: ${p.description} Built by Jeff Segovia with ${p.stack.slice(0, 3).join(', ')}.`,
      path: `/projects/${p.slug}`,
      image: {
        url: absoluteUrl(p.image.src),
        alt: p.image.alt,
        width: 1200,
        height: 630,
      },
    })
  },
  component: ProjectPage,
})

function ProjectPage() {
  const { slug } = Route.useLoaderData()
  const p = getProject(slug)!
  const i = projects.findIndex((x) => x.slug === slug)
  const prev = projects[(i - 1 + projects.length) % projects.length]
  const next = projects[(i + 1) % projects.length]
  const host = new URL(p.url).host

  return (
    <div className="mx-auto max-w-3xl px-4 pt-10 pb-24 sm:px-6">
      <JsonLd
        data={graph(
          {
            '@type': 'SoftwareApplication',
            name: p.name,
            description: p.description,
            url: p.url,
            image: absoluteUrl(p.image.src),
            applicationCategory: 'WebApplication',
            operatingSystem: 'Any',
            author: { '@id': PERSON_ID },
            creator: { '@id': PERSON_ID },
          },
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Projects', path: '/projects' },
            { name: p.name, path: `/projects/${p.slug}` },
          ]),
        )}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', to: '/' },
          { name: 'Projects', to: '/projects' },
          { name: p.name },
        ]}
      />

      <article className="mt-8">
        <header className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {p.name}
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {p.summary}
          </p>
          <div>
            <a
              href={p.url}
              target="_blank"
              rel="noopener"
              className={buttonVariants()}
            >
              Visit {host}
              <ArrowUpRight aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </header>

        <dl className="my-8 grid grid-cols-2 gap-5 border-y py-5 sm:grid-cols-4">
          {[
            ['Role', p.role],
            ['Year', p.year],
            ['Type', p.kind],
            ['Platform', p.platform],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-muted-foreground mb-1 text-xs">{k}</dt>
              <dd className="text-sm font-medium">{v}</dd>
            </div>
          ))}
        </dl>

        <img
          src={p.image.src}
          alt={p.image.alt}
          width={1200}
          height={630}
          fetchPriority="high"
          className="bg-muted aspect-[1200/630] w-full border object-cover"
        />

        <div className="prose-site mt-4">
          <h2>Overview</h2>
          {p.overview.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
          <h2>Highlights</h2>
          <ul>
            {p.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <h2>Stack</h2>
        </div>
        <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Technologies">
          {p.stack.map((s) => (
            <li key={s}>
              <Badge>{s}</Badge>
            </li>
          ))}
        </ul>
      </article>

      <nav
        aria-label="More projects"
        className="mt-16 grid grid-cols-2 gap-4 border-t pt-6"
      >
        <Link
          to="/projects/$slug"
          params={{ slug: prev.slug }}
          className="hover:border-foreground/40 flex flex-col gap-1 border p-4 transition-colors"
        >
          <span className="text-muted-foreground flex items-center gap-1 text-xs">
            <ArrowLeft className="size-3.5" aria-hidden="true" /> Previous
          </span>
          <span className="font-medium">{prev.name}</span>
        </Link>
        <Link
          to="/projects/$slug"
          params={{ slug: next.slug }}
          className="hover:border-foreground/40 flex flex-col items-end gap-1 border p-4 text-right transition-colors"
        >
          <span className="text-muted-foreground flex items-center gap-1 text-xs">
            Next <ArrowRight className="size-3.5" aria-hidden="true" />
          </span>
          <span className="font-medium">{next.name}</span>
        </Link>
      </nav>
    </div>
  )
}
