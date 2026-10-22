import {
  ArrowRight,
  Compass,
  Flame,
  Search,
  Sparkles,
  Ticket,
  Volume2,
  X
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CATALOG_ENTITIES,
  EVOLUTION_STAGES,
  EXTINCTION_EVENTS,
  getStageById
} from '../../data';
import { soundEngine } from '../../lib/soundEngine';
import { useStudyStore } from '../../state/studyStore';
import { useTimelineStore } from '../../state/timelineStore';

interface CommandPaletteModalProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPaletteModal({ open, onClose }: CommandPaletteModalProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const { setAgeMa, selectStage, setSelectedEntityId, triggerAsteroidCutscene } =
    useTimelineStore();
  const { openNotebook, audioMuted, toggleAudioMuted } = useStudyStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  const normalizedQuery = query.trim().toLowerCase();

  const matchingStages = useMemo(() => {
    if (!normalizedQuery) return EVOLUTION_STAGES;
    return EVOLUTION_STAGES.filter(
      (s) =>
        s.name.toLowerCase().includes(normalizedQuery) ||
        s.headline.toLowerCase().includes(normalizedQuery) ||
        s.tectonicConfiguration.toLowerCase().includes(normalizedQuery)
    );
  }, [normalizedQuery]);

  const matchingEvents = useMemo(() => {
    if (!normalizedQuery) return EXTINCTION_EVENTS;
    return EXTINCTION_EVENTS.filter(
      (ev) =>
        ev.name.toLowerCase().includes(normalizedQuery) ||
        ev.shortName.toLowerCase().includes(normalizedQuery) ||
        ev.primaryCause.toLowerCase().includes(normalizedQuery)
    );
  }, [normalizedQuery]);

  const matchingSpecimens = useMemo(() => {
    if (!normalizedQuery) return CATALOG_ENTITIES.slice(0, 8);
    return CATALOG_ENTITIES.filter(
      (item) =>
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.accessionNumber.toLowerCase().includes(normalizedQuery) ||
        item.hook.toLowerCase().includes(normalizedQuery) ||
        item.ageDisplay.toLowerCase().includes(normalizedQuery)
    ).slice(0, 10);
  }, [normalizedQuery]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-[#0E0E0E]/80 backdrop-blur-[2px] flex items-start justify-center p-4 sm:pt-20 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-[#F2EDE4] text-[#0E0E0E] border-[4px] border-[#0E0E0E] shadow-[12px_12px_0px_#FFD400] overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="MUSEO Deep Time Command Console"
          >
            {/* Search Input Header */}
            <div className="bg-[#0E0E0E] text-[#F2EDE4] p-4 flex items-center gap-3 border-b-[3px] border-[#0E0E0E]">
              <Search className="w-5 h-5 text-[#FFD400] shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to era (Hadean), extinction (66 Ma), or specimen (ACC-F-013, T. rex)..."
                className="flex-1 bg-transparent text-sm sm:text-base font-mono-tabular text-[#F2EDE4] placeholder:text-[#F2EDE4]/50 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="px-2 py-0.5 text-xs font-mono-tabular bg-[#1C1C1C] text-[#F2EDE4] border border-[#F2EDE4]/30 cursor-pointer"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close command console"
                className="p-1.5 bg-[#FFD400] text-[#0E0E0E] border border-[#0E0E0E] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results Body */}
            <div className="max-h-[68vh] overflow-y-auto p-4 space-y-5 divide-y-2 divide-[#0E0E0E]/15">
              {/* Quick Museum Actions */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono-tabular font-bold text-[#4A4742]">
                  QUICK CURATORIAL ACTIONS
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      onClose();
                      openNotebook('stub');
                    }}
                    className="p-2.5 bg-[#E8E1D5] hover:bg-[#FFD400] border-2 border-[#0E0E0E] text-left flex items-center gap-2 text-xs font-bold font-display cursor-pointer transition-colors"
                  >
                    <Ticket className="w-4 h-4 shrink-0" />
                    <span>Print Ticket Stub PNG</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      onClose();
                      openNotebook('tours');
                    }}
                    className="p-2.5 bg-[#E8E1D5] hover:bg-[#FFD400] border-2 border-[#0E0E0E] text-left flex items-center gap-2 text-xs font-bold font-display cursor-pointer transition-colors"
                  >
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>Guided Docent Tours</span>
                  </button>

                  <button
                    type="button"
                    onClick={toggleAudioMuted}
                    className="p-2.5 bg-[#E8E1D5] hover:bg-[#FFD400] border-2 border-[#0E0E0E] text-left flex items-center gap-2 text-xs font-bold font-display cursor-pointer transition-colors"
                  >
                    <Volume2 className="w-4 h-4 shrink-0" />
                    <span>Audio: {audioMuted ? 'OFF (Muted)' : 'ON (Active)'}</span>
                  </button>
                </div>
              </div>

              {/* 5 Geological Eons */}
              {matchingStages.length > 0 && (
                <div className="pt-4 space-y-2">
                  <div className="text-[11px] font-mono-tabular font-bold text-[#4A4742]">
                    GEOLOGICAL EONS & ERAS (JUMP ON 3D GLOBE)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchingStages.map((stage) => (
                      <button
                        key={stage.id}
                        type="button"
                        onClick={() => {
                          soundEngine.playClick();
                          selectStage(stage.id);
                          setAgeMa(stage.defaultMa);
                          onClose();
                          navigate('/earth');
                        }}
                        className="p-2.5 bg-white hover:bg-[#FFD400] border-2 border-[#0E0E0E] flex items-center justify-between gap-2 text-left cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className="w-3.5 h-3.5 border border-[#0E0E0E] shrink-0"
                            style={{ backgroundColor: stage.palette.sceneBgTint }}
                          />
                          <div className="truncate">
                            <div className="text-xs font-bold font-display truncate">
                              {stage.index}. {stage.name}
                            </div>
                            <div className="text-[11px] font-mono-tabular text-[#4A4742]">
                              {stage.spanLabel} · O₂ {stage.oxygenPercent}%
                            </div>
                          </div>
                        </div>
                        <Compass className="w-4 h-4 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 5 Mass Extinction Events */}
              {matchingEvents.length > 0 && (
                <div className="pt-4 space-y-2">
                  <div className="text-[11px] font-mono-tabular font-bold text-[#4A4742]">
                    MASS EXTINCTION TURNING POINTS
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchingEvents.map((ev) => (
                      <button
                        key={ev.id}
                        type="button"
                        onClick={() => {
                          soundEngine.playClick();
                          if (ev.hasCutscene) {
                            triggerAsteroidCutscene();
                          } else {
                            setAgeMa(ev.ageMa);
                          }
                          onClose();
                          navigate('/earth');
                        }}
                        className="p-2.5 bg-[#0E0E0E] text-[#F2EDE4] hover:bg-[#FFD400] hover:text-[#0E0E0E] border-2 border-[#0E0E0E] flex items-center justify-between gap-2 text-left cursor-pointer transition-colors"
                      >
                        <div className="truncate">
                          <div className="text-xs font-bold font-display flex items-center gap-1.5">
                            <Flame className="w-3.5 h-3.5 text-[#FFD400] shrink-0" />
                            <span className="truncate">{ev.shortName}</span>
                          </div>
                          <div className="text-[11px] font-mono-tabular opacity-80">
                            {ev.ageMa} Ma · -{ev.speciesLostPercent}% Species Lost
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 20 Verified Specimens */}
              <div className="pt-4 space-y-2">
                <div className="text-[11px] font-mono-tabular font-bold text-[#4A4742]">
                  3D SPECIMEN & ARTIFACT ARCHIVE ({matchingSpecimens.length} SHOWN)
                </div>
                {matchingSpecimens.length === 0 ? (
                  <div className="p-4 text-xs font-mono-tabular text-[#4A4742] bg-[#E8E1D5] border-2 border-[#0E0E0E]">
                    No specimens matched "{query}". Try searching "zircon", "rex", "stone", or "ACC-F".
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    {matchingSpecimens.map((item) => {
                      const stage = getStageById(item.stageIds[0]);
                      return (
                        <div
                          key={item.id}
                          className="p-2.5 bg-white border-2 border-[#0E0E0E] flex flex-wrap items-center justify-between gap-2"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 text-[11px] font-mono-tabular">
                              <span
                                className="w-2.5 h-2.5 border border-[#0E0E0E]"
                                style={{ backgroundColor: stage.palette.sceneBgTint }}
                              />
                              <span className="font-bold">{item.accessionNumber}</span>
                              <span>·</span>
                              <span className="text-[#4A4742]">{item.ageDisplay}</span>
                            </div>
                            <div className="text-sm font-bold font-display truncate">
                              {item.name}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                soundEngine.playClick();
                                setAgeMa(item.ageMa);
                                setSelectedEntityId(item.id);
                                onClose();
                                navigate('/earth');
                              }}
                              className="px-2.5 py-1 text-[11px] font-mono-tabular font-bold bg-[#E8E1D5] hover:bg-[#FFD400] border border-[#0E0E0E] cursor-pointer"
                            >
                              Globe
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                soundEngine.playClick();
                                onClose();
                                navigate(`/gallery/${item.id}`);
                              }}
                              className="px-2.5 py-1 text-[11px] font-mono-tabular font-bold bg-[#0E0E0E] text-[#FFD400] hover:bg-[#FFD400] hover:text-[#0E0E0E] border border-[#0E0E0E] cursor-pointer"
                            >
                              3D Lab →
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Footer Shortcut Legend */}
            <div className="bg-[#E8E1D5] px-4 py-2.5 border-t-2 border-[#0E0E0E] flex items-center justify-between text-[11px] font-mono-tabular text-[#4A4742]">
              <span>SHORTCUT: PRESS ⌘K / CTRL+K ANYWHERE</span>
              <span>ESC TO CLOSE</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
