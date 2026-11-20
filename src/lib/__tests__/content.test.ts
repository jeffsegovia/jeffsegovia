import { describe, expect, it } from 'vitest'
import {
  formatDate,
  parsePublishedAt,
  postTags,
  posts,
  snippets,
} from '@/lib/content'
import { projects } from '@/config/projects'
import {
  llmsFullTxt,
  llmsTxt,
  robotsTxt,
  rssXml,
  sitemapXml,
} from '@/lib/feeds'

describe('parsePublishedAt', () => {
  it('reads the date styles the old frontmatter uses', () => {
    expect(parsePublishedAt('Sept 29, 2022')).toBe('2022-09-29')
    expect(parsePublishedAt('August 09, 2024')).toBe('2024-08-09')
    expect(parsePublishedAt('Dec 9, 2022')).toBe('2022-12-09')
  })

  it('rejects anything else', () => {
    expect(() => parsePublishedAt('2022-09-29')).toThrow()
    expect(() => parsePublishedAt('Smarch 1, 2022')).toThrow()
  })
})

describe('formatDate', () => {
  it('formats long and short', () => {
    expect(formatDate('2024-08-09')).toBe('Aug 9, 2024')
    expect(formatDate('2024-08-09', 'short')).toBe('Aug 2024')
  })
})

describe('posts', () => {
  it('keeps all 14 posts from the old site, newest first', () => {
    expect(posts).toHaveLength(14)
    const dates = posts.map((p) => p.date)
    expect([...dates].sort().reverse()).toEqual(dates)
  })

  it('gives every post complete metadata', () => {
    expect(posts.filter((p) => p.headings.length > 0).length).toBeGreaterThan(
      10,
    )
    for (const p of posts) {
      expect(p.title, p.slug).toBeTruthy()
      expect(p.description, p.slug).toBeTruthy()
      expect(p.bannerUrl, p.slug).toMatch(/^https:\/\//)
      expect(p.tags.length, p.slug).toBeGreaterThan(0)
      expect(p.readingMinutes, p.slug).toBeGreaterThan(0)
      // Some short posts have no subheadings, and so no table of contents.
      expect(Array.isArray(p.headings), p.slug).toBe(true)
    }
  })

  it('has unique slugs and counts every tag', () => {
    expect(new Set(posts.map((p) => p.slug)).size).toBe(posts.length)
    const total = postTags.reduce((n, t) => n + t.count, 0)
    expect(total).toBe(posts.reduce((n, p) => n + p.tags.length, 0))
  })
})

describe('snippets', () => {
  it('keeps all 6 snippets', () => {
    expect(snippets).toHaveLength(6)
    for (const s of snippets) expect(s.title, s.slug).toBeTruthy()
  })
})

describe('projects', () => {
  it('has unique slugs and GateLab last', () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length)
    expect(projects.at(-1)?.slug).toBe('gatelab')
  })
})

describe('feeds', () => {
  it('lists every page in the sitemap', () => {
    const xml = sitemapXml()
    for (const p of posts) expect(xml).toContain(`/blogs/${p.slug}<`)
    for (const s of snippets) expect(xml).toContain(`/snippets/${s.slug}<`)
    for (const p of projects) expect(xml).toContain(`/projects/${p.slug}<`)
  })

  it('puts every post in the RSS feed', () => {
    const xml = rssXml()
    expect(xml.match(/<item>/g)).toHaveLength(posts.length)
    expect(xml).not.toContain('Invalid Date')
  })

  it('points robots.txt at the sitemap', () => {
    expect(robotsTxt()).toContain(
      'Sitemap: https://jeffsegovia.dev/sitemap.xml',
    )
  })

  it('includes the source text of every post in llms-full.txt', () => {
    const full = llmsFullTxt()
    for (const p of posts) expect(full).toContain(`# ${p.title}`)
    expect(full).not.toContain('export const bannerUrl')
    expect(llmsTxt()).toContain('## Projects')
  })
})
