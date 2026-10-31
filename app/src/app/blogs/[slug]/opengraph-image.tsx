import { BLOG_POSTS } from '@/constants/blogs';
import { OG_SIZE, ogImage } from '@/lib/og';
import { blogPosts } from '@/lib/seo';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Balaraj R engineering blog article';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug) ?? blogPosts[slug as keyof typeof blogPosts];
  return ogImage({ eyebrow: 'Engineering Blog', title: post?.title ?? 'Engineering Blog' });
}
