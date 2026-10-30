---
order: 1
title: WarehouseOps AI
status: cleared
shipped: 2026-07-26
tagline: A multi-agent warehouse assistant that answers about your warehouse, from your own CSVs, on free infrastructure.
quest: Most AI demos die the moment they meet a customer's data. A warehouse team needs inventory, equipment, safety and forecasting answers that come from their own records, not from what a model guesses.
modality: data
xp:
  - value: "19"
    label: MCP tools, down from 90 duplicate registry entries
  - value: "45"
    label: tests, where there were none
  - value: "29"
    label: routing regression tests
stack: [LangGraph, MCP, Groq, Ollama, ChromaDB, SQLite, FastAPI, React, NeMo Guardrails]
tags: [agents, supply-chain]
cost: ₹0
repo: Harshsoni-anlt/warehouseops-ai
resumeLine: Multi-agent warehouse assistant (LangGraph, 19 MCP tools) answering from live SQL with bring-your-own-CSV import; rebuilt a reference architecture to run free on a laptop, with 45 tests.
boss:
  name: The read query that wrote to the database
  story: Asking "show me recent safety incidents" filed a brand-new incident describing the question. Caught while recording the demo, not by any test. The runner-up was a substring router that matched "Acme Steel Bolts" to "bol" (bill of lading).
---

- A LangGraph planner routes each question to one of six agents: inventory, equipment, operations, safety, forecasting, documents.
- Stock answers come from SQL rows, never from the model's memory.
- **Bring your own CSV**: import your data and it answers about your warehouse.
- Invoice extraction, and 19 MCP tools exposed to the agents.
- Built on an Apache-2.0 reference architecture: roughly 200 files removed and the infrastructure layer replaced, so it runs on Groq's free tier or offline with Ollama.