// Places on the journey map. Real coordinates; the terrain itself is abstract (no country outline is drawn).
export type Place = { id: string; name: string; lat: number; lon: number; kind: 'journey' | 'travel'; hue?: 'kyndryl' | 'upl' | 'oss' | 'frontier' }

export const PLACES: Place[] = [
  { id: 'kota', name: 'Kota', lat: 25.18, lon: 75.83, kind: 'journey', hue: 'upl' },
  { id: 'mumbai', name: 'Mumbai', lat: 19.08, lon: 72.88, kind: 'journey', hue: 'oss' },
  { id: 'bengaluru', name: 'Bengaluru', lat: 12.97, lon: 77.59, kind: 'journey', hue: 'kyndryl' },
  { id: 'braj', name: 'Braj', lat: 27.58, lon: 77.7, kind: 'travel' },
  { id: 'goa', name: 'Goa', lat: 15.5, lon: 73.83, kind: 'travel' },
  { id: 'wayanad', name: 'Wayanad', lat: 11.69, lon: 76.13, kind: 'travel' },
  { id: 'ooty', name: 'Ooty', lat: 11.41, lon: 76.7, kind: 'travel' },
  { id: 'kodai', name: 'Kodaikanal', lat: 10.24, lon: 77.49, kind: 'travel' },
  { id: 'kerala', name: 'Kerala', lat: 9.93, lon: 76.27, kind: 'travel' },
]

// The scroll story. Each step flies the camera to `focus` (a place id, or 'all' for the wide view).
export const JOURNEY = [
  { id: 'kota', focus: 'kota', when: '2020', title: 'Kota', line: 'B.Com (Hons.), Economics & Financial Administration. Where numbers first started telling stories.' },
  { id: 'mumbai', focus: 'mumbai', when: '2020 – 22', title: 'Mumbai · TISS', line: 'Master of Analytics (Financial Econometrics). An NLP internship at HPCL turned into my dissertation.' },
  { id: 'upl', focus: 'bengaluru', when: '2022 – 26', title: 'Bengaluru · UPL', line: 'Data scientist. Forecasting for 23,000+ products across 9 regions, then GenAI that automated regulatory dossiers. UPL OpenAg Award.' },
  { id: 'kyndryl', focus: 'bengaluru', when: '2026 →', title: 'Kyndryl · Forward Deployed', line: 'Taking AI into regulated production: a bank’s onboarding pipeline, GenAI triage, a multi-agent platform.' },
  { id: 'oss', focus: 'all', when: 'nights & weekends', title: 'Building in public', line: 'Five open-source systems, each testing a new AI capability against real constraints: data, video, voice, vision, decisions.' },
  { id: 'next', focus: 'all', when: 'next', title: 'Next quest', line: 'A future-ready AI engineer and leader. The map keeps growing.' },
] as const
