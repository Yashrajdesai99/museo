import { ArrowUpRight, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  AnimatedContent,
  BorderBeam,
  CountUp,
  Magnet,
  SpotlightCard
} from '../../../components/reactbits';
import { Button } from '../../../components/ui/Button';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { EXTINCTION_EVENTS } from '../../../data';
import { soundEngine } from '../../../lib/soundEngine';
import { useTimelineStore } from '../../../state/timelineStore';
import type { ExtinctionEvent } from '../../../types/evolution';

export function ExtinctionTurningPointsSection() {
  const navigate = useNavigate();
  const { setAgeMa, triggerAsteroidCutscene } = useTimelineStore();

  const handleInspectEvent = (ev: ExtinctionEvent) => {
    soundEngine.playClick();
    if (ev.hasCutscene) {
      triggerAsteroidCutscene();
    } else {
      setAgeMa(ev.ageMa);
    }
    navigate('/earth');
  };

  return (
    <section className="py-16 lg:py-24 px-6 border-b-[4px] border-[#0E0E0E] bg-[#0E0E0E] text-[#F2EDE4]">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          index="05"
          kicker="BIOTIC TURNING POINTS"
          title="The Five Mass Extinction Boundaries"
          subtitle="Five planetary crises reshaped evolutionary history by eliminating dominant clades and opening ecological niches for new radiations—culminating in the 66.0 Ma Chicxulub Asteroid Impact cutscene."
          dark
          rightSlot={
            <Magnet padding={34} magnetStrength={3.5}>
              <Button
                variant="primary"
                onClick={() => {
                  soundEngine.playClick();
                  triggerAsteroidCutscene();
                  navigate('/earth');
                }}
              >
                <Flame className="w-4 h-4" />
                <span>Launch 66 Ma Impact Cutscene</span>
              </Button>
            </Magnet>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {EXTINCTION_EVENTS.map((ev, idx) => (
            <AnimatedContent key={ev.id} distance={34} delay={idx * 0.06} className="h-full">
              <SpotlightCard
                spotlightColor="rgba(255, 212, 0, 0.18)"
                className={`relative h-full p-5 border-[3px] flex flex-col justify-between space-y-5 ${
                  ev.hasCutscene
                    ? 'bg-[#1C1C1C] border-[#FFD400] shadow-[6px_6px_0px_#FFD400]'
                    : 'bg-[#161616] border-[#F2EDE4]/40 hover:border-[#FFD400]'
                }`}
              >
                {ev.hasCutscene && (
                  <BorderBeam colorFrom="#FFD400" colorTo="#B3261E" duration={5.5} />
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono-tabular">
                    <span className="text-[#FFD400] font-bold">
                      0{idx + 1} · {ev.ageMa} MA
                    </span>
                    <span className="font-bold text-[#F2EDE4]">
                      -<CountUp from={0} to={ev.speciesLostPercent} duration={1.4} suffix="% Species" />
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-display leading-snug">
                    {ev.shortName}
                  </h3>

                  <p className="text-xs font-mono-tabular text-[#F2EDE4]/75">
                    Cause: {ev.primaryCause}
                  </p>

                  <p className="text-sm text-[#F2EDE4]/85 leading-relaxed">
                    {ev.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F2EDE4]/20 space-y-3">
                  <div className="text-[11px] font-mono-tabular text-[#F2EDE4]/65">
                    Marker: {ev.geologicalMarker}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleInspectEvent(ev)}
                    className={`group/ev w-full py-2 px-3 text-xs font-bold font-display border-2 flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                      ev.hasCutscene
                        ? 'bg-[#FFD400] text-[#0E0E0E] border-[#0E0E0E] hover:bg-[#ffdf33]'
                        : 'bg-transparent text-[#F2EDE4] border-[#F2EDE4] hover:bg-[#FFD400] hover:text-[#0E0E0E] hover:border-[#0E0E0E]'
                    }`}
                  >
                    {ev.hasCutscene ? (
                      <>
                        <Flame className="w-3.5 h-3.5" />
                        <span>Trigger 3D Impact Cutscene</span>
                      </>
                    ) : (
                      <>
                        <span>Jump Globe to {ev.ageMa} Ma</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/ev:translate-x-0.5 group-hover/ev:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                </div>
              </SpotlightCard>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
