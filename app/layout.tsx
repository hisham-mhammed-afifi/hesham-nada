import type { Metadata } from 'next';
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/animations.css';

export const metadata: Metadata = {
  title: 'Hesham & Nada — Save the Date',
  description:
    'Join us as we celebrate our wedding on June 12, 2026 at Panorama October Garden.',
  openGraph: {
    title: 'Hesham & Nada — Save the Date',
    description: 'Friday, June 12, 2026 — Panorama October Garden',
    images: ['/og-cover.jpg'],
    type: 'website',
  },
  icons: { icon: '/favicon.ico' },
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
        {children}
      </body>
    </html>
  );
}
