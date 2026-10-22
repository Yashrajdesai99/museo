import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Custom Bauhaus Labeled Block Cursor for desktop fine-pointer devices.
 * Reads `data-cursor-label` from hovered elements (e.g. STAMP, TEAR, DRAG, SCRUB, INSPECT, ROBOT)
 * and snaps into a high-contrast Signal Yellow architectural badge.
 */
export function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [label, setLabel] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isFinePointer, setIsFinePointer] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(pointer: fine)');
    setIsFinePointer(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!isFinePointer || reducedMotion) return;

    const onPointerMove = (e: PointerEvent) => {
      setIsVisible(true);
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX + 14}px, ${e.clientY + 14}px, 0)`;
      }

      const target = e.target as HTMLElement | null;
      if (!target) {
        setLabel('');
        return;
      }

      const labeledEl = target.closest('[data-cursor-label]') as HTMLElement | null;
      if (labeledEl) {
        setLabel(labeledEl.getAttribute('data-cursor-label') || '');
        return;
      }

      if (target.closest('canvas')) {
        setLabel('DRAG 3D');
      } else if (target.closest('input[type="range"]')) {
        setLabel('SCRUB');
      } else if (target.closest('a, button')) {
        setLabel('SELECT');
      } else {
        setLabel('');
      }
    };

    const onPointerLeave = () => setIsVisible(false);

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeave);
    };
  }, [isFinePointer, reducedMotion]);

  if (!isFinePointer || reducedMotion || !isVisible) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 z-[95] pointer-events-none transition-opacity duration-100"
      style={{ willChange: 'transform' }}
    >
      {label ? (
        <div className="px-2 py-0.5 bg-[#FFD400] text-[#0E0E0E] border-2 border-[#0E0E0E] shadow-[3px_3px_0px_#0E0E0E] text-[10px] font-mono-tabular font-bold tracking-wider whitespace-nowrap">
          {label}
        </div>
      ) : (
        <div className="w-3 h-3 bg-[#FFD400] border-2 border-[#0E0E0E]" />
      )}
    </div>
  );
}
