'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { schedule } from '../lib/content';
import SectionTitle from './SectionTitle';

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
            <span className="s-time">{e.time}</span>
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
