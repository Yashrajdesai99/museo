import * as THREE from 'three';
import { CATALOG_ENTITIES, getStageForAgeMa } from '../../data';
import { getCulledEntitiesForAge } from '../../lib/culling';
import { buildProceduralSpecimenGroup } from '../../lib/proceduralModels';

export interface StageModelsHandles {
  root: THREE.Group;
  interactiveMeshes: THREE.Object3D[];
  updateForAgeMa: (ageMa: number, selectedId: string | null, delta: number) => void;
}

interface OrbitalSatelliteNode {
  entityId: string;
  wrapper: THREE.Group;
  ringMesh: THREE.Mesh;
  hitProxy: THREE.Mesh;
  baseAngle: number;
  latAngle: number;
}

/**
 * Manages proximity-culled 3D specimen satellites orbiting the Earth globe.
 * Only entities within the active ageMa proximity window are visible and raycastable.
 */
export function buildStageModelsRig(): StageModelsHandles {
  const root = new THREE.Group();
  const nodes = new Map<string, OrbitalSatelliteNode>();
  const interactiveMeshes: THREE.Object3D[] = [];

  CATALOG_ENTITIES.forEach((entity, index) => {
    const wrapper = new THREE.Group();

    // Scale down the multi-part procedural 3D specimen for orbital satellite display
    const modelGroup = buildProceduralSpecimenGroup(entity.modelPreset);
    modelGroup.scale.setScalar(0.24);
    wrapper.add(modelGroup);

    // Bauhaus Selection Frame Ring around orbital specimen
    const ringGeo = new THREE.RingGeometry(0.28, 0.32, 24);
    const ringMat = new THREE.MeshBasicMaterial({
      color: entity.type === 'fossil' ? 0xffd400 : 0xf2ede4,
      side: THREE.DoubleSide
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    wrapper.add(ringMesh);

    // Simplified collision sphere proxy for high-performance raycasting
    const hitProxy = new THREE.Mesh(
      new THREE.SphereGeometry(0.36, 12, 12),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    hitProxy.userData = { entityId: entity.id };
    wrapper.add(hitProxy);
    interactiveMeshes.push(hitProxy);

    const baseAngle = (index / CATALOG_ENTITIES.length) * Math.PI * 2;
    const latAngle = ((index % 5) - 2) * 0.24;

    root.add(wrapper);
    nodes.set(entity.id, {
      entityId: entity.id,
      wrapper,
      ringMesh,
      hitProxy,
      baseAngle,
      latAngle
    });
  });

  const updateForAgeMa = (ageMa: number, selectedId: string | null, delta: number) => {
    const stage = getStageForAgeMa(ageMa);
    const culled = getCulledEntitiesForAge(ageMa, stage.id, CATALOG_ENTITIES, 0.2);
    const visibleMap = new Map(culled.map((c) => [c.entity.id, c]));

    nodes.forEach((node, id) => {
      const match = visibleMap.get(id);
      if (!match) {
        node.wrapper.visible = false;
        return;
      }

      node.wrapper.visible = true;
      node.baseAngle += delta * 0.12;

      const orbitRadius = 2.38;
      const x = Math.cos(node.baseAngle) * Math.cos(node.latAngle) * orbitRadius;
      const y = Math.sin(node.latAngle) * orbitRadius;
      const z = Math.sin(node.baseAngle) * Math.cos(node.latAngle) * orbitRadius;

      node.wrapper.position.set(x, y, z);
      node.wrapper.rotation.y += delta * 0.8;

      const isSelected = selectedId === id;
      const targetScale = isSelected
        ? 1.35
        : match.isExactStageMatch
          ? 1.0
          : 0.68;

      const nextScale = THREE.MathUtils.damp(node.wrapper.scale.x, targetScale, 6, delta);
      node.wrapper.scale.setScalar(nextScale);

      const ringMat = node.ringMesh.material as THREE.MeshBasicMaterial;
      ringMat.color.setHex(isSelected ? 0xffd400 : 0xf2ede4);
    });
  };

  return {
    root,
    interactiveMeshes,
    updateForAgeMa
  };
}
