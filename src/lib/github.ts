// Build-time repo stats, so the site stays current with a daily rebuild and no backend.
// Offline or rate-limited builds still succeed: the stats are simply left out.
export type RepoStats = { stars: number; pushedAt: string; url: string }

const cache = new Map<string, Promise<RepoStats | null>>()

export function repoStats(repo: string): Promise<RepoStats | null> {
  if (!cache.has(repo)) {
    const headers: Record<string, string> = { Accept: 'application/vnd.github+json' }
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    cache.set(
      repo,
      fetch(`https://api.github.com/repos/${repo}`, { headers })
        .then(r => (r.ok ? r.json() : null))
        .then(j => (j ? { stars: j.stargazers_count, pushedAt: j.pushed_at, url: j.html_url } : null))
        .catch(() => null),
    )
  }
  return cache.get(repo)!
}
