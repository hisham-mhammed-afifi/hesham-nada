import type { MetadataRoute } from 'next';
import { SITE_NAME, SITE_DESCRIPTION } from './lib/site';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: 'Hesham & Nada',
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#f4e4e1',
    theme_color: '#bfa14a',
    icons: [
      { src: '/icon', sizes: '256x256', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
