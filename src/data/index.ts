import type { CatalogEntity } from '../types/catalog';
import type { EvolutionStage, EvolutionStageId, ExtinctionEvent } from '../types/evolution';
import { CULTURAL_ARTIFACTS } from './artifacts';
import { EXTINCTION_EVENTS } from './events';
import { FOSSIL_SPECIMENS } from './fossils';
import { BRAND_SUBTITLE, BRAND_TAGLINE, EVOLUTION_STAGES } from './stages';

export const CATALOG_ENTITIES: CatalogEntity[] = [
  ...FOSSIL_SPECIMENS,
  ...CULTURAL_ARTIFACTS
];

export {
  BRAND_TAGLINE,
  BRAND_SUBTITLE,
  EVOLUTION_STAGES,
  FOSSIL_SPECIMENS,
  CULTURAL_ARTIFACTS,
  EXTINCTION_EVENTS
};

export function getEntityById(id: string): CatalogEntity | undefined {
  return CATALOG_ENTITIES.find((entity) => entity.id === id);
}

export function getStageById(stageId: EvolutionStageId): EvolutionStage {
  const stage = EVOLUTION_STAGES.find((s) => s.id === stageId);
  return stage ?? EVOLUTION_STAGES[0];
}

export function getStageForAgeMa(ageMa: number): EvolutionStage {
  const clamped = Math.max(0, Math.min(4600, ageMa));
  for (const stage of EVOLUTION_STAGES) {
    if (clamped <= stage.startMa && clamped >= stage.endMa) {
      return stage;
    }
  }
  return EVOLUTION_STAGES[EVOLUTION_STAGES.length - 1];
}

export function getEntitiesByStage(stageId: EvolutionStageId): CatalogEntity[] {
  return CATALOG_ENTITIES.filter((entity) => entity.stageIds.includes(stageId));
}

export function getEventById(id: string): ExtinctionEvent | undefined {
  return EXTINCTION_EVENTS.find((ev) => ev.id === id);
}
