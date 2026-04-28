'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { schedule } from '../lib/content';
import SectionTitle from './SectionTitle';

function toIsoDateTime(timeLabel: string): string {
  const match = timeLabel.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return '2026-06-12';
  const [, hStr, mStr, mer] = match;
  let hour = Number(hStr) % 12;
  if (mer.toUpperCase() === 'PM') hour += 12;
  return `2026-06-12T${String(hour).padStart(2, '0')}:${mStr}:00+02:00`;
}

export default function Schedule() {
  const reduce = useReducedMotion();

  const item = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-15%' },
          transition: { duration: 0.55, delay: i * 0.08, ease: 'easeOut' as const },
        };

  return (
    <section id="schedule" className="section schedule">
      <SectionTitle lede="Friday, June 12, 2026">The Day</SectionTitle>

      <ol className="schedule-list">
        {schedule.map((e, i) => (
          <motion.li key={e.name} {...item(i)}>
            <time className="s-time" dateTime={toIsoDateTime(e.time)}>
              {e.time}
            </time>
            <span>
              <span className="s-name">{e.name}</span>
              {e.note && <span className="s-note">{e.note}</span>}
            </span>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
