import { Monitor, Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { applyTheme, readTheme } from '@/lib/theme'
import type { Theme } from '@/lib/theme'

const NEXT: Record<Theme, Theme> = {
  system: 'light',
  light: 'dark',
  dark: 'system',
}
const LABEL: Record<Theme, string> = {
  system: 'Theme: system. Switch to light',
  light: 'Theme: light. Switch to dark',
  dark: 'Theme: dark. Switch to system',
}

/** Cycles system → light → dark. Renders the system icon on the server and
 * the stored choice once mounted. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system')
  useEffect(() => setTheme(readTheme()), [])

  const Icon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor
  return (
    <button
      type="button"
      className={buttonVariants({ variant: 'ghost', size: 'icon-sm' })}
      aria-label={LABEL[theme]}
      title={LABEL[theme]}
      onClick={() => {
        const next = NEXT[theme]
        applyTheme(next)
        setTheme(next)
      }}
    >
      <Icon />
    </button>
  )
}
