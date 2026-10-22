import { create } from 'zustand';
import { soundEngine } from '../lib/soundEngine';
import type { EvolutionStageId } from '../types/evolution';

export type NotebookTab = 'tours' | 'bookmarks' | 'quiz' | 'stub';

interface StudyState {
  bookmarkedIds: string[];
  visitedStages: EvolutionStageId[];
  quizBestScore: number | null;
  activeTourId: string | null;
  activeTourStep: number;
  isNotebookOpen: boolean;
  notebookTab: NotebookTab;
  audioMuted: boolean;

  toggleBookmark: (entityId: string) => void;
  markStageVisited: (stageId: EvolutionStageId) => void;
  setQuizBestScore: (score: number) => void;
  startTour: (tourId: string) => void;
  setTourStep: (step: number) => void;
  stopTour: () => void;
  openNotebook: (tab?: NotebookTab) => void;
  closeNotebook: () => void;
  setNotebookTab: (tab: NotebookTab) => void;
  toggleAudioMuted: () => void;
  setAudioMuted: (muted: boolean) => void;
}

const STORAGE_KEY = 'museo_study_notebook_v1';

interface PersistedStudyData {
  bookmarkedIds: string[];
  visitedStages: EvolutionStageId[];
  quizBestScore: number | null;
}

function loadStudyData(): PersistedStudyData {
  if (typeof window === 'undefined') {
    return {
      bookmarkedIds: ['tyrannosaurus-rex-skull', 'jack-hills-zircon'],
      visitedStages: ['mesozoic'],
      quizBestScore: null
    };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        bookmarkedIds: ['tyrannosaurus-rex-skull', 'jack-hills-zircon'],
        visitedStages: ['mesozoic'],
        quizBestScore: null
      };
    }
    return JSON.parse(raw) as PersistedStudyData;
  } catch {
    return {
      bookmarkedIds: ['tyrannosaurus-rex-skull', 'jack-hills-zircon'],
      visitedStages: ['mesozoic'],
      quizBestScore: null
    };
  }
}

function saveStudyData(data: PersistedStudyData) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore sandboxed storage errors
  }
}

const initial = loadStudyData();

export const useStudyStore = create<StudyState>((set, get) => ({
  bookmarkedIds: initial.bookmarkedIds,
  visitedStages: initial.visitedStages,
  quizBestScore: initial.quizBestScore,
  activeTourId: null,
  activeTourStep: 0,
  isNotebookOpen: false,
  notebookTab: 'tours',
  audioMuted: false,

  toggleBookmark: (entityId) => {
    soundEngine.playClick();
    const current = get().bookmarkedIds;
    const next = current.includes(entityId)
      ? current.filter((id) => id !== entityId)
      : [...current, entityId];
    set({ bookmarkedIds: next });
    saveStudyData({
      bookmarkedIds: next,
      visitedStages: get().visitedStages,
      quizBestScore: get().quizBestScore
    });
  },

  markStageVisited: (stageId) => {
    const current = get().visitedStages;
    if (current.includes(stageId)) return;
    const next = [...current, stageId];
    set({ visitedStages: next });
    saveStudyData({
      bookmarkedIds: get().bookmarkedIds,
      visitedStages: next,
      quizBestScore: get().quizBestScore
    });
  },

  setQuizBestScore: (score) => {
    const prev = get().quizBestScore;
    const best = prev === null ? score : Math.max(prev, score);
    set({ quizBestScore: best });
    saveStudyData({
      bookmarkedIds: get().bookmarkedIds,
      visitedStages: get().visitedStages,
      quizBestScore: best
    });
  },

  startTour: (tourId) => {
    soundEngine.playClick();
    set({
      activeTourId: tourId,
      activeTourStep: 0,
      isNotebookOpen: false
    });
  },

  setTourStep: (step) => {
    soundEngine.playClick();
    set({ activeTourStep: step });
  },

  stopTour: () => {
    soundEngine.playClick();
    set({ activeTourId: null, activeTourStep: 0 });
  },

  openNotebook: (tab) => {
    soundEngine.playClick();
    set((state) => ({
      isNotebookOpen: true,
      notebookTab: tab ?? state.notebookTab
    }));
  },

  closeNotebook: () => {
    soundEngine.playClick();
    set({ isNotebookOpen: false });
  },

  setNotebookTab: (notebookTab) => {
    soundEngine.playClick();
    set({ notebookTab });
  },

  toggleAudioMuted: () => {
    const next = !get().audioMuted;
    soundEngine.setMuted(next);
    if (!next) {
      soundEngine.playClick();
    }
    set({ audioMuted: next });
  },

  setAudioMuted: (muted) => {
    soundEngine.setMuted(muted);
    if (!muted) {
      soundEngine.playClick();
    }
    set({ audioMuted: muted });
  }
}));
