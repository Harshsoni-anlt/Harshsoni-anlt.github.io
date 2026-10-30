import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

// One Markdown file per project. Shipping a new project = adding one file here;
// the map, achievements, résumé page, profile.json and llms.txt all regenerate from it.
const quests = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/quests' }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    status: z.enum(['cleared', 'in-progress']),
    shipped: z.coerce.date().optional(),
    tagline: z.string(), // one line, what it is
    quest: z.string(), // the business problem, in the client's terms
    modality: z.enum(['text', 'video', 'audio', 'image', 'data']),
    xp: z.array(z.object({ value: z.string(), label: z.string() })).min(1), // measured results only
    boss: z.object({ name: z.string(), story: z.string() }).optional(), // the bug that nearly got away
    stack: z.array(z.string()),
    tags: z.array(z.string()).default([]),
    cost: z.string().optional(),
    repo: z.string().optional(), // "owner/name" on GitHub
    demo: z.string().optional(),
    linkedin: z.string().url().optional(),
    resumeLine: z.string(), // the one-line outcome a hiring manager reads
  }),
})

export const collections = { quests }
