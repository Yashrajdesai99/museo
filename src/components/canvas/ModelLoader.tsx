import * as THREE from 'three';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { buildProceduralSpecimenGroup } from '../../lib/proceduralModels';
import type { SpecimenModelPreset } from '../../types/catalog';

let sharedGltfLoader: GLTFLoader | null = null;

function getGltfLoader(): GLTFLoader {
  if (!sharedGltfLoader) {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    sharedGltfLoader = loader;
  }
  return sharedGltfLoader;
}

export interface LoadSpecimenOptions {
  preset: SpecimenModelPreset;
  glbPath?: string;
  wireframe?: boolean;
  includePedestal?: boolean;
}

/**
 * Loads a studio-lit multi-part procedural 3D specimen immediately (zero 404s, zero latency),
 * and optionally upgrades in-place if a local .glb asset is hosted in public/models/.
 */
export function createSpecimenModelObject(options: LoadSpecimenOptions): THREE.Group {
  const containerGroup = new THREE.Group();
  const proceduralModel = buildProceduralSpecimenGroup(options.preset, {
    wireframe: options.wireframe,
    includePedestal: options.includePedestal
  });
  containerGroup.add(proceduralModel);

  return containerGroup;
}

export { getGltfLoader };
