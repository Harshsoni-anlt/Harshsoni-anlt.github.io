import type { CollectionEntry } from 'astro:content'

type Quest = CollectionEntry<'quests'>
type Work = CollectionEntry<'work'>

export const sortQuests = (q: Quest[]) => [...q].sort((a, b) => a.data.order - b.data.order)
export const sortWork = (w: Work[]) => [...w].sort((a, b) => a.data.order - b.data.order)

export const fmtDate = (d?: Date) =>
  d ? d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' }) : ''
