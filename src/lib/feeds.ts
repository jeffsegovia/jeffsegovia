import { earlierProjects, projects } from '@/config/projects'
import {
  credentials,
  education,
  experience,
  formatMonth,
  skills,
} from '@/config/experience'
import { site, socials } from '@/config/site'
import { formatDate, posts, snippets } from '@/lib/content'
import { absoluteUrl } from '@/lib/seo/meta'

export function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

const latestPostDate = posts[0]?.date

export function sitemapXml() {
  const entries: Array<{ path: string; lastmod?: string }> = [
    { path: '/', lastmod: latestPostDate },
    { path: '/projects' },
    ...projects.map((p) => ({ path: `/projects/${p.slug}` })),
    { path: '/blogs', lastmod: latestPostDate },
    ...posts.map((p) => ({ path: `/blogs/${p.slug}`, lastmod: p.date })),
    { path: '/snippets' },
    ...snippets.map((s) => ({ path: `/snippets/${s.slug}` })),
    { path: '/about' },
  ]
  const urls = entries
    .map(
      (e) =>
        `  <url><loc>${escapeXml(absoluteUrl(e.path))}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ''}</url>`,
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

export function rssXml() {
  const items = posts
    .map((p) => {
      const url = absoluteUrl(`/blogs/${p.slug}`)
      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(p.description)}</description>
      <pubDate>${new Date(`${p.date}T00:00:00+08:00`).toUTCString()}</pubDate>
${p.tags.map((t) => `      <category>${escapeXml(t)}</category>`).join('\n')}
    </item>`
    })
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)} — Blog</title>
    <link>${absoluteUrl('/blogs')}</link>
    <description>Tutorials and notes on React, TypeScript, Node.js and CSS.</description>
    <language>en</language>
    <atom:link href="${absoluteUrl('/rss.xml')}" rel="self" type="application/rss+xml" />
${latestPostDate ? `    <lastBuildDate>${new Date(`${latestPostDate}T00:00:00+08:00`).toUTCString()}</lastBuildDate>\n` : ''}${items}
  </channel>
</rss>
`
}

export function robotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: ${absoluteUrl('/sitemap.xml')}
`
}

/** llms.txt (llmstxt.org): a plain summary of who this is and what is
 * here, with links, for AI assistants and answer engines. */
export function llmsTxt() {
  return `# ${site.name}

> ${site.name} is a ${site.jobTitle.toLowerCase()} based in Rizal, Philippines, who builds full-stack web apps that people love to use.

He is a Senior Frontend Software Engineer at Showpo with more than six years of experience building web apps. He designs and builds his own full-stack products end to end, most recently with TanStack Start, React, TypeScript and Postgres. He is also a licensed electronics engineer and electronics technician (PRC) and a Couchbase Certified Associate Node.js Developer.

Contact: ${site.email}

## Experience

${experience.map((r) => `- ${r.title}, ${r.company} (${formatMonth(r.start)} – ${r.end ? formatMonth(r.end) : 'present'})`).join('\n')}

Education: ${education.degree}, ${education.school} (${education.years}).

## Projects

${projects.map((p) => `- [${p.name}](${absoluteUrl(`/projects/${p.slug}`)}): ${p.summary} Live at ${p.url}.`).join('\n')}

## Earlier projects

${earlierProjects.map((p) => `- [${p.name}](${p.url}): ${p.summary}`).join('\n')}

## Blog posts

${posts.map((p) => `- [${p.title}](${absoluteUrl(`/blogs/${p.slug}`)}) (${formatDate(p.date)}): ${p.description}`).join('\n')}

## Snippets

${snippets.map((s) => `- [${s.title}](${absoluteUrl(`/snippets/${s.slug}`)}): ${s.description}`).join('\n')}

## About

- [About ${site.name}](${absoluteUrl('/about')}): background, credentials (${credentials.map((c) => c.name).join('; ')}), skills and contact.
- Skills: ${skills.map((s) => `${s.group}: ${s.items}`).join('. ')}.

## Elsewhere

${socials
  .filter((s) => s.icon !== 'mail')
  .map((s) => `- [${s.label}](${s.href})`)
  .join('\n')}

## Optional

- [Full text of every post and snippet](${absoluteUrl('/llms-full.txt')})
- [RSS feed](${absoluteUrl('/rss.xml')})
`
}

const rawPosts = import.meta.glob<string>('/content/posts/*.mdx', {
  query: '?raw',
  import: 'default',
  eager: true,
})
const rawSnippets = import.meta.glob<string>('/content/snippets/*.mdx', {
  query: '?raw',
  import: 'default',
  eager: true,
})

/** The MDX source minus frontmatter and the banner boilerplate. */
function cleanMdx(source: string) {
  return source
    .replace(/^---[\s\S]*?---\s*/, '')
    .replace(/^export const \w+ =[\s\S]*?;\s*$/gm, '')
    .replace(/^<BannerImage[\s\S]*?\/>\s*$/gm, '')
    .trim()
}

export function llmsFullTxt() {
  const parts = [
    `# ${site.name} — full text of posts and snippets\n\n> Source: ${site.url}. Author: ${site.name}.`,
    ...posts.map((p) => {
      const raw = rawPosts[`/content/posts/${p.slug}.mdx`]
      return `---\n\n# ${p.title}\n\nURL: ${absoluteUrl(`/blogs/${p.slug}`)}\nPublished: ${p.date}\nTags: ${p.tags.join(', ')}\n\n${cleanMdx(raw)}`
    }),
    ...snippets.map((s) => {
      const raw = rawSnippets[`/content/snippets/${s.slug}.mdx`]
      return `---\n\n# ${s.title}\n\nURL: ${absoluteUrl(`/snippets/${s.slug}`)}\nTags: ${s.tags.join(', ')}\n\n${cleanMdx(raw)}`
    }),
  ]
  return parts.join('\n\n') + '\n'
}
