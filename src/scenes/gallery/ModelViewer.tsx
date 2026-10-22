import { Box, Eye, Layers, RotateCcw, Ruler, Sun } from 'lucide-react';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { LazyCanvas, type LazyCanvasContext } from '../../components/canvas/LazyCanvas';
import { createSpecimenModelObject } from '../../components/canvas/ModelLoader';
import { SPECIMEN_HOTSPOTS, type SpecimenHotspot } from '../../data/toursAndQuiz';
import {
  applySpecimenRenderMode,
  updateExplodedView
} from '../../lib/proceduralModels';
import { soundEngine } from '../../lib/soundEngine';
import type { CatalogEntity } from '../../types/catalog';

interface ModelViewerProps {
  entity: CatalogEntity;
}

const _projVec = new THREE.Vector3();

export function ModelViewer({ entity }: ModelViewerProps) {
  const hotspots = SPECIMEN_HOTSPOTS[entity.modelPreset] ?? [];

  const [renderMode, setRenderMode] = useState<'pbr' | 'wireframe' | 'xray'>('pbr');
  const [autoRotate, setAutoRotate] = useState(true);
  const [lightingMode, setLightingMode] = useState<'studio' | 'raking'>('studio');
  const [explodePercent, setExplodePercent] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<SpecimenHotspot | null>(
    hotspots[0] ?? null
  );
  const [showHotspots, setShowHotspots] = useState(true);
  const [showCaliper, setShowCaliper] = useState(false);

  const specimenGroupRef = useRef<THREE.Group | null>(null);
  const caliperGroupRef = useRef<THREE.Group | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const pinElementsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const autoRotateRef = useRef(autoRotate);
  autoRotateRef.current = autoRotate;

  const explodeFactorRef = useRef(0);
  explodeFactorRef.current = explodePercent / 100;

  const showCaliperRef = useRef(showCaliper);
  showCaliperRef.current = showCaliper;

  const handleSetup = ({ scene, camera, renderer }: LazyCanvasContext) => {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 1.6;
    controls.maxDistance = 6.0;
    controlsRef.current = controls;

    const specimenObj = createSpecimenModelObject({
      preset: entity.modelPreset,
      glbPath: entity.model,
      wireframe: false,
      includePedestal: true
    });
    specimenGroupRef.current = specimenObj;
    scene.add(specimenObj);

    // 3D Laser Caliper Bounding Cage & Paleontological Coordinate Grid
    const caliperGroup = new THREE.Group();
    const boxGeo = new THREE.BoxGeometry(1.75, 1.75, 1.75);
    const edgesGeo = new THREE.EdgesGeometry(boxGeo);
    const edgesMat = new THREE.LineBasicMaterial({
      color: 0xffd400,
      transparent: true,
      opacity: 0.85
    });
    const wireframeBox = new THREE.LineSegments(edgesGeo, edgesMat);
    wireframeBox.position.y = 0.15;
    caliperGroup.add(wireframeBox);

    const floorGrid = new THREE.GridHelper(3.2, 16, 0xffd400, 0x4a4742);
    floorGrid.position.y = -0.82;
    caliperGroup.add(floorGrid);

    caliperGroup.visible = showCaliperRef.current;
    caliperGroupRef.current = caliperGroup;
    specimenObj.add(caliperGroup);

    const shadowGeo = new THREE.CircleGeometry(1.75, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x050505,
      transparent: true,
      opacity: 0.45,
      depthWrite: false
    });
    const contactPlane = new THREE.Mesh(shadowGeo, shadowMat);
    contactPlane.rotation.x = -Math.PI / 2;
    contactPlane.position.y = -1.35;
    scene.add(contactPlane);

    return () => {
      controls.dispose();
      boxGeo.dispose();
      edgesGeo.dispose();
      edgesMat.dispose();
    };
  };

  const handleFrame = ({ camera, container }: LazyCanvasContext, delta: number) => {
    const group = specimenGroupRef.current;
    if (caliperGroupRef.current) {
      caliperGroupRef.current.visible = showCaliperRef.current;
    }

    if (group) {
      if (autoRotateRef.current) {
        group.rotation.y += delta * 0.36;
      }
      updateExplodedView(group, explodeFactorRef.current, delta);

      // Project 3D anatomical hotspot coordinates into 2D viewport screen coordinates
      const width = container.clientWidth || 800;
      const height = container.clientHeight || 500;
      const ex = explodeFactorRef.current;

      hotspots.forEach((hs, idx) => {
        const pinEl = pinElementsRef.current[idx];
        if (!pinEl) return;

        _projVec.set(
          hs.localPosition[0] + hs.explodeOffset[0] * ex,
          hs.localPosition[1] + hs.explodeOffset[1] * ex,
          hs.localPosition[2] + hs.explodeOffset[2] * ex
        );
        _projVec.applyMatrix4(group.matrixWorld);
        _projVec.project(camera);

        const screenX = (_projVec.x * 0.5 + 0.5) * width;
        const screenY = (-_projVec.y * 0.5 + 0.5) * height;
        const isBehindCamera = _projVec.z > 1.0;

        pinEl.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) translate(-50%, -50%)`;
        pinEl.style.opacity = isBehindCamera ? '0' : '1';
      });
    }

    if (controlsRef.current) {
      controlsRef.current.update();
    }
  };

  const cycleRenderMode = (nextMode: 'pbr' | 'wireframe' | 'xray') => {
    soundEngine.playClick();
    setRenderMode(nextMode);
    if (specimenGroupRef.current) {
      applySpecimenRenderMode(specimenGroupRef.current, nextMode);
    }
  };

  const resetCamera = () => {
    soundEngine.playClick();
    setExplodePercent(0);
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
    if (specimenGroupRef.current) {
      specimenGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  return (
    <div className="relative w-full h-[520px] sm:h-[600px] border-[4px] border-[#0E0E0E] shadow-[8px_8px_0px_#0E0E0E] bg-[#0E0E0E] overflow-hidden">
      <LazyCanvas
        key={entity.id}
        cameraPosition={[0, 0.45, 3.35]}
        fov={40}
        backgroundColor={lightingMode === 'studio' ? 0x0e0e0e : 0x1a1714}
        onSetup={handleSetup}
        onFrame={handleFrame}
        ariaLabel={`3D Interactive Specimen Workbench for ${entity.name}`}
        overlay={
          <>
            {/* Projected 3D Anatomical Callout Pins Layer */}
            {showHotspots && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                {hotspots.map((hs, idx) => {
                  const isSelected = activeHotspot?.id === hs.id;
                  return (
                    <button
                      key={hs.id}
                      ref={(el) => {
                        pinElementsRef.current[idx] = el;
                      }}
                      type="button"
                      onClick={() => {
                        soundEngine.playHotspotPing(idx);
                        setActiveHotspot(hs);
                      }}
                      className={`pointer-events-auto absolute top-0 left-0 w-7 h-7 font-mono-tabular text-xs font-bold border-2 flex items-center justify-center cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[#FFD400] text-[#0E0E0E] border-[#0E0E0E] shadow-[3px_3px_0px_#0E0E0E] scale-110'
                          : 'bg-[#0E0E0E] text-[#F2EDE4] border-[#FFD400] hover:bg-[#FFD400] hover:text-[#0E0E0E]'
                      }`}
                      title={`Inspect Hotspot ${hs.index}: ${hs.title}`}
                    >
                      {hs.index}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Top-Left Specimen Scale & Active Anatomical Callout Card */}
            <div className="absolute top-4 left-4 right-4 flex flex-wrap items-start justify-between gap-3 pointer-events-none z-20">
              <div className="bg-[#0E0E0E]/90 text-[#F2EDE4] border-2 border-[#F2EDE4] px-3.5 py-2 text-xs font-mono-tabular">
                <div className="text-[#FFD400] font-bold">
                  {entity.accessionNumber} · 3D ANATOMICAL WORKBENCH
                </div>
                <div>
                  Scale: {entity.dimensions}{' '}
                  {showCaliper ? '· LASER CALIPER GRID ACTIVE' : ''}
                </div>
              </div>

              {activeHotspot && showHotspots && (
                <div className="bg-[#F2EDE4] text-[#0E0E0E] border-[3px] border-[#0E0E0E] shadow-[5px_5px_0px_#FFD400] p-3.5 max-w-xs pointer-events-auto space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono-tabular font-bold text-[#4A4742]">
                    <span>ANATOMICAL PIN {activeHotspot.index}</span>
                    <div className="flex gap-1">
                      {hotspots.map((h, i) => (
                        <button
                          key={h.id}
                          type="button"
                          onClick={() => {
                            soundEngine.playHotspotPing(i);
                            setActiveHotspot(h);
                          }}
                          className={`px-1.5 py-0.5 text-[10px] border border-[#0E0E0E] cursor-pointer ${
                            h.id === activeHotspot.id
                              ? 'bg-[#FFD400] text-[#0E0E0E] font-bold'
                              : 'bg-white text-[#0E0E0E]'
                          }`}
                        >
                          {h.index}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm font-bold font-display">
                    {activeHotspot.title}
                  </div>
                  <p className="text-xs text-[#0E0E0E]/85 leading-relaxed">
                    {activeHotspot.detail}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Unified Workbench Dock: Exploded View Slider + Shader, Caliper & Lighting Controls */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[94%] max-w-[720px] bg-[#F2EDE4] text-[#0E0E0E] border-[3px] border-[#0E0E0E] shadow-[5px_5px_0px_#FFD400] p-3 space-y-2.5 z-20">
              {/* Exploded View Kinematics Slider */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono-tabular font-bold whitespace-nowrap flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5" />
                  <span>EXPLODED VIEW: {explodePercent}%</span>
                </span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={explodePercent}
                  onChange={(e) => setExplodePercent(Number(e.target.value))}
                  aria-label="Explode 3D Specimen Anatomical Layers"
                  className="flex-1 accent-[#0E0E0E] cursor-pointer h-2 bg-[#0E0E0E]/20"
                />
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setExplodePercent(explodePercent > 0 ? 0 : 75);
                  }}
                  className="px-2 py-0.5 text-[11px] font-mono-tabular font-bold bg-[#FFD400] border border-[#0E0E0E] cursor-pointer whitespace-nowrap"
                >
                  {explodePercent > 0 ? 'Assemble' : 'Explode 75%'}
                </button>
              </div>

              {/* Shader, Hotspot, Caliper & Turntable Controls */}
              <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1.5 border-t border-[#0E0E0E]/20">
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => cycleRenderMode('pbr')}
                    className={`px-2.5 py-1 text-xs font-bold font-display border border-[#0E0E0E] cursor-pointer whitespace-nowrap ${
                      renderMode === 'pbr'
                        ? 'bg-[#0E0E0E] text-[#FFD400]'
                        : 'bg-white text-[#0E0E0E]'
                    }`}
                  >
                    Studio PBR
                  </button>

                  <button
                    type="button"
                    onClick={() => cycleRenderMode('xray')}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold font-display border border-[#0E0E0E] cursor-pointer whitespace-nowrap ${
                      renderMode === 'xray'
                        ? 'bg-[#0E0E0E] text-[#FFD400]'
                        : 'bg-white text-[#0E0E0E]'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>GLSL X-Ray</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => cycleRenderMode('wireframe')}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold font-display border border-[#0E0E0E] cursor-pointer whitespace-nowrap ${
                      renderMode === 'wireframe'
                        ? 'bg-[#0E0E0E] text-[#FFD400]'
                        : 'bg-white text-[#0E0E0E]'
                    }`}
                  >
                    <Box className="w-3.5 h-3.5" />
                    <span>Wireframe</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setShowHotspots(!showHotspots);
                    }}
                    className={`px-2.5 py-1 text-xs font-bold font-display border border-[#0E0E0E] cursor-pointer whitespace-nowrap ${
                      showHotspots
                        ? 'bg-[#FFD400] text-[#0E0E0E]'
                        : 'bg-white text-[#0E0E0E]'
                    }`}
                  >
                    Pins: {showHotspots ? 'ON' : 'OFF'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setShowCaliper(!showCaliper);
                    }}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold font-display border border-[#0E0E0E] cursor-pointer whitespace-nowrap ${
                      showCaliper
                        ? 'bg-[#FFD400] text-[#0E0E0E]'
                        : 'bg-white text-[#0E0E0E]'
                    }`}
                    title="Toggle 3D Laser Caliper Bounding Cage & Scale Grid"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Caliper: {showCaliper ? 'ON' : 'OFF'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setAutoRotate(!autoRotate);
                    }}
                    className={`px-2.5 py-1 text-xs font-bold font-display border border-[#0E0E0E] cursor-pointer whitespace-nowrap ${
                      autoRotate ? 'bg-[#0E0E0E] text-[#FFD400]' : 'bg-white text-[#0E0E0E]'
                    }`}
                  >
                    {autoRotate ? 'Spin: ON' : 'Spin: OFF'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setLightingMode(lightingMode === 'studio' ? 'raking' : 'studio');
                    }}
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold font-display bg-white text-[#0E0E0E] border border-[#0E0E0E] cursor-pointer"
                    title="Switch Lighting Mode"
                  >
                    <Sun className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={resetCamera}
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold font-display bg-white text-[#0E0E0E] border border-[#0E0E0E] cursor-pointer"
                    title="Reset Camera & Assembly"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </>
        }
      />
    </div>
  );
}
