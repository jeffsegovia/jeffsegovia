import type { ComponentType } from 'react'
import type { MDXComponents } from 'mdx/types'

/** Posts and snippets are the MDX files in `/content`, kept exactly as they
 * were on the previous site. Frontmatter, reading time and headings are
 * read eagerly (they are small); each body is loaded only on its page. */

export type TocHeading = { depth: 2 | 3; text: string; id: string }

type PostFrontmatter = {
  title: string
  description: string
  author: string
  bannerUrl: string
  tags: Array<string>
  publishedAt: string
}

type SnippetFrontmatter = {
  title: string
  description: string
  author: string
  tags: Array<string>
}

export type MdxModule = {
  default: ComponentType<{ components?: MDXComponents }>
}

export type Post = PostFrontmatter & {
  slug: string
  /** `YYYY-MM-DD`. */
  date: string
  readingMinutes: number
  headings: Array<TocHeading>
}

export type Snippet = SnippetFrontmatter & {
  slug: string
  readingMinutes: number
  headings: Array<TocHeading>
}

const slugOf = (path: string) =>
  path.slice(path.lastIndexOf('/') + 1).replace(/\.mdx$/, '')

const postFrontmatter = import.meta.glob<PostFrontmatter>(
  '/content/posts/*.mdx',
  { eager: true, import: 'frontmatter' },
)
const postMinutes = import.meta.glob<number>('/content/posts/*.mdx', {
  eager: true,
  import: 'readingMinutes',
})
const postHeadings = import.meta.glob<Array<TocHeading>>(
  '/content/posts/*.mdx',
  { eager: true, import: 'headings' },
)
const postBodies = import.meta.glob<MdxModule>('/content/posts/*.mdx')

const snippetFrontmatter = import.meta.glob<SnippetFrontmatter>(
  '/content/snippets/*.mdx',
  { eager: true, import: 'frontmatter' },
)
const snippetMinutes = import.meta.glob<number>('/content/snippets/*.mdx', {
  eager: true,
  import: 'readingMinutes',
})
const snippetHeadings = import.meta.glob<Array<TocHeading>>(
  '/content/snippets/*.mdx',
  { eager: true, import: 'headings' },
)
const snippetBodies = import.meta.glob<MdxModule>('/content/snippets/*.mdx')

const MONTHS = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
]

/** The old frontmatter writes dates as "Sept 29, 2022" or "August 09,
 * 2024". Parsed by hand so the result never depends on the time zone. */
export function parsePublishedAt(value: string): string {
  const match = /^([A-Za-z]+)\.?\s+(\d{1,2}),\s*(\d{4})$/.exec(value.trim())
  if (!match) throw new Error(`Unrecognised publishedAt: "${value}"`)
  const [, monthName, day, year] = match
  const month = MONTHS.indexOf(monthName.slice(0, 3).toLowerCase())
  if (month < 0) throw new Error(`Unrecognised month in "${value}"`)
  return `${year}-${String(month + 1).padStart(2, '0')}-${day.padStart(2, '0')}`
}

/** "2024-08-09" → "Aug 9, 2024" (or "Aug 2024" in short form). */
export function formatDate(iso: string, style: 'long' | 'short' = 'long') {
  const [y, m, d] = iso.split('-').map(Number)
  const month = MONTHS[m - 1]
  const label = month.charAt(0).toUpperCase() + month.slice(1)
  return style === 'short' ? `${label} ${y}` : `${label} ${d}, ${y}`
}

export const posts: ReadonlyArray<Post> = Object.entries(postFrontmatter)
  .map(([path, fm]) => ({
    ...fm,
    slug: slugOf(path),
    date: parsePublishedAt(fm.publishedAt),
    readingMinutes: postMinutes[path],
    headings: postHeadings[path],
  }))
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

export const snippets: ReadonlyArray<Snippet> = Object.entries(
  snippetFrontmatter,
)
  .map(([path, fm]) => ({
    ...fm,
    slug: slugOf(path),
    readingMinutes: snippetMinutes[path],
    headings: snippetHeadings[path],
  }))
  .sort((a, b) => a.title.localeCompare(b.title))

export const postTags: ReadonlyArray<{ tag: string; count: number }> = (() => {
  const counts = new Map<string, number>()
  for (const p of posts)
    for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1)
  return [...counts]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
})()

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug)
}

export function getSnippet(slug: string) {
  return snippets.find((s) => s.slug === slug)
}

export function loadPostBody(slug: string) {
  const load = postBodies[`/content/posts/${slug}.mdx`]
  if (!load) throw new Error(`No post body for ${slug}`)
  return load()
}

export function loadSnippetBody(slug: string) {
  const load = snippetBodies[`/content/snippets/${slug}.mdx`]
  if (!load) throw new Error(`No snippet body for ${slug}`)
  return load()
}

/** Neighbours in date order, for "previous / next" links. */
export function adjacentPosts(slug: string) {
  const i = posts.findIndex((p) => p.slug === slug)
  return {
    newer: i > 0 ? posts[i - 1] : undefined,
    older: i >= 0 && i < posts.length - 1 ? posts[i + 1] : undefined,
  }
}
