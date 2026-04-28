'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Fixed page-wide backdrop: blush color + four floral corners.
 * Adds a subtle parallax: as the user scrolls, the floral frame drifts ~12px.
 * Disabled under prefers-reduced-motion (renders static).
 */
export default function PageBackground() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1500], [0, -12]);

  if (reduce) {
    return (
      <div className="page-bg" aria-hidden="true">
        <div className="corner corner--tl" />
        <div className="corner corner--tr" />
        <div className="corner corner--bl" />
        <div className="corner corner--br" />
      </div>
    );
  }

  return (
    <motion.div className="page-bg" aria-hidden="true" style={{ y }}>
      <div className="corner corner--tl" />
      <div className="corner corner--tr" />
      <div className="corner corner--bl" />
      <div className="corner corner--br" />
    </motion.div>
  );
}
