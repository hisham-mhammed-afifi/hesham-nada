'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { wedding } from '../lib/content';
import AddToCalendar from './AddToCalendar';

export default function Hero() {
  const reduce = useReducedMotion();
  const [showCouple, setShowCouple] = useState(true);

  // Sequenced fade-up. delay = 0.2 + i * 0.15s
  const seq = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.6,
            ease: [0.2, 0.7, 0.2, 1] as [number, number, number, number],
            delay: 0.2 + i * 0.15,
          },
        };

  return (
    <section id="hero" className="hero">
      <div className="hero-card">
        {showCouple && (
          <div className="hero-couple" aria-hidden="true">
            {/* Optional couple photo — drop public/couple.jpg to enable. Falls back gracefully. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/couple.jpg"
              alt=""
              onError={() => setShowCouple(false)}
            />
          </div>
        )}

        <motion.div className="hero-rings" aria-hidden="true" {...seq(0)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/rings.svg" alt="" />
        </motion.div>

        <motion.h1 className="hero-headline" {...seq(1)}>
          Save the Date
        </motion.h1>

        <motion.p className="hero-eyebrow" {...seq(2)}>
          FOR THE WEDDING OF
        </motion.p>

        <motion.h2 className="hero-names" {...seq(3)}>
          Hesham <span className="hero-names__amp">&amp;</span> Nada
        </motion.h2>

        <motion.div
          className="hero-date"
          aria-label="Friday June 12 2026"
          {...seq(4)}
        >
          <span className="hero-date__day">{wedding.dayLabel}</span>
          <span className="hero-date__sep" />
          <span className="hero-date__month">
            <span className="hero-date__month-name">{wedding.monthLabel}</span>
            <span className="hero-date__day-num">{wedding.dayNum}</span>
          </span>
          <span className="hero-date__sep" />
          <span className="hero-date__year">{wedding.year}</span>
        </motion.div>

        <motion.p className="hero-venue" {...seq(5)}>
          {wedding.venueName}
        </motion.p>

        <motion.div {...seq(6)}>
          <AddToCalendar />
        </motion.div>
      </div>
    </section>
  );
}
