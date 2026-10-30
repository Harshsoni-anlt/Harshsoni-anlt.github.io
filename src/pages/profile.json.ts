import { getCollection } from 'astro:content'
import { profile } from '../data/profile'
import { sortQuests, sortWork } from '../lib/achievements'

// For résumé screeners, AI recruiters and anyone scripting against the site.
export async function GET({ site }: { site: URL }) {
  const quests = sortQuests(await getCollection('quests'))
  const work = sortWork(await getCollection('work'))
  const body = {
    name: profile.name,
    role: profile.role,
    employer: profile.employer,
    location: profile.location,
    summary: profile.about,
    url: site.href,
    email: profile.email,
    linkedin: profile.linkedin,
    github: profile.github,
    availability: profile.availability,
    experience: profile.experience.map(e => ({
      ...e,
      work: work.filter(w => w.data.chapter === e.org.toLowerCase()).map(w => ({
        title: w.data.title, status: w.data.status, result: w.data.metric ? `${w.data.metric} ${w.data.metricNote}` : undefined, built: w.data.built,
      })),
    })),
    education: profile.education,
    awards: profile.awards,
    capabilities: profile.capabilities.map(c => ({ name: c.name, detail: c.detail })),
    projects: quests.map(q => ({
      title: q.data.title,
      status: q.data.status,
      shipped: q.data.shipped?.toISOString().slice(0, 10),
      summary: q.data.tagline,
      outcome: q.data.resumeLine,
      measured: q.data.xp,
      limitation: q.data.limitation,
      stack: q.data.stack,
      repo: q.data.repo ? `https://github.com/${q.data.repo}` : undefined,
      page: new URL(`/quests/${q.id}/`, site).href,
    })),
  }
  return new Response(JSON.stringify(body, null, 2), { headers: { 'Content-Type': 'application/json' } })
}
