import GithubSlugger from 'github-slugger'
import { toString } from 'mdast-util-to-string'
import readingTime from 'reading-time'
import { valueToEstree } from 'estree-util-value-to-estree'
import { visit } from 'unist-util-visit'
import type { Heading, Root } from 'mdast'

export type TocHeading = { depth: 2 | 3; text: string; id: string }

/** Adds two named exports to every MDX file: `headings` (the h2s and h3s,
 * with the same ids rehype-slug gives them, for the "On this page" list)
 * and `readingMinutes`. Code blocks count toward reading time. */
export function remarkContentMeta() {
  return (tree: Root) => {
    const slugger = new GithubSlugger()
    const headings: Array<TocHeading> = []
    visit(tree, 'heading', (node: Heading) => {
      const text = toString(node)
      const id = slugger.slug(text)
      if (node.depth === 2 || node.depth === 3) {
        headings.push({ depth: node.depth, text, id })
      }
    })
    const minutes = Math.max(1, Math.round(readingTime(toString(tree)).minutes))

    for (const [name, value] of [
      ['headings', headings],
      ['readingMinutes', minutes],
    ] as const) {
      tree.children.unshift({
        type: 'mdxjsEsm',
        value: '',
        data: {
          estree: {
            type: 'Program',
            sourceType: 'module',
            body: [
              {
                type: 'ExportNamedDeclaration',
                specifiers: [],
                declaration: {
                  type: 'VariableDeclaration',
                  kind: 'const',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      id: { type: 'Identifier', name },
                      init: valueToEstree(value),
                    },
                  ],
                },
              },
            ],
          },
        },
      } as never)
    }
  }
}
