import { defineConfig } from 'vitest/config'
import { contentMdx } from './mdx/plugin'

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [contentMdx()],
  test: { environment: 'node' },
})
