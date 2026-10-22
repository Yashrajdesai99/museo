import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import type { MouseEvent, ReactNode } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../lib/cn';

export interface ArchitecturalGridBgProps {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}

/**
 * Supahero.io / Aceternity UI — Interactive Architectural Grid Background
 * Renders a subtle geometric museum coordinate grid that illuminates under the visitor's cursor.
 */
export function ArchitecturalGridBg({
  children,
  className,
  dark = false
}: ArchitecturalGridBgProps) {
  const mouseX = useMotionValue(400);
  const mouseY = useMotionValue(250);
  const reducedMotion = useReducedMotion();

  const handleMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const maskImage = useMotionTemplate`radial-gradient(380px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`;

  const strokeColor = dark ? 'rgba(242, 237, 228, 0.07)' : 'rgba(14, 14, 14, 0.055)';
  const highlightStroke = dark ? 'rgba(255, 212, 0, 0.22)' : 'rgba(14, 14, 14, 0.16)';

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn('relative overflow-hidden', className)}
    >
      {/* Base static architectural grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(to right, ${strokeColor} 1px, transparent 1px), linear-gradient(to bottom, ${strokeColor} 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Mouse-illuminated high-contrast architectural grid */}
      {!reducedMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(to right, ${highlightStroke} 1px, transparent 1px), linear-gradient(to bottom, ${highlightStroke} 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
            WebkitMaskImage: maskImage,
            maskImage
          }}
        />
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
