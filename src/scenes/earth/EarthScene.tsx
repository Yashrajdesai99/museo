import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bot,
  ChevronDown,
  ChevronUp,
  Grid,
  Layers,
  Sparkles,
  Ticket,
  Volume2,
  VolumeX,
  X
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { LazyCanvas, type LazyCanvasContext } from '../../components/canvas/LazyCanvas';
import { DeepTimeSlider } from '../../components/ui/DeepTimeSlider';
import { CATALOG_ENTITIES, getEntityById, getStageForAgeMa } from '../../data';
import { GUIDED_TOURS } from '../../data/toursAndQuiz';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useTimeline } from '../../hooks/useTimeline';
import { getCulledEntitiesForAge } from '../../lib/culling';
import { isFossil } from '../../lib/guards';
import { soundEngine } from '../../lib/soundEngine';
import { useStudyStore } from '../../state/studyStore';
import type { ExtinctionEvent } from '../../types/evolution';
import {
  AsteroidImpactCutsceneOverlay,
  buildAsteroidImpact3DRig,
  type AsteroidCutscene3DHandles
} from './AsteroidImpactCutscene';
import {
  buildExtinctionMarkers3D,
  type ExtinctionMarkersHandles
} from './ExtinctionMarkers';
import { buildEarthGlobe, type GlobeHandles } from './Globe';
import { buildStageModelsRig, type StageModelsHandles } from './StageModels';

// Pre-allocated color objects for zero-GC 5-Era Tint interpolation in the render loop
const _targetBgColor = new THREE.Color();
const _targetKeyColor = new THREE.Color();

export function EarthScene() {
  const timeline = useTimeline();
  const reducedMotion = useReducedMotion();
  const {
    activeTourId,
    activeTourStep,
    setTourStep,
    stopTour,
    openNotebook,
    markStageVisited,
    audioMuted,
    toggleAudioMuted
  } = useStudyStore();

  const [showGrid, setShowGrid] = useState(true);
  const showGridRef = useRef(showGrid);
  showGridRef.current = showGrid;

  const globeRef = useRef<GlobeHandles | null>(null);
  const stageModelsRef = useRef<StageModelsHandles | null>(null);
  const markersRef = useRef<ExtinctionMarkersHandles | null>(null);
  const cutsceneRigRef = useRef<AsteroidCutscene3DHandles | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  const activeTour = GUIDED_TOURS.find((t) => t.id === activeTourId) ?? null;
  const currentTourStop = activeTour ? activeTour.stops[activeTourStep] : null;

  // Record visited stage in Field Notebook and cross-fade the 5-Era Ambient Sound Bed
  useEffect(() => {
    markStageVisited(timeline.activeStage.id);
    if (timeline.cutsceneState === 'idle') {
      soundEngine.setEraAmbient(timeline.activeStage.id);
    }
  }, [timeline.activeStage.id, timeline.cutsceneState, audioMuted]);

  // Stop ambient sound bed when leaving the Hall of Deep Time
  useEffect(() => {
    return () => {
      soundEngine.setEraAmbient(null);
    };
  }, []);

  // Keyboard shortcut [H] for Cinema / Zen Mode collapsible bottom dock
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === 'h' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        timeline.toggleHudCollapsed();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Advance cutscene progress timer and trigger synthesized impact audio
  useEffect(() => {
    if (timeline.cutsceneState !== 'asteroid-impact') return;

    // Suspend era ambient drone so the post-impact vacuum silence is pure
    soundEngine.stopEraAmbient();
    soundEngine.playAsteroidImpactSequence();

    let rafId = 0;
    const start = performance.now();
    const durationMs = 7500;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / durationMs);
      timeline.setCutsceneProgress(p);
      if (p < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [timeline.cutsceneState]);

  const handleSetup = ({ scene, camera, renderer, container }: LazyCanvasContext) => {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.minDistance = 2.45;
    controls.maxDistance = 6.5;
    controlsRef.current = controls;

    const globe = buildEarthGlobe();
    globeRef.current = globe;
    scene.add(globe.root);

    const markers = buildExtinctionMarkers3D();
    markersRef.current = markers;
    globe.earthMesh.add(markers.group);

    const stageModels = buildStageModelsRig();
    stageModelsRef.current = stageModels;
    scene.add(stageModels.root);

    const cutsceneRig = buildAsteroidImpact3DRig();
    cutsceneRigRef.current = cutsceneRig;
    scene.add(cutsceneRig.group);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const onPointerDown = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      if (!stageModelsRef.current) return;

      const hits = raycaster.intersectObjects(stageModelsRef.current.interactiveMeshes, false);
      if (hits.length > 0) {
        const hitEntityId = hits[0].object.userData?.entityId as string | undefined;
        if (hitEntityId) {
          soundEngine.playHotspotPing();
          timeline.setSelectedEntityId(hitEntityId);
        }
      }
    };

    container.addEventListener('pointerdown', onPointerDown);
    return () => {
      container.removeEventListener('pointerdown', onPointerDown);
      controls.dispose();
    };
  };

  const handleFrame = (
    { scene, camera, keyLight }: LazyCanvasContext,
    delta: number,
    elapsed: number
  ) => {
    const state = timeline;
    const isCutscene = state.cutsceneState === 'asteroid-impact';
    const stage = getStageForAgeMa(state.ageMa);

    // Smoothly interpolate 5-Era Scene Background Tint, Fog, and Directional Key Light Tint
    _targetBgColor.set(stage.palette.sceneBgTint);
    _targetKeyColor.set(stage.palette.keyLightTint);
    const lerpAlpha = Math.min(1, delta * 3.5);

    if (scene.background instanceof THREE.Color) {
      scene.background.lerp(_targetBgColor, lerpAlpha);
    }
    if (scene.fog instanceof THREE.FogExp2) {
      scene.fog.color.lerp(_targetBgColor, lerpAlpha);
    }
    keyLight.color.lerp(_targetKeyColor, lerpAlpha);

    if (globeRef.current) {
      globeRef.current.updateForAgeMa(state.ageMa, delta, showGridRef.current);
      if (!isCutscene && !reducedMotion) {
        globeRef.current.earthMesh.rotation.y += delta * 0.08;
      } else if (isCutscene) {
        globeRef.current.earthMesh.rotation.y = THREE.MathUtils.damp(
          globeRef.current.earthMesh.rotation.y,
          0,
          5,
          delta
        );
      }
    }

    if (markersRef.current) {
      markersRef.current.updateForAgeMa(state.ageMa, elapsed);
    }

    if (stageModelsRef.current) {
      stageModelsRef.current.updateForAgeMa(state.ageMa, state.selectedEntityId, delta);
    }

    if (cutsceneRigRef.current) {
      cutsceneRigRef.current.updateCutscene(
        isCutscene,
        state.cutsceneProgress,
        camera,
        reducedMotion
      );
    }

    if (controlsRef.current && !isCutscene) {
      controlsRef.current.update();
    }
  };

  const handleSliderScrub = (val: number) => {
    timeline.setSliderValue(val);
    soundEngine.playScrubTick(timeline.ageMa);
  };

  const handleSelectEvent = (event: ExtinctionEvent) => {
    soundEngine.playClick();
    timeline.setPlaying(false);
    timeline.setAgeMa(event.ageMa);
    if (event.hasCutscene) {
      timeline.triggerAsteroidCutscene();
    }
  };

  const handleJumpTourStep = (nextIndex: number) => {
    if (!activeTour) return;
    const stop = activeTour.stops[nextIndex];
    if (!stop) return;
    setTourStep(nextIndex);
    timeline.setPlaying(false);
    timeline.setAgeMa(stop.ageMa);
    timeline.setSelectedEntityId(stop.entityId);
  };

  const culledSpecimens = getCulledEntitiesForAge(
    timeline.ageMa,
    timeline.activeStage.id,
    CATALOG_ENTITIES,
    0.22
  );

  const focusedEntity =
    (timeline.selectedEntityId && getEntityById(timeline.selectedEntityId)) ||
    culledSpecimens[0]?.entity ||
    CATALOG_ENTITIES[0];

  return (
    <div
      className="relative w-full h-[calc(100vh-68px)] min-h-[680px] bg-[#0E0E0E] overflow-hidden"
      data-cursor-label="DRAG GLOBE"
    >
      <LazyCanvas
        cameraPosition={[0, 0.9, 4.35]}
        fov={42}
        backgroundColor={0x0e0e0e}
        onSetup={handleSetup}
        onFrame={handleFrame}
        ariaLabel="Interactive 4.6-Billion-Year Earth Evolution Globe and Specimen Orbit"
        overlay={
          <>
            {/* Top-Left Stage Telemetry & Viewport Controls */}
            <div className="absolute top-5 left-6 right-6 flex flex-wrap items-start justify-between gap-4 pointer-events-none z-10">
              <div className="bg-[#0E0E0E] text-[#F2EDE4] border-[3px] border-[#F2EDE4] p-4 max-w-md pointer-events-auto space-y-2.5">
                <div className="flex items-center justify-between gap-2 text-xs font-mono-tabular text-[#FFD400]">
                  <span>
                    STAGE {timeline.activeStage.index} · {timeline.activeStage.spanLabel}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        setShowGrid(!showGrid);
                      }}
                      className={`px-2 py-0.5 text-[10px] border cursor-pointer inline-flex items-center gap-1 ${
                        showGrid
                          ? 'bg-[#FFD400] text-[#0E0E0E] border-[#FFD400] font-bold'
                          : 'bg-transparent text-[#F2EDE4] border-[#F2EDE4]/40'
                      }`}
                      title="Toggle Lat-Long Cartographic Graticule"
                    >
                      <Grid className="w-3 h-3" />
                      <span>Grid</span>
                    </button>

                    <button
                      type="button"
                      onClick={toggleAudioMuted}
                      className="px-2 py-0.5 text-[10px] border border-[#F2EDE4]/40 text-[#F2EDE4] cursor-pointer inline-flex items-center gap-1"
                      title="Toggle Web Audio Acoustics"
                    >
                      {audioMuted ? (
                        <VolumeX className="w-3 h-3" />
                      ) : (
                        <Volume2 className="w-3 h-3 text-[#FFD400]" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h1 className="text-xl sm:text-2xl font-bold font-display">
                      {timeline.activeStage.name}
                    </h1>
                    <span
                      className="px-2 py-0.5 text-[10px] font-mono-tabular font-bold border border-[#F2EDE4]/40 text-[#F2EDE4]"
                      style={{ backgroundColor: timeline.activeStage.palette.sceneBgTint }}
                    >
                      {timeline.activeStage.palette.eraTintName}
                    </span>
                  </div>
                  <p className="text-xs text-[#F2EDE4]/80 mt-0.5 leading-relaxed">
                    {timeline.activeStage.tectonicConfiguration}
                  </p>
                </div>

                {/* Dry, curious Robot Docent quip & ambient bed indicator */}
                <div className="bg-[#1C1C1C] border border-[#F2EDE4]/25 p-2.5 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono-tabular text-[#FFD400]">
                    <span className="inline-flex items-center gap-1">
                      <Bot className="w-3 h-3" />
                      <span>ROBOT DOCENT // ERA LOG</span>
                    </span>
                    <span className="text-[#F2EDE4]/70 truncate max-w-[180px]">
                      {audioMuted ? 'Audio Muted' : timeline.activeStage.ambientSoundLabel}
                    </span>
                  </div>
                  <p className="text-xs text-[#F2EDE4]/90 italic leading-snug">
                    "{timeline.activeStage.robotQuip}"
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[#F2EDE4]/20 text-[11px] font-mono-tabular text-[#F2EDE4]/90">
                  <span>O₂: {timeline.activeStage.oxygenPercent}%</span>
                  <span aria-hidden="true">·</span>
                  <span>Mean Temp: {timeline.activeStage.meanSurfaceTempC}°C</span>
                  <span aria-hidden="true">·</span>
                  <span>Orbiting Models: {culledSpecimens.length}/20</span>
                </div>

                {!activeTour && (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => openNotebook('tours')}
                      className="py-1.5 px-2.5 text-xs font-bold font-display bg-[#FFD400] text-[#0E0E0E] border border-[#0E0E0E] flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#ffdf33] whitespace-nowrap"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Docent Tour</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openNotebook('stub')}
                      className="py-1.5 px-2.5 text-xs font-bold font-display bg-[#F2EDE4] text-[#0E0E0E] border border-[#0E0E0E] flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#E8E1D5] whitespace-nowrap"
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      <span>Ticket Stub PNG</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Active Guided Docent Tour Controller OR Focused Specimen Quick Card */}
              {activeTour && currentTourStop ? (
                <div className="bg-[#F2EDE4] text-[#0E0E0E] border-[3px] border-[#0E0E0E] shadow-[6px_6px_0px_#FFD400] p-4 max-w-md pointer-events-auto space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono-tabular font-bold">
                    <span className="bg-[#0E0E0E] text-[#FFD400] px-2 py-0.5">
                      DOCENT TOUR {activeTour.index} · STOP {activeTourStep + 1}/{activeTour.stops.length}
                    </span>
                    <button
                      type="button"
                      onClick={stopTour}
                      className="p-1 text-[#0E0E0E] hover:bg-[#0E0E0E]/10 cursor-pointer"
                      title="Exit Guided Tour"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-base font-bold font-display">
                    {currentTourStop.headline}
                  </div>

                  <p className="text-xs text-[#0E0E0E]/85 leading-relaxed">
                    "{currentTourStop.docentCommentary}"
                  </p>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#0E0E0E]/20">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        disabled={activeTourStep === 0}
                        onClick={() => handleJumpTourStep(activeTourStep - 1)}
                        className="px-2.5 py-1 text-xs font-bold font-display bg-white border-2 border-[#0E0E0E] disabled:opacity-40 cursor-pointer inline-flex items-center gap-1"
                      >
                        <ArrowLeft className="w-3 h-3" />
                        <span>Prev</span>
                      </button>

                      <button
                        type="button"
                        disabled={activeTourStep + 1 >= activeTour.stops.length}
                        onClick={() => handleJumpTourStep(activeTourStep + 1)}
                        className="px-2.5 py-1 text-xs font-bold font-display bg-[#FFD400] border-2 border-[#0E0E0E] disabled:opacity-40 cursor-pointer inline-flex items-center gap-1"
                      >
                        <span>Next Stop</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    <Link
                      to={`/gallery/${currentTourStop.entityId}`}
                      state={{ fromGalleryCard: true, cardTitle: currentTourStop.headline }}
                      className="inline-flex items-center gap-1 text-xs font-bold font-display bg-[#0E0E0E] text-[#FFD400] px-2.5 py-1 border border-[#0E0E0E]"
                    >
                      <span>3D Detail</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ) : (
                focusedEntity &&
                !timeline.isHudCollapsed && (
                  <div className="bg-[#F2EDE4] text-[#0E0E0E] border-[3px] border-[#0E0E0E] shadow-[6px_6px_0px_#FFD400] p-4 max-w-xs pointer-events-auto space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono-tabular text-[#4A4742]">
                      <span>{focusedEntity.accessionNumber}</span>
                      <span className="font-bold text-[#0E0E0E]">{focusedEntity.ageDisplay}</span>
                    </div>
                    <div className="text-sm font-bold font-display leading-snug">
                      {focusedEntity.name}
                    </div>
                    <p className="text-xs text-[#0E0E0E]/85 line-clamp-2 italic">
                      "{focusedEntity.hook}"
                    </p>
                    <div className="text-xs font-mono-tabular text-[#4A4742] truncate">
                      {isFossil(focusedEntity)
                        ? `${focusedEntity.taxon} · ${focusedEntity.locality}`
                        : `${focusedEntity.culture} · ${focusedEntity.originRegion}`}
                    </div>
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <Link
                        to={`/gallery/${focusedEntity.id}`}
                        state={{ fromGalleryCard: true, cardTitle: focusedEntity.name }}
                        data-cursor-label="OPEN"
                        className="inline-flex items-center gap-1 text-xs font-bold font-display bg-[#0E0E0E] text-[#FFD400] px-2.5 py-1.5 border border-[#0E0E0E] hover:bg-[#FFD400] hover:text-[#0E0E0E] transition-colors"
                      >
                        <span>Inspect 3D</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>

                      <div className="flex items-center gap-1 overflow-x-auto max-w-[140px]">
                        {culledSpecimens.slice(0, 4).map(({ entity }) => (
                          <button
                            key={entity.id}
                            type="button"
                            onClick={() => {
                              soundEngine.playHotspotPing();
                              timeline.setSelectedEntityId(entity.id);
                            }}
                            className={`px-1.5 py-1 text-[10px] font-mono-tabular border border-[#0E0E0E] cursor-pointer ${
                              entity.id === focusedEntity.id
                                ? 'bg-[#FFD400] text-[#0E0E0E] font-bold'
                                : 'bg-white text-[#0E0E0E]'
                            }`}
                            title={entity.name}
                          >
                            {entity.accessionNumber.replace('ACC-', '')}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Single Cinematic Cutscene Overlay (66 Ma Chicxulub Asteroid Impact) */}
            {timeline.cutsceneState === 'asteroid-impact' && (
              <AsteroidImpactCutsceneOverlay
                progress={timeline.cutsceneProgress}
                onClose={timeline.stopCutscene}
              />
            )}

            {/* Collapsible Unified Bottom Control Dock (Cinema / Zen Mode Drawer) */}
            <div
              className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-[95vw] max-w-[960px] z-20 transition-transform duration-200 ${
                timeline.isHudCollapsed ? 'translate-y-[calc(100%-36px)]' : 'translate-y-0'
              }`}
            >
              <div className="flex justify-center mb-1">
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    timeline.toggleHudCollapsed();
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-1 text-xs font-mono-tabular font-bold bg-[#0E0E0E] text-[#F2EDE4] border-2 border-[#F2EDE4] cursor-pointer hover:bg-[#FFD400] hover:text-[#0E0E0E] hover:border-[#0E0E0E]"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>
                    {timeline.isHudCollapsed
                      ? '▴ Show Timeline Controls [H]'
                      : '▾ Hide Dock (Cinema Mode [H])'}
                  </span>
                  {timeline.isHudCollapsed ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <DeepTimeSlider
                ageMa={timeline.ageMa}
                sliderValue={timeline.sliderValue}
                activeStageId={timeline.activeStage.id}
                isPlaying={timeline.isPlaying}
                onSliderChange={handleSliderScrub}
                onSelectStage={(stageId) => {
                  soundEngine.playClick();
                  timeline.selectStage(stageId);
                }}
                onSelectEvent={handleSelectEvent}
                onTogglePlay={() => {
                  soundEngine.playClick();
                  timeline.togglePlay();
                }}
                onTriggerCutscene={() => {
                  soundEngine.playClick();
                  timeline.triggerAsteroidCutscene();
                }}
                onReset={() => {
                  soundEngine.playClick();
                  timeline.setPlaying(false);
                  timeline.setAgeMa(4600);
                }}
              />
            </div>
          </>
        }
      />
    </div>
  );
}
