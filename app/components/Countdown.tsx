'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { wedding } from '../lib/content';
import SectionTitle from './SectionTitle';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  ended: boolean;
}

function computeTimeLeft(target: number): TimeLeft {
  const diff = target - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
  }
  const sec = Math.floor(diff / 1000);
  return {
    days: Math.floor(sec / 86400),
    hours: Math.floor((sec % 86400) / 3600),
    minutes: Math.floor((sec % 3600) / 60),
    seconds: sec % 60,
    ended: false,
  };
}

const pad = (n: number) => String(Math.max(0, n)).padStart(2, '0');

export default function Countdown() {
  const reduce = useReducedMotion();
  const [t, setT] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setT(computeTimeLeft(wedding.targetUtcMs));
    let timer: ReturnType<typeof setInterval> | null = null;

    const start = () => {
      if (timer) return;
      timer = setInterval(
        () => setT(computeTimeLeft(wedding.targetUtcMs)),
        1000,
      );
    };
    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };
    const onVis = () => (document.hidden ? stop() : start());

    start();
    document.addEventListener('visibilitychange', onVis);
    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  const cellAnim = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-15%' },
          transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' as const },
        };

  return (
    <section id="countdown" className="section countdown">
      <SectionTitle>Counting down to the big day</SectionTitle>

      <div className="countdown-grid">
        {t?.ended ? (
          <p
            className="countdown-ended"
            style={{
              gridColumn: '1/-1',
              fontSize: '1.25rem',
              color: 'var(--gold-dark)',
            }}
          >
            We&apos;re married! Thank you for being part of our story.
          </p>
        ) : (
          (
            [
              { label: 'Days', value: t ? pad(t.days) : '--' },
              { label: 'Hours', value: t ? pad(t.hours) : '--' },
              { label: 'Minutes', value: t ? pad(t.minutes) : '--' },
              { label: 'Seconds', value: t ? pad(t.seconds) : '--' },
            ] as const
          ).map((c, i) => (
            <motion.div key={c.label} className="countdown-cell" {...cellAnim(i)}>
              <span className="countdown-num">{c.value}</span>
              <span className="countdown-label">{c.label}</span>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
}
