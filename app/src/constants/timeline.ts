import { Activity, Flame, Server, Cpu, GitBranch, Globe } from 'lucide-react';

export interface TimelineItem {
  category: string;
  type: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  org: string;
  period: string;
  color: string;
  blobColor: string;
  glowColor: string;
  points: string[];
  impact: string[];
}

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    category: 'Flagship Project',
    type: 'AI Platform Architecture',
    icon: Activity,
    title: 'Darwin Engineering & Architecture',
    org: 'Independent AI Venture',
    period: 'MAY 5, 2026 – Present',
    color: 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400',
    blobColor: 'bg-cyan-500',
    glowColor: 'rgba(6,182,212,0.15)',
    points: [
      'Architected a multi-agent AI debate engine enforcing hard constraints to build actionable execution blueprints.',
      'Designed a sophisticated 3-round evaluation system with autonomous agents evaluating market intelligence and strategic viability.',
    ],
    impact: ['MULTI-AGENT AI', 'VERTEX AI', 'FASTAPI'],
  },
  {
    category: 'Flagship Project',
    type: 'Architecture & AI',
    icon: Activity,
    title: 'VaidyaOS Engineering & Deployment',
    org: 'Independent AI Healthcare Initiative',
    period: 'MAY 2026 – Present',
    color: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400',
    blobColor: 'bg-emerald-500',
    glowColor: 'rgba(16,185,129,0.15)',
    points: [
      'Architected and engineered a comprehensive, privacy-first healthcare AI platform running directly on-device using quantized GGUF models.',
      'Developed full offline medical intelligence capabilities alongside cloud-synced fallback APIs, ensuring zero-latency, highly available clinical insights.',
    ],
    impact: ['ON-DEVICE AI', 'OFFLINE-FIRST', 'Llama.cpp'],
  },
  {
    category: 'Hackathon',
    type: 'Competition',
    icon: Flame,
    title: 'Meta PyTorch OpenEnv Grand Finale',
    org: 'Meta',
    period: 'APR 2026',
    color: 'border-red-500/50 bg-red-500/10 text-red-400',
    blobColor: 'bg-red-500',
    glowColor: 'rgba(239,68,68,0.15)',
    points: [
      'Cleared Round 1 from 52,000+ registered developers.',
      'Selected for the Grand Finale in Bangalore — one of the most competitive ML hackathons globally.',
    ],
    impact: ['ARCHITECTURE', 'ML SYSTEMS'],
  },
  {
    category: 'Scale',
    type: 'System Architecture',
    icon: Server,
    title: 'Event-Driven Microservices Engine',
    org: 'CareerLens & HealthMesh Core',
    period: '2024 – 2025',
    color: 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400',
    blobColor: 'bg-cyan-600',
    glowColor: 'rgba(6,182,212,0.15)',
    points: [
      'Designed and scaled an event-driven microservices architecture powering production AI platforms.',
      'Built parallel processing pipelines for vector embeddings and background workers, enabling reliable, low-latency operations across 32 independent services.',
    ],
    impact: ['Scaled to 32 microservices', 'Reduced processing latency', 'Enabled real-time AI workflows'],
  },
  {
    category: 'Architecture',
    type: 'R&D',
    icon: Cpu,
    title: 'Multi-Agent Supervisor Framework',
    org: 'TaskForze System',
    period: 'Q4 2024',
    color: 'border-amber-500/50 bg-amber-500/10 text-amber-400',
    blobColor: 'bg-amber-600',
    glowColor: 'rgba(245,158,11,0.15)',
    points: [
      'Built a multi-agent orchestration framework with supervisor nodes to coordinate task execution across specialized agents.',
      'Implemented failover mechanisms and real-time escalation workflows using external APIs, ensuring reliability under SLA constraints.',
    ],
    impact: ['5 specialized agents coordinated', 'Zero-downtime failover triggers', 'Automated WhatsApp/Call escalation'],
  },
  {
    category: 'Systems',
    type: 'Open Source',
    icon: GitBranch,
    title: 'Core Library Contributor',
    org: 'Ubuntu, Pandas & NumPy',
    period: 'Jan 2024 – Present',
    color: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400',
    blobColor: 'bg-emerald-600',
    glowColor: 'rgba(16,185,129,0.15)',
    points: [
      'Contributed to performance optimizations and bug fixes across Python data ecosystem libraries (Ubuntu, Pandas, NumPy).',
      'Resolved complex issues and improved system efficiency, earning multiple GitHub Pull Shark badges (22+ PRs merged).',
    ],
    impact: ['22+ PRs successfully merged', 'Performance bottlenecks resolved', 'Strengthened major OSS pipelines'],
  },
  {
    category: 'Foundation',
    type: 'Education',
    icon: Globe,
    title: 'B.Tech CSE (AI & ML)',
    org: 'PES University, Bengaluru',
    period: 'Aug 2024 – 2028',
    color: 'border-blue-500/50 bg-blue-500/10 text-blue-400',
    blobColor: 'bg-blue-600',
    glowColor: 'rgba(59,130,246,0.15)',
    points: [
      'Focused on systems-level thinking including operating systems, networking, and low-level architecture (RISC-V, TCP/IP).',
      'Actively engaged in developer communities (GDG, NVIDIA Cloud) and technical speaking.',
    ],
    impact: ['Deep architectural fundamentals', 'Systematic problem solving', 'Community technical leadership'],
  },
];
