'use client';

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  delay?: number;
  /** Distance in px to translate from below */
  distance?: number;
}

/**
 * Wraps content in an IntersectionObserver fade-up. Animates once.
 * Disabled (no animation, instant render) under prefers-reduced-motion.
 */
export default function Reveal({
  children,
  delay = 0,
  distance = 16,
  ...rest
}: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div {...(rest as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
