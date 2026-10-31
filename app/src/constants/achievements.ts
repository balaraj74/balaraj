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
  { label: '2 National Wins · 8+ Competitions', value: 10, suffix: '+', icon: Trophy, color: 'text-brand-600 dark:text-brand-400', bgFilter: 'bg-brand-500' },
  { label: 'Prize Money Won', value: 275000, prefix: '₹', suffix: '+', type: 'currency', icon: Sparkles, color: 'text-gold-700 dark:text-gold-400', bgFilter: 'bg-gold-500' },
  { label: '2× NATIONAL WINNER', value: 2, icon: Award, color: 'text-brand-600 dark:text-brand-400', bgFilter: 'bg-brand-500' },
  { label: 'META PYTORCH HACKATHON | GRAND FINALE', value: 52000, type: 'shortK', suffix: '+', icon: Flame, color: 'text-gold-700 dark:text-gold-400', bgFilter: 'bg-gold-500' },
  { label: 'Certifications (AI, Cloud, Security)', value: 25, suffix: '+', icon: CheckCircle2, color: 'text-brand-600 dark:text-brand-400', bgFilter: 'bg-brand-500' },
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
    borderColor: 'border-ember-500/30 hover:border-ember-400',
    glowColor: 'rgba(245, 158, 11,0.15)',
    bgColor: 'bg-ember-500/10',
    iconColor: 'text-ember-400',
    shadowColor: 'rgba(245, 158, 11,0.2)',
    icon: Trophy,
    image: '/projects/new/careerlens.png',
    title: 'Google Gen AI Exchange',
    badge: 'NATIONAL WINNER',
    badgeColor: 'text-ember-400 border-ember-400/30',
    desc: 'Built CareerLens, a personalized AI career and skills advisor. Selected as a national winner for innovation, robust technical architecture, and real-world applicability.',
  },
  {
    borderColor: 'border-brand-500/30 hover:border-brand-400',
    glowColor: 'rgba(247, 102, 22,0.15)',
    bgColor: 'bg-brand-500/10',
    iconColor: 'text-brand-400',
    shadowColor: 'rgba(247, 102, 22,0.2)',
    icon: Award,
    image: '/projects/new/agrisence.png',
    title: 'Inferentia 2.0',
    badge: '1st Place',
    badgeColor: 'text-brand-400 border-brand-400/30',
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
  { icon: Cloud, color: 'text-brand-400', border: 'hover:border-brand-500/30', title: 'Cloud & Data Architecture', desc: 'Document AI & Sensitive Data, Advanced Cloud Storage Implementations', badge: 'Google Cloud', badgeColor: 'text-brand-400 border-brand-400/20' },
  { icon: Shield, color: 'text-green-400', border: 'hover:border-green-500/30', title: 'GPU-Accelerated AI & Ethics', desc: 'NVIDIA Cloud & Community, GitHub Responsible AI & Copilot', badge: 'NVIDIA & GitHub', badgeColor: 'text-green-400 border-green-400/20' },
];
