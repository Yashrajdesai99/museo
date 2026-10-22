import { ArrowRight, Compass, Flame, Sparkles, Ticket } from 'lucide-react';
import { motion } from 'motion/react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { LazyCanvas, type LazyCanvasContext } from '../../../components/canvas/LazyCanvas';
import {
  AnimatedContent,
  ArchitecturalGridBg,
  BorderBeam,
  CountUp,
  DecryptedText,
  Magnet,
  SplitText
} from '../../../components/reactbits';
import { Button } from '../../../components/ui/Button';
import { BRAND_SUBTITLE, BRAND_TAGLINE, EVOLUTION_STAGES } from '../../../data';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { soundEngine } from '../../../lib/soundEngine';
import { buildEarthGlobe, type GlobeHandles } from '../../../scenes/earth/Globe';
import { useAuthStore } from '../../../state/authStore';
import { useTimelineStore } from '../../../state/timelineStore';

export function HeroSection() {
  const navigate = useNavigate();
  const { pass } = useAuthStore();
  const { setAgeMa, selectStage } = useTimelineStore();
  const reducedMotion = useReducedMotion();

  const [previewStageIndex, setPreviewStageIndex] = useState(3); // Default 04 Mesozoic (66 Ma)
  const activePreviewStage = EVOLUTION_STAGES[previewStageIndex] ?? EVOLUTION_STAGES[3];

  const globeRef = useRef<GlobeHandles | null>(null);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetAgeRef = useRef<number>(activePreviewStage.defaultMa);
  const currentAgeRef = useRef<number>(activePreviewStage.defaultMa);
  targetAgeRef.current = activePreviewStage.defaultMa;

  const handleSetup = ({ scene, container }: LazyCanvasContext) => {
    const globe = buildEarthGlobe();
    globe.updateForAgeMa(targetAgeRef.current, 0.016, true);
    globeRef.current = globe;
    scene.add(globe.root);

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointerRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((e.clientY - rect.top) / rect.height) * 2 + 1
      };
    };

    container.addEventListener('pointermove', onPointerMove);
    return () => {
      container.removeEventListener('pointermove', onPointerMove);
    };
  };

  const handleFrame = (_ctx: LazyCanvasContext, delta: number) => {
    if (!globeRef.current) return;
    const mesh = globeRef.current.earthMesh;
    if (!reducedMotion) {
      mesh.rotation.y += delta * 0.16;
      mesh.rotation.x = THREE.MathUtils.damp(
        mesh.rotation.x,
        pointerRef.current.y * 0.2,
        4,
        delta
      );
    }
    currentAgeRef.current = THREE.MathUtils.damp(
      currentAgeRef.current,
      targetAgeRef.current,
      5,
      delta
    );
    globeRef.current.updateForAgeMa(currentAgeRef.current, delta, true);
  };

  const handleLaunchAtPreviewEra = () => {
    soundEngine.playClick();
    selectStage(activePreviewStage.id);
    setAgeMa(activePreviewStage.defaultMa);
    navigate('/earth');
  };

  return (
    <ArchitecturalGridBg className="border-b-[4px] border-[#0E0E0E] bg-[#F2EDE4]">
      <div className="max-w-[1440px] mx-auto px-6 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left 7 Columns: Monumental Editorial Typography with React Bits SplitText & DecryptedText */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0E0E0E] text-[#FFD400] text-xs font-mono-tabular font-bold border-2 border-[#0E0E0E] shadow-[4px_4px_0px_#FFD400]">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD400]" />
            <span>MUSEO ARCHIVE</span>
            <span aria-hidden="true">·</span>
            <DecryptedText text={BRAND_TAGLINE} speed={20} maxIterations={12} />
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-[4.25rem] font-bold font-display leading-[0.98] tracking-tight text-[#0E0E0E]">
            <SplitText
              text="Where Four Billion Years of Planetary Evolution Meet Human Culture."
              splitBy="words"
              delay={0.045}
            />
          </h1>

          <AnimatedContent distance={24} delay={0.18}>
            <p className="text-lg sm:text-xl text-[#0E0E0E]/85 max-w-2xl leading-relaxed font-body">
              {BRAND_SUBTITLE} Scrub through five tectonic stages, trigger the 66 Ma Chicxulub Asteroid Impact cutscene, and inspect 20 source-verified 3D fossil and artifact specimens.
            </p>
          </AnimatedContent>

          {/* Primary Action Bar with React Bits Magnet Pull & CTA.gallery Motion */}
          <AnimatedContent distance={26} delay={0.26}>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Magnet padding={44} magnetStrength={3.2}>
                <Button
                  variant="primary"
                  size="lg"
                  data-cursor-label="SCRUB 4.6 GA"
                  onClick={handleLaunchAtPreviewEra}
                >
                  <Compass className="w-5 h-5" />
                  <span>Launch 3D Earth ({activePreviewStage.name})</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Magnet>

              <Magnet padding={40} magnetStrength={3.5}>
                <Button
                  variant="secondary"
                  size="lg"
                  data-cursor-label="STAMP PASS"
                  onClick={() => navigate('/login')}
                >
                  <Ticket className="w-5 h-5" />
                  <span>
                    {pass ? `Stamped Pass: ${pass.ticketCode}` : 'Stamp 3D Admission Ticket'}
                  </span>
                </Button>
              </Magnet>
            </div>
          </AnimatedContent>

          {/* Telemetry Readout Bar with React Bits CountUp */}
          <AnimatedContent distance={28} delay={0.34}>
            <div className="pt-6 border-t-[3px] border-[#0E0E0E] grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono-tabular">
              <div className="bg-[#E8E1D5]/75 border-2 border-[#0E0E0E] p-3 shadow-[3px_3px_0px_#0E0E0E]">
                <div className="text-2xl font-bold text-[#0E0E0E]">
                  <CountUp from={0} to={4600} duration={1.8} suffix=" Ma" />
                </div>
                <div className="text-xs text-[#4A4742]">Non-Linear Time Span</div>
              </div>
              <div className="bg-[#E8E1D5]/75 border-2 border-[#0E0E0E] p-3 shadow-[3px_3px_0px_#0E0E0E]">
                <div className="text-2xl font-bold text-[#0E0E0E]">
                  <CountUp from={0} to={20} duration={1.4} suffix=" Items" />
                </div>
                <div className="text-xs text-[#4A4742]">14 Fossils · 6 Artifacts</div>
              </div>
              <div className="bg-[#E8E1D5]/75 border-2 border-[#0E0E0E] p-3 shadow-[3px_3px_0px_#0E0E0E]">
                <div className="text-2xl font-bold text-[#0E0E0E]">
                  <CountUp from={0} to={5} duration={1.2} prefix="0" suffix=" Eons" />
                </div>
                <div className="text-xs text-[#4A4742]">Hadean to Cenozoic</div>
              </div>
              <div className="bg-[#E8E1D5]/75 border-2 border-[#0E0E0E] p-3 shadow-[3px_3px_0px_#0E0E0E]">
                <div className="text-2xl font-bold text-[#0E0E0E]">
                  <CountUp from={0} to={66} duration={1.6} decimals={1} suffix=" Ma" />
                </div>
                <div className="text-xs text-[#4A4742]">Chicxulub Impact Cutscene</div>
              </div>
            </div>
          </AnimatedContent>
        </div>

        {/* Right 5 Columns: Live-Morphing 5-Eon 3D Planetary Viewport */}
        <AnimatedContent
          distance={36}
          direction="horizontal"
          delay={0.15}
          className="lg:col-span-5 space-y-3"
        >
          <div className="h-[400px] sm:h-[470px] lg:h-[510px] border-[4px] border-[#0E0E0E] shadow-[10px_10px_0px_#0E0E0E] bg-[#0E0E0E] relative overflow-hidden group">
            <BorderBeam
              colorFrom="#FFD400"
              colorTo={activePreviewStage.palette.sceneBgTint}
              duration={7}
            />

            {/* Top Live Era Telemetry Header */}
            <motion.div
              animate={reducedMotion ? undefined : { y: [0, -3, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-3.5 left-3.5 right-3.5 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none"
            >
              <span
                className="px-2.5 py-1 text-[11px] font-mono-tabular font-bold text-[#F2EDE4] border border-[#F2EDE4]/60 shadow-[2px_2px_0px_#0E0E0E]"
                style={{ backgroundColor: activePreviewStage.palette.sceneBgTint }}
              >
                STAGE {activePreviewStage.index} · {activePreviewStage.name.toUpperCase()} ({activePreviewStage.palette.sceneBgTint})
              </span>
              <span className="px-2.5 py-1 text-[11px] font-mono-tabular font-bold bg-[#0E0E0E]/90 text-[#FFD400] border border-[#FFD400]">
                O₂ {activePreviewStage.oxygenPercent}% · {activePreviewStage.meanSurfaceTempC}°C
              </span>
            </motion.div>

            <LazyCanvas
              cameraPosition={[0, 0.7, 4.1]}
              fov={42}
              onSetup={handleSetup}
              onFrame={handleFrame}
              ariaLabel={`Interactive 3D Preview of ${activePreviewStage.name} Earth`}
              overlay={
                <div className="absolute inset-x-3.5 bottom-3.5 z-20 space-y-2">
                  {/* Live 5-Eon Quick Switcher Bar inside the 3D Viewport */}
                  <div className="grid grid-cols-5 gap-1 bg-[#0E0E0E]/90 p-1.5 border-2 border-[#F2EDE4]/40">
                    {EVOLUTION_STAGES.map((stage, idx) => {
                      const isSelected = idx === previewStageIndex;
                      return (
                        <button
                          key={stage.id}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            soundEngine.playClick();
                            setPreviewStageIndex(idx);
                          }}
                          className={`px-1.5 py-1.5 text-[10px] font-mono-tabular font-bold border transition-all cursor-pointer truncate ${
                            isSelected
                              ? 'bg-[#FFD400] text-[#0E0E0E] border-[#0E0E0E] shadow-[2px_2px_0px_#F2EDE4]'
                              : 'bg-[#181818] text-[#F2EDE4]/80 border-[#F2EDE4]/20 hover:border-[#FFD400] hover:text-[#FFD400]'
                          }`}
                          title={`Preview Stage ${stage.index}: ${stage.name} (${stage.spanLabel})`}
                        >
                          {stage.index} {stage.name.split('–')[0]}
                        </button>
                      );
                    })}
                  </div>

                  {/* Clickable Launch Bar */}
                  <button
                    type="button"
                    onClick={handleLaunchAtPreviewEra}
                    data-cursor-label="OPEN GLOBE"
                    className="w-full flex items-center justify-between gap-2 bg-[#0E0E0E]/95 text-[#F2EDE4] border-2 border-[#F2EDE4] hover:border-[#FFD400] px-3.5 py-2 text-xs font-mono-tabular cursor-pointer transition-colors"
                  >
                    <span className="truncate">
                      <Flame className="w-3.5 h-3.5 text-[#FFD400] inline mr-1.5 -mt-0.5" />
                      {activePreviewStage.tectonicConfiguration} · {activePreviewStage.defaultMa} MA
                    </span>
                    <span className="text-[#FFD400] font-bold whitespace-nowrap">
                      ENTER HALL →
                    </span>
                  </button>
                </div>
              }
            />
          </div>
        </AnimatedContent>
      </div>
    </ArchitecturalGridBg>
  );
}
