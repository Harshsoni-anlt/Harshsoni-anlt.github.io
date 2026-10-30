import { defineConfig } from 'astro/config'

// The public address: free GitHub Pages user site. Swap for a custom domain later (or set SITE in CI).
export default defineConfig({
  site: process.env.SITE ?? 'https://harshsoni-anlt.github.io',
  devToolbar: { enabled: false },
})
