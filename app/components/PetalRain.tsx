'use client';

import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  active: boolean;
  onDone: () => void;
}

const PETAL_COUNT = 32;
const TOTAL_MS = 4500;

interface PetalSpec {
  left: number;
  delay: number;
  dur: number;
  rotate: number;
  xDrift: number;
  size: number;
}

/**
 * Renders a portal-mounted full-viewport overlay of falling petals.
 * Auto-unmounts via onDone after the longest animation completes.
 * Disabled under prefers-reduced-motion (the .petal element hides via CSS).
 */
export default function PetalRain({ active, onDone }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(onDone, TOTAL_MS);
    return () => clearTimeout(t);
  }, [active, onDone]);

  // Re-randomise petals on each activation
  const petals = useMemo<PetalSpec[]>(() => {
    if (!active) return [];
    return Array.from({ length: PETAL_COUNT }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 1.2,
      dur: 2.4 + Math.random() * 1.6,
      rotate: Math.random() * 360,
      xDrift: (Math.random() - 0.5) * 220,
      size: 10 + Math.random() * 10,
    }));
  }, [active]);

  if (!active || !mounted) return null;

  const node = (
    <div className="petal-rain" aria-hidden="true">
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={
            {
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size * 1.3}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.dur}s`,
              ['--rotate' as string]: `${p.rotate}deg`,
              ['--x-drift' as string]: `${p.xDrift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );

  return createPortal(node, document.body);
}
