import mdx from '@mdx-js/rollup'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { remarkContentMeta } from './remark-content-meta'
import type { Plugin } from 'vite'

/** MDX for the posts and snippets, shared by the app build and Vitest.
 * MDX compiles every `.mdx` import, even `?raw` ones (it drops the query
 * before matching); llms-full.txt needs the source text, so those are
 * skipped. */
export function contentMdx(): Plugin {
  const plugin = mdx({
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
        { behavior: 'wrap', properties: { className: ['heading-anchor'] } },
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
  })
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
