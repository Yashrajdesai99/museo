import { Volume2, VolumeX } from 'lucide-react';
import { useEffect } from 'react';
import { soundEngine } from '../../lib/soundEngine';
import { useStudyStore } from '../../state/studyStore';

/**
 * Persistent Neo-Brutalist Sound ON/OFF control anchored in the bottom-left corner
 * across all screens (design.md Section 5.4 & 10.6).
 * Also binds the document `visibilitychange` listener so audio automatically pauses
 * when the visitor switches tabs and resumes on return.
 */
export function SoundToggleBlock() {
  const { audioMuted, toggleAudioMuted } = useStudyStore();

  useEffect(() => {
    const onVisibilityChange = () => {
      soundEngine.handleVisibilityChange(document.visibilityState === 'hidden');
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <button
        type="button"
        onClick={toggleAudioMuted}
        data-cursor-label={audioMuted ? 'UNMUTE' : 'MUTE'}
        aria-label={audioMuted ? 'Enable museum soundscape' : 'Mute museum soundscape'}
        aria-pressed={!audioMuted}
        className={`inline-flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-mono-tabular font-bold border-[3px] border-[#0E0E0E] shadow-[4px_4px_0px_#0E0E0E] brutal-press cursor-pointer transition-colors ${
          audioMuted
            ? 'bg-[#F2EDE4] text-[#0E0E0E] hover:bg-[#FFD400]'
            : 'bg-[#0E0E0E] text-[#FFD400] hover:bg-[#1C1C1C]'
        }`}
      >
        {audioMuted ? (
          <VolumeX className="w-4 h-4 shrink-0" />
        ) : (
          <Volume2 className="w-4 h-4 text-[#FFD400] shrink-0" />
        )}
        <span>SOUND: {audioMuted ? 'OFF' : 'ON'}</span>

        {/* Tactile 3-bar acoustic equalizer indicator */}
        <span className="inline-flex items-end gap-0.5 h-3" aria-hidden="true">
          <span
            className={`w-0.5 bg-current transition-all ${
              audioMuted ? 'h-1 opacity-40' : 'h-2.5 animate-pulse'
            }`}
          />
          <span
            className={`w-0.5 bg-current transition-all ${
              audioMuted ? 'h-1 opacity-40' : 'h-3'
            }`}
          />
          <span
            className={`w-0.5 bg-current transition-all ${
              audioMuted ? 'h-1 opacity-40' : 'h-2 animate-pulse'
            }`}
          />
        </span>
      </button>
    </div>
  );
}
