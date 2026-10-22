import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../lib/cn';

export interface SplitTextProps {
  text: string;
  className?: string;
  splitBy?: 'words' | 'chars';
  delay?: number; // stagger delay in seconds per token
  initialDelay?: number;
  once?: boolean;
}

/**
 * React Bits — SplitText (https://reactbits.dev/text-animations/split-text)
 * Masked word-by-word or character-by-character spring-physics reveal on scroll into view.
 */
export function SplitText({
  text,
  className,
  splitBy = 'words',
  delay = 0.038,
  initialDelay = 0,
  once = true
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once, margin: '-8% 0px' });
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <span className={className}>{text}</span>;
  }

  const tokens = splitBy === 'words' ? text.split(' ') : Array.from(text);

  return (
    <span
      ref={ref}
      aria-label={text}
      className={cn('inline-block', className)}
    >
      {tokens.map((token, idx) => (
        <span
          key={`${token}-${idx}`}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom pb-[0.06em] -mb-[0.06em]"
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: '110%', opacity: 0, rotateZ: 1.5 }}
            animate={
              isInView
                ? { y: '0%', opacity: 1, rotateZ: 0 }
                : { y: '110%', opacity: 0, rotateZ: 1.5 }
            }
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 26,
              mass: 0.8,
              delay: initialDelay + idx * delay
            }}
          >
            {token === ' ' ? '\u00A0' : token}
            {splitBy === 'words' && idx < tokens.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
