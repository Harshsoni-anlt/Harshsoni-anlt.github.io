import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

// The four columns of the method grid. Short evidence text, filled only where it's true.
const traits = z
  .object({
    measure: z.string().optional(), // risk measured first
    cantTell: z.string().optional(), // honest "can't tell"
    localGate: z.string().optional(), // free local gate before API spend
    byod: z.string().optional(), // bring your own data
  })
  .default({})

// Open-source systems. Shipping a new project = adding one file here; the list row, the method-grid
// row, the case page, the level count, profile.json and llms.txt all regenerate from it.
const quests = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/quests' }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    status: z.enum(['cleared', 'in-progress']),
    shipped: z.coerce.date().optional(),
    tagline: z.string(),
    quest: z.string(),
    modality: z.enum(['text', 'video', 'audio', 'image', 'data']),
    headline: z.string(), // the one measured line shown in the index row
    line: z.string(), // the one line shown on the home page
    xp: z.array(z.object({ value: z.string(), label: z.string() })).min(1), // measured results only
    limitation: z.string().optional(),
    boss: z.object({ name: z.string(), story: z.string() }).optional(),
    featured: z.boolean().default(false),
    traits,
    stack: z.array(z.string()),
    tags: z.array(z.string()).default([]),
    cost: z.string().optional(),
    repo: z.string().optional(),
    demo: z.string().optional(),
    linkedin: z.string().url().optional(),
    resumeLine: z.string(),
  }),
})

// Day-job work. No client names, ever: "a regulated bank", not the bank's name.
const work = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/work' }),
  schema: z.object({
    order: z.number(),
    chapter: z.enum(['kyndryl', 'upl']),
    title: z.string(),
    status: z.enum(['production', 'uat', 'contributing', 'shipped']).optional(), // unset until Harsh confirms it
    size: z.enum(['lead', 'short', 'ledger']),
    metric: z.string().optional(), // big numeral in the UPL ledger
    metricNote: z.string().optional(),
    problem: z.string().optional(),
    constraint: z.string().optional(),
    built: z.string(),
    stack: z.array(z.string()).default([]),
    traits,
  }),
})

// Frontier field log: what's been tested on real data, and what's being tracked.
const log = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/log' }),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    model: z.string().optional(),
    kind: z.enum(['tested', 'tracking']),
    result: z.string(),
    tag: z.string().optional(),
    home: z.boolean().default(true),
    repo: z.string().optional(),
  }),
})

export const collections = { quests, work, log }
