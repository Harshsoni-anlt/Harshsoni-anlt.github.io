import type { CollectionEntry } from 'astro:content'

type Quest = CollectionEntry<'quests'>
export type Achievement = { id: string; name: string; detail: string }

// Every badge is computed from the quest files, never hand-claimed:
// if the data stops supporting it, the badge disappears on the next build.
export function achievements(quests: Quest[]): Achievement[] {
  const cleared = quests.filter(q => q.data.status === 'cleared')
  const senses = new Set(cleared.map(q => q.data.modality))
  const bosses = cleared.filter(q => q.data.boss).length
  const xp = cleared.reduce((n, q) => n + q.data.xp.length, 0)
  const free = cleared.filter(q => q.data.cost === '₹0').length
  const hindi = cleared.filter(q => q.data.tags.includes('hindi'))

  const out: Achievement[] = []
  if (cleared.length) out.push({ id: 'shipped', name: `${cleared.length} quests cleared`, detail: 'Public repo, README written for strangers, demo, post' })
  if (xp) out.push({ id: 'measured', name: 'Measured, not asserted', detail: `${xp} results with numbers behind them` })
  if (bosses) out.push({ id: 'bosses', name: `${bosses} bosses documented`, detail: 'The bug that nearly shipped, and how it was caught' })
  if (senses.size >= 3) out.push({ id: 'senses', name: `${senses.size} input senses`, detail: [...senses].join(' · ') })
  if (free && free === cleared.length) out.push({ id: 'free', name: '₹0 stack', detail: 'Every cleared quest runs on free tiers or a laptop' })
  if (hindi.length) out.push({ id: 'hindi', name: 'Speaks Hinglish', detail: hindi.map(q => q.data.title).join(', ') })
  return out
}

export function sortQuests(quests: Quest[]): Quest[] {
  return [...quests].sort((a, b) => a.data.order - b.data.order)
}

// A quest's place in the world: Q-01, Q-02 ...
export const questCode = (q: Quest) => `Q-${String(q.data.order).padStart(2, '0')}`

export const fmtDate = (d?: Date) =>
  d ? d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' }) : ''
