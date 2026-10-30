import { getCollection } from 'astro:content'
import { profile } from '../data/profile'
import { sortQuests } from '../lib/achievements'

// The llms.txt convention: a plain summary a language model can read in one fetch.
export async function GET({ site }: { site: URL }) {
  const quests = sortQuests(await getCollection('quests'))
  const lines = [
    `# ${profile.name}`,
    '',
    `> ${profile.summary} Based in ${profile.location}.`,
    '',
    '## Projects',
    ...quests.map(q => `- [${q.data.title}](${new URL(`/quests/${q.id}/`, site).href}): ${q.data.resumeLine}`),
    '',
    '## Links',
    `- [Résumé](${new URL('/resume/', site).href})`,
    `- [Profile JSON](${new URL('/profile.json', site).href})`,
    `- [GitHub](${profile.github})`,
    ...(profile.linkedin ? [`- [LinkedIn](${profile.linkedin})`] : []),
  ]
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
