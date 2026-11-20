import { sameAs, site } from '@/config/site'
import {
  awards,
  credentials,
  currentRole,
  education,
} from '@/config/experience'
import { absoluteUrl } from '@/lib/seo/meta'

/** A JSON-LD `<script>`. `<` is escaped so the payload can never close the
 * tag early. */
export function JsonLd({ data }: { data: unknown }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}

export const PERSON_ID = absoluteUrl('/#person')
export const WEBSITE_ID = absoluteUrl('/#website')

export function personJsonLd() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: site.name,
    alternateName: 'Jeffrey Segovia',
    url: site.url,
    image: absoluteUrl(site.avatar.jpg),
    jobTitle: site.jobTitle,
    worksFor: currentRole
      ? { '@type': 'Organization', name: currentRole.company }
      : undefined,
    alumniOf: { '@type': 'CollegeOrUniversity', name: education.school },
    award: awards.map((a) => `${a.name} (${a.year})`),
    description: site.shortBio,
    email: `mailto:${site.email}`,
    telephone: site.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Morong',
      addressRegion: 'Rizal',
      addressCountry: 'PH',
    },
    knowsAbout: [
      'React',
      'TypeScript',
      'TanStack Start',
      'Node.js',
      'PostgreSQL',
      'Tailwind CSS',
      'Web development',
      'Electronics engineering',
    ],
    hasCredential: credentials.map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      name: c.name,
      recognizedBy: { '@type': 'Organization', name: c.issuer },
      ...(c.url ? { url: c.url } : {}),
    })),
    sameAs,
  }
}

export function websiteJsonLd() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: 'en',
    publisher: { '@id': PERSON_ID },
  }
}

export function breadcrumbJsonLd(
  items: ReadonlyArray<{ name: string; path: string }>,
) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function graph(...nodes: Array<object>) {
  return { '@context': 'https://schema.org', '@graph': nodes }
}
