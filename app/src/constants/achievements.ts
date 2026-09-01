import { Trophy, Sparkles, Award, Flame, CheckCircle2, Cpu, Cloud, Shield } from 'lucide-react';

export interface AchievementStat {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  type?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgFilter: string;
}

export const HACKATHON_STATS: AchievementStat[] = [
  { label: '2 National Wins · 8+ Competitions', value: 10, suffix: '+', icon: Trophy, color: 'text-blue-400', bgFilter: 'bg-blue-500' },
  { label: 'Prize Money Won', value: 275000, prefix: '₹', suffix: '+', type: 'currency', icon: Sparkles, color: 'text-emerald-400', bgFilter: 'bg-emerald-500' },
  { label: '2× NATIONAL WINNER', value: 2, icon: Award, color: 'text-purple-400', bgFilter: 'bg-purple-500' },
  { label: 'META PYTORCH HACKATHON | GRAND FINALE', value: 52000, type: 'shortK', suffix: '+', icon: Flame, color: 'text-red-400', bgFilter: 'bg-red-500' },
  { label: 'Certifications (AI, Cloud, Security)', value: 35, suffix: '+', icon: CheckCircle2, color: 'text-cyan-400', bgFilter: 'bg-cyan-500' },
];

export interface MajorAward {
  borderColor: string;
  glowColor: string;
  bgColor: string;
  iconColor: string;
  shadowColor: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  title: string;
  badge: string;
  badgeColor: string;
  desc: string;
}

export const MAJOR_AWARDS: MajorAward[] = [
  {
    borderColor: 'border-blue-500/30 hover:border-blue-400',
    glowColor: 'rgba(59,130,246,0.15)',
    bgColor: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
    shadowColor: 'rgba(59,130,246,0.2)',
    icon: Trophy,
    image: 'url(/images/ai-exchange.png)',
    title: 'Google Gen AI Exchange',
    badge: 'NATIONAL WINNER',
    badgeColor: 'text-blue-400 border-blue-400/30',
    desc: 'Built an AI-driven clinical orchestration system. Selected among top teams nationwide for innovation, robust technical architecture, and real-world applicability.',
  },
  {
    borderColor: 'border-cyan-500/30 hover:border-cyan-400',
    glowColor: 'rgba(6,182,212,0.15)',
    bgColor: 'bg-cyan-500/10',
    iconColor: 'text-cyan-400',
    shadowColor: 'rgba(6,182,212,0.2)',
    icon: Award,
    image: 'url(/images/inferential.png)',
    title: 'Inferentia 2.0',
    badge: '🥇 1st Place',
    badgeColor: 'text-cyan-400 border-cyan-400/30',
    desc: 'Developed a high-performance system under intense time pressure. Praised for clean system design, scalability, and seamless integration capabilities.',
  },
];

export interface Certification {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  border: string;
  title: string;
  desc: string;
  badge: string;
  badgeColor: string;
}

export const CERTIFICATIONS: Certification[] = [
  { icon: Cpu, color: 'text-emerald-400', border: 'hover:border-emerald-500/30', title: 'AI Systems & MLOps', desc: 'Gen AI Academy 2.0 (Google APAC), Gemini Certified Educator, Agentic AI Day', badge: 'Google & GDG', badgeColor: 'text-emerald-400 border-emerald-400/20' },
  { icon: Cloud, color: 'text-cyan-400', border: 'hover:border-cyan-500/30', title: 'Cloud & Data Architecture', desc: 'Document AI & Sensitive Data, Advanced Cloud Storage Implementations', badge: 'Google Cloud', badgeColor: 'text-cyan-400 border-cyan-400/20' },
  { icon: Shield, color: 'text-green-400', border: 'hover:border-green-500/30', title: 'GPU-Accelerated AI & Ethics', desc: 'NVIDIA Cloud & Community, GitHub Responsible AI & Copilot', badge: 'NVIDIA & GitHub', badgeColor: 'text-green-400 border-green-400/20' },
];
