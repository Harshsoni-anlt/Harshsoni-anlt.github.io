// Sourced from Harsh's résumé (Oct 2026), GitHub profile README and LinkedIn.
// Nothing on the site that isn't true on paper. No client names, no phone number.
export const profile = {
  name: 'Harsh Soni',
  role: 'Forward Deployed AI Engineer',
  employer: 'Kyndryl',
  location: 'Bengaluru',
  eyebrow: 'Harsh Soni · Forward Deployed AI Engineer · Kyndryl · Bengaluru',
  headline: { before: 'I make AI work inside real businesses, and ', em: 'measure it', after: ' before I promise it.' },
  subline: 'Banking · Supply chain · Agentic AI · Model evaluation. 5+ years taking AI from proof-of-concept to production in regulated environments.',
  description:
    'Forward Deployed AI Engineer at Kyndryl. Document AI in production at a regulated bank, demand forecasting across 9 regions at UPL, and open-source systems that measure each new AI capability before trusting it.',
  about:
    "I'm a Forward Deployed AI Engineer at Kyndryl. My job is to take AI out of the demo and into regulated, messy production. For a regulated bank I built the document pipeline that turned scanned account-opening forms into clean records, from POC to the process the bank now runs on. Before Kyndryl I spent four years as a data scientist at UPL, where I built SKU-level demand forecasting across 9 global regions (USD 3M incremental sales) and a GenAI system that automates regulatory dossiers. Outside work I ship open-source systems that test each new AI capability against real constraints. The rule is the same everywhere: measure the risk before building, give the system an honest “can't tell”, and put a free local check in front of every paid API call.",

  // Harsh: résumé email is harshsoni.hsw@gmail.com, GitHub profile has harshsoni.skha@gmail.com. Pending his choice.
  email: 'harshsoni.skha@gmail.com',
  github: 'https://github.com/Harshsoni-anlt',
  linkedin: 'https://www.linkedin.com/in/harsh--soni/',
  cal: { intro: '', scoping: '' }, // Cal.com links once created; empty = Book falls back to email
  availability: { text: 'Open to FDE roles and select projects', asOf: 'Oct 2026' },
  resumeUpdated: 'Oct 2026',

  experience: [
    { org: 'Kyndryl', title: 'Lead II, Forward Deployed Engineer', when: 'Jan 2026 – present', what: 'Enterprise AI for regulated clients: document intelligence, GenAI triage, and a multi-agent platform used across engagements.' },
    { org: 'UPL', title: 'Data Scientist', when: 'Jan 2022 – Jan 2026', what: 'Demand forecasting for 23–24K SKUs in 9 regions, GenAI dossier automation, Text-to-SQL, churn modelling. Mentored a team of 3.' },
  ],
  education: [
    { org: 'Tata Institute of Social Sciences (TISS), Mumbai', title: 'Master of Analytics (Financial Econometrics)', when: '2022' },
    { org: 'University of Kota', title: 'B.Com (Hons.), Economics & Financial Administration', when: '2020' },
  ],
  awards: ['UPL OpenAg Award 2025: excellence in demand forecasting & supply-chain modelling', 'Databricks GenAI Innovation Award 2025 (UPL team)', 'DeepLearning.AI TensorFlow Developer Specialization'],

  proof: [
    { value: 'USD 3M', label: 'incremental sales from demand forecasting' },
    { value: '+30–35%', label: 'forecast accuracy' },
    { value: '23–24K', label: 'SKUs forecast across 9 regions' },
    { value: 'In production', label: "a regulated bank's account-opening pipeline" },
  ],

  capabilities: [
    { name: 'Agentic AI & orchestration', detail: 'LangGraph, CrewAI, MCP, multi-agent platforms' },
    { name: 'Document intelligence', detail: 'OCR (Textract), multilingual extraction, RAG, Azure AI Search' },
    { name: 'Model evaluation & training data', detail: 'eval-set design, rubric-based judging of model outputs, calibration and failure analysis', href: '/log/#2026-10-30-d1-3b' },
    { name: 'Local & cost-aware AI', detail: 'vLLM, quantization, small-model routing, NVIDIA GPU inference' },
    { name: 'Forecasting & classical ML', detail: 'time-series ensembles, churn, MLflow, Databricks' },
    { name: 'Delivery', detail: 'FastAPI, React, Docker, Kubernetes, AWS, Azure, Power BI' },
  ],

  // The next quest: where this is all heading.
  next: {
    title: 'A future-ready AI engineer and leader',
    paths: [
      { name: 'Build my own AI product', line: 'Turn one of these systems into something people pay for.' },
      { name: 'Forward deployed at a frontier lab', line: 'Put the newest models to work inside the hardest real deployments.' },
      { name: 'Independent AI consultant', line: 'Walk into a business, find the process AI should fix, ship it.' },
      { name: 'AI architect & leader', line: 'Lead teams and platforms that make AI routine across an enterprise.' },
    ],
  },

  // A few things off the clock. Kept short on purpose.
  offClock: [
    { name: 'Road trips', line: 'Kerala, Wayanad, Ooty, Kodaikanal, Braj. Bucket list: everywhere.' },
    { name: 'Runner', line: 'Race-day bibs and early starts.' },
    { name: 'Would volunteer for', line: 'Humanitarian relief, economic empowerment, sport, science & tech.' },
  ],

  method: [
    { key: 'measure', label: 'Risk measured first' },
    { key: 'cantTell', label: 'Honest “can’t tell”' },
    { key: 'localGate', label: 'Free local gate before API spend' },
    { key: 'byod', label: 'Bring your own data' },
  ],
} as const

export const CHAPTERS = {
  kyndryl: { n: '01', name: 'Kyndryl', when: '2026 –' },
  upl: { n: '02', name: 'UPL', when: '2022 – 26' },
  oss: { n: '03', name: 'Systems I’ve shipped', when: 'open source' },
  frontier: { n: '04', name: 'Frontier field log', when: 'testing now' },
} as const
