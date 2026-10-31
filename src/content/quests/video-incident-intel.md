---
order: 2
title: Video Incident Intelligence
status: cleared
shipped: 2026-08-01
tagline: Ask camera footage a plain-English question. You write the checks; every answer cites its frame.
quest: Most cameras record everything and answer nothing. Footage gets watched once, after something has already gone wrong.
modality: video
xp:
  - value: "96.5%"
    label: of frames removed by sampling, on every clip
  - value: "66%"
    label: further removed by the local motion filter (10–88% by clip)
  - value: "66 vs 258"
    label: tokens per frame at low media resolution
stack: [Gemini Flash-Lite, OpenCV, numpy, SQLite, FastAPI, React, TypeScript, Recharts]
tags: [computer-vision, multimodal]
cost: ₹0
repo: Harshsoni-anlt/video-incident-intel
resumeLine: Video Q&A pipeline where users write their own checks; local sampling plus a motion filter removes 96.5% then a further 66% of frames before any model call, and every answer cites its frame.
boss:
  name: The confident false alarm
  story: A hi-vis check filed a high-severity incident at 0.95 confidence on a clip with no people in it, because "no" meant nobody was there. Fixed with a distinct n/a answer. One of nine bugs on this project, and not one was found by reading code.
headline: "96.5% of frames dropped by sampling; a local motion filter removes 66% more on average (10–88% by clip)."
featured: true
limitation: "Measured on 4 clips."
traits:
  measure: "4-clip sweep"
  cantTell: "n/a answer"
  localGate: "motion filter"
  byod: "your footage"
line: "Ask camera footage a plain-English question. You write the checks, and every answer cites the frame it came from."
---

- A check is a plain-language question plus an answer shape: yes/no, count, one-of, or free text.
- OpenCV samples at 1 fps, a local motion filter drops still frames, and the rest go to the model 12 per request.
- Incidents merge automatically; every answer is timestamped and points at its frame.
- A baseline mode sends every frame, so the dashboard shows each user their own no-filter cost, measured, not asserted.
- Export as CSV, JSON or a webhook. No ffmpeg needed; OpenCV brings its own decoders.
- Across four test clips: 1,446 frames decoded, 50 sampled, 17 sent.
