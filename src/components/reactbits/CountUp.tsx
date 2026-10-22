import { useInView, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface CountUpProps {
  to: number;
  from?: number;
  direction?: 'up' | 'down';
  delay?: number;
  duration?: number;
  className?: string;
  separator?: string;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

/**
 * React Bits — CountUp (https://reactbits.dev/text-animations/count-up)
 * Spring-interpolated numerical counter for Ma ages, percentages, and specimen counts.
 */
export function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 1.6,
  className = '',
  separator = ',',
  decimals = 0,
  suffix = '',
  prefix = ''
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reducedMotion = useReducedMotion();

  const initialVal = direction === 'down' ? to : from;
  const targetVal = direction === 'down' ? from : to;

  const motionValue = useMotionValue(initialVal);
  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);
  const springValue = useSpring(motionValue, { damping, stiffness });
  const isInView = useInView(ref, { once: true, margin: '0px' });

  const formatNumber = (val: number) => {
    const fixed = val.toFixed(decimals);
    const parts = fixed.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return `${prefix}${parts.join('.')}${suffix}`;
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = formatNumber(reducedMotion ? targetVal : initialVal);
    }
  }, [initialVal, targetVal, reducedMotion]);

  useEffect(() => {
    if (isInView && !reducedMotion) {
      const timeoutId = window.setTimeout(() => {
        motionValue.set(targetVal);
      }, delay * 1000);
      return () => window.clearTimeout(timeoutId);
    }
  }, [isInView, motionValue, targetVal, delay, reducedMotion]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = formatNumber(latest);
      }
    });
    return () => unsubscribe();
  }, [springValue, decimals, separator, prefix, suffix]);

  return <span ref={ref} className={className} />;
}
