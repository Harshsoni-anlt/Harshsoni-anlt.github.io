# Harsh Soni: portfolio

Four colour-coded chapters (Kyndryl, UPL, open source, frontier field log), a method grid that shows the same four rules in every system,
and one contact hub with résumé, email, booking, LinkedIn and GitHub. A plain résumé page prints cleanly for
recruiters in a hurry.

Static [Astro](https://astro.build) site, under 0.5 KB of JavaScript. No backend, no trackers. Motion is native CSS scroll-driven animation and switches off under reduced motion.

## Adding a project

Add one Markdown file to `src/content/quests/` (open source), `src/content/work/` (day job, no client
names) or `src/content/log/` (a model tested). The schemas in `src/content.config.ts` say what goes in
each. The index rows, method grid, level count, résumé page, `profile.json` and `llms.txt` regenerate.

- `xp` holds measured results only, each with a number behind it.
- The level and the "solution wizard" label are computed from the files (`src/lib/achievements.ts`); if the data stops supporting them they disappear.
- `scripts/contrast.mjs` and `scripts/check-html.mjs` run in CI after the build; either failing blocks the deploy.
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
| `src/components/` | Contact hub, chapter band, status pill, mini-game |
| `src/pages/resume.astro` | Recruiter view (prints cleanly to PDF) |
| `src/pages/profile.json.ts`, `llms.txt.ts` | Machine-readable profile for screeners and AI tools |
