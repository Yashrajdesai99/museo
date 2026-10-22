import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity
} from 'motion/react';
import { useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface ScrollVelocityProps {
  items: string[];
  baseVelocity?: number;
  className?: string;
}

function wrap(min: number, max: number, v: number): number {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

/**
 * React Bits — ScrollVelocity (https://reactbits.dev/text-animations/scroll-velocity)
 * Smooth velocity-reactive infinite kinetic typography ticker.
 */
export function ScrollVelocity({
  items,
  baseVelocity = -2.2,
  className = ''
}: ScrollVelocityProps) {
  const reducedMotion = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((_t, delta) => {
    if (reducedMotion) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div
      className={`w-full overflow-hidden bg-[#0E0E0E] text-[#FFD400] border-b-[4px] border-[#0E0E0E] py-3 select-none ${className}`}
      aria-hidden="true"
    >
      <motion.div
        style={{ x: reducedMotion ? '0%' : x }}
        className="flex whitespace-nowrap gap-8 font-mono-tabular text-xs sm:text-sm font-bold tracking-widest"
      >
        {repeated.map((item, idx) => (
          <span key={idx} className="inline-flex items-center gap-8">
            <span>{item}</span>
            <span className="text-[#F2EDE4]/40">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
