import { getCollection } from 'astro:content'
import { profile } from '../data/profile'
import { sortQuests } from '../lib/achievements'

// For résumé screeners, AI recruiters and anyone scripting against the site.
export async function GET({ site }: { site: URL }) {
  const quests = sortQuests(await getCollection('quests'))
  const body = {
    ...profile,
    url: site.href,
    projects: quests.map(q => ({
      title: q.data.title,
      status: q.data.status,
      shipped: q.data.shipped?.toISOString().slice(0, 10),
      summary: q.data.tagline,
      outcome: q.data.resumeLine,
      measured: q.data.xp,
      stack: q.data.stack,
      repo: q.data.repo ? `https://github.com/${q.data.repo}` : undefined,
      page: new URL(`/quests/${q.id}/`, site).href,
    })),
  }
  return new Response(JSON.stringify(body, null, 2), { headers: { 'Content-Type': 'application/json' } })
}
