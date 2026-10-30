import { defineConfig } from 'astro/config'

// The public address. Change once the domain is bought (or set SITE in CI).
export default defineConfig({
  site: process.env.SITE ?? 'https://harsh-soni.dev',
  devToolbar: { enabled: false },
})
