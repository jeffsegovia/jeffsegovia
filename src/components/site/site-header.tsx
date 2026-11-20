import { Link, useRouterState } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { LogoMark } from '@/components/site/logo'
import { ThemeToggle } from '@/components/site/theme-toggle'
import { buttonVariants } from '@/components/ui/button'
import { nav, site } from '@/config/site'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="bg-background/90 supports-[backdrop-filter]:bg-background/75 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-15 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight"
          aria-label={`${site.name}, home`}
        >
          <LogoMark className="size-5" />
          <span>{site.name}</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 sm:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-muted-foreground hover:text-foreground hover:bg-accent px-3 py-2 text-sm transition-colors"
              activeProps={{
                className:
                  'text-foreground! font-medium shadow-[inset_0_-2px_0_var(--brand)]',
                'aria-current': 'page',
              }}
            >
              {item.label}
            </Link>
          ))}
          <span className="bg-border mx-2 h-5 w-px" aria-hidden="true" />
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-1 sm:hidden">
          <ThemeToggle />
          <button
            type="button"
            className={buttonVariants({ variant: 'ghost', size: 'icon' })}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Main"
        className={cn('border-t px-4 pb-3 sm:hidden', !open && 'hidden')}
      >
        <ul>
          {nav.map((item) => (
            <li key={item.to} className="border-b last:border-b-0">
              <Link
                to={item.to}
                className="block py-3.5 text-[17px]"
                activeProps={{
                  className: 'font-medium',
                  'aria-current': 'page',
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
