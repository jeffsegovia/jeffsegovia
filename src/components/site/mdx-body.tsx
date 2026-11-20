import { Suspense, lazy } from 'react'
import type { ComponentType } from 'react'
import type { MDXComponents } from 'mdx/types'
import { mdxComponents } from '@/components/mdx/mdx-components'
import { loadPostBody, loadSnippetBody } from '@/lib/content'

type Body = ComponentType<{ components?: MDXComponents }>
const cache = new Map<string, ComponentType<{ components?: MDXComponents }>>()

function lazyBody(key: string, load: () => Promise<{ default: Body }>) {
  let C = cache.get(key)
  if (!C) {
    C = lazy(load)
    cache.set(key, C)
  }
  return C
}

/** A post's or snippet's MDX, loaded in its own chunk. The server renders
 * it in full (so the prerendered HTML has the whole article); the route
 * loader preloads the chunk on client-side navigation. */
export function MdxBody({
  kind,
  slug,
}: {
  kind: 'post' | 'snippet'
  slug: string
}) {
  const Body = lazyBody(`${kind}:${slug}`, () =>
    kind === 'post' ? loadPostBody(slug) : loadSnippetBody(slug),
  )
  return (
    <Suspense fallback={null}>
      <Body components={mdxComponents} />
    </Suspense>
  )
}
