import { motion } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../lib/cn';

export interface BorderBeamProps {
  colorFrom?: string;
  colorTo?: string;
  duration?: number;
  className?: string;
}

/**
 * Magic UI / Aceternity UI — BorderBeam
 * Animated kinetic perimeter trace that highlights flagship specimens and active stages.
 */
export function BorderBeam({
  colorFrom = '#FFD400',
  colorTo = '#D9381E',
  duration = 6,
  className
}: BorderBeamProps) {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden z-20',
        className
      )}
    >
      {/* Top horizontal kinetic beam */}
      <motion.div
        className="absolute top-0 left-0 h-[3px] w-28"
        style={{
          background: `linear-gradient(90deg, transparent, ${colorFrom}, ${colorTo}, transparent)`
        }}
        animate={{ left: ['-25%', '125%'] }}
        transition={{
          duration: duration * 0.5,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      {/* Bottom horizontal kinetic beam */}
      <motion.div
        className="absolute bottom-0 right-0 h-[3px] w-28"
        style={{
          background: `linear-gradient(270deg, transparent, ${colorFrom}, ${colorTo}, transparent)`
        }}
        animate={{ right: ['-25%', '125%'] }}
        transition={{
          duration: duration * 0.5,
          repeat: Infinity,
          ease: 'linear',
          delay: duration * 0.25
        }}
      />
    </div>
  );
}
