// Sourced from Harsh's résumé (Oct 2026), GitHub profile README and LinkedIn.
// Nothing on the site that isn't true on paper. No client names, no phone number.
export const profile = {
  name: 'Harsh Soni',
  role: 'Forward Deployed Engineer',
  employer: 'Kyndryl',
  location: 'Bengaluru',
  eyebrow: 'Harsh Soni · Forward Deployed Engineer · Kyndryl · Bengaluru',
  headline: { before: 'I make AI work inside real businesses, and ', em: 'measure it', after: ' before I promise it.' },
  subline: 'From the RFQ to production at Kyndryl: document AI now runs at a regulated bank. Before that, UPL, where my forecasting across 23,000+ SKUs in 9 regions added USD 3M in sales and won the UPL OpenAg Awards 2024–25. 5+ years in data and AI.',
  description:
    'Forward Deployed Engineer at Kyndryl. Document AI in production at a regulated bank, demand forecasting across 9 regions at UPL, and open-source systems that measure each new AI capability before trusting it.',
  about:
    "Forward Deployed Engineer at Kyndryl: I'm in the room for the RFQ, the proposal and the architecture, and still on the hook when it runs in production, as it now does at a regulated bank. Before that I spent four years as a data scientist at UPL, building demand forecasting for 23,000+ SKUs across 9 regions that won the UPL OpenAg Awards 2024–25, then bringing GenAI into regulatory work. I trained in economics (B.Com (Hons.), University of Kota) and analytics (Master of Analytics, Tata Institute of Social Sciences (TISS), Mumbai), so I start every AI problem with the business question. Outside work I build in public, measuring each new AI capability against a real constraint before I trust it.",

  // Harsh: résumé email is harshsoni.hsw@gmail.com, GitHub profile has harshsoni.skha@gmail.com. Pending his choice.
  email: 'harshsoni.skha@gmail.com',
  github: 'https://github.com/Harshsoni-anlt',
  linkedin: 'https://www.linkedin.com/in/harsh--soni/',
  cal: { intro: '', scoping: '' }, // Cal.com links once created; empty = Book falls back to email
  availability: { text: 'Open to FDE roles and select projects', asOf: 'Oct 2026' },
  resumeUpdated: 'Oct 2026',

  experience: [
    { org: 'Kyndryl', title: 'Lead II, Forward Deployed Engineer', when: 'Jan 2026 – present', what: 'Client-facing AI delivery: RFQs, proposals and solution architecture, then PoC to production. Document intelligence in production at a regulated bank, GenAI triage, a multi-agent platform, GPU serving with vLLM.' },
    { org: 'UPL', title: 'Data Scientist, Digital & Analytics CoE', when: 'Jan 2022 – Jan 2026', what: 'Forecasting 23,000+ SKUs across 9 regions with 30+ models; GenAI regulatory dossiers, Text-to-SQL, churn modelling, MLOps. Technical lead; mentored a team of 3.' },
    { org: 'Hindustan Petroleum Corporation Limited (HPCL)', title: 'Data Science Intern', when: 'Jun – Aug 2021', what: 'Semantic search over employee surveys in R (88% accuracy) and a Shiny dashboard HR used to form teams. Became my Master’s dissertation.' },
    { org: 'HCL Foundation', title: 'Data Analytics Intern', when: 'Dec 2020 – Feb 2021', what: 'Measured COVID-19’s social, economic and psychological impact on Uday programme beneficiaries; dashboards and recommendations.' },
  ],
  education: [
    { org: 'Tata Institute of Social Sciences (TISS), Mumbai', title: 'Master of Analytics, Financial Econometrics', when: '2020 – 2022', note: 'Dissertation: NLP-based HR survey analytics system, extended from the HPCL internship.' },
    { org: 'University of Kota', title: 'B.Com (Hons.), Economic Administration & Financial Management', when: '2017 – 2020', note: 'Economics, finance and the business side every model has to answer to.' },
  ],
  awards: [
    'UPL OpenAg Awards 2024–25 · Living the Values: “Win win win” award, winner, with a Certificate of Excellence, for the AI demand-forecasting engine',
    'Databricks GenAI Innovation Award 2025, as part of the UPL team',
    'Forward Deployed Engineer – Foundation, Kyndryl (Aug 2026)',
    'DeepLearning.AI TensorFlow Developer Specialization',
    'RS & GIS Applications, ISRO – Indian Institute of Remote Sensing (2020)',
  ],
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
    { name: 'Runner', line: 'Early starts, race days.' },
    { name: 'Would volunteer for', line: 'Humanitarian relief and economic empowerment, the same ground my first data project covered at HCL Foundation.' },
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
