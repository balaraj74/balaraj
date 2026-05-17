import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://balaraj.vercel.app';
  const lastModified = new Date();

  const staticRoutes = [
    '',
    '/about',
    '/projects',
    '/blogs',
    '/contact'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const dynamicProjectRoutes = [
    '/projects/vaidyaos',
    '/projects/agrisence',
    '/projects/career-lens'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const dynamicBlogRoutes = [
    '/blogs/edge-ai-healthcare',
    '/blogs/event-driven-microservices-ai'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...dynamicProjectRoutes, ...dynamicBlogRoutes];
}
