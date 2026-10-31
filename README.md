# Harsh Soni: portfolio

One page: a sticky identity column (name, role, one line, the next role I'm after, Résumé · Email · LinkedIn · GitHub)
beside a scrolling column of About, Experience, Open source, and Awards & education. Text links only, no buttons.
A plain résumé page prints cleanly for recruiters in a hurry.

Static [Astro](https://astro.build) site, one dependency, a few hundred bytes of JavaScript (the section nav's scroll-spy).
No backend, no trackers. Every word is in the HTML before any script runs; the one entrance fade is CSS and switches off
under reduced motion.

## Adding a project

Add one Markdown file to `src/content/quests/` (open source), `src/content/work/` (day job, no client
names) or `src/content/log/` (a model tested). The schemas in `src/content.config.ts` say what goes in
each. The home rows, résumé page, `profile.json` and `llms.txt` regenerate. A poster at
`public/demos/<file-name>.jpg` shows as the project's thumbnail.

- `xp` holds measured results only, each with a number behind it.
- `scripts/contrast.mjs` and `scripts/check-html.mjs` run in CI after the build; either failing blocks the deploy.

## Run it

```bash
npm install
npm run dev     # http://localhost:4321
npm run build   # static site in dist/
```

Set `SITE` to the public URL if it isn't https://harshsoni-anlt.github.io.

## What's where

| Path | What |
|---|---|
| `src/data/profile.ts` | Name, role, About, experience, awards, education |
| `src/content/quests/*.md` | One file per open-source project |
| `src/pages/index.astro` | The home page |
| `src/pages/resume.astro` | Recruiter view (prints cleanly to PDF) |
| `src/pages/log.astro` | Field log: new models tested on real data |
| `src/pages/profile.json.ts`, `llms.txt.ts` | Machine-readable profile for screeners and AI tools |
