'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { story } from '../lib/content';
import SectionTitle from './SectionTitle';

export default function Story() {
  const reduce = useReducedMotion();

  const item = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-15%' },
          transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const },
        };

  return (
    <section id="story" className="section story">
      <SectionTitle lede="A few moments along the way.">Our Story</SectionTitle>

      <ol className="timeline">
        {story.map((m, i) => (
          <motion.li key={m.title} {...item(i)}>
            <div className="t-date">{m.date}</div>
            <h3 className="t-title">{m.title}</h3>
            <p className="t-body">{m.body}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
