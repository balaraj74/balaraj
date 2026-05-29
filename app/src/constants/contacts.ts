import { Mail, Linkedin, Github, Twitter, Database, Brain, Code2, Award, Instagram } from 'lucide-react';

export interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
  subtext: string;
}

export const CONTACT_LINKS: ContactInfo[] = [
  { icon: Mail, label: 'Email', value: 'balarajr483@gmail.com', href: 'mailto:balarajr483@gmail.com', subtext: 'Within 24 hrs' },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/balaraj-r-209a67330', href: 'https://www.linkedin.com/in/balaraj-r-209a67330/', subtext: 'Experience' },
  { icon: Github, label: 'GitHub', value: 'github.com/balaraj74', href: 'https://github.com/balaraj74', subtext: 'Code & PRs' },
  { icon: Twitter, label: 'X (Twitter)', value: 'x.com/Balaraj__r', href: 'https://x.com/Balaraj__r', subtext: 'Tech Updates' },
  { icon: Database, label: 'Kaggle', value: 'kaggle.com/balarajr', href: 'https://www.kaggle.com/balarajr', subtext: 'Data Science' },
  { icon: Brain, label: 'Hugging Face', value: 'huggingface.co/balarajr', href: 'https://huggingface.co/balarajr', subtext: 'AI Models' },
  { icon: Code2, label: 'Google Dev', value: 'g.dev/balarajr', href: 'https://g.dev/balarajr', subtext: 'Dev Profile' },
  { icon: Award, label: 'Google Skills', value: 'skills.google', href: 'https://www.skills.google/public_profiles/7e29917e-8bd6-41e6-8149-0795ae63c97b', subtext: 'Certifications' },
  { icon: Instagram, label: 'Instagram', value: 'instagram.com/balaraj.__r', href: 'https://www.instagram.com/balaraj.__r/', subtext: 'Personal' },
];
