# Harsh Soni: portfolio

The journey as a trail map: each shipped project is a quest, its measured results are the XP,
and the bug that nearly got away is the boss. One click switches to a plain résumé for
recruiters in a hurry.

Static [Astro](https://astro.build) site. No backend, no client framework, no tracking cookies.

## Adding a project

Add one Markdown file to `src/content/quests/`. The schema in `src/content.config.ts` says what
goes in it. Every page regenerates from these files: the map, the quest log, the achievements,
the résumé, `profile.json` and `llms.txt`.

- `xp` holds measured results only, each with a number behind it.
- Achievements are computed from the files (`src/lib/achievements.ts`) and never written by hand.
- Repo stars and last-commit dates come from the GitHub API at build time. An offline build
  still works and leaves them out.

## Run it

```bash
npm install
npm run dev     # http://localhost:4321
npm run build   # static site in dist/
```

Set `GITHUB_TOKEN` to avoid the API's anonymous rate limit, and `SITE` to the public URL.

## What's where

| Path | What |
|---|---|
| `src/content/quests/*.md` | One file per project |
| `src/data/profile.ts` | Name, role, experience, education, working rules |
| `src/components/QuestMap.astro` | The SVG trail map |
| `src/pages/resume.astro` | Recruiter view (prints cleanly to PDF) |
| `src/pages/profile.json.ts`, `llms.txt.ts` | Machine-readable profile for screeners and AI tools |
