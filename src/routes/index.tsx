import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Avatar } from '@/components/site/avatar'
import { SectionTitle } from '@/components/site/page-header'
import { SocialIcon } from '@/components/site/social-icon'
import { buttonVariants } from '@/components/ui/button'
import { experience, formatMonth } from '@/config/experience'
import { projects } from '@/config/projects'
import { site, socials } from '@/config/site'
import { formatDate, posts } from '@/lib/content'
import { JsonLd, graph, personJsonLd, websiteJsonLd } from '@/lib/seo/json-ld'
import { seo } from '@/lib/seo/meta'

export const Route = createFileRoute('/')({
  head: () =>
    seo({
      description: site.description,
      path: '/',
      type: 'profile',
    }),
  component: Home,
})

function MoreLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm transition-colors"
    >
      {children}
      <ArrowRight className="size-3.5" aria-hidden="true" />
    </Link>
  )
}

function Home() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-20 px-4 pt-16 pb-24 sm:px-6 sm:pt-20">
      <JsonLd data={graph(personJsonLd(), websiteJsonLd())} />

      <section aria-labelledby="intro" className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Avatar className="size-16" priority />
          <div className="flex flex-col gap-1">
            <h1
              id="intro"
              className="text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              {site.name}
            </h1>
            <p className="text-muted-foreground text-base">
              {site.jobTitle} · {site.region}
            </p>
          </div>
        </div>
        <p className="max-w-2xl text-[17px] leading-relaxed">{site.shortBio}</p>
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/projects" className={buttonVariants()}>
            View projects
          </Link>
          <a
            href={`mailto:${site.email}`}
            className={buttonVariants({ variant: 'outline' })}
          >
            Get in touch
          </a>
          <ul
            className="flex items-center gap-0.5 sm:ml-2"
            aria-label="Social profiles"
          >
            {socials
              .filter((s) => s.icon !== 'mail')
              .map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="me noopener"
                    aria-label={s.label}
                    title={s.label}
                    className={buttonVariants({
                      variant: 'ghost',
                      size: 'icon',
                    })}
                  >
                    <SocialIcon icon={s.icon} />
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="work">
        <SectionTitle
          id="work"
          action={<MoreLink to="/projects">All projects</MoreLink>}
        >
          Selected projects
        </SectionTitle>
        <ul>
          {projects.map((p) => (
            <li key={p.slug} className="border-b">
              <Link
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="group flex items-center gap-4 py-4"
              >
                <img
                  src={p.image.src}
                  alt=""
                  width={1200}
                  height={630}
                  loading="lazy"
                  decoding="async"
                  className="bg-muted aspect-[1200/630] w-24 shrink-0 border object-cover sm:w-28"
                />
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="font-medium group-hover:underline group-hover:decoration-brand group-hover:underline-offset-4">
                    {p.name}
                  </span>
                  <span className="text-muted-foreground text-sm leading-snug">
                    {p.summary}
                  </span>
                </span>
                <span className="text-muted-foreground hidden shrink-0 font-mono text-xs sm:block">
                  {p.year}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="exp">
        <SectionTitle
          id="exp"
          action={<MoreLink to="/about">More about me</MoreLink>}
        >
          Experience
        </SectionTitle>
        <ol>
          {experience.map((r) => (
            <li
              key={`${r.company}-${r.title}`}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b py-4"
            >
              <span className="flex flex-col gap-0.5">
                <span className="font-medium">{r.title}</span>
                <span className="text-muted-foreground text-sm">
                  {r.company}
                </span>
              </span>
              <span className="text-muted-foreground font-mono text-xs">
                {formatMonth(r.start)} —{' '}
                {r.end ? formatMonth(r.end) : 'Present'}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="writing">
        <SectionTitle
          id="writing"
          action={<MoreLink to="/blogs">All posts</MoreLink>}
        >
          Recent writing
        </SectionTitle>
        <ul>
          {posts.slice(0, 5).map((post) => (
            <li key={post.slug} className="border-b">
              <Link
                to="/blogs/$slug"
                params={{ slug: post.slug }}
                className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span className="group-hover:underline group-hover:decoration-brand group-hover:underline-offset-4">
                  {post.title}
                </span>
                <time
                  dateTime={post.date}
                  className="text-muted-foreground shrink-0 font-mono text-xs"
                >
                  {formatDate(post.date)}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
