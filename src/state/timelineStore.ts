import { create } from 'zustand';
import { getStageForAgeMa } from '../data';
import { maToSlider, sliderToMa } from '../lib/time';
import type { EvolutionStage, EvolutionStageId } from '../types/evolution';

export type CutsceneState = 'idle' | 'asteroid-impact';

interface TimelineState {
  ageMa: number;
  sliderValue: number;
  activeStage: EvolutionStage;
  isPlaying: boolean;
  playbackSpeed: number;
  cutsceneState: CutsceneState;
  cutsceneProgress: number; // 0 to 1
  selectedEntityId: string | null;
  isHudCollapsed: boolean;
  setAgeMa: (ageMa: number) => void;
  setSliderValue: (sliderValue: number) => void;
  selectStage: (stageId: EvolutionStageId) => void;
  togglePlay: () => void;
  setPlaying: (playing: boolean) => void;
  triggerAsteroidCutscene: () => void;
  stopCutscene: () => void;
  setCutsceneProgress: (progress: number) => void;
  setSelectedEntityId: (id: string | null) => void;
  toggleHudCollapsed: () => void;
}

const INITIAL_AGE_MA = 66;

export const useTimelineStore = create<TimelineState>((set) => ({
  ageMa: INITIAL_AGE_MA,
  sliderValue: maToSlider(INITIAL_AGE_MA),
  activeStage: getStageForAgeMa(INITIAL_AGE_MA),
  isPlaying: false,
  playbackSpeed: 1,
  cutsceneState: 'idle',
  cutsceneProgress: 0,
  selectedEntityId: 'tyrannosaurus-rex-skull',
  isHudCollapsed: false,

  setAgeMa: (ageMa) => {
    const clamped = Math.max(0, Math.min(4600, ageMa));
    set({
      ageMa: clamped,
      sliderValue: maToSlider(clamped),
      activeStage: getStageForAgeMa(clamped)
    });
  },

  setSliderValue: (sliderValue) => {
    const clampedSlider = Math.max(0, Math.min(1000, sliderValue));
    const ageMa = sliderToMa(clampedSlider);
    set({
      sliderValue: clampedSlider,
      ageMa,
      activeStage: getStageForAgeMa(ageMa)
    });
  },

  selectStage: (stageId) => {
    const stageAges: Record<EvolutionStageId, number> = {
      'hadean-archean': 3800,
      proterozoic: 650,
      paleozoic: 375,
      mesozoic: 66.8,
      cenozoic: 1.4
    };
    const targetMa = stageAges[stageId];
    set({
      ageMa: targetMa,
      sliderValue: maToSlider(targetMa),
      activeStage: getStageForAgeMa(targetMa),
      isPlaying: false
    });
  },

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

  setPlaying: (isPlaying) => set({ isPlaying }),

  triggerAsteroidCutscene: () => {
    const targetMa = 66;
    set({
      ageMa: targetMa,
      sliderValue: maToSlider(targetMa),
      activeStage: getStageForAgeMa(targetMa),
      isPlaying: false,
      cutsceneState: 'asteroid-impact',
      cutsceneProgress: 0
    });
  },

  stopCutscene: () =>
    set({
      cutsceneState: 'idle',
      cutsceneProgress: 0
    }),

  setCutsceneProgress: (cutsceneProgress) => set({ cutsceneProgress }),

  setSelectedEntityId: (selectedEntityId) => set({ selectedEntityId }),

  toggleHudCollapsed: () => set((state) => ({ isHudCollapsed: !state.isHudCollapsed }))
}));
