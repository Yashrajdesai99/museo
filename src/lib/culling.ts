import type { CatalogEntity } from '../types/catalog';
import type { EvolutionStageId } from '../types/evolution';
import { maToSlider, SLIDER_MAX } from './time';

export interface CulledSpecimenEntry {
  entity: CatalogEntity;
  distanceNormalized: number;
  opacityWeight: number;
  isExactStageMatch: boolean;
}

/**
 * Proximity-based asset culling for the Earth Evolution 3D timeline.
 * Only loads and mounts 3D specimen satellites that belong to the current stage
 * or sit within the normalized slider proximity window.
 */
export function getCulledEntitiesForAge(
  currentAgeMa: number,
  activeStageId: EvolutionStageId,
  catalog: CatalogEntity[],
  normalizedWindow = 0.22
): CulledSpecimenEntry[] {
  const currentSliderPos = maToSlider(currentAgeMa) / SLIDER_MAX;

  const matches: CulledSpecimenEntry[] = [];

  for (const entity of catalog) {
    const entitySliderPos = maToSlider(entity.ageMa) / SLIDER_MAX;
    const distanceNormalized = Math.abs(currentSliderPos - entitySliderPos);
    const isExactStageMatch = entity.stageIds.includes(activeStageId);

    if (isExactStageMatch || distanceNormalized <= normalizedWindow) {
      const proximityFactor = Math.max(0, 1 - distanceNormalized / (normalizedWindow * 1.35));
      const opacityWeight = isExactStageMatch
        ? Math.max(0.55, proximityFactor)
        : Math.max(0.25, proximityFactor);

      matches.push({
        entity,
        distanceNormalized,
        opacityWeight,
        isExactStageMatch
      });
    }
  }

  return matches.sort((a, b) => a.distanceNormalized - b.distanceNormalized);
}
