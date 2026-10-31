---
order: 5
title: Decision Gate
status: in-progress
tagline: A small local decision model answers the confident calls and escalates only the hard ones to a cloud LLM.
quest: Routine yes/no and routing decisions don't need a frontier model on every message, and some messages shouldn't leave the building at all.
modality: text
xp:
  - value: "68%"
    label: of messages kept local at 0.8 confidence, 96.1% accurate
  - value: "0.897 vs 0.877"
    label: gate vs cloud-only accuracy, at a third of the cloud calls
  - value: "633 ms"
    label: per message on a laptop (M1 Pro), no text generated
stack: [Liquid d1-3B, transformers, Gemini Flash-Lite, Python]
tags: [decision-models]
resumeLine: A 3B decision model kept 68% of 300 bank-support messages local at 96% accuracy; with escalation it matched cloud-only accuracy using a third of the cloud calls.
headline: "A local 3B model keeps 68% of calls on the laptop. Full write-up in the field log."
featured: false
limitation: "One 300-message dataset; re-test on messier data pending."
traits:
  measure: "300-msg run"
  cantTell: "abstain < 0.8"
  localGate: "local model first"
line: "A local 3B model makes the confident calls and sends only the hard ones to a cloud LLM. It kept 68% of messages local."
---

- Measurement first, product second. 300 real bank-support messages, each needing a fraud flag and one of seven teams.
- The local model returns a calibrated probability rather than text, and that number does the routing: keep the message if confident, escalate it if not.
- On the messages it kept, the local model was right 196 times out of 204; the cloud got 190 of those.
- Honest claim: it matches the cloud while cutting cloud calls by about two thirds. The margin is 6 messages, so "beats it" would be overclaiming.
- Next: re-run on messier data (Hinglish, real tickets) before building the product.
