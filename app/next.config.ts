import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 90],
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
        ],
      },
      {
        source: '/icons/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/((?!api).*)',
        has: [
          {
            type: 'host',
            value: 'www.balaraj.me',
          },
        ],
        destination: 'https://balaraj.me/:path*',
        permanent: true,
      },
      {
        source: '/((?!api).*)',
        has: [
          {
            type: 'host',
            value: 'balaraj.vercel.app',
          },
        ],
        destination: 'https://balaraj.me/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
