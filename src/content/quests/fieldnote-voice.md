---
order: 3
title: FieldNote
status: cleared
shipped: 2026-08-09
tagline: Speak a field note, get a structured record. You define the fields; every value cites the audio it was heard in. Hindi and Hinglish.
quest: The person who knows is halfway up a ladder. The form gets typed later, from memory, badly.
modality: audio
xp:
  - value: "−5 dB"
    label: SNR with all 6 fields still correct
  - value: "1 / 6"
    label: fields correct at −10 dB, so a local noise gate refuses instead
  - value: "~32"
    label: tokens per second of audio, one call for transcript and fields
stack: [Gemini Flash-Lite, numpy, SQLite, FastAPI, React, Vite]
tags: [voice, hindi]
cost: ₹0
repo: Harshsoni-anlt/fieldnote-voice
resumeLine: Voice-to-structured-record tool for Hindi and Hinglish field notes; measured reliable to −5 dB SNR and added a local noise gate after finding the model invents rather than errors below that.
boss:
  name: The recording that couldn't play itself back
  story: Recorded notes failed to decode because the browser's recording container carried no duration. Uploads worked the whole time, which is why it hid. Fixed by capturing raw PCM.
headline: "6/6 fields correct down to −5 dB noise (synthetic speech)."
featured: true
limitation: "Below −10 dB it refuses instead of inventing. Not yet tested on a real voice; every test so far used synthetic speech."
traits:
  measure: "SNR sweep"
  cantTell: "not heard"
  localGate: "noise gate"
  byod: "your form"
line: "Speak a field note in Hindi or Hinglish and get a structured record, with each value linked to the audio it came from."
---

- Your form becomes the response schema at request time, so you decide the fields.
- Each value links to the audio window it came from; click to hear the evidence.
- Per-form site vocabulary: without it "pallet" was heard as "toilet"; with it, correctly.
- Below about −10 dB the model doesn't fail, it invents ("aisle four, bay seven" became "apartment 4 day care"). A local noise gate on the speech envelope refuses those recordings before any API call.
- The browser decodes and resamples to 16 kHz WAV, so the server never needs ffmpeg.
