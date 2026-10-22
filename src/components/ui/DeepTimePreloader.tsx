import { Ticket, Volume2, VolumeX, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BRAND_SUBTITLE, BRAND_TAGLINE, EVOLUTION_STAGES } from '../../data';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { soundEngine } from '../../lib/soundEngine';
import { useAuthStore } from '../../state/authStore';
import { useStudyStore } from '../../state/studyStore';

/**
 * Act 0: Arrival Preloader (4,600 Ma -> 0 Ma)
 * Counts down across 4.6 billion years of planetary history, prints the perforated
 * admission pass out of a virtual brass slot, and provides the browser-required
 * user-gesture gate for Web Audio ("Enter with Sound" vs "Enter Muted").
 */
export function DeepTimePreloader() {
  const { hasCompletedPreloader, completePreloader, pass } = useAuthStore();
  const { setAudioMuted } = useStudyStore();
  const reducedMotion = useReducedMotion();

  const [countMa, setCountMa] = useState<number>(4600);
  const [isTicketPrinted, setIsTicketPrinted] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  useEffect(() => {
    if (hasCompletedPreloader) return;

    if (reducedMotion) {
      setCountMa(0);
      setIsTicketPrinted(true);
      return;
    }

    let rafId = 0;
    const durationMs = 2100;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / durationMs);
      // Ease out cubic so the final Phanerozoic eon is readable
      const eased = 1 - Math.pow(1 - t, 3);
      const nextMa = Math.max(0, 4600 * (1 - eased));
      setCountMa(nextMa);

      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setCountMa(0);
        setIsTicketPrinted(true);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [hasCompletedPreloader, reducedMotion]);

  if (hasCompletedPreloader) return null;

  const progressPercent = Math.min(100, Math.max(0, ((4600 - countMa) / 4600) * 100));

  const currentEra =
    EVOLUTION_STAGES.find((s) => countMa <= s.startMa && countMa >= s.endMa) ??
    EVOLUTION_STAGES[EVOLUTION_STAGES.length - 1];

  const handleEnter = (withSound: boolean) => {
    setAudioMuted(!withSound);
    if (withSound) {
      soundEngine.setMuted(false);
      soundEngine.playTicketPrint();
      soundEngine.playStamp();
    } else {
      soundEngine.setMuted(true);
    }

    if (reducedMotion) {
      completePreloader();
      return;
    }

    setIsExiting(true);
    window.setTimeout(() => {
      completePreloader();
    }, 360);
  };

  return (
    <div
      className={`fixed inset-0 z-[90] bg-[#0E0E0E] text-[#F2EDE4] flex flex-col justify-between p-6 sm:p-10 transition-transform duration-350 ease-out ${
        isExiting ? '-translate-y-full' : 'translate-y-0'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="MUSEO Act 0 Deep Time Arrival Preloader"
    >
      {/* Top Bar: Institutional Header + Fast Skip Escape Hatch */}
      <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between gap-4 border-b-2 border-[#F2EDE4]/20 pb-4">
        <div className="flex items-center gap-3 text-xs font-mono-tabular">
          <span className="bg-[#FFD400] text-[#0E0E0E] font-bold px-2 py-0.5">
            ACT 0 · ARRIVAL
          </span>
          <span className="text-[#F2EDE4]/75 hidden sm:inline">
            MUSEO · ARCHIVAL DEEP TIME SYNCHRONIZATION
          </span>
        </div>

        <button
          type="button"
          onClick={() => handleEnter(false)}
          className="text-xs font-mono-tabular text-[#F2EDE4]/70 hover:text-[#FFD400] underline cursor-pointer"
        >
          Skip Arrival →
        </button>
      </div>

      {/* Center Focal Anchor: 4,600 Ma -> 0 Ma Countdown + Printed Ticket Gate */}
      <div className="max-w-4xl w-full mx-auto my-auto space-y-8 py-6">
        <div className="space-y-2">
          <div className="text-xs sm:text-sm font-mono-tabular text-[#FFD400] tracking-widest uppercase">
            {BRAND_TAGLINE}
          </div>

          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div className="text-6xl sm:text-8xl lg:text-9xl font-bold font-mono-tabular tracking-tight text-[#F2EDE4] leading-none">
              {countMa.toFixed(1)}
              <span className="text-2xl sm:text-4xl text-[#FFD400] ml-3">Ma</span>
            </div>

            <div className="text-right font-mono-tabular">
              <div className="text-xs text-[#F2EDE4]/60">ACTIVE STRATIGRAPHY</div>
              <div className="text-lg sm:text-xl font-bold text-[#FFD400]">
                {currentEra.index}. {currentEra.name}
              </div>
              <div className="text-xs text-[#F2EDE4]/75">
                Tint: {currentEra.palette.eraTintName}
              </div>
            </div>
          </div>
        </div>

        {/* 5-Stage Segmented Stratigraphic Bar */}
        <div className="space-y-2">
          <div className="w-full h-5 bg-[#1C1C1C] border-2 border-[#F2EDE4] p-0.5">
            <div
              className="h-full bg-[#FFD400] transition-all duration-75"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="grid grid-cols-5 gap-1 text-[10px] font-mono-tabular text-[#F2EDE4]/65">
            {EVOLUTION_STAGES.map((st) => (
              <div key={st.id} className="truncate">
                {st.index} {st.name}
              </div>
            ))}
          </div>
        </div>

        {/* Mechanical Printed Admission Pass Gate */}
        <div
          className={`bg-[#F2EDE4] text-[#0E0E0E] border-[4px] border-[#0E0E0E] shadow-[10px_10px_0px_#FFD400] p-6 sm:p-7 transition-all duration-300 ${
            isTicketPrinted
              ? 'opacity-100 translate-y-0'
              : 'opacity-45 translate-y-3 pointer-events-none'
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono-tabular font-bold text-[#D9381E]">
                <Ticket className="w-4 h-4" />
                <span>
                  ADMISSION PASS PRINTED · {pass ? pass.ticketCode : 'DT-4600-READY'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display leading-tight">
                {BRAND_SUBTITLE}
              </h2>
              <p className="text-xs sm:text-sm text-[#4A4742] max-w-xl">
                Choose your acoustic mode to step into the Museum of Deep Time. Sound enables procedural Web Audio switch clicks, pneumatic ticket stamps, and the 66 Ma Chicxulub impact rumble.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                type="button"
                data-cursor-label="SOUND ON"
                onClick={() => handleEnter(true)}
                className="px-5 py-3.5 text-sm font-bold font-display bg-[#FFD400] text-[#0E0E0E] border-[3px] border-[#0E0E0E] shadow-[5px_5px_0px_#0E0E0E] brutal-press inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Volume2 className="w-4 h-4" />
                <span>Enter with Sound</span>
              </button>

              <button
                type="button"
                data-cursor-label="MUTED"
                onClick={() => handleEnter(false)}
                className="px-4 py-3.5 text-sm font-bold font-display bg-white text-[#0E0E0E] border-[3px] border-[#0E0E0E] shadow-[5px_5px_0px_#0E0E0E] brutal-press inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <VolumeX className="w-4 h-4" />
                <span>Enter Muted</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Strip */}
      <div className="max-w-[1440px] w-full mx-auto flex flex-wrap items-center justify-between gap-4 border-t-2 border-[#F2EDE4]/20 pt-4 text-xs font-mono-tabular text-[#F2EDE4]/65">
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-[#FFD400]" />
          <span>20 Verified Specimens · 5 Mass Extinctions · Interactive 3D Shaders</span>
        </div>
        <div>TIME IS THE INTERFACE · 4,600 Ma → 0 Ma</div>
      </div>
    </div>
  );
}
