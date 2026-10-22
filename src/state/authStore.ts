import { create } from 'zustand';

export type VisitorRole = 'Student Researcher' | 'Curious Visitor' | 'Faculty Evaluator';

export interface VisitorPass {
  visitorName: string;
  visitorRole: VisitorRole;
  ticketCode: string;
  issuedAt: string;
  isStamped: boolean;
  isStubTorn?: boolean;
  hasGoldenAmmoniteSticker?: boolean;
}

interface AuthState {
  pass: VisitorPass | null;
  prefer2DFallback: boolean;
  isTicketTorn: boolean;
  robotClickCount: number;
  hasGoldenAmmoniteSticker: boolean;
  hasCompletedPreloader: boolean;

  issuePass: (visitorName: string, visitorRole: VisitorRole) => VisitorPass;
  clearPass: () => void;
  tearTicket: () => void;
  registerRobotClick: () => boolean;
  setPrefer2DFallback: (prefer2D: boolean) => void;
  completePreloader: () => void;
  replayPreloader: () => void;
}

const STORAGE_KEY = 'museo_visitor_pass_v2';
const PRELOADER_SESSION_KEY = 'museo_preloader_done_v2';

function loadStoredPass(): VisitorPass | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as VisitorPass;
  } catch {
    return null;
  }
}

function loadPreloaderDone(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.sessionStorage.getItem(PRELOADER_SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

const initialPass = loadStoredPass();

export const useAuthStore = create<AuthState>((set, get) => ({
  pass: initialPass,
  prefer2DFallback: false,
  isTicketTorn: Boolean(initialPass?.isStubTorn),
  robotClickCount: 0,
  hasGoldenAmmoniteSticker: Boolean(initialPass?.hasGoldenAmmoniteSticker),
  hasCompletedPreloader: loadPreloaderDone(),

  issuePass: (visitorName, visitorRole) => {
    const cleanName = visitorName.trim() || 'Archival Guest';
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const hasGolden = get().hasGoldenAmmoniteSticker;
    const newPass: VisitorPass = {
      visitorName: cleanName,
      visitorRole,
      ticketCode: `DT-${randomDigits}-4600MA`,
      issuedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      }),
      isStamped: true,
      isStubTorn: false,
      hasGoldenAmmoniteSticker: hasGolden
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newPass));
    } catch {
      // Ignore storage quota errors in sandboxed iframes
    }
    set({ pass: newPass, isTicketTorn: false });
    return newPass;
  },

  clearPass: () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
    set({ pass: null, isTicketTorn: false });
  },

  tearTicket: () => {
    const currentPass = get().pass;
    const updatedPass = currentPass
      ? { ...currentPass, isStubTorn: true }
      : null;
    if (updatedPass) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPass));
      } catch {
        // Ignore storage errors
      }
    }
    set({ isTicketTorn: true, pass: updatedPass });
  },

  registerRobotClick: () => {
    const nextCount = get().robotClickCount + 1;
    const unlockedNow = nextCount >= 5 && !get().hasGoldenAmmoniteSticker;
    const hasSticker = get().hasGoldenAmmoniteSticker || nextCount >= 5;
    const currentPass = get().pass;
    const updatedPass = currentPass
      ? { ...currentPass, hasGoldenAmmoniteSticker: hasSticker }
      : null;
    if (updatedPass) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPass));
      } catch {
        // Ignore storage errors
      }
    }
    set({
      robotClickCount: nextCount,
      hasGoldenAmmoniteSticker: hasSticker,
      pass: updatedPass
    });
    return unlockedNow || (nextCount >= 5 && nextCount % 5 === 0);
  },

  setPrefer2DFallback: (prefer2DFallback) => set({ prefer2DFallback }),

  completePreloader: () => {
    try {
      window.sessionStorage.setItem(PRELOADER_SESSION_KEY, '1');
    } catch {
      // Ignore storage errors
    }
    set({ hasCompletedPreloader: true });
  },

  replayPreloader: () => {
    try {
      window.sessionStorage.removeItem(PRELOADER_SESSION_KEY);
    } catch {
      // Ignore storage errors
    }
    set({ hasCompletedPreloader: false });
  }
}));
