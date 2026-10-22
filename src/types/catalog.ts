import type { EvolutionStageId } from './evolution';

export type SpecimenModelPreset =
  | 'zircon-crystal'
  | 'stromatolite-dome'
  | 'grypania-coil'
  | 'dickinsonia-ribbed'
  | 'charnia-frond'
  | 'anomalocaris-predator'
  | 'trilobite-paradoxides'
  | 'dunkleosteus-jaw'
  | 'tiktaalik-limb'
  | 'ammonite-spiral'
  | 'archaeopteryx-slab'
  | 'trex-skull'
  | 'lucy-hominid'
  | 'mammoth-molar'
  | 'lomekwi-core'
  | 'acheulean-handaxe'
  | 'blombos-ochre'
  | 'venus-figurine'
  | 'jomon-vessel'
  | 'cuneiform-tablet';

export interface BaseEntity {
  id: string;
  accessionNumber: string;
  name: string;
  subtitle: string;
  hook: string; // One-line curatorial hook (design.md Section 7.2)
  story: string; // 80-120 word narrative story (design.md Section 7.2)
  facts: string[]; // 3-5 verified bullet facts (design.md Section 7.2)
  whyItMatters: string; // Evolutionary or historical significance (design.md Section 7.2)
  description: string;
  curatorialEssay: string;
  stageIds: EvolutionStageId[];
  ageMa: number; // Millions of years ago (used for timeline scrubbing & proximity culling)
  ageDisplay: string;
  model: string; // Path to .glb asset in public/models/
  modelPreset: SpecimenModelPreset; // Procedural 3D multi-part fallback preset
  dimensions: string;
  source: string;
  sourceInstitution: string;
  sourceUrl: string;
  license: string;
  featured?: boolean;
  orbitCoordinates: {
    lat: number;
    lon: number;
  };
}

export interface FossilSpecimen extends BaseEntity {
  type: 'fossil';
  taxon: string;
  clade: string;
  geologicalPeriod: string;
  locality: string;
  stratigraphicFormation: string;
  preservationMode: string;
}

export interface CulturalArtifact extends BaseEntity {
  type: 'artifact';
  culture: string;
  archaeologicalPeriod: string;
  originRegion: string;
  material: string;
  technique: string;
  homininSpecies: string;
}

export type CatalogEntity = CulturalArtifact | FossilSpecimen;
