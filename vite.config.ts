import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'
import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'
import { contentMdx } from './mdx/plugin'

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    contentMdx(),
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
