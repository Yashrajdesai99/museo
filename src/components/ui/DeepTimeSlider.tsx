import { Flame, Magnet as MagnetIcon, Pause, Play, RotateCcw } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useRef } from 'react';
import { EVOLUTION_STAGES, EXTINCTION_EVENTS, getStageById } from '../../data';
import { soundEngine } from '../../lib/soundEngine';
import { formatAgeMa, maToSlider, SLIDER_MAX, SLIDER_MIN } from '../../lib/time';
import type { EvolutionStageId, ExtinctionEvent } from '../../types/evolution';
import { EventMarker } from './EventMarker';

interface DeepTimeSliderProps {
  ageMa: number;
  sliderValue: number;
  activeStageId: EvolutionStageId;
  isPlaying: boolean;
  onSliderChange: (val: number) => void;
  onSelectStage: (stageId: EvolutionStageId) => void;
  onSelectEvent: (event: ExtinctionEvent) => void;
  onTogglePlay: () => void;
  onTriggerCutscene: () => void;
  onReset: () => void;
}

const SNAP_THRESHOLD_UNITS = 14; // ~1.4% of the 1000-unit slider track

export function DeepTimeSlider({
  ageMa,
  sliderValue,
  activeStageId,
  isPlaying,
  onSliderChange,
  onSelectStage,
  onSelectEvent,
  onTogglePlay,
  onTriggerCutscene,
  onReset
}: DeepTimeSliderProps) {
  const lastSnappedEventIdRef = useRef<string | null>(null);
  const fillPercent = (sliderValue / SLIDER_MAX) * 100;
  const activeStage = getStageById(activeStageId);

  // Detect if current ageMa is locked onto one of the 5 mass extinction markers
  const snappedEvent =
    EXTINCTION_EVENTS.find(
      (ev) => Math.abs(sliderValue - maToSlider(ev.ageMa)) <= SNAP_THRESHOLD_UNITS
    ) ?? null;

  const ariaValueText = snappedEvent
    ? `${formatAgeMa(ageMa)} — Stage ${activeStage.index}: ${activeStage.name} (${snappedEvent.name}, ${snappedEvent.speciesLostPercent}% species lost)`
    : `${formatAgeMa(ageMa)} — Stage ${activeStage.index}: ${activeStage.name}`;

  const handleRangeChange = (rawVal: number) => {
    let closestEvent: ExtinctionEvent | null = null;
    let minDistance = Infinity;

    for (const ev of EXTINCTION_EVENTS) {
      const evSlider = maToSlider(ev.ageMa);
      const dist = Math.abs(rawVal - evSlider);
      if (dist <= SNAP_THRESHOLD_UNITS && dist < minDistance) {
        minDistance = dist;
        closestEvent = ev;
      }
    }

    if (closestEvent) {
      const targetSlider = Math.round(maToSlider(closestEvent.ageMa));
      if (lastSnappedEventIdRef.current !== closestEvent.id) {
        lastSnappedEventIdRef.current = closestEvent.id;
        soundEngine.playMagneticSnap();
      }
      onSliderChange(targetSlider);
    } else {
      lastSnappedEventIdRef.current = null;
      onSliderChange(rawVal);
    }
  };

  return (
    <div className="w-full bg-[#F2EDE4] text-[#0E0E0E] border-[3px] border-[#0E0E0E] shadow-[8px_8px_0px_#0E0E0E] p-4 sm:p-5 space-y-4">
      {/* Top Controls Row: Readout, Magnetic Snap Indicator, Playback, and 66 Ma Cutscene Trigger */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onTogglePlay}
            data-cursor-label={isPlaying ? 'PAUSE' : 'PLAY'}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold font-display bg-[#FFD400] text-[#0E0E0E] border-[2px] border-[#0E0E0E] shadow-[3px_3px_0px_#0E0E0E] brutal-press cursor-pointer whitespace-nowrap shrink-0"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause Scrub' : 'Play Deep Time'}</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            data-cursor-label="ORIGIN"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold font-display bg-[#F2EDE4] text-[#0E0E0E] border-[2px] border-[#0E0E0E] hover:bg-[#E8E1D5] cursor-pointer whitespace-nowrap shrink-0"
            title="Reset to 4,600 Ma Origin"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>4,600 Ma</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 font-mono-tabular">
          <AnimatePresence mode="popLayout">
            {snappedEvent && (
              <motion.span
                key={snappedEvent.id}
                initial={{ opacity: 0, scale: 0.85, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: -6 }}
                transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold bg-[#FFD400] text-[#0E0E0E] border-2 border-[#0E0E0E]"
              >
                <MagnetIcon className="w-3 h-3 shrink-0" />
                <span>
                  SNAP: {snappedEvent.shortName} (-{snappedEvent.speciesLostPercent}%)
                </span>
              </motion.span>
            )}
          </AnimatePresence>
          <span className="text-xs text-[#4A4742]">Geological Coordinate:</span>
          <span
            className="text-base sm:text-lg font-bold bg-[#0E0E0E] text-[#FFD400] px-3 py-1 border-2 border-[#0E0E0E]"
            aria-live="polite"
          >
            {formatAgeMa(ageMa)}
          </span>
        </div>

        <button
          type="button"
          onClick={onTriggerCutscene}
          data-cursor-label="IMPACT"
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold font-display bg-[#0E0E0E] text-[#FFD400] border-[2px] border-[#0E0E0E] hover:bg-[#1C1C1C] cursor-pointer whitespace-nowrap shrink-0"
        >
          <Flame className="w-3.5 h-3.5 text-[#FFD400]" />
          <span>66 Ma Asteroid Cutscene</span>
        </button>
      </div>

      {/* Chunky Block Track + Extinction Markers */}
      <div className="relative pt-3 pb-1" data-cursor-label="SCRUB">
        {/* Extinction Markers Layer */}
        <div className="relative w-full h-0">
          {EXTINCTION_EVENTS.map((ev) => (
            <EventMarker
              key={ev.id}
              event={ev}
              isActive={Math.abs(ageMa - ev.ageMa) < 8}
              onSelect={onSelectEvent}
            />
          ))}
        </div>

        {/* Visual Block Track */}
        <div className="relative h-4 w-full bg-[#0E0E0E] border-2 border-[#0E0E0E] overflow-hidden">
          <div
            className="h-full bg-[#FFD400]"
            style={{ width: `${fillPercent}%` }}
          />
        </div>

        {/* Interactive Range Input with WCAG AA role="slider" and aria-valuetext */}
        <input
          type="range"
          role="slider"
          min={SLIDER_MIN}
          max={SLIDER_MAX}
          step={1}
          value={Math.round(sliderValue)}
          aria-valuemin={0}
          aria-valuemax={4600}
          aria-valuenow={Math.round(ageMa)}
          aria-valuetext={ariaValueText}
          onChange={(e) => handleRangeChange(Number(e.target.value))}
          aria-label="Scrub 4.6 billion years of Earth history"
          className="deep-time-range absolute inset-x-0 top-2 w-full h-6 z-10"
        />
      </div>

      {/* 5 Evolution Stage Buttons with 21st.dev / Shotreel Shared layoutId Active Highlight */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 pt-1">
        {EVOLUTION_STAGES.map((stage) => {
          const isCurrent = stage.id === activeStageId;
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => onSelectStage(stage.id)}
              data-cursor-label={`STAGE ${stage.index}`}
              className="relative px-2.5 py-2 text-left border-2 border-[#0E0E0E] cursor-pointer overflow-hidden bg-[#E8E1D5] hover:bg-[#FFD400]/60 transition-colors"
            >
              {isCurrent && (
                <motion.span
                  layoutId="slider-active-stage-pill"
                  transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                  className="absolute inset-0 bg-[#0E0E0E] z-0"
                />
              )}
              <div
                className={`relative z-10 flex items-center justify-between text-[10px] font-mono-tabular ${
                  isCurrent ? 'text-[#FFD400]' : 'text-[#0E0E0E]/80'
                }`}
              >
                <span>{stage.index}</span>
                <span>{stage.spanLabel}</span>
              </div>
              <div
                className={`relative z-10 text-xs font-bold font-display truncate mt-0.5 flex items-center justify-between gap-1 ${
                  isCurrent ? 'text-[#F2EDE4]' : 'text-[#0E0E0E]'
                }`}
              >
                <span className="truncate">{stage.name}</span>
                <span
                  className="w-2.5 h-2.5 border border-[#0E0E0E] shrink-0"
                  style={{ backgroundColor: stage.palette.sceneBgTint }}
                  title={stage.palette.eraTintName}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
