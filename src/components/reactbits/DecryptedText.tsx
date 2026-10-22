import { useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../lib/cn';

export interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  className?: string;
  animateOn?: 'view' | 'hover' | 'both';
}

const DEFAULT_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#/_[]·ΔΩ';

/**
 * React Bits — DecryptedText (https://reactbits.dev/text-animations/decrypted-text)
 * Scrambles monospace telemetry and accession codes through paleontological glyphs
 * before sequentially locking into the target string.
 */
export function DecryptedText({
  text,
  speed = 28,
  maxIterations = 10,
  characters = DEFAULT_CHARS,
  className,
  animateOn = 'both'
}: DecryptedTextProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' });
  const reducedMotion = useReducedMotion();

  const [displayText, setDisplayText] = useState(text);
  const isAnimatingRef = useRef(false);

  const runScramble = () => {
    if (reducedMotion || isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    let iteration = 0;
    const totalLength = text.length;

    const interval = window.setInterval(() => {
      iteration += 1;
      const revealedCount = Math.floor((iteration / maxIterations) * totalLength);

      const next = text
        .split('')
        .map((char, idx) => {
          if (char === ' ' || char === '·' || char === ':' || char === '—') return char;
          if (idx < revealedCount) return text[idx];
          return characters[Math.floor(Math.random() * characters.length)];
        })
        .join('');

      setDisplayText(next);

      if (iteration >= maxIterations) {
        window.clearInterval(interval);
        setDisplayText(text);
        isAnimatingRef.current = false;
      }
    }, speed);

    return () => window.clearInterval(interval);
  };

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  useEffect(() => {
    if ((animateOn === 'view' || animateOn === 'both') && isInView) {
      return runScramble();
    }
  }, [isInView, text, animateOn]);

  return (
    <span
      ref={ref}
      onMouseEnter={() => {
        if (animateOn === 'hover' || animateOn === 'both') {
          runScramble();
        }
      }}
      className={cn('inline-block font-mono-tabular', className)}
      aria-label={text}
    >
      {displayText}
    </span>
  );
}
