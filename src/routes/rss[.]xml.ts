import { createFileRoute } from '@tanstack/react-router'
import { rssXml } from '@/lib/feeds'

export const Route = createFileRoute('/rss.xml')({
  server: {
    handlers: {
      GET: () =>
        new Response(rssXml(), {
          headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
          },
        }),
    },
  },
})
