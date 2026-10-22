import { useEffect } from 'react';
import { SLIDER_MAX } from '../lib/time';
import { useTimelineStore } from '../state/timelineStore';

export function useTimeline() {
  const store = useTimelineStore();

  useEffect(() => {
    if (!store.isPlaying || store.cutsceneState !== 'idle') return;

    let rafId = 0;
    let lastTime = performance.now();

    const step = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      const currentSlider = useTimelineStore.getState().sliderValue;
      const nextSlider = currentSlider + dt * 52 * useTimelineStore.getState().playbackSpeed;

      if (nextSlider >= SLIDER_MAX) {
        useTimelineStore.getState().setSliderValue(SLIDER_MAX);
        useTimelineStore.getState().setPlaying(false);
        return;
      }

      useTimelineStore.getState().setSliderValue(nextSlider);
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [store.isPlaying, store.cutsceneState]);

  return store;
}
