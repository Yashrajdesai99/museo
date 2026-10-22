import { ArrowLeftRight, ArrowUpRight, Box, Compass, Eye, Layers, Sparkles } from 'lucide-react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { LazyCanvas, type LazyCanvasContext } from '../../../components/canvas/LazyCanvas';
import { createSpecimenModelObject } from '../../../components/canvas/ModelLoader';
import {
  AnimatedContent,
  DecryptedText,
  SplitText
} from '../../../components/reactbits';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { CATALOG_ENTITIES, getEntityById, getStageById } from '../../../data';
import { isFossil } from '../../../lib/guards';
import { applySpecimenRenderMode } from '../../../lib/proceduralModels';
import { soundEngine } from '../../../lib/soundEngine';
import type { CatalogEntity } from '../../../types/catalog';

interface CuratedPairing {
  id: string;
  label: string;
  leftId: string;
  rightId: string;
  themeNote: string;
}

const CURATED_PAIRINGS: CuratedPairing[] = [
  {
    id: 'crust-to-tool',
    label: '01. Oldest Crust vs. First Tool',
    leftId: 'jack-hills-zircon',
    rightId: 'lomekwi-stone-core',
    themeNote: 'From Earth’s earliest 4,404 Ma continental mineral crystal to the first 3.3 Ma hominin basalt anvil.'
  },
  {
    id: 'apex-predators',
    label: '02. Cambrian vs. Cretaceous Apex',
    leftId: 'anomalocaris-canadensis',
    rightId: 'tyrannosaurus-rex-skull',
    themeNote: 'Comparing Earth’s first marine super-predator (508 Ma) with the ultimate terrestrial theropod (66.5 Ma).'
  },
  {
    id: 'biosphere-to-monolith',
    label: '03. First Oxygen vs. First Temple',
    leftId: 'pilbara-stromatolite',
    rightId: 'gobekli-tepe-pillar',
    themeNote: '3.48 billion years separating microbial limestone reefs from monumental Neolithic T-pillars.'
  },
  {
    id: 'flight-evolution',
    label: '04. Early Tetrapod vs. Feathered Dino',
    leftId: 'tiktaalik-roseae',
    rightId: 'archaeopteryx-berlin',
    themeNote: 'Devonian fin-to-limb vertebrate transition (375 Ma) contrasted with Jurassic aerodynamic flight feathers (150 Ma).'
  }
];

function MiniSpecimenViewport({
  entity,
  renderMode
}: {
  entity: CatalogEntity;
  renderMode: 'pbr' | 'xray' | 'wireframe';
}) {
  const groupRef = useRef<THREE.Group | null>(null);
  const modeRef = useRef(renderMode);
  modeRef.current = renderMode;

  const handleSetup = ({ scene }: LazyCanvasContext) => {
    const obj = createSpecimenModelObject({
      preset: entity.modelPreset,
      glbPath: entity.model,
      wireframe: false,
      includePedestal: true
    });
    applySpecimenRenderMode(obj, modeRef.current);
    groupRef.current = obj;
    scene.add(obj);
  };

  const handleFrame = (_ctx: LazyCanvasContext, delta: number) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.42;
      applySpecimenRenderMode(groupRef.current, modeRef.current);
    }
  };

  const stage = getStageById(entity.stageIds[0]);

  return (
    <div className="relative h-[260px] sm:h-[300px] border-[3px] border-[#0E0E0E] bg-[#0E0E0E] overflow-hidden">
      <LazyCanvas
        key={entity.id}
        cameraPosition={[0, 0.45, 3.4]}
        fov={40}
        onSetup={handleSetup}
        onFrame={handleFrame}
        ariaLabel={`3D Comparison Viewport for ${entity.name}`}
        overlay={
          <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2 pointer-events-none z-10">
            <span className="px-2 py-0.5 text-[11px] font-mono-tabular font-bold bg-[#0E0E0E]/90 text-[#FFD400] border border-[#FFD400]">
              {entity.accessionNumber} · {entity.ageDisplay}
            </span>
            <span
              className="px-2 py-0.5 text-[10px] font-mono-tabular font-bold text-[#F2EDE4] border border-[#F2EDE4]/50"
              style={{ backgroundColor: stage.palette.sceneBgTint }}
            >
              Stage {stage.index}: {stage.name}
            </span>
          </div>
        }
      />
    </div>
  );
}

export function StratigraphicComparatorSection() {
  const navigate = useNavigate();
  const [leftId, setLeftId] = useState<string>('jack-hills-zircon');
  const [rightId, setRightId] = useState<string>('lomekwi-stone-core');
  const [renderMode, setRenderMode] = useState<'pbr' | 'xray' | 'wireframe'>('pbr');
  const [activePairingNote, setActivePairingNote] = useState<string>(
    CURATED_PAIRINGS[0].themeNote
  );

  const leftEntity = getEntityById(leftId) ?? CATALOG_ENTITIES[0];
  const rightEntity = getEntityById(rightId) ?? CATALOG_ENTITIES[14];

  const leftStage = getStageById(leftEntity.stageIds[0]);
  const rightStage = getStageById(rightEntity.stageIds[0]);

  const deltaMa = Math.abs(leftEntity.ageMa - rightEntity.ageMa);
  const earthSpanPercent = ((deltaMa / 4600) * 100).toFixed(1);

  const handleSelectPairing = (pairing: CuratedPairing) => {
    soundEngine.playClick();
    setLeftId(pairing.leftId);
    setRightId(pairing.rightId);
    setActivePairingNote(pairing.themeNote);
  };

  const handleSwapSpecimens = () => {
    soundEngine.playClick();
    setLeftId(rightId);
    setRightId(leftId);
  };

  return (
    <section className="border-b-[4px] border-[#0E0E0E] bg-[#F2EDE4] py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b-[3px] border-[#0E0E0E] pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono-tabular font-bold text-[#0E0E0E] bg-[#FFD400] px-2.5 py-1 border-2 border-[#0E0E0E]">
              <Layers className="w-3.5 h-3.5" />
              <span>ACT III-B · STRATIGRAPHIC CROSS-EXAMINATION LAB</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-[#0E0E0E]">
              <SplitText
                text="Side-by-Side 3D Specimen & Deep-Time Comparator"
                splitBy="words"
                delay={0.04}
              />
            </h2>
          </div>

          {/* Synchronized 3D Shader Mode Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono-tabular font-bold text-[#4A4742] mr-1">
              SYNC SHADER:
            </span>
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setRenderMode('pbr');
              }}
              className={`px-3 py-1.5 text-xs font-bold font-display border-2 border-[#0E0E0E] cursor-pointer ${
                renderMode === 'pbr'
                  ? 'bg-[#0E0E0E] text-[#FFD400] shadow-[3px_3px_0px_#FFD400]'
                  : 'bg-[#E8E1D5] text-[#0E0E0E]'
              }`}
            >
              Studio PBR
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setRenderMode('xray');
              }}
              className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold font-display border-2 border-[#0E0E0E] cursor-pointer ${
                renderMode === 'xray'
                  ? 'bg-[#0E0E0E] text-[#FFD400] shadow-[3px_3px_0px_#FFD400]'
                  : 'bg-[#E8E1D5] text-[#0E0E0E]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>GLSL X-Ray</span>
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setRenderMode('wireframe');
              }}
              className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold font-display border-2 border-[#0E0E0E] cursor-pointer ${
                renderMode === 'wireframe'
                  ? 'bg-[#0E0E0E] text-[#FFD400] shadow-[3px_3px_0px_#FFD400]'
                  : 'bg-[#E8E1D5] text-[#0E0E0E]'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>Wireframe</span>
            </button>
          </div>
        </div>

        {/* Curated Evolutionary Pairings Bar */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono-tabular font-bold text-[#4A4742] mr-1">
              CURATED PAIRINGS:
            </span>
            {CURATED_PAIRINGS.map((pairing) => {
              const isCurrent =
                (leftId === pairing.leftId && rightId === pairing.rightId) ||
                (leftId === pairing.rightId && rightId === pairing.leftId);
              return (
                <button
                  key={pairing.id}
                  type="button"
                  onClick={() => handleSelectPairing(pairing)}
                  className={`px-3.5 py-2 text-xs font-bold font-display border-2 border-[#0E0E0E] transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-[#FFD400] text-[#0E0E0E] shadow-[4px_4px_0px_#0E0E0E]'
                      : 'bg-[#E8E1D5] text-[#0E0E0E] hover:bg-white'
                  }`}
                >
                  {pairing.label}
                </button>
              );
            })}
          </div>
          <p className="text-sm font-mono-tabular text-[#4A4742]">
            <Sparkles className="w-3.5 h-3.5 inline mr-1.5 text-[#0E0E0E]" />
            {activePairingNote}
          </p>
        </div>

        {/* Central Temporal Delta Telemetry Banner */}
        <AnimatedContent distance={22}>
          <div className="bg-[#0E0E0E] text-[#F2EDE4] border-[3px] border-[#0E0E0E] shadow-[8px_8px_0px_#FFD400] p-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4 space-y-1">
              <div className="text-[11px] font-mono-tabular text-[#FFD400] font-bold">
                DEEP-TIME SEPARATION INTERVAL (Δ MA)
              </div>
              <div className="text-3xl sm:text-4xl font-bold font-mono-tabular text-[#F2EDE4]">
                <DecryptedText
                  text={`${deltaMa.toLocaleString(undefined, { maximumFractionDigits: 2 })} Million Years`}
                  speed={18}
                  maxIterations={10}
                />
              </div>
            </div>

            <div className="md:col-span-5 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono-tabular">
                <span className="text-[#FFD400] font-bold">
                  PLANETARY TIMELINE SPAN: {earthSpanPercent}% OF EARTH HISTORY
                </span>
                <span>4,600 Ma Scale</span>
              </div>
              {/* Stratigraphic Span Bar */}
              <div className="h-4 bg-[#1C1C1C] border-2 border-[#F2EDE4]/40 relative overflow-hidden">
                <div
                  className="absolute top-0 bottom-0 bg-[#FFD400]"
                  style={{
                    left: `${Math.min(
                      ((4600 - Math.max(leftEntity.ageMa, rightEntity.ageMa)) / 4600) * 100,
                      96
                    )}%`,
                    width: `${Math.max((deltaMa / 4600) * 100, 3)}%`
                  }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-mono-tabular text-[#F2EDE4]/70">
                <span>4,600 Ma (Hadean Origin)</span>
                <span>0 Ma (Present)</span>
              </div>
            </div>

            <div className="md:col-span-3 flex md:justify-end">
              <Button variant="primary" size="sm" onClick={handleSwapSpecimens}>
                <ArrowLeftRight className="w-4 h-4" />
                <span>Swap A / B Specimens</span>
              </Button>
            </div>
          </div>
        </AnimatedContent>

        {/* Side-by-Side Specimen Comparison Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[
            {
              slot: 'SPECIMEN A (OLDER / LEFT)',
              entity: leftEntity,
              stage: leftStage,
              selectedId: leftId,
              onSelect: setLeftId
            },
            {
              slot: 'SPECIMEN B (YOUNGER / RIGHT)',
              entity: rightEntity,
              stage: rightStage,
              selectedId: rightId,
              onSelect: setRightId
            }
          ].map(({ slot, entity, stage, selectedId, onSelect }) => (
            <div
              key={slot}
              className="bg-[#E8E1D5] border-[3px] border-[#0E0E0E] shadow-[8px_8px_0px_#0E0E0E] p-5 sm:p-6 space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Selector Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#0E0E0E] pb-3">
                  <span className="text-xs font-mono-tabular font-bold text-[#4A4742]">
                    {slot}
                  </span>
                  <select
                    aria-label={slot}
                    value={selectedId}
                    onChange={(e) => {
                      soundEngine.playClick();
                      onSelect(e.target.value);
                    }}
                    className="px-3 py-1.5 text-xs font-mono-tabular font-bold bg-[#F2EDE4] text-[#0E0E0E] border-2 border-[#0E0E0E] cursor-pointer"
                  >
                    {CATALOG_ENTITIES.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.accessionNumber} · {item.name} ({item.ageDisplay})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Live 3D Turntable */}
                <MiniSpecimenViewport entity={entity} renderMode={renderMode} />

                {/* Specimen Title & Curatorial Hook */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono-tabular">
                    <Badge type={entity.type} accessionNumber={entity.accessionNumber} />
                    <span aria-hidden="true">·</span>
                    <span className="font-bold">
                      {isFossil(entity) ? entity.taxon : entity.culture}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold font-display text-[#0E0E0E]">
                    {entity.name}
                  </h3>
                  <div className="bg-[#F2EDE4] border-l-[4px] border-[#0E0E0E] p-3 text-xs font-semibold text-[#0E0E0E] leading-relaxed">
                    "{entity.hook}"
                  </div>
                </div>

                {/* Comparative Metadata Readout Table */}
                <dl className="divide-y divide-[#0E0E0E]/20 text-xs font-mono-tabular bg-[#F2EDE4] border-2 border-[#0E0E0E] p-3.5">
                  <div className="py-1.5 flex justify-between gap-3">
                    <dt className="text-[#4A4742]">Chronological Age</dt>
                    <dd className="font-bold text-right">{entity.ageDisplay}</dd>
                  </div>
                  <div className="py-1.5 flex justify-between gap-3">
                    <dt className="text-[#4A4742]">Planetary Stage & O₂</dt>
                    <dd className="font-bold text-right">
                      {stage.name} (O₂ {stage.oxygenPercent}%)
                    </dd>
                  </div>
                  <div className="py-1.5 flex justify-between gap-3">
                    <dt className="text-[#4A4742]">
                      {isFossil(entity) ? 'Preservation Mode' : 'Material & Technique'}
                    </dt>
                    <dd className="font-bold text-right">
                      {isFossil(entity)
                        ? entity.preservationMode
                        : `${entity.material} · ${entity.technique}`}
                    </dd>
                  </div>
                  <div className="py-1.5 flex justify-between gap-3">
                    <dt className="text-[#4A4742]">Physical Dimensions</dt>
                    <dd className="font-bold text-right">{entity.dimensions}</dd>
                  </div>
                  <div className="py-1.5 flex justify-between gap-3">
                    <dt className="text-[#4A4742]">Museum Repository</dt>
                    <dd className="font-bold text-right">{entity.sourceInstitution}</dd>
                  </div>
                </dl>
              </div>

              {/* Action Footer */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    soundEngine.playClick();
                    navigate(`/gallery/${entity.id}`);
                  }}
                >
                  <span>Inspect in 3D Lab</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    soundEngine.playClick();
                    navigate('/earth');
                  }}
                >
                  <Compass className="w-4 h-4" />
                  <span>View on Globe</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
