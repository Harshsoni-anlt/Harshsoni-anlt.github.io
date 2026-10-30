import type { CollectionEntry } from 'astro:content'

type Quest = CollectionEntry<'quests'>
type Work = CollectionEntry<'work'>

export const sortQuests = (q: Quest[]) => [...q].sort((a, b) => a.data.order - b.data.order)
export const sortWork = (w: Work[]) => [...w].sort((a, b) => a.data.order - b.data.order)

export const questCode = (q: Quest) => `Q-${String(q.data.order).padStart(2, '0')}`

export const fmtDate = (d?: Date) =>
  d ? d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' }) : ''

// Level = cleared open-source quests + day-job work that is live (production) or in UAT.
// Computed from the content files, so it can only go up when something real ships.
export function level(quests: Quest[], work: Work[]) {
  const cleared = quests.filter(q => q.data.status === 'cleared').length
  const live = work.filter(w => w.data.status === 'production' || w.data.status === 'uat').length
  return cleared + live
}

// "Solution wizard" is earned, not claimed: at least 4 different input types shipped in the open
// AND something running in production at work. If the data stops supporting it, the label disappears.
export function wizardUnlocked(quests: Quest[], work: Work[]) {
  const senses = new Set(quests.filter(q => q.data.status === 'cleared').map(q => q.data.modality))
  return senses.size >= 4 && work.some(w => w.data.status === 'production')
}
