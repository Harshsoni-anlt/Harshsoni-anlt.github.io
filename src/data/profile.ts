// Every fact here traces to 00_plan/PORTFOLIO_EVIDENCE.md. No client names, no phone number.
// Copy agreed in the v5 war room (00_plan/references/WAR_ROOM.md).
export const profile = {
  name: 'Harsh Soni',
  role: 'Forward Deployed Engineer at Kyndryl',
  location: 'Bengaluru',
  intro: 'I build AI systems for real businesses and take them from proof of concept to production.',
  next: 'Next: FDE, AI engineer or AI architect, building with frontier AI.',
  description:
    'Forward Deployed Engineer at Kyndryl. I build AI systems for real businesses and take them from proof of concept to production.',
  email: 'harshsoni.hsw@gmail.com',
  github: 'https://github.com/Harshsoni-anlt',
  linkedin: 'https://www.linkedin.com/in/harsh--soni/',
  resume: '/resume/',

  about: [
    'I love working in technology. I build, ship and architect AI systems, with over five years in data and AI since my Master of Analytics at the Tata Institute of Social Sciences (TISS), Mumbai.',
    'At Kyndryl I take on RFQs, proposals and client consulting, design the AI architecture and ship it. At UPL, as a data scientist for four years, I won a UPL OpenAg Award for my demand-forecasting work.',
    'I also contribute to open source. This year I’ve shipped four AI systems in public, with a fifth in progress.',
  ],

  experience: [
    {
      when: '2026 — Now',
      title: 'Forward Deployed Engineer (Lead II)',
      id: 'kyndryl',
      org: 'Kyndryl',
      url: 'https://www.kyndryl.com',
      line: 'My account-opening automation for a regulated bank runs in production, and a GenAI triage layer for credit-card service requests is in UAT. I also work on Kyndryl’s internal multi-agent platform: orchestration, task planning and pluggable tools.',
      tags: ['AWS Textract', 'AWS Bedrock', 'Agentic AI', 'vLLM'],
    },
    {
      when: '2022 — 2026',
      title: 'Data Scientist, Digital & Analytics CoE',
      id: 'upl',
      org: 'UPL',
      url: 'https://www.upl-ltd.com',
      line: 'I built demand forecasting for 23,000+ SKUs in 9 global regions; it raised forecast accuracy 30–35% and added USD 3M in sales. Then GenAI tools for regulatory dossiers and text-to-SQL. As technical lead, I mentored three data scientists and interns.',
      tags: ['Azure Databricks', 'MLflow', 'Azure OpenAI', 'LangChain'],
    },
    {
      when: 'Jun — Aug 2021',
      title: 'Data Science Intern',
      id: 'hpcl',
      org: 'Hindustan Petroleum Corporation Limited (HPCL)',
      url: 'https://www.hindustanpetroleum.com',
      line: 'I built an NLP model with semantic search in R, 88% accurate, and a Shiny dashboard HR managers used to explore survey themes. I later extended it into my TISS dissertation.',
      tags: ['R', 'NLP', 'Semantic search', 'Shiny'],
    },
    {
      when: 'Dec 2020 — Feb 2021',
      title: 'Data Analytics Intern',
      id: 'hcl',
      org: 'HCL Foundation',
      url: 'https://www.hclfoundation.org',
      line: 'I analysed COVID-19’s social, economic and psychological impact on beneficiaries of the Uday programme, and built the dashboard and recommendations from it.',
      tags: ['Survey analytics', 'Dashboards'],
    },
  ],

  awards: [
    {
      when: '2024 — 25',
      title: 'UPL OpenAg Awards · Winner',
      line: 'The “Win win win” award in the Living the Values Awards, for my AI demand-forecasting project, with a Certificate of Excellence signed by UPL’s Chairman & Group CEO.',
      image: { src: '/images/upl-openag-award-2025.jpg', thumb: '/images/upl-openag-award-2025-crop.jpg', w: 899, h: 700, alt: 'UPL OpenAg Awards 2024–2025 trophy reading “Harsh Soni, Winner” beside a UPL Certificate of Excellence' },
    },
    {
      when: '2025',
      title: 'Databricks GenAI Innovation Award',
      line: 'I was part of the UPL team that received it.',
    },
    {
      when: 'May 2026',
      title: 'Kyndryl at the ETCIO Annual Conclave 2026',
      line: 'I represented Kyndryl at the company’s booth, 21–24 May, Grand Hyatt Goa.',
      image: { src: '/images/etcio-conclave-2026.jpg', w: 1000, h: 1000, alt: 'Kyndryl and ETCIO card: Meet me at Kyndryl Booth, Harsh Soni, Forward Deployed Engineer, ETCIO Annual Conclave 2026, Goa' },
    },
    {
      when: 'Aug 2026',
      title: 'Forward Deployed Engineer – Foundation, Kyndryl',
      line: 'Also: TensorFlow Developer Specialization (DeepLearning.AI); RS & GIS Applications (ISRO – Indian Institute of Remote Sensing).',
    },
  ],

  education: [
    {
      when: '2020 — 2022',
      title: 'Master of Analytics, Financial Econometrics',
      org: 'Tata Institute of Social Sciences (TISS), Mumbai',
      line: 'Dissertation: an NLP system for HR survey analytics, extended from my HPCL internship.',
    },
    {
      when: '2017 — 2020',
      title: 'B.Com (Hons.), Economic Administration & Financial Management',
      org: 'University of Kota',
    },
  ],

  footer: 'Harsh Soni, Bengaluru. Off the clock: running, and road trips from Kerala to Braj.',
} as const
