/** Who the site is about, and where else to find him. Head tags, JSON-LD,
 * the feeds and llms.txt all read from here. */
export const site = {
  name: 'Jeff Segovia',
  url: 'https://jeffsegovia.dev',
  title: 'Jeff Segovia · Software Engineer',
  jobTitle: 'Senior Frontend Software Engineer',
  location: 'Philippines',
  region: 'Rizal, Philippines',
  description:
    'Jeff Segovia is a software engineer in the Philippines who builds full-stack web apps with React, TypeScript and TanStack Start. Projects, experience and writing on React, Node.js and CSS.',
  shortBio:
    'I build full-stack web apps that people love to use. Licensed electronics engineer, but I found my passion building things for the web.',
  email: 'jeffsegoviadev@gmail.com',
  /** E.164, for `tel:` links and JSON-LD. */
  phone: '+639623797084',
  phoneDisplay: '+63 962 379 7084',
  avatar: {
    webp: '/me-480.webp',
    jpg: '/me-480.jpg',
    smallWebp: '/me-160.webp',
    smallJpg: '/me-160.jpg',
  },
  locale: 'en_PH',
  language: 'en',
} as const

export type Social = {
  label: string
  href: string
  handle: string
  icon: 'github' | 'linkedin' | 'medium' | 'globe' | 'mail'
}

export const socials: ReadonlyArray<Social> = [
  {
    label: 'GitHub',
    href: 'https://github.com/jeffsegovia',
    handle: '@jeffsegovia',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jeffreysegovia',
    handle: 'in/jeffreysegovia',
    icon: 'linkedin',
  },
  {
    label: 'Medium',
    href: 'https://ecejhefgrace.medium.com',
    handle: 'ecejhefgrace',
    icon: 'medium',
  },
  {
    label: 'Abide in the Vine',
    href: 'https://abideinthevineph.org',
    handle: 'abideinthevineph.org',
    icon: 'globe',
  },
  {
    label: 'Email',
    href: `mailto:${site.email}`,
    handle: site.email,
    icon: 'mail',
  },
]

/** Profiles that are the same person, for JSON-LD `sameAs`. */
export const sameAs = socials
  .filter((s) => s.icon !== 'mail')
  .map((s) => s.href)
  .concat(
    'https://www.credly.com/badges/47bbf7ec-068b-46af-9616-c6f2386f4909/public_url',
  )

export const nav = [
  { to: '/projects', label: 'Projects' },
  { to: '/blogs', label: 'Blog' },
  { to: '/snippets', label: 'Snippets' },
  { to: '/about', label: 'About' },
] as const
