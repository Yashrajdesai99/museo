import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { soundEngine } from '../../lib/soundEngine';

/**
 * Hard-edged 3-block Bauhaus geometric page wipe transition (350ms)
 * triggered on route changes.
 */
export function PageWipeTransition() {
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const prevPathRef = useRef<string>(location.pathname);
  const [isWiping, setIsWiping] = useState(false);

  useEffect(() => {
    if (prevPathRef.current === location.pathname) return;
    prevPathRef.current = location.pathname;

    if (reducedMotion) return;

    soundEngine.playPageWipe();
    setIsWiping(true);
    const timer = window.setTimeout(() => {
      setIsWiping(false);
    }, 360);

    return () => window.clearTimeout(timer);
  }, [location.pathname, reducedMotion]);

  if (!isWiping || reducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[80] pointer-events-none grid grid-cols-3 overflow-hidden"
    >
      <div className="h-full bg-[#0E0E0E] border-r-[4px] border-[#0E0E0E] animate-[bauhausWipe_350ms_ease-in-out_forwards]" />
      <div
        className="h-full bg-[#FFD400] border-r-[4px] border-[#0E0E0E] animate-[bauhausWipe_350ms_ease-in-out_forwards]"
        style={{ animationDelay: '35ms' }}
      />
      <div
        className="h-full bg-[#F2EDE4] animate-[bauhausWipe_350ms_ease-in-out_forwards]"
        style={{ animationDelay: '70ms' }}
      />
    </div>
  );
}
