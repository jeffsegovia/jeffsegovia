import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'
import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import { remarkContentMeta } from './mdx/remark-content-meta'

/** MDX compiles every `.mdx` import, even `?raw` ones (it drops the query
 * before matching). llms-full.txt needs the source text, so skip those. */
function mdxExceptRaw(options: Parameters<typeof mdx>[0]): Plugin {
  const plugin = mdx(options)
  return {
    ...plugin,
    enforce: 'pre',
    transform(code, id) {
      if (/[?&]raw\b/.test(id)) return null
      return (
        plugin.transform as (this: unknown, c: string, i: string) => unknown
      ).call(this, code, id) as never
    },
  }
}

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    mdxExceptRaw({
      remarkPlugins: [
        remarkFrontmatter,
        [remarkMdxFrontmatter, { name: 'frontmatter' }],
        remarkGfm,
        remarkContentMeta,
      ],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'wrap',
            properties: { className: ['heading-anchor'] },
          },
        ],
        [
          rehypePrettyCode,
          {
            theme: { light: 'github-light', dark: 'github-dark-dimmed' },
            keepBackground: false,
            defaultLang: 'plaintext',
          },
        ],
      ],
    }),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
        // Tag filters are the same page; never write them over /blogs.
        filter: ({ path }) => !path.includes('?'),
      },
      pages: [
        { path: '/sitemap.xml' },
        { path: '/rss.xml' },
        { path: '/robots.txt' },
        { path: '/llms.txt' },
        { path: '/llms-full.txt' },
      ],
    }),
    nitro({ preset: 'vercel' }),
    viteReact({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
  ],
})
