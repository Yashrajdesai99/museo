import type { CatalogEntity, CulturalArtifact, FossilSpecimen } from '../types/catalog';

export const isFossil = (entity: CatalogEntity): entity is FossilSpecimen => {
  return entity.type === 'fossil';
};

export const isArtifact = (entity: CatalogEntity): entity is CulturalArtifact => {
  return entity.type === 'artifact';
};
