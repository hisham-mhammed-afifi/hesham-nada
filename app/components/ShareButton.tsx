'use client';

import { wedding } from '../lib/content';

export default function ShareButton() {
  const handleClick = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const text = `Save the date for Hesham & Nada — June 12, 2026 at ${wedding.venueName}. ${wedding.hashtag}`;
    const shareData = { title: 'Hesham & Nada Wedding', text, url };

    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // user cancelled — fall through to WhatsApp deep link
      }
    }

    const waUrl = `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;
    window.open(waUrl, '_blank', 'noopener');
  };

  return (
    <button
      type="button"
      className="btn btn--ghost btn--small share-btn"
      onClick={handleClick}
      aria-label="Share the wedding invitation via WhatsApp"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 16 16"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M8 1C4.13 1 1 4.13 1 8c0 1.39.41 2.68 1.11 3.77L1 15l3.32-1.07C5.4 14.61 6.66 15 8 15c3.87 0 7-3.13 7-7s-3.13-7-7-7zm3.65 9.74c-.16.45-.93.86-1.29.91-.33.05-.75.07-1.21-.08-.28-.09-.64-.21-1.1-.41-1.94-.84-3.21-2.79-3.31-2.92-.1-.13-.79-1.05-.79-2 0-.95.5-1.42.68-1.61.18-.19.39-.24.52-.24.13 0 .26 0 .37.01.12 0 .28-.05.44.34.16.39.55 1.34.6 1.43.05.1.08.21.02.34-.06.13-.09.21-.18.32-.09.11-.19.24-.27.32-.09.09-.18.18-.08.36.1.18.45.74.97 1.2.66.59 1.22.78 1.4.87.18.09.29.07.39-.04.1-.11.45-.52.57-.7.12-.18.24-.15.41-.09.17.06 1.07.5 1.25.59.18.09.31.14.35.21.04.07.04.43-.12.88z"/>
      </svg>
      <span>Share</span>
    </button>
  );
}
