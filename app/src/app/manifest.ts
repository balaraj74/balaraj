import type { MetadataRoute } from 'next';
import { OWNER_NAME, SITE_NAME, staticSeo } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: OWNER_NAME,
    description: staticSeo.home.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#0c0a09',
    theme_color: '#0c0a09',
    icons: [{ src: '/icon.png', sizes: 'any', type: 'image/png' }],
  };
}
