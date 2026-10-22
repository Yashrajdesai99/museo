import { useEffect, useState } from 'react';

export type DeviceTier = 'high' | 'low';

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>('high');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isHeadless = navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent);
    const cores = navigator.hardwareConcurrency ?? 4;
    if (isHeadless || cores <= 2) {
      setTier('low');
    } else {
      setTier('high');
    }
  }, []);

  return tier;
}
