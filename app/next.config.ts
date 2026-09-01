import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
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
