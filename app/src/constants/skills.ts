import { Brain, Code2, Layers, Shield } from 'lucide-react';

export interface SkillCategory {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  badgeBg: string;
  glow: string;
  image: string;
  bullets: string[];
  techStack: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'AI Systems Engineering',
    icon: Brain,
    color: 'text-cyan-400',
    badgeBg: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300',
    glow: 'hover:shadow-[0_0_50px_rgba(6,182,212,0.2)] hover:border-cyan-500/40',
    image: '/ai_systems.png',
    bullets: [
      'Design and build LLM-powered applications using RAG, tool-calling, and multi-agent workflows',
      'Deploy models using Vertex AI / Gemini APIs with real-time inference pipelines',
      'Optimize for latency, cost, and scalability in production environments',
    ],
    techStack: ['LangChain', 'Vertex AI', 'Gemini', 'TensorFlow', 'PyTorch'],
  },
  {
    title: 'Full-Stack AI Development',
    icon: Code2,
    color: 'text-sky-400',
    badgeBg: 'bg-sky-500/10 border-sky-500/20 text-sky-300',
    glow: 'hover:shadow-[0_0_50px_rgba(56,189,248,0.2)] hover:border-sky-500/40',
    image: '/full_stack.png',
    bullets: [
      'Build end-to-end AI products with seamless frontend–backend integration',
      'Develop scalable APIs for ML services and real-time applications',
      'Focus on clean architecture, modular design, and performance',
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'FastAPI', 'Firebase'],
  },
  {
    title: 'Cloud & MLOps',
    icon: Layers,
    color: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300',
    glow: 'hover:shadow-[0_0_50px_rgba(52,211,153,0.2)] hover:border-emerald-500/40',
    image: '/cloud_mlops.png',
    bullets: [
      'Deploy and manage applications on GCP (Cloud Run, Firestore, Functions)',
      'Containerize services using Docker and design microservice architectures',
      'Handle CI/CD, monitoring, and production reliability',
    ],
    techStack: ['GCP', 'Docker', 'Firebase', 'Cloud Functions'],
  },
  {
    title: 'Security & Reliability',
    icon: Shield,
    color: 'text-amber-400',
    badgeBg: 'bg-amber-500/10 border-amber-500/20 text-amber-300',
    glow: 'hover:shadow-[0_0_50px_rgba(251,191,36,0.2)] hover:border-amber-500/40',
    image: '/security.png',
    bullets: [
      'Implement secure architectures for AI systems and APIs',
      'Work with encryption, network analysis, and system-level debugging',
      'Design systems with resilience and fault tolerance in mind',
    ],
    techStack: ['Network Security', 'Cryptography', 'Wireshark', 'Auth'],
  },
];

export interface TechLogo {
  name: string;
  icon: string;
  color: string;
}

export const TECH_LOGOS: TechLogo[] = [
  { name: 'Python', icon: 'python', color: 'hover:text-[#3776AB] hover:border-[#3776AB]/40 hover:shadow-[0_0_20px_rgba(55,118,171,0.3)]' },
  { name: 'PyTorch', icon: 'pytorch', color: 'hover:text-[#EE4C2C] hover:border-[#EE4C2C]/40 hover:shadow-[0_0_20px_rgba(238,76,44,0.3)]' },
  { name: 'TensorFlow', icon: 'tensorflow', color: 'hover:text-[#FF6F00] hover:border-[#FF6F00]/40 hover:shadow-[0_0_20px_rgba(255,111,0,0.3)]' },
  { name: 'Gemini', icon: 'googlegemini', color: 'hover:text-[#8E75B2] hover:border-[#8E75B2]/40 hover:shadow-[0_0_20px_rgba(142,117,178,0.3)]' },
  { name: 'LangChain', icon: 'langchain', color: 'hover:text-white hover:bg-white/5 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]' },
  { name: 'Google ADK', icon: 'google', color: 'hover:text-[#4285F4] hover:border-[#4285F4]/40 hover:shadow-[0_0_20px_rgba(66,133,244,0.3)]' },
  { name: 'Google Cloud', icon: 'googlecloud', color: 'hover:text-[#4285F4] hover:border-[#4285F4]/40 hover:shadow-[0_0_20px_rgba(66,133,244,0.3)]' },
  { name: 'Azure', icon: 'microsoftazure', color: 'hover:text-[#0078D4] hover:border-[#0078D4]/40 hover:shadow-[0_0_20px_rgba(0,120,212,0.3)]' },
  { name: 'AWS', icon: 'amazonaws', color: 'hover:text-[#FF9900] hover:border-[#FF9900]/40 hover:shadow-[0_0_20px_rgba(255,153,0,0.3)]' },
  { name: 'Firebase', icon: 'firebase', color: 'hover:text-[#FFCA28] hover:border-[#FFCA28]/40 hover:shadow-[0_0_20px_rgba(255,202,40,0.3)]' },
  { name: 'Docker', icon: 'docker', color: 'hover:text-[#2496ED] hover:border-[#2496ED]/40 hover:shadow-[0_0_20px_rgba(36,150,237,0.3)]' },
  { name: 'Vercel', icon: 'vercel', color: 'hover:text-white hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]' },
  { name: 'TypeScript', icon: 'typescript', color: 'hover:text-[#3178C6] hover:border-[#3178C6]/40 hover:shadow-[0_0_20px_rgba(49,120,198,0.3)]' },
  { name: 'Next.js', icon: 'nextdotjs', color: 'hover:text-white hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]' },
  { name: 'React', icon: 'react', color: 'hover:text-[#61DAFB] hover:border-[#61DAFB]/40 hover:shadow-[0_0_20px_rgba(97,218,251,0.3)]' },
  { name: 'FastAPI', icon: 'fastapi', color: 'hover:text-[#009688] hover:border-[#009688]/40 hover:shadow-[0_0_20px_rgba(0,150,136,0.3)]' },
  { name: 'Node.js', icon: 'nodedotjs', color: 'hover:text-[#5FA04E] hover:border-[#5FA04E]/40 hover:shadow-[0_0_20px_rgba(95,160,78,0.3)]' },
  { name: 'PostgreSQL', icon: 'postgresql', color: 'hover:text-[#4169E1] hover:border-[#4169E1]/40 hover:shadow-[0_0_20px_rgba(65,105,225,0.3)]' },
];
