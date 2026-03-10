'use client';

/**
 * Angled SVG section divider.
 * Place between sections to break the horizontal monotony.
 * 
 * @param flip - Flip the angle direction
 * @param fromColor - CSS color for the top (start) of the divider
 * @param toColor - CSS color for the bottom (end) of the divider
 */
export default function SectionDivider({
  flip = false,
  fromColor = 'var(--bg)',
  toColor = 'var(--bg-secondary)',
}: {
  flip?: boolean;
  fromColor?: string;
  toColor?: string;
}) {
  return (
    <div
      className="relative w-full h-16 sm:h-20 -my-px overflow-hidden pointer-events-none"
      aria-hidden="true"
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 0 L0 40 Q360 80 720 60 Q1080 40 1440 70 L1440 0 Z"
          fill={fromColor}
        />
        <path
          d="M0 40 Q360 80 720 60 Q1080 40 1440 70 L1440 80 L0 80 Z"
          fill={toColor}
        />
      </svg>
      {/* Subtle gradient line at the junction */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[rgba(var(--primary-rgb),0.1)] to-transparent" />
    </div>
  );
}
