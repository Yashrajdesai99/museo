import { ArrowRight, Bot, Globe2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BorderBeam, Magnet, SpotlightCard } from '../../../components/reactbits';
import { Button } from '../../../components/ui/Button';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { EVOLUTION_STAGES, getEntitiesByStage } from '../../../data';
import { soundEngine } from '../../../lib/soundEngine';
import { useTimelineStore } from '../../../state/timelineStore';
import type { EvolutionStageId } from '../../../types/evolution';

export function EvolutionStagesSection() {
  const navigate = useNavigate();
  const selectStageInStore = useTimelineStore((s) => s.selectStage);
  const [selectedStageId, setSelectedStageId] = useState<EvolutionStageId>('mesozoic');

  const activeStage =
    EVOLUTION_STAGES.find((s) => s.id === selectedStageId) ?? EVOLUTION_STAGES[3];
  const stageEntities = getEntitiesByStage(activeStage.id);

  const handleExploreStageOnGlobe = (stageId: EvolutionStageId) => {
    soundEngine.playClick();
    selectStageInStore(stageId);
    navigate('/earth');
  };

  return (
    <section className="py-16 lg:py-24 px-6 border-b-[4px] border-[#0E0E0E] bg-[#E8E1D5]">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          index="03"
          kicker="STRATIGRAPHIC ARCHITECTURE"
          title="The Five Evolutionary Stages of Earth"
          subtitle="Every specimen in the MUSEO catalog is strictly cross-linked to one of five canonical geological stages. Select an era to inspect its atmospheric composition, continental configuration, and linked fossils."
        />

        {/* 5 Stage Selector Bar with 21st.dev / Shotreel Shared layoutId Active Highlight */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-8">
          {EVOLUTION_STAGES.map((stage) => {
            const isSelected = stage.id === selectedStageId;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedStageId(stage.id);
                }}
                className={`relative p-4 text-left border-[3px] border-[#0E0E0E] transition-shadow cursor-pointer overflow-hidden ${
                  isSelected
                    ? 'shadow-[6px_6px_0px_#FFD400]'
                    : 'bg-[#F2EDE4] text-[#0E0E0E] shadow-[4px_4px_0px_#0E0E0E] hover:bg-[#FFD400]/50'
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="home-stage-selector-pill"
                    transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                    className="absolute inset-0 bg-[#0E0E0E] z-0"
                  />
                )}
                <div
                  className={`relative z-10 flex items-center justify-between text-xs font-mono-tabular ${
                    isSelected ? 'text-[#FFD400]' : 'text-[#0E0E0E]/80'
                  }`}
                >
                  <span>STAGE {stage.index}</span>
                  <span>{stage.spanLabel}</span>
                </div>
                <div
                  className={`relative z-10 text-lg font-bold font-display mt-1 flex items-center justify-between gap-2 ${
                    isSelected ? 'text-[#F2EDE4]' : 'text-[#0E0E0E]'
                  }`}
                >
                  <span>{stage.name}</span>
                  <span
                    className="w-3 h-3 border border-[#0E0E0E] shrink-0"
                    style={{ backgroundColor: stage.palette.sceneBgTint }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Deep Dossier with SpotlightCard, BorderBeam & AnimatePresence */}
        <SpotlightCard
          spotlightColor="rgba(255, 212, 0, 0.2)"
          className="relative bg-[#F2EDE4] border-[4px] border-[#0E0E0E] shadow-[10px_10px_0px_#0E0E0E] p-6 sm:p-8"
        >
          <BorderBeam
            colorFrom={activeStage.palette.sceneBgTint}
            colorTo="#FFD400"
            duration={7}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular font-bold text-[#4A4742]">
                  <span
                    className="px-2 py-0.5 text-[#F2EDE4] border border-[#0E0E0E]"
                    style={{ backgroundColor: activeStage.palette.sceneBgTint }}
                  >
                    STAGE {activeStage.index} · {activeStage.palette.eraTintName}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{activeStage.spanLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>O₂ LEVEL: {activeStage.oxygenPercent}%</span>
                  <span aria-hidden="true">·</span>
                  <span>MEAN TEMP: {activeStage.meanSurfaceTempC}°C</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-bold font-display">
                  {activeStage.name}: {activeStage.tagline}
                </h3>

                <p className="text-base text-[#0E0E0E]/85 leading-relaxed max-w-2xl">
                  {activeStage.summary}
                </p>

                {/* Dry Robot Guide Commentary */}
                <div className="bg-[#E8E1D5] border-2 border-[#0E0E0E] p-3.5 flex items-start gap-2.5 text-xs font-mono-tabular">
                  <Bot className="w-4 h-4 shrink-0 mt-0.5 text-[#0E0E0E]" />
                  <div>
                    <span className="font-bold">ROBOT GUIDE // {activeStage.name.toUpperCase()}: </span>
                    <span className="italic">"{activeStage.robotQuip}"</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="bg-[#E8E1D5] border-2 border-[#0E0E0E] p-4 space-y-1">
                    <div className="text-xs font-mono-tabular font-bold text-[#4A4742]">
                      TECTONIC CONFIGURATION
                    </div>
                    <div className="text-sm font-semibold">
                      {activeStage.tectonicConfiguration}
                    </div>
                  </div>
                  <div className="bg-[#E8E1D5] border-2 border-[#0E0E0E] p-4 space-y-1">
                    <div className="text-xs font-mono-tabular font-bold text-[#4A4742]">
                      ATMOSPHERIC STATE & AUDIO BED
                    </div>
                    <div className="text-sm font-semibold">
                      {activeStage.atmosphereComposition}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <div className="text-xs font-mono-tabular font-bold text-[#4A4742]">
                    KEY CHRONOLOGICAL TURNING POINTS
                  </div>
                  <ul className="space-y-1.5 text-sm font-body">
                    {activeStage.keyHighlights.map((hl) => (
                      <li key={hl} className="flex items-start gap-2">
                        <span className="font-mono-tabular font-bold text-[#0E0E0E]">■</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3">
                  <Magnet padding={34} magnetStrength={3.5}>
                    <Button
                      variant="primary"
                      onClick={() => handleExploreStageOnGlobe(activeStage.id)}
                    >
                      <Globe2 className="w-4 h-4" />
                      <span>
                        Scrub 3D Globe to {activeStage.name} ({activeStage.defaultMa} Ma)
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Magnet>
                </div>
              </div>

              {/* Linked Catalog Specimens in this Stage */}
              <div className="lg:col-span-5 bg-[#0E0E0E] text-[#F2EDE4] border-[3px] border-[#0E0E0E] p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-[#F2EDE4]/25 pb-3">
                    <span className="text-xs font-mono-tabular font-bold text-[#FFD400]">
                      CROSS-LINKED ARCHIVAL SPECIMENS ({stageEntities.length})
                    </span>
                    <span className="text-xs font-mono-tabular text-[#F2EDE4]/70">
                      {activeStage.spanLabel}
                    </span>
                  </div>

                  <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
                    {stageEntities.map((entity) => (
                      <button
                        key={entity.id}
                        type="button"
                        onClick={() => {
                          soundEngine.playClick();
                          navigate(`/gallery/${entity.id}`, {
                            state: { fromGalleryCard: true, cardTitle: entity.name }
                          });
                        }}
                        className="group/item w-full text-left p-3 bg-[#1C1C1C] border border-[#F2EDE4]/30 hover:border-[#FFD400] transition-colors flex items-center justify-between gap-3 cursor-pointer"
                      >
                        <div className="min-w-0">
                          <div className="text-[11px] font-mono-tabular text-[#FFD400]">
                            {entity.accessionNumber} · {entity.ageDisplay}
                          </div>
                          <div className="text-sm font-bold font-display text-[#F2EDE4] truncate">
                            {entity.name}
                          </div>
                          <div className="text-xs text-[#F2EDE4]/70 truncate">
                            {entity.hook}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#FFD400] shrink-0 transition-transform duration-200 group-hover/item:translate-x-1" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F2EDE4]/20 flex items-center justify-between text-xs font-mono-tabular text-[#F2EDE4]/75">
                  <span>Dominant Biota: {activeStage.dominantLife[0]}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </SpotlightCard>
      </div>
    </section>
  );
}
