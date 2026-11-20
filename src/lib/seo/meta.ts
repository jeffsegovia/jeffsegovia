import { site } from '@/config/site'

export const DEFAULT_OG = {
  path: '/og.png',
  width: 1200,
  height: 630,
  alt: 'Jeff Segovia, Software Engineer',
}

export const absoluteUrl = (path: string) => new URL(path, site.url).href

type HeadInput = {
  /** The page's own title; the site name is appended. Omit on the home page. */
  title?: string
  description: string
  path: string
  type?: 'website' | 'article' | 'profile'
  image?: { url: string; alt: string; width?: number; height?: number }
  /** Article dates, ISO. */
  publishedTime?: string
  tags?: ReadonlyArray<string>
}

/** Everything a page's `head()` returns: a unique title and description,
 * a canonical URL, and the Open Graph and Twitter tags. */
export function seo({
  title,
  description,
  path,
  type = 'website',
  image,
  publishedTime,
  tags = [],
}: HeadInput) {
  const fullTitle = title ? `${title} · ${site.name}` : site.title
  const url = absoluteUrl(path)
  const img = image ?? {
    url: absoluteUrl(DEFAULT_OG.path),
    alt: DEFAULT_OG.alt,
    width: DEFAULT_OG.width,
    height: DEFAULT_OG.height,
  }
  return {
    meta: [
      { title: fullTitle },
      { name: 'description', content: description },
      { property: 'og:title', content: title ?? site.title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: type },
      { property: 'og:url', content: url },
      { property: 'og:image', content: img.url },
      ...(img.width
        ? [
            { property: 'og:image:width', content: String(img.width) },
            { property: 'og:image:height', content: String(img.height) },
          ]
        : []),
      { property: 'og:image:alt', content: img.alt },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title ?? site.title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: img.url },
      { name: 'twitter:image:alt', content: img.alt },
      ...(publishedTime
        ? [
            { property: 'article:published_time', content: publishedTime },
            { property: 'article:author', content: site.name },
          ]
        : []),
      ...tags.map((t) => ({ property: 'article:tag', content: t })),
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}
