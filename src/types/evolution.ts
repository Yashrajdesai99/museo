export type EvolutionStageId =
  | 'hadean-archean'
  | 'proterozoic'
  | 'paleozoic'
  | 'mesozoic'
  | 'cenozoic';

export interface GlobePalette {
  eraTintName: string;
  sceneBgTint: string;
  keyLightTint: string;
  oceanColor: string;
  continentColor: string;
  highlandColor: string;
  coastalShelfColor: string;
  atmosphereColor: string;
  riftGlowColor: string;
  cloudOpacity: number;
  lavaGlowIntensity: number;
  volcanicIntensity: number;
  iceCapCoverage: number; // 0 to 1
}

export interface EvolutionStage {
  id: EvolutionStageId;
  index: string;
  name: string;
  spanLabel: string;
  startMa: number;
  endMa: number;
  defaultMa: number;
  tagline: string;
  headline: string;
  summary: string;
  tectonicConfiguration: string;
  atmosphereComposition: string;
  oxygenPercent: number;
  meanSurfaceTempC: number;
  ambientSoundLabel: string;
  robotQuip: string;
  dominantLife: string[];
  keyHighlights: string[];
  palette: GlobePalette;
}

export interface ExtinctionEvent {
  id: string;
  name: string;
  shortName: string;
  ageMa: number;
  stageId: EvolutionStageId;
  speciesLostPercent: number;
  marineGeneraLostPercent: number;
  primaryCause: string;
  summary: string;
  geologicalMarker: string;
  hasCutscene?: boolean;
  impactCoordinates?: {
    lat: number;
    lon: number;
    locationName?: string;
  };
  source: string;
}
