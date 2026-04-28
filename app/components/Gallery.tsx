'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { gallery } from '../lib/content';
import SectionTitle from './SectionTitle';

export default function Gallery() {
  const reduce = useReducedMotion();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const isOpen = openIdx !== null;

  const close = () => setOpenIdx(null);
  const next = () =>
    setOpenIdx((i) => (i === null ? null : (i + 1) % gallery.length));
  const prev = () =>
    setOpenIdx((i) =>
      i === null ? null : (i - 1 + gallery.length) % gallery.length,
    );

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const itemAnim = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-10%' },
          transition: { duration: 0.5, delay: (i % 4) * 0.06, ease: 'easeOut' as const },
        };

  return (
    <section id="gallery" className="section gallery">
      <SectionTitle lede="A few of our favourite memories.">Gallery</SectionTitle>

      <div className="gallery-grid gallery-grid--masonry">
        {gallery.map((photo, i) => (
          <motion.button
            key={photo.src}
            className="gallery-item"
            type="button"
            onClick={() => setOpenIdx(i)}
            aria-label={`Open ${photo.alt}`}
            {...itemAnim(i)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.src} alt={photo.alt} loading="lazy" />
            {photo.caption && (
              <span className="gallery-caption">{photo.caption}</span>
            )}
          </motion.button>
        ))}
      </div>

      {isOpen && openIdx !== null && (
        <div
          className="lightbox"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={gallery[openIdx].src} alt={gallery[openIdx].alt} />
          <button
            type="button"
            className="lb-close"
            aria-label="Close"
            onClick={close}
          >
            ×
          </button>
          <button
            type="button"
            className="lb-prev"
            aria-label="Previous"
            onClick={prev}
          >
            ‹
          </button>
          <button
            type="button"
            className="lb-next"
            aria-label="Next"
            onClick={next}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
