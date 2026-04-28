import type { Metadata, Viewport } from 'next';
import { wedding } from './lib/content';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from './lib/site';
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/animations.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: '%s — Hesham & Nada',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'Hesham & Nada wedding',
    'save the date',
    'Panorama October Garden',
    'Cairo wedding 2026',
    'June 12 2026 wedding',
    'Egypt wedding',
  ],
  authors: [{ name: 'Hesham & Nada' }],
  creator: 'Hesham & Nada',
  publisher: 'Hesham & Nada',
  formatDetection: { telephone: false, address: false, email: false },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: 'Friday, June 12, 2026 — Panorama October Garden, Cairo',
    locale: 'en_US',
    images: [
      {
        url: '/photos/Hesham-Nada.jpg',
        width: 1240,
        height: 1748,
        alt: 'Save the Date — Hesham & Nada, June 12, 2026, Panorama October Garden',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: 'Friday, June 12, 2026 — Panorama October Garden, Cairo',
    images: ['/photos/Hesham-Nada.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'event',
};

export const viewport: Viewport = {
  themeColor: '#bfa14a',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

const eventLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'The Wedding of Hesham & Nada',
  description: SITE_DESCRIPTION,
  startDate: wedding.startISO,
  endDate: '2026-06-13T01:00:00+02:00',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  image: [`${SITE_URL}/photos/Hesham-Nada.jpg`],
  location: {
    '@type': 'Place',
    name: wedding.venueName,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Panorama October Garden',
      addressLocality: 'Nasr City',
      addressRegion: 'Cairo',
      addressCountry: 'EG',
    },
    hasMap: wedding.mapLink,
  },
  organizer: {
    '@type': 'Person',
    name: 'Hesham & Nada',
    url: SITE_URL,
  },
  url: SITE_URL,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Google Fonts — Phase 3 will swap this for self-hosted next/font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:wght@400;500;600;700&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventLd) }}
        />
        {children}
      </body>
    </html>
  );
}
