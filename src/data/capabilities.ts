// Capability map for the constellation. Every proof item must trace to src/content/* or the résumé.
// No client names. Hue = where the strongest proof lives (same colour key as the rest of the site).
// Order matters: it is the order around the ellipse, arranged so no two neighbours share a hue.
export type Hue = 'kyndryl' | 'upl' | 'oss' | 'frontier'
export interface Capability {
  id: string
  name: string
  short: string // map label; keep it ≤ 15 chars so it stays legible on a phone
  problem: string // the client's words
  hue: Hue
  skills: string[]
  proof: { label: string; href?: string }[]
}

export const CAPABILITIES: Capability[] = [
  {
    id: 'agentic',
    name: 'Agentic AI & orchestration',
    short: 'Agentic AI',
    problem: 'We want agents that work from our own data, not demos that guess.',
    hue: 'kyndryl',
    skills: ['LangGraph', 'CrewAI', 'MCP tools', 'Task planning', 'Guardrails', 'Text-to-SQL'],
    proof: [
      { label: 'Multi-agent platform used across client engagements', href: '/#work' },
      { label: 'GenAI triage for card service requests, in UAT', href: '/#work' },
      { label: 'WarehouseOps AI: six agents, 19 MCP tools', href: '/quests/warehouseops-ai/' },
      { label: 'Text-to-SQL for business users', href: '/#work' },
    ],
  },
  {
    id: 'forecasting',
    name: 'Forecasting & decision science',
    short: 'Forecasting',
    problem: 'We keep stocking the wrong SKUs in the wrong regions.',
    hue: 'upl',
    skills: ['SARIMAX', 'XGBoost', 'Prophet', 'Churn models', 'Power BI'],
    proof: [
      { label: '23–24K SKUs, 9 regions: USD 3M incremental sales', href: '/#work' },
      { label: '+30–35% forecast accuracy, USD 1.3M inventory saved', href: '/#work' },
      { label: 'Churn model on SAP data', href: '/#work' },
      { label: 'UPL OpenAg Award 2025' },
    ],
  },
  {
    id: 'multimodal',
    name: 'Document & multimodal AI',
    short: 'Multimodal AI',
    problem: 'My team keys data off paper forms, photos and recordings all day.',
    hue: 'kyndryl',
    skills: ['OCR · Textract', 'Multilingual', 'Vision', 'Speech', 'Video', 'RAG'],
    proof: [
      { label: 'Bank onboarding pipeline, in production', href: '/#work' },
      { label: 'FieldNote: voice note to record, Hindi', href: '/quests/fieldnote-voice/' },
      { label: 'Listing Lens: photo to listing', href: '/quests/listing-lens/' },
      { label: 'Video Incident Intel: ask footage a question', href: '/quests/video-incident-intel/' },
    ],
  },
  {
    id: 'local',
    name: 'Cost-aware & local AI',
    short: 'Local AI',
    problem: 'Every request hits a paid API, and some data shouldn’t leave the building.',
    hue: 'oss',
    skills: ['vLLM', 'Quantization', 'Model routing', 'GPU inference', 'Ollama'],
    proof: [
      { label: 'Decision Gate: 68% of calls kept on a laptop', href: '/quests/decision-gate/' },
      { label: 'Video Incident Intel: 96.5% of frames never sent', href: '/quests/video-incident-intel/' },
      { label: 'WarehouseOps AI: runs offline on Ollama', href: '/quests/warehouseops-ai/' },
    ],
  },
  {
    id: 'architecture',
    name: 'Solution architecture & client delivery',
    short: 'Client delivery',
    problem: 'Our POC impressed everyone, then stalled before production.',
    hue: 'kyndryl',
    skills: ['POC → production', 'Regulated data', 'Stakeholders', 'Mentoring'],
    proof: [
      { label: 'Bank onboarding: POC to the process the bank runs on', href: '/#work' },
      { label: 'Card triage: unattended daily job, in UAT', href: '/#work' },
      { label: 'Mentored 3 data scientists and interns', href: '/#work' },
    ],
  },
  {
    id: 'mlops',
    name: 'Enterprise delivery & MLOps',
    short: 'MLOps',
    problem: 'The notebook works. Now it has to run every day, secured, on our cloud.',
    hue: 'upl',
    skills: ['FastAPI', 'Docker · K8s', 'AWS · Azure', 'Databricks', 'MLflow'],
    proof: [
      { label: 'Dossier automation behind Azure SSO: USD 23K saved', href: '/#work' },
      { label: 'Forecast pipelines on Azure Databricks', href: '/#work' },
      { label: 'WarehouseOps AI: 45 tests where there were none', href: '/quests/warehouseops-ai/' },
    ],
  },
  {
    id: 'evaluation',
    name: 'Model evaluation & training data',
    short: 'Evaluation',
    problem: 'We can’t tell when the model is confidently wrong.',
    hue: 'frontier',
    skills: ['Eval-set design', 'Rubric judging', 'Calibration', 'Failure analysis'],
    proof: [
      { label: '3B local vs cloud: 300 messages, calibration measured', href: '/log/#2026-10-30-d1-3b' },
      { label: 'Listing Lens: blur vs darkness tested before building', href: '/quests/listing-lens/' },
      { label: 'FieldNote: noise sweep found it invents below −10 dB', href: '/quests/fieldnote-voice/' },
    ],
  },
]
