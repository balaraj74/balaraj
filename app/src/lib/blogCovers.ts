import type { BlogPostData } from '@/types/blog';

const SLUG_COVERS: Array<[string, string]> = [
  ['darwin', 'darwin'],
  ['agrisence', 'agrisence'],
  ['vaidyaos', 'vaidyaos'],
  ['taskforze', 'taskforze'],
  ['pashu', 'vaidyaos'],
  ['aatonovaz', 'omnisence'],
  ['gguf', 'cybershield'],
  ['journey', 'careerlens'],
  ['edge-ai-healthcare', 'healthmesh'],
];

const CATEGORY_COVERS: Record<BlogPostData['category'], string> = {
  'Multi-Agent AI': 'taskforze',
  'Edge & On-Device AI': 'vaidyaos',
  'Healthcare AI': 'healthmesh',
  'AgriTech AI': 'agrisence',
  'System Architecture': 'cybershield',
  'Hackathons & Career': 'careerlens',
};

/** Posts have no artwork of their own, so each borrows its closest project's. */
export function blogCover(post: { slug?: string; path?: string; category?: string }) {
  const slug = post.slug ?? post.path ?? '';
  const match = SLUG_COVERS.find(([key]) => slug.includes(key))?.[1];
  const name = match ?? CATEGORY_COVERS[post.category as BlogPostData['category']] ?? 'cybershield';
  return `/projects/new/${name}.png`;
}
