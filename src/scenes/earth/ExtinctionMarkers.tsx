import * as THREE from 'three';

export interface ExtinctionMarkersHandles {
  group: THREE.Group;
  chicxulubBeacon: THREE.Group;
  updateForAgeMa: (ageMa: number, elapsed: number) => void;
}

/**
 * Places 3D tectonic & impact beacons on the Earth globe surface,
 * highlighting the Yucatán Chicxulub Crater (21.4°N, 89.5°W) near 66 Ma.
 */
export function buildExtinctionMarkers3D(): ExtinctionMarkersHandles {
  const group = new THREE.Group();
  const chicxulubBeacon = new THREE.Group();

  // Convert Yucatán coordinates (21.4°N, -89.5°W) to 3D sphere position (radius 1.66)
  const latRad = THREE.MathUtils.degToRad(21.4);
  const lonRad = THREE.MathUtils.degToRad(-89.5);
  const r = 1.66;

  const x = r * Math.cos(latRad) * Math.cos(lonRad);
  const y = r * Math.sin(latRad);
  const z = r * Math.cos(latRad) * Math.sin(lonRad);

  chicxulubBeacon.position.set(x, y, z);
  chicxulubBeacon.lookAt(0, 0, 0);

  const markerMat = new THREE.MeshBasicMaterial({
    color: 0xffd400,
    side: THREE.DoubleSide
  });

  const targetRing = new THREE.Mesh(new THREE.RingGeometry(0.08, 0.13, 4), markerMat);
  targetRing.position.z = -0.02;
  chicxulubBeacon.add(targetRing);

  const spike = new THREE.Mesh(
    new THREE.ConeGeometry(0.045, 0.28, 4),
    new THREE.MeshStandardMaterial({
      color: 0xffd400,
      emissive: 0x664400,
      roughness: 0.2,
      metalness: 0.8
    })
  );
  spike.rotation.x = -Math.PI / 2;
  spike.position.z = -0.16;
  chicxulubBeacon.add(spike);

  group.add(chicxulubBeacon);

  const updateForAgeMa = (ageMa: number, elapsed: number) => {
    const nearKpg = Math.abs(ageMa - 66) <= 140;
    chicxulubBeacon.visible = nearKpg;
    if (nearKpg) {
      targetRing.rotation.z = elapsed * 1.5;
    }
  };

  return {
    group,
    chicxulubBeacon,
    updateForAgeMa
  };
}
