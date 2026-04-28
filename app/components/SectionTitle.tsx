import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  lede?: string;
}

/**
 * Section heading + decorative gold under-flourish. Optional lede paragraph.
 */
export default function SectionTitle({ children, lede }: Props) {
  return (
    <div className="section-title-block">
      <h2 className="section-title">{children}</h2>
      <svg
        className="section-title-flourish"
        viewBox="0 0 60 12"
        width="60"
        height="12"
        aria-hidden="true"
        focusable="false"
      >
        <g transform="translate(30 6)" fill="currentColor">
          <path d="M -10 0 Q -5 -3.5 -1 0 Q -5 3.5 -10 0 Z" opacity="0.85" />
          <path d="M -1 -3.5 L 2 0 L -1 3.5 L -4 0 Z" />
          <path d="M 10 0 Q 5 -3.5 1 0 Q 5 3.5 10 0 Z" opacity="0.85" />
        </g>
      </svg>
      {lede && <p className="section-lede">{lede}</p>}
    </div>
  );
}
