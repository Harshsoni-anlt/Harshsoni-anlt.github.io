// Everything here is sourced from Harsh's GitHub profile README and LinkedIn (read 24 Jul 2026).
// Keep it that way: nothing on the site that isn't true on paper.
export const profile = {
  name: 'Harsh Soni',
  role: 'Forward Deployed Engineer @ Kyndryl',
  location: 'Bengaluru, India',
  headline: 'I make AI work inside a real business, with real constraints.',
  summary:
    'Forward Deployed Engineer at Kyndryl, building enterprise GenAI for global clients. Before that, four years as a data scientist at UPL. On the side I ship one open-source AI system per sprint, each measured on real inputs with its limits written down.',
  github: 'https://github.com/Harshsoni-anlt',
  linkedin: 'https://www.linkedin.com/in/harsh--soni/',
  email: 'harshsoni.skha@gmail.com',

  experience: [
    {
      org: 'Kyndryl',
      title: 'Lead II, Forward Deployed Engineer',
      when: 'Jan 2026 – present',
      what: 'Enterprise AI and GenAI for global clients: agentic AI, RAG, multilingual document intelligence, on-prem and cloud deployments for regulated environments, vLLM and quantized GPU serving. Technical delivery lead and mentor.',
    },
    {
      org: 'UPL',
      title: 'Data Scientist',
      when: 'Jan 2022 – Jan 2026',
      what: 'End-to-end ownership of GenAI and ML demand forecasting for supply-chain decisions: SKU-level ensembles, time-series models, LLM explainability layers. MLOps with MLflow, CI/CD, automated retraining and model governance.',
    },
    {
      org: 'HPCL',
      title: 'Data Science Intern',
      when: '2021',
      what: "NLP and semantic search over large-scale survey data, extended into my Master's dissertation.",
    },
  ],
  education: [{ org: 'Tata Institute of Social Sciences (TISS), Mumbai', title: 'MA/MSc Analytics', when: '2020 – 2022' }],
  awards: [
    'UPL OpenAg Award: led the AI-based demand forecasting project',
    'Databricks GenAI Innovation Award 2025: part of the UPL team recognised for enterprise LLM adoption',
    'DeepLearning.AI TensorFlow Developer Specialization',
  ],

  discipline: [
    { rule: 'Measure the risk before building.', why: 'Every project starts with a sweep on real inputs: clips, noise levels, blur, a labelled set. The product takes its shape from the numbers.' },
    { rule: 'Answers cite evidence.', why: 'A frame, an audio window, a photo flag. If the model can’t point at it, it says so.' },
    { rule: 'An honest “can’t tell”.', why: 'Every schema has a way to refuse instead of invent: n/a, not heard, not visible in the photo.' },
    { rule: 'A free local gate before any API spend.', why: 'Motion, noise, sharpness, confidence: cheap checks decide what is worth sending to a model.' },
    { rule: 'Bring your own data.', why: 'A system that only works on the sample isn’t a system.' },
    { rule: 'Limitations go in the README.', why: 'Written for a stranger, with the failure modes measured, not hidden.' },
  ],
}
