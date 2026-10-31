import { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/constants/blogs';
import { absoluteUrl, blogPosts, projectSeo } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = new Map<string, { path: string; date: string }>();
  for (const post of [...Object.values(blogPosts), ...BLOG_POSTS]) posts.set(post.path, post);

  const latestPost = new Date(Math.max(...[...posts.values()].map((post) => new Date(post.date).getTime())));

  return [
    { url: absoluteUrl('/'), lastModified: latestPost, priority: 1 },
    { url: absoluteUrl('/about'), priority: 0.8 },
    { url: absoluteUrl('/projects'), priority: 0.9 },
    { url: absoluteUrl('/blogs'), lastModified: latestPost, priority: 0.8 },
    { url: absoluteUrl('/contact'), priority: 0.6 },
    ...Object.values(projectSeo).map((project) => ({
      url: absoluteUrl(project.path),
      images: [absoluteUrl(project.image)],
      priority: 0.85,
    })),
    ...[...posts.values()].map((post) => ({
      url: absoluteUrl(post.path),
      lastModified: new Date(post.date),
      priority: 0.8,
    })),
  ];
}
