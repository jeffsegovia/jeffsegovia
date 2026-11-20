# jeffsegovia.dev

Personal site and portfolio of Jeff Segovia: projects, experience, blog
posts and snippets. Built with TanStack Start, Tailwind CSS v4 and
shadcn/ui's neutral theme, and fully prerendered for Vercel.

## Run it

Needs Node 22+ and pnpm 10.

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Checks

```bash
pnpm typecheck && pnpm lint && pnpm build
```

`pnpm build` prerenders every page (crawling from `/`) plus the sitemap,
RSS feed, robots.txt and llms.txt into `.vercel/output`, which Vercel
deploys as is.

## Content

| What                                  | Where                                                        |
| ------------------------------------- | ------------------------------------------------------------ |
| Blog posts                            | `content/posts/*.mdx` — served at `/blogs/<file name>`       |
| Snippets                              | `content/snippets/*.mdx` — served at `/snippets/<file name>` |
| Projects                              | `src/config/projects.ts` (featured get `/projects/<slug>`)   |
| Experience, education, awards, skills | `src/config/experience.ts`                                   |
| Name, bio, contact, socials           | `src/config/site.ts`                                         |

Posts and snippets are the MDX files from the previous site, unchanged:
same frontmatter (`title`, `description`, `author`, `bannerUrl`, `tags`,
`publishedAt`) and same URLs. To add a post, drop a new `.mdx` file in
`content/posts`. The components posts call by name (`BannerImage`,
`LinkInPage`, `Alert`, `LinkToPart`, the carousel, audio player, file tree
and floating-label demos) live in `src/components/mdx/`.

Code blocks use rehype-pretty-code (Shiki) with a light and a dark theme;
`showLineNumbers` and titles work as before.

## SEO and answer engines

- Unique title, description, canonical URL, Open Graph and Twitter tags
  per page (`src/lib/seo/meta.ts`).
- JSON-LD: `Person` and `WebSite` on the home page, `ProfilePage` on About,
  `BlogPosting`, `TechArticle`, `SoftwareApplication`, `CollectionPage`
  and `BreadcrumbList` where they apply (`src/lib/seo/json-ld.tsx`).
- `/sitemap.xml`, `/rss.xml`, `/robots.txt`, `/llms.txt` and
  `/llms-full.txt` (the full text of every post) from `src/lib/feeds.ts`.

## Look

- Neutral greys, square corners, Geist and Geist Mono.
- One accent, signal blue, as `--brand` in `src/styles.css`: the logo's
  dot, the active nav item, link hovers and focus rings.
- Light, dark or system theme, applied before first paint.
- `pnpm icons` regenerates the favicons, app icons and `public/og.png`
  from `public/favicon.svg`.
