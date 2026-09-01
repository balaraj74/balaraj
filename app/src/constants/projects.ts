export interface Project {
  title: string;
  emoji: string;
  badge: string;
  description: string;
  thinking: string;
  tech: string[];
  github: string;
  demo: string;
  borderColor: string;
  accentColor: string;
  image: string;
  secondaryImage?: string;
  gradientFrom?: string;
  metrics: string[] | { label: string; value: string }[];
}
export const FEATURED_PROJECTS: Project[] = [
  {
    title: 'Darwin',
    emoji: '🤖',
    badge: 'AI Executive Board',
    description: 'A full-stack AI platform that acts as an AI-powered executive board for founders. Features a sophisticated 3-round debate engine with 5 specialized AI agents enforcing hard constraints to build actionable execution blueprints. Each agent operates autonomously, synthesizing market intelligence and strategic viability to provide rigorous, unbiased venture validation.',
    thinking: 'Multi-agent structured debate with deterministic constraint overrides',
    tech: ['FastAPI', 'Next.js 14', 'Vertex AI', 'Firebase', '+4 more'],
    github: 'https://github.com/balaraj74/darwin',
    demo: 'https://darwin-5dleehg6la-el.a.run.app',
    borderColor: 'border-cyan-500/30',
    accentColor: 'text-cyan-400',
    image: '/projects/darwin_showcase.png',
    secondaryImage: '/projects/darwin_secondary_1781205919112.png',
    gradientFrom: 'from-cyan-500/10',
    metrics: [
      { label: 'AI Agents', value: '5 Specialists' },
      { label: 'Evaluation', value: '3-Round Debate' },
      { label: 'Infra', value: 'Cloud Run' },
    ],
  },
  {
    title: 'VaidyaOS',
    emoji: '🩺',
    badge: 'Flagship AI Healthcare OS',
    description: 'An advanced AI healthcare platform architected for intelligent, real-time, multilingual medical assistance. Employs on-device edge AI and comprehensive offline capabilities via lightweight GGUF models. It bridges the critical gap in remote clinical operations by ensuring persistent medical intelligence without network dependency.',
    thinking: 'Offline-first architecture with Edge AI inference & Llama.cpp',
    tech: ['React Native', 'Gemma', 'Llama.cpp', 'Firebase', '+4 more'],
    github: 'https://github.com/balaraj74/VaidyaOS',
    demo: 'https://roaring-valkyrie-042963.netlify.app/VaidyaOS.apk',
    borderColor: 'border-emerald-500/30',
    accentColor: 'text-emerald-400',
    image: '/projects/vaidyaos_banner.png',
    secondaryImage: '/projects/vaidyaos_secondary_1781205929915.png',
    gradientFrom: 'from-emerald-500/10',
    metrics: [
      { label: 'Inference', value: 'On-device' },
      { label: 'Network', value: 'Offline-ready' },
    ],
  },
  {
    title: 'CareerLens',
    emoji: '🎯',
    badge: '🥇 Google Gen AI Exchange — National Winner',
    description: 'A dynamic AI-powered career platform that intelligently analyzes resumes, pinpoints skill gaps, and autonomously generates hyper-personalized career trajectories. Engineered entirely as a robust microservices ecosystem, it efficiently scales heavy embedding workflows using asynchronous queues and Cloud Functions.',
    thinking: 'Event-driven microservices architecture with parallel embedding queues',
    tech: ['Next.js 15', 'TypeScript', 'Gemini 1.5 Pro', 'Cloud Functions', '+4 more'],
    github: 'https://github.com/balaraj74/careerlens',
    demo: 'https://careerlens--careerlens-1.us-central1.hosted.app',
    borderColor: 'border-cyan-500/30',
    accentColor: 'text-cyan-400',
    image: '/projects/career_lens_bg_1776501008387.png',
    secondaryImage: '/projects/careerlens_secondary_1781205941727.png',
    gradientFrom: 'from-cyan-500/10',
    metrics: [
      { label: 'Lines of Code', value: '40,000+' },
      { label: 'Microservices', value: '32' },
      { label: 'Commits', value: '320+' },
    ],
  },
  {
    title: 'AgriSence',
    emoji: '🌾',
    badge: '🥇 INFERENTIA 2.0 — Winner',
    description: 'A cutting-edge real-time AI farming orchestrator designed for rapid crop disease detection and predictive advisory. Synthesizes computer vision inference with satellite geospatial data to deliver localized, multilingual agricultural insights through a seamlessly scalable serverless GCP architecture.',
    thinking: 'Serverless ML inference pipeline with real-time edge sync',
    tech: ['Next.js 16', 'Gemini 2.0 Flash', 'Firebase', 'Genkit', '+3 more'],
    github: 'https://github.com/balaraj74/AgriSence',
    demo: 'https://agrisence--agrisence-1dc30.us-central1.hosted.app/',
    borderColor: 'border-emerald-500/30',
    accentColor: 'text-emerald-400',
    image: '/projects/agrisence_bg_1776501022187.png',
    secondaryImage: '/projects/agrisence_secondary_1781205954840.png',
    gradientFrom: 'from-emerald-500/10',
    metrics: [
      { label: 'Languages', value: '7 Regional' },
      { label: 'AI Workflows', value: '15+ Flows' },
      { label: 'Cloud Tech', value: 'GCP Serverless' },
    ],
  },
];

export const OTHER_PROJECTS: Project[] = [
  {
    title: 'OmniSence',
    emoji: '🎬',
    badge: 'Gemini Live Agent Finalist',
    description: 'Engineered a multimodal creative storytelling engine processing text to audio and video. Combined LLMs, Imagen, and Cloud TTS for real-time narrative generation.',
    thinking: 'Real-time streaming pipeline with async media generation',
    tech: ['FastAPI', 'React', 'Gemini 2.0', 'Cloud Run', '+3 more'],
    github: 'https://github.com/balaraj74/Omnisence',
    demo: 'https://omnisence-518586257861.us-central1.run.app/',
    borderColor: 'border-sky-500/30',
    accentColor: 'text-sky-400',
    image: '/projects/omnisence_bg_1776501035325.png',
    metrics: ['Streaming pipeline', 'Async image rendering'],
  },
  {
    title: 'TaskForze',
    emoji: '🤖',
    badge: 'Google APAC Hackathon',
    description: 'Created a multi-agent productivity system that coordinates 5 specialized AI sub-agents to manage workflows, with automated escalation via WhatsApp and AI voice calls for missed deadlines.',
    thinking: 'Multi-agent orchestration system with vector retrieval',
    tech: ['Google ADK', 'FastAPI', 'Cloud Run', 'AlloyDB', '+2 more'],
    github: '#',
    demo: 'https://taskforze-7k4ykvztvq-uc.a.run.app/',
    borderColor: 'border-amber-500/30',
    accentColor: 'text-amber-400',
    image: '/projects/taskforze_bg_1776501047462.png',
    metrics: ['5 specialized agents', 'WhatsApp escalation'],
  },
  {
    title: 'HealthMesh v2.0',
    emoji: '🏥',
    badge: 'Microsoft Imagine Cup',
    description: 'Built a HIPAA-ready clinical AI platform combining 6 specialized healthcare agents with a prescription bridge API to link clinical insights to hyperlocal medicine delivery.',
    thinking: 'FHIR R4 compliant microservices with secure data enclave',
    tech: ['Azure OpenAI', 'FHIR R4', 'FastAPI', 'Firebase', '+1 more'],
    github: '#',
    demo: 'https://healthmesh.azurewebsites.net',
    borderColor: 'border-rose-500/30',
    accentColor: 'text-rose-400',
    image: '/projects/healthmesh_bg_1776501063141.png',
    metrics: ['HIPAA-ready', '6 clinical AI agents'],
  },
  {
    title: 'CyberShield AI',
    emoji: '🛡️',
    badge: 'AMD Slingshot Hackathon',
    description: 'Developed and deployed multiple systems including a 5-layer SME cybersecurity suite (scoring 78/100) and an offline C-based mesh communication network for emergency triage.',
    thinking: 'Offline mesh topologies and multi-layered security protocols',
    tech: ['Python', 'C', 'Gemini', 'FastAPI', '+2 more'],
    github: '#',
    demo: 'https://cybershield-inky.vercel.app/',
    borderColor: 'border-slate-500/30',
    accentColor: 'text-slate-300',
    image: '/projects/cybershield_bg_1776501077227.png',
    metrics: ['5-layer security', 'C-based offline mesh'],
  },
];
