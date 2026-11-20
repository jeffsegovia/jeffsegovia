import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { MdxBody } from '@/components/site/mdx-body'
import { TableOfContents } from '@/components/site/toc'
import { Badge } from '@/components/ui/badge'
import { site } from '@/config/site'
import { adjacentPosts, formatDate, getPost, loadPostBody } from '@/lib/content'
import { JsonLd, PERSON_ID, breadcrumbJsonLd, graph } from '@/lib/seo/json-ld'
import { absoluteUrl, seo } from '@/lib/seo/meta'

export const Route = createFileRoute('/blogs/$slug')({
  loader: async ({ params }) => {
    const post = getPost(params.slug)
    if (!post) throw notFound()
    await loadPostBody(post.slug)
    return { slug: post.slug }
  },
  head: ({ loaderData }) => {
    const post = loaderData && getPost(loaderData.slug)
    if (!post) return {}
    return seo({
      title: post.title,
      description: post.description,
      path: `/blogs/${post.slug}`,
      type: 'article',
      image: { url: post.bannerUrl, alt: post.title },
      publishedTime: post.date,
      tags: post.tags,
    })
  },
  component: PostPage,
})

function PostPage() {
  const { slug } = Route.useLoaderData()
  const post = getPost(slug)!
  const { newer, older } = adjacentPosts(slug)
  const url = absoluteUrl(`/blogs/${post.slug}`)

  return (
    <div className="mx-auto flex max-w-5xl gap-14 px-4 pt-10 pb-24 sm:px-6">
      <JsonLd
        data={graph(
          {
            '@type': 'BlogPosting',
            '@id': `${url}#article`,
            headline: post.title,
            description: post.description,
            image: post.bannerUrl,
            datePublished: post.date,
            dateModified: post.date,
            inLanguage: 'en',
            url,
            mainEntityOfPage: url,
            keywords: post.tags.join(', '),
            timeRequired: `PT${post.readingMinutes}M`,
            author: {
              '@type': 'Person',
              '@id': PERSON_ID,
              name: site.name,
              url: site.url,
            },
            publisher: { '@id': PERSON_ID },
          },
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blogs' },
            { name: post.title, path: `/blogs/${post.slug}` },
          ]),
        )}
      />
      <div className="min-w-0 flex-1 lg:max-w-[700px]">
        <Link
          to="/blogs"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" /> All posts
        </Link>

        <article className="mt-8">
          <header className="mb-8 flex flex-col gap-4">
            <p className="text-muted-foreground flex flex-wrap gap-2 font-mono text-xs">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingMinutes} min read</span>
            </p>
            <h1 className="text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-[2.5rem]">
              {post.title}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {post.description}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <Link to="/about" className="text-sm font-medium" rel="author">
                {post.author}
              </Link>
              <ul className="flex flex-wrap gap-1.5" aria-label="Topics">
                {post.tags.map((t) => (
                  <li key={t}>
                    <Link to="/blogs" search={{ tag: t }}>
                      <Badge className="hover:bg-accent">{t}</Badge>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </header>
          <div className="prose-site">
            <MdxBody kind="post" slug={post.slug} />
          </div>
        </article>

        <nav
          aria-label="More posts"
          className="mt-16 grid gap-4 border-t pt-6 sm:grid-cols-2"
        >
          {older ? (
            <Link
              to="/blogs/$slug"
              params={{ slug: older.slug }}
              className="hover:border-foreground/40 flex flex-col gap-1 border p-4 transition-colors"
            >
              <span className="text-muted-foreground flex items-center gap-1 text-xs">
                <ArrowLeft className="size-3.5" aria-hidden="true" /> Older
              </span>
              <span className="text-sm font-medium">{older.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {newer ? (
            <Link
              to="/blogs/$slug"
              params={{ slug: newer.slug }}
              className="hover:border-foreground/40 flex flex-col items-end gap-1 border p-4 text-right transition-colors"
            >
              <span className="text-muted-foreground flex items-center gap-1 text-xs">
                Newer <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium">{newer.title}</span>
            </Link>
          ) : null}
        </nav>
      </div>
      <aside className="hidden w-52 shrink-0 lg:block">
        <div className="sticky top-24 pt-24">
          <TableOfContents headings={post.headings} />
        </div>
      </aside>
    </div>
  )
}
