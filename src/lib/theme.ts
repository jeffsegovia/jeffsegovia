/** Light, dark, or the device's setting (the default). The site is
 * prerendered, so the choice lives in localStorage and an inline script
 * applies it before the first paint. */
export type Theme = 'light' | 'dark' | 'system'

export const THEME_KEY = 'theme'
export const THEME_BAR = { light: '#ffffff', dark: '#0a0a0a' } as const

export const themeScript = `(function(){try{var d=document.documentElement,m=window.matchMedia('(prefers-color-scheme: dark)'),t=localStorage.getItem('${THEME_KEY}');function a(){var p=localStorage.getItem('${THEME_KEY}')||'system',k=p==='dark'||(p==='system'&&m.matches);d.classList.toggle('dark',k);d.style.colorScheme=k?'dark':'light'}a();m.addEventListener('change',a)}catch(e){}})()`

export function readTheme(): Theme {
  try {
    const t = localStorage.getItem(THEME_KEY)
    return t === 'light' || t === 'dark' ? t : 'system'
  } catch {
    return 'system'
  }
}

export function applyTheme(theme: Theme) {
  try {
    if (theme === 'system') localStorage.removeItem(THEME_KEY)
    else localStorage.setItem(THEME_KEY, theme)
  } catch {
    // Private mode: the choice lasts for this page only.
  }
  const dark =
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', dark)
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
}
