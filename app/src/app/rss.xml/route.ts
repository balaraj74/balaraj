import { NextResponse } from 'next/server';
import { BLOG_POSTS, BLOG_AUTHOR } from '@/constants/blogs';
import { SITE_URL } from '@/lib/seo';

export const revalidate = 3600; // Cache for 1 hour

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const itemsXml = BLOG_POSTS.map((post) => {
    const postUrl = `${SITE_URL}/blogs/${post.slug}`;
    const pubDate = new Date(post.date).toUTCString();

    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>${BLOG_AUTHOR.name}</author>
      <category>${escapeXml(post.category)}</category>
    </item>
    `;
  }).join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Balaraj R | Engineering Blog</title>
    <link>${SITE_URL}/blogs</link>
    <description>Technical articles on Multi-Agent Systems, Edge AI, Offline-First Medical AI, and Production Cloud Infrastructure by Balaraj R.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssFeed.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=18000',
    },
  });
}
