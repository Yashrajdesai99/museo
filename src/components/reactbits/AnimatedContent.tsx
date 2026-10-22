import { motion, useInView } from 'motion/react';
import { useRef, type ReactNode } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface AnimatedContentProps {
  children: ReactNode;
  distance?: number;
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  delay?: number;
  className?: string;
  once?: boolean;
}

/**
 * React Bits — AnimatedContent (https://reactbits.dev/animations/animated-content)
 * Scroll-triggered spring entrance animation for sections, dossiers, and cards.
 */
export function AnimatedContent({
  children,
  distance = 42,
  direction = 'vertical',
  reverse = false,
  initialOpacity = 0,
  animateOpacity = true,
  scale = 0.98,
  delay = 0,
  className = '',
  once = true
}: AnimatedContentProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once, margin: '-8% 0px' });
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = reverse ? -distance : distance;
  const initialTransform =
    direction === 'horizontal'
      ? { x: offset, y: 0, scale, opacity: animateOpacity ? initialOpacity : 1 }
      : { x: 0, y: offset, scale, opacity: animateOpacity ? initialOpacity : 1 };

  const activeTransform = { x: 0, y: 0, scale: 1, opacity: 1 };

  return (
    <motion.div
      ref={ref}
      initial={initialTransform}
      animate={isInView ? activeTransform : initialTransform}
      transition={{
        type: 'spring',
        stiffness: 210,
        damping: 24,
        mass: 0.85,
        delay
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
