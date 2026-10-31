import { getCollection } from 'astro:content'
import { profile } from '../data/profile'
import { sortQuests, sortWork } from '../lib/achievements'

// The llms.txt convention: a plain summary a language model can read in one fetch.
export async function GET({ site }: { site: URL }) {
  const quests = sortQuests(await getCollection('quests'))
  const work = sortWork(await getCollection('work'))
  const u = (p: string) => new URL(p, site).href
  const STATUS = { production: 'in production', uat: 'in UAT', contributing: 'contributing', shipped: 'shipped' }
  const lines = [
    `# ${profile.name}`,
    '',
    `> ${profile.role}, ${profile.location}. ${profile.intro} ${profile.next}`,
    '',
    ...profile.about,
    '',
    '## Work',
    ...work.map(w => `- ${w.data.chapter === 'kyndryl' ? 'Kyndryl' : 'UPL'}: ${w.data.title}${w.data.status ? ` (${STATUS[w.data.status]})` : ''}${w.data.metric ? ` — ${w.data.metric} ${w.data.metricNote}` : ''}`),
    '',
    '## Open-source systems',
    ...quests.map(q => `- ${q.data.repo ? `[${q.data.title}](https://github.com/${q.data.repo})` : `${q.data.title} (in progress)`}: ${q.data.resumeLine}`),
    '',
    '## Awards, events & education',
    ...profile.awards.map(a => `- ${a.title} (${a.when})`),
    ...profile.education.map(e => `- ${e.title}, ${e.org} (${e.when})`),
    '',
    '## Links',
    `- [Résumé](${u('/resume/')})`,
    `- [Field log](${u('/log/')})`,
    `- [Profile JSON](${u('/profile.json')})`,
    `- [GitHub](${profile.github})`,
    `- [LinkedIn](${profile.linkedin})`,
    `- Email: ${profile.email}`,
  ]
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
