/**
 * Decorative gold flourish placed between sections.
 * Pure SVG, ~1KB, no JS. Server-renderable.
 */
export default function FlourishDivider() {
  return (
    <div className="flourish-divider" aria-hidden="true">
      <svg
        viewBox="0 0 240 28"
        width="240"
        height="28"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
      >
        <defs>
          <linearGradient id="flourish-gold-fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#bfa14a" stopOpacity="0" />
            <stop offset="40%" stopColor="#bfa14a" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#bfa14a" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#bfa14a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line
          x1="0"
          y1="14"
          x2="240"
          y2="14"
          stroke="url(#flourish-gold-fade)"
          strokeWidth="1"
        />
        {/* Center cluster: leaves + diamond, anchored at (120,14) */}
        <g transform="translate(120 14)" fill="#bfa14a">
          <path d="M -18 0 Q -10 -5 -2 0 Q -10 5 -18 0 Z" opacity="0.85" />
          <path d="M -2 -6 L 4 0 L -2 6 L -8 0 Z" />
          <path d="M 18 0 Q 10 -5 2 0 Q 10 5 18 0 Z" opacity="0.85" />
        </g>
      </svg>
    </div>
  );
}
