/** Work history, newest first, from the LinkedIn profile. `summary` is
 * optional: add a sentence on what you owned and it shows under the role. */
export type Role = {
  title: string
  company: string
  location: string
  /** `YYYY-MM`. */
  start: string
  /** `YYYY-MM`; empty for a current role. */
  end: string
  summary?: string
}

export const experience: ReadonlyArray<Role> = [
  {
    title: 'Senior Frontend Software Engineer',
    company: 'Showpo',
    location: 'Australia (remote)',
    start: '2023-11',
    end: '',
  },
  {
    title: 'Software Engineer — Full-stack',
    company: 'Yondu, Inc.',
    location: 'BGC, Taguig City',
    start: '2023-03',
    end: '2023-11',
  },
  {
    title: 'Software Engineer II',
    company: 'OPSOLUTIONS',
    location: 'Philippines',
    start: '2022-12',
    end: '2023-03',
  },
  {
    title: 'Associate Software Engineer',
    company: 'OPSOLUTIONS',
    location: 'Philippines',
    start: '2021-11',
    end: '2022-12',
  },
  {
    title: 'Software Engineer',
    company: 'RidgeTech Simplified Solutions, Inc.',
    location: 'Morong, Rizal',
    start: '2019-01',
    end: '2019-08',
  },
]

export const currentRole = experience.find((r) => !r.end)

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

/** "2023-11" → "Nov 2023". */
export function formatMonth(ym: string) {
  const [y, m] = ym.split('-').map(Number)
  return `${MONTHS[m - 1]} ${y}`
}

export const education = {
  school: 'University of Rizal System – Morong',
  degree: 'Bachelor of Science in Electronics and Communications Engineering',
  years: '2013 – 2018',
}

export type Credential = { name: string; issuer?: string; url?: string }

export const credentials: ReadonlyArray<Credential> = [
  { name: 'Electronics Engineer (ECE), licensed', issuer: 'PRC' },
  { name: 'Electronics Technician (ECT), licensed', issuer: 'PRC' },
  {
    name: 'Couchbase Certified Associate Node.js Developer',
    issuer: 'Couchbase',
    url: 'https://www.credly.com/badges/47bbf7ec-068b-46af-9616-c6f2386f4909/public_url',
  },
]

export const certifications: ReadonlyArray<string> = [
  'SEO Foundations',
  'Accessibility for Web Design',
  'Simplifying Web Development with Accessibility Best Practices',
  'HTML & CSS: Creating Forms',
  'Design the Web: Creating CSS-Only Navigation Menus',
]

export const awards: ReadonlyArray<{ name: string; year: string }> = [
  {
    name: '3rd Place, Electronics Technician Board Examination',
    year: 'Oct 2018',
  },
  { name: 'Employee of the Month', year: 'Jul 2022' },
]

export const skills: ReadonlyArray<{ group: string; items: string }> = [
  { group: 'Languages', items: 'TypeScript, JavaScript, HTML, CSS, SQL' },
  {
    group: 'Frontend',
    items:
      'React, TanStack Start & Router, Next.js, Tailwind CSS, shadcn/ui, Radix & Base UI, React Hook Form, Vue',
  },
  { group: 'Backend', items: 'Node.js, Express, Hono, Better Auth, Zod' },
  {
    group: 'Data',
    items: 'PostgreSQL, Drizzle, Prisma, Couchbase, MongoDB, Firebase',
  },
  {
    group: 'Tooling',
    items: 'Git, Vite, Vitest, Postman, Cloudflare Workers, Vercel',
  },
]
