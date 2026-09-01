export type BlogCategory =
  | 'All'
  | 'Multi-Agent AI'
  | 'Edge & On-Device AI'
  | 'Healthcare AI'
  | 'AgriTech AI'
  | 'System Architecture'
  | 'Hackathons & Career';

export interface AuthorInfo {
  name: string;
  role: string;
  avatar: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
}

export interface BlogPostData {
  slug: string;
  path: string;
  title: string;
  description: string;
  date: string;
  displayDate: string;
  readTime: string;
  category: Exclude<BlogCategory, 'All'>;
  featured?: boolean;
  spotlight?: boolean;
  gradientTheme: 'cyan' | 'purple' | 'emerald' | 'amber' | 'blue';
  keywords: string[];
  author: AuthorInfo;
  content: string;
}
