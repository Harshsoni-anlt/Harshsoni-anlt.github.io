// The journey: real places and real chapters. Facts come from 00_plan/PORTFOLIO_EVIDENCE.md.
// The 3D terrain is abstract on purpose: no country outline is drawn.
export type Place = { id: string; name: string; lat: number; lon: number; kind: 'journey' | 'travel' }

export const PLACES: Place[] = [
  { id: 'kota', name: 'Kota', lat: 25.18, lon: 75.83, kind: 'journey' },
  { id: 'mumbai', name: 'Mumbai', lat: 19.08, lon: 72.88, kind: 'journey' },
  { id: 'bengaluru', name: 'Bengaluru', lat: 12.97, lon: 77.59, kind: 'journey' },
  { id: 'goa', name: 'Goa', lat: 15.5, lon: 73.83, kind: 'journey' },
  { id: 'braj', name: 'Braj', lat: 27.58, lon: 77.7, kind: 'travel' },
  { id: 'wayanad', name: 'Wayanad', lat: 11.69, lon: 76.13, kind: 'travel' },
  { id: 'ooty', name: 'Ooty', lat: 11.41, lon: 76.7, kind: 'travel' },
  { id: 'kodai', name: 'Kodaikanal', lat: 10.24, lon: 77.49, kind: 'travel' },
  { id: 'kerala', name: 'Kerala', lat: 9.93, lon: 76.27, kind: 'travel' },
]

export type Chapter = {
  id: string
  focus: string // place id, or 'all' for the wide view
  when: string
  title: string
  sub?: string
  line: string
  image?: { src: string; alt: string }
}

export const JOURNEY: Chapter[] = [
  {
    id: 'kota', focus: 'kota', when: '2017 – 2020',
    title: 'University of Kota',
    sub: 'B.Com (Hons.) · Economic Administration & Financial Management',
    line: 'Where it started: how businesses earn, spend and lose money. Every model I’ve built since starts from that business question.',
  },
  {
    id: 'tiss', focus: 'mumbai', when: '2020 – 2022',
    title: 'Tata Institute of Social Sciences (TISS), Mumbai',
    sub: 'Master of Analytics · Financial Econometrics',
    line: 'Econometrics, forecasting and the statistics under machine learning. My dissertation extended my HPCL internship into an NLP system for HR survey analytics.',
  },
  {
    id: 'interns', focus: 'mumbai', when: '2020 – 2021',
    title: 'First real data',
    sub: 'HCL Foundation · Hindustan Petroleum Corporation Limited (HPCL)',
    line: 'For HCL Foundation, I measured COVID-19’s social and economic impact on Uday programme beneficiaries. At HPCL, I built semantic search over employee surveys (88% accuracy) and a dashboard HR used to form teams.',
  },
  {
    id: 'upl', focus: 'bengaluru', when: '2022 – 2026',
    title: 'UPL · Data Scientist',
    sub: 'Digital & Analytics CoE',
    line: 'Forecasting 23,000+ SKUs across 9 regions with 30+ models: +30–35% accuracy, USD 3M in incremental sales, USD 1.3M saved in inventory costs. Then GenAI: regulatory dossiers, Text-to-SQL, and an LLM layer that explains forecasts in plain language so planners trust them.',
  },
  {
    id: 'award', focus: 'bengaluru', when: '2024 – 2025',
    title: 'UPL OpenAg Awards 2024–25',
    sub: 'Living the Values · “Win win win” award',
    line: 'Winner, for the AI demand-forecasting engine: a trophy and a Certificate of Excellence from UPL’s Chairman & Group CEO. In 2025 I was also part of the UPL team recognised with the Databricks GenAI Innovation Award.',
    image: { src: '/images/upl-openag-award-2025.jpg', alt: 'UPL OpenAg Awards 2024–2025 trophy reading “Harsh Soni, Winner” beside a UPL Certificate of Excellence' },
  },
  {
    id: 'kyndryl', focus: 'bengaluru', when: 'Jan 2026 – present',
    title: 'Kyndryl · Forward Deployed Engineer',
    sub: 'Lead II · client-facing AI delivery',
    line: 'In the room with clients for RFQs, proposals and solution architecture, then the PoC, then production. A regulated bank’s account-opening pipeline now runs on what I built.',
  },
  {
    id: 'goa', focus: 'goa', when: 'May 2026',
    title: 'Kyndryl at the ETCIO Annual Conclave',
    sub: 'Grand Hyatt, Goa · 21–24 May 2026',
    line: 'Represented Kyndryl at its booth at the ETCIO Annual Conclave 2026, meeting CIOs and technology leaders about agentic AI in the enterprise.',
    image: { src: '/images/etcio-conclave-2026.jpg', alt: 'Kyndryl and ETCIO card: Meet me at Kyndryl Booth, Harsh Soni, Forward Deployed Engineer, ETCIO Annual Conclave 2026, Goa' },
  },
  {
    id: 'next', focus: 'all', when: 'now → next',
    title: 'Building in public',
    sub: 'Four systems shipped · one in progress · a field log',
    line: 'Every new AI capability, tested against a real constraint before I trust it. Next quest: a future-ready AI engineer and leader.',
  },
]
