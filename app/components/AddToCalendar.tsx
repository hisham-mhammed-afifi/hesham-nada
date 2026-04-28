'use client';

import { wedding } from '../lib/content';
import { buildIcs, downloadIcs } from '../lib/ics';

export default function AddToCalendar() {
  const handleClick = () => {
    const ics = buildIcs({
      uid: 'hesham-nada-wedding-2026-06-12@hesham-nada',
      title: 'Hesham & Nada Wedding',
      description: `Join us as we celebrate. ${wedding.hashtag}`,
      location: `${wedding.venueName}, ${wedding.venueAddress}`,
      startISO: wedding.startISO, // 2026-06-12T19:00:00+02:00
      endISO: '2026-06-13T01:00:00+02:00', // ~6 hours
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    });
    downloadIcs('hesham-nada-wedding.ics', ics);
  };

  return (
    <button
      type="button"
      className="btn btn--ghost btn--small add-to-calendar"
      onClick={handleClick}
      aria-label="Download calendar event for Hesham and Nada's wedding"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <rect x="2" y="3" width="12" height="11" rx="1.5" />
        <line x1="2" y1="6" x2="14" y2="6" />
        <line x1="5.5" y1="1.5" x2="5.5" y2="4.5" />
        <line x1="10.5" y1="1.5" x2="10.5" y2="4.5" />
      </svg>
      <span>Add to Calendar</span>
    </button>
  );
}
