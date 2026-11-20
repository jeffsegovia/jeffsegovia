import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { site } from '@/config/site'
import { THEME_BAR, themeScript } from '@/lib/theme'
import appCss from '@/styles.css?url'
import geist from '@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: site.title },
      { name: 'description', content: site.description },
      { name: 'author', content: site.name },
      { name: 'creator', content: site.name },
      { property: 'og:site_name', content: site.name },
      { property: 'og:locale', content: site.locale },
      {
        name: 'robots',
        content: 'index, follow, max-image-preview:large, max-snippet:-1',
      },
      {
        name: 'theme-color',
        content: THEME_BAR.light,
        media: '(prefers-color-scheme: light)',
      },
      {
        name: 'theme-color',
        content: THEME_BAR.dark,
        media: '(prefers-color-scheme: dark)',
      },
    ],
    links: [
      {
        rel: 'preload',
        href: geist,
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: `${site.name} — Blog`,
        href: '/rss.xml',
      },
      { rel: 'author', href: '/about' },
    ],
  }),
  shellComponent: RootDocument,
  component: () => <Outlet />,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <HeadContent />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="bg-foreground text-background sr-only z-50 px-4 py-2 text-sm font-medium focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
        <Scripts />
      </body>
    </html>
  )
}
