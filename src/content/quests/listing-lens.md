---
order: 4
title: Listing Lens
status: cleared
shipped: 2026-08-22
tagline: Photo in, marketplace listing out. You define the fields; every value says whether the photo actually confirms it. English and Hindi.
quest: A phone takes the photo in three seconds. Writing the listing takes twenty minutes most sellers don't have.
modality: image
xp:
  - value: "0.99 → 0.10"
    label: brand confidence, sharp photo vs heavily blurred
  - value: "0.98"
    label: brand confidence at 12% brightness, so darkness isn't the risk
  - value: "~1,700"
    label: tokens per photo, every field and both descriptions in one call
stack: [Gemini Flash-Lite, OpenCV, SQLite, FastAPI, React, TypeScript]
tags: [vision, hindi, e-commerce]
cost: ₹0
repo: Harshsoni-anlt/listing-lens
resumeLine: Photo-to-listing tool with per-field visible-in-photo flags; measured that blur, not darkness, breaks extraction and added a local sharpness gate before any API spend.
boss:
  name: The stray zero
  story: Listings showed "Niksun Black Water Bottle0". A React condition rendered SQLite's 0 as text. Caught from a screenshot in the live pass, not by the test suite.
---

- A `visible_in_photo` flag on every field stopped the model inventing capacity and waterproofing: on every real photo tested, those came back unconfirmed.
- A backpack with no logo gets brand "Unknown", not a guessed name.
- Measured before building: darkness barely moves accuracy (the model normalises exposure); blur does, and the model doesn't report it. So the local gate checks sharpness, not exposure.
- The field list travels with each request, so editing a preset never breaks a listing already made from it.
- Export as CSV, JSON or a webhook.
