import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight, Phone } from 'lucide-react'
import { Avatar } from '@/components/site/avatar'
import { PageHeader, SectionTitle } from '@/components/site/page-header'
import { SocialIcon } from '@/components/site/social-icon'
import {
  awards,
  certifications,
  credentials,
  education,
  experience,
  formatMonth,
  skills,
} from '@/config/experience'
import { site, socials } from '@/config/site'
import {
  JsonLd,
  breadcrumbJsonLd,
  graph,
  personJsonLd,
} from '@/lib/seo/json-ld'
import { absoluteUrl, seo } from '@/lib/seo/meta'

const description =
  'About Jeff Segovia: Senior Frontend Software Engineer at Showpo, licensed electronics engineer and electronics technician from Rizal, Philippines. Experience, education, credentials and contact.'

export const Route = createFileRoute('/about')({
  head: () =>
    seo({ title: 'About', description, path: '/about', type: 'profile' }),
  component: About,
})

const row = 'flex items-center justify-between gap-4 border-b py-3.5'
const linkText =
  'group-hover:underline group-hover:decoration-brand group-hover:underline-offset-4'

function About() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-14 px-4 pt-16 pb-24 sm:px-6">
      <JsonLd
        data={graph(
          {
            '@type': 'ProfilePage',
            url: absoluteUrl('/about'),
            name: `About ${site.name}`,
            mainEntity: personJsonLd(),
          },
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]),
        )}
      />
      <section className="flex flex-col gap-8">
        <div className="flex items-center gap-5">
          <Avatar size="large" className="size-20 sm:size-24" priority />
          <PageHeader title="About">
            <p>
              {site.jobTitle} · {site.region}
            </p>
          </PageHeader>
        </div>
        <div className="prose-site">
          <p>
            I’m Jeff — Jeffrey Segovia, ECE, ECT — a licensed electronics
            engineer and electronics technician who found his passion building
            for the web. For more than six years I’ve built web apps that are
            fully functional, fast, and made with the people using them in mind.
            Today I’m a Senior Frontend Software Engineer at Showpo.
          </p>
          <p>
            It started in college with microcontrollers: nothing beats making a
            piece of hardware do exactly what you wrote. My thesis paired
            circuits with a desktop app that monitored and controlled appliances
            over ZigBee, and after the board exam I built a{' '}
            <a
              href="https://www.youtube.com/watch?v=-NjJOWrj2Gc"
              target="_blank"
              rel="noopener"
            >
              React and MQTT app to control the appliances in my room
            </a>
            . I’ve been building for the web ever since.
          </p>
          <p>
            Outside work I design and ship my own products end to end —{' '}
            <a href="/projects">Bliss, Osamu, Reviu, Worsheep and GateLab</a> —
            and I’m always learning, as an engineer and as a person.
          </p>
        </div>
      </section>

      <section aria-labelledby="experience">
        <SectionTitle id="experience">Experience</SectionTitle>
        <ol>
          {experience.map((r) => (
            <li
              key={`${r.company}-${r.title}`}
              className="grid gap-1 border-b py-5 sm:grid-cols-[150px_1fr] sm:gap-5"
            >
              <span className="text-muted-foreground pt-0.5 font-mono text-xs">
                {formatMonth(r.start)} —{' '}
                {r.end ? formatMonth(r.end) : 'Present'}
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="font-medium">{r.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {r.company} · {r.location}
                </p>
                {r.summary ? (
                  <p className="text-muted-foreground pt-1 text-[15px] leading-relaxed">
                    {r.summary}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="education">
        <SectionTitle id="education">Education</SectionTitle>
        <div className="grid gap-1 border-b py-5 sm:grid-cols-[150px_1fr] sm:gap-5">
          <span className="text-muted-foreground pt-0.5 font-mono text-xs">
            {education.years}
          </span>
          <div className="flex flex-col gap-1">
            <h3 className="font-medium">{education.degree}</h3>
            <p className="text-muted-foreground text-sm">{education.school}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="credentials">
        <SectionTitle id="credentials">Licenses &amp; awards</SectionTitle>
        <ul>
          {credentials.map((c) => (
            <li key={c.name}>
              {c.url ? (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener"
                  className={`${row} group`}
                >
                  <span className={linkText}>{c.name}</span>
                  <span className="text-muted-foreground inline-flex shrink-0 items-center gap-1 text-sm">
                    {c.issuer}{' '}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </span>
                </a>
              ) : (
                <div className={row}>
                  <span>{c.name}</span>
                  <span className="text-muted-foreground shrink-0 text-sm">
                    {c.issuer}
                  </span>
                </div>
              )}
            </li>
          ))}
          {awards.map((a) => (
            <li key={a.name} className={row}>
              <span>{a.name}</span>
              <span className="text-muted-foreground shrink-0 font-mono text-xs">
                {a.year}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
          <span className="text-foreground font-medium">Courses: </span>
          {certifications.join(' · ')}
        </p>
      </section>

      <section aria-labelledby="stack">
        <SectionTitle id="stack">What I work with</SectionTitle>
        <dl>
          {skills.map((s) => (
            <div
              key={s.group}
              className="grid gap-1 border-b py-3.5 sm:grid-cols-[150px_1fr] sm:gap-5"
            >
              <dt className="text-muted-foreground text-sm">{s.group}</dt>
              <dd className="text-[15px] leading-relaxed">{s.items}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="contact">
        <SectionTitle id="contact">Contact &amp; elsewhere</SectionTitle>
        <ul>
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                className={`${row} group`}
                {...(s.icon === 'mail'
                  ? {}
                  : { target: '_blank', rel: 'me noopener' })}
              >
                <span className="flex items-center gap-3">
                  <SocialIcon
                    icon={s.icon}
                    className="text-muted-foreground size-4"
                  />
                  <span className={linkText}>{s.label}</span>
                </span>
                <span className="text-muted-foreground truncate font-mono text-xs">
                  {s.handle}
                </span>
              </a>
            </li>
          ))}
          <li>
            <a href={`tel:${site.phone}`} className={`${row} group`}>
              <span className="flex items-center gap-3">
                <Phone
                  className="text-muted-foreground size-4"
                  aria-hidden="true"
                />
                <span className={linkText}>Phone</span>
              </span>
              <span className="text-muted-foreground font-mono text-xs">
                {site.phoneDisplay}
              </span>
            </a>
          </li>
        </ul>
      </section>

      <section aria-labelledby="beyond" className="flex flex-col gap-3">
        <SectionTitle id="beyond">Beyond code</SectionTitle>
        <div className="prose-site">
          <p>
            I’m a Christian. On Saturdays and through the week I teach young
            people the Gospel and the Word of God, and I write about the faith
            at{' '}
            <a
              href="https://abideinthevineph.org"
              target="_blank"
              rel="noopener"
            >
              Abide in the Vine
            </a>
            . My motto: <em>having Christ as joy and finding joy in Christ.</em>
          </p>
        </div>
      </section>
    </div>
  )
}
