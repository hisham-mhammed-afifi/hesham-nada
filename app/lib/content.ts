/**
 * Single source of truth for site copy. Edit here and the whole page updates.
 */

export interface StoryMilestone {
  date: string;
  title: string;
  body: string;
}

export interface ScheduleEvent {
  time: string;
  name: string;
  note?: string;
}

export interface GalleryPhoto {
  src: string;
  alt: string;
  caption?: string;
}

export const wedding = {
  // Cairo time (UTC+2 year-round, no DST since 2014)
  startISO: '2026-06-12T19:00:00+02:00',
  // Used by countdown.ts — UTC ms equivalent
  targetUtcMs: Date.UTC(2026, 5, 12, 17, 0, 0),

  dayLabel: 'FRI',
  monthLabel: 'JUNE',
  dayNum: 12,
  year: 2026,

  venueName: 'Panorama October Garden',
  venueAddress: 'Nasr City, Cairo, Egypt',
  mapEmbedSrc:
    'https://www.google.com/maps?q=Panorama+October+Garden,+Nasr+City,+Cairo,+Egypt&output=embed',
  mapLink: 'https://maps.app.goo.gl/ouJeVbbNs5bKFZgY6',

  hashtag: '#HeshamWedsNada',
  rsvpDeadline: 'May 15, 2026',
} as const;

export const story: StoryMilestone[] = [
  {
    date: 'March 2022',
    title: 'Where it began',
    body: 'We met through a mutual friend at a small gathering in Cairo.',
  },
  {
    date: 'August 2023',
    title: 'Our first trip',
    body: 'A long weekend on the North Coast that felt much, much longer.',
  },
  {
    date: 'December 2024',
    title: 'The proposal',
    body: 'On a quiet evening, surrounded by family and a few well-kept secrets.',
  },
  {
    date: 'June 2026',
    title: 'Forever begins',
    body: "And we'd love for you to be there with us.",
  },
];

export const schedule: ScheduleEvent[] = [
  { time: '6:00 PM', name: 'Reception', note: 'Welcome drinks in the garden' },
  { time: '7:00 PM', name: 'Ceremony', note: 'Please be seated by 6:45 PM' },
  { time: '9:00 PM', name: 'Dinner', note: 'Seated dinner under the lights' },
  { time: '10:30 PM', name: 'Dancing', note: 'Until late' },
];

export const gallery: GalleryPhoto[] = [
  { src: '/photos/01.jpg', alt: 'Memory 1', caption: 'where it began' },
  { src: '/photos/02.jpg', alt: 'Memory 2' },
  { src: '/photos/03.jpg', alt: 'Memory 3', caption: 'long weekends, longer drives' },
  { src: '/photos/04.jpg', alt: 'Memory 4' },
  { src: '/photos/05.jpg', alt: 'Memory 5', caption: 'engagement night' },
  { src: '/photos/06.jpg', alt: 'Memory 6' },
  { src: '/photos/07.jpg', alt: 'Memory 7', caption: 'somewhere in between' },
  { src: '/photos/08.jpg', alt: 'Memory 8' },
];
