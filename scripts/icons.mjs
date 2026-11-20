// Renders the favicons, app icons and the default share image from
// public/favicon.svg and an inline template. Run: pnpm icons
import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')

const svg = readFileSync('public/favicon.svg', 'utf8')
const browser = await chromium.launch()
const page = await browser.newPage({ deviceScaleFactor: 1 })

async function icon(size, file, pad = 0) {
  await page.setViewportSize({ width: size, height: size })
  await page.setContent(
    `<body style="margin:0;background:#0a0a0a"><div style="width:${size}px;height:${size}px;padding:${pad}px;box-sizing:border-box">${svg.replace('<svg ', '<svg width="100%" height="100%" ')}</div></body>`,
  )
  writeFileSync(`public/${file}`, await page.screenshot({ type: 'png' }))
}

await icon(32, 'favicon-32.png')
await icon(180, 'apple-touch-icon.png', 18)
await icon(192, 'icon-192.png', 20)
await icon(512, 'icon-512.png', 52)

await page.setViewportSize({ width: 1200, height: 630 })
await page.setContent(`<!doctype html><html><head>
<style>
@font-face{font-family:Geist;src:url(data:font/woff2;base64,${readFileSync(require.resolve('@fontsource-variable/geist/files/geist-latin-wght-normal.woff2')).toString('base64')}) format('woff2');font-weight:100 900}
@font-face{font-family:GeistMono;src:url(data:font/woff2;base64,${readFileSync(require.resolve('@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2')).toString('base64')}) format('woff2');font-weight:100 900}
body{margin:0;width:1200px;height:630px;background:#ffffff;color:#0a0a0a;font-family:Geist;display:flex;flex-direction:column;justify-content:space-between;padding:80px 88px;box-sizing:border-box;border-bottom:8px solid #2563eb}
.grid{position:absolute;inset:0;background-image:linear-gradient(#f0f0f0 1px,transparent 1px),linear-gradient(90deg,#f0f0f0 1px,transparent 1px);background-size:48px 48px;z-index:-1}
</style></head><body><div class="grid"></div>
<div style="display:flex;align-items:center;gap:18px">
<svg width="56" height="56" viewBox="0 0 64 64"><path d="M36 10 V40 a12 12 0 0 1 -24 0" fill="none" stroke="#0a0a0a" stroke-width="9"/><circle cx="50" cy="48" r="5.5" fill="#2563eb"/></svg>
<span style="font-family:GeistMono;font-size:26px;color:#525252">jeffsegovia.dev</span></div>
<div><div style="font-size:92px;font-weight:600;letter-spacing:-0.045em;line-height:1">Jeff Segovia</div>
<div style="font-size:36px;color:#525252;margin-top:22px;letter-spacing:-0.01em">Software Engineer · Philippines</div></div>
<div style="font-family:GeistMono;font-size:22px;color:#525252">Projects · Experience · Writing</div>
</body></html>`)
await page.waitForTimeout(200)
writeFileSync('public/og.png', await page.screenshot({ type: 'png' }))
await browser.close()
console.log('icons written')
