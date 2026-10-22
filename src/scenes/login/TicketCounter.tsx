import * as THREE from 'three';

/**
 * Builds the Bauhaus / Neo-Brutalist architectural ticket counter and museum portal frame
 * as a multi-part THREE.Group with concrete, brushed brass, and obsidian surfaces.
 */
export function buildTicketCounterGroup(): THREE.Group {
  const group = new THREE.Group();

  const concreteMat = new THREE.MeshStandardMaterial({
    color: 0x262523,
    roughness: 0.82,
    metalness: 0.12
  });

  const paperSlabMat = new THREE.MeshStandardMaterial({
    color: 0xf2ede4,
    roughness: 0.55,
    metalness: 0.08
  });

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xffd400,
    roughness: 0.25,
    metalness: 0.85
  });

  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x121212,
    roughness: 0.35,
    metalness: 0.75
  });

  // Floor checker / architectural platform
  const floorPlatform = new THREE.Mesh(new THREE.BoxGeometry(9, 0.2, 6), concreteMat);
  floorPlatform.position.set(0, -1.65, 0);
  floorPlatform.receiveShadow = true;
  group.add(floorPlatform);

  // Brutalist monolithic counter desk
  const counterBase = new THREE.Mesh(new THREE.BoxGeometry(3.8, 1.25, 1.2), concreteMat);
  counterBase.position.set(0, -0.95, 0.2);
  counterBase.castShadow = true;
  counterBase.receiveShadow = true;
  group.add(counterBase);

  // Warm limestone desk top slab
  const counterTop = new THREE.Mesh(new THREE.BoxGeometry(4.1, 0.14, 1.45), paperSlabMat);
  counterTop.position.set(0, -0.26, 0.25);
  counterTop.castShadow = true;
  counterTop.receiveShadow = true;
  group.add(counterTop);

  // Yellow Bauhaus structural accent beam on front of counter
  const frontAccentBeam = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.22, 0.08), brassMat);
  frontAccentBeam.position.set(0, -0.55, 0.82);
  group.add(frontAccentBeam);

  // Mechanical Ticket Dispenser Slot on the desk
  const dispenserHousing = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.28, 0.65), darkMetalMat);
  dispenserHousing.position.set(0, -0.08, 0.45);
  group.add(dispenserHousing);

  const dispenserSlotLip = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.05, 0.08), brassMat);
  dispenserSlotLip.position.set(0, -0.02, 0.79);
  group.add(dispenserSlotLip);

  // Architectural Backdrop Arch Pillars
  for (const xSide of [-2.2, 2.2]) {
    const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.45, 3.8, 0.45), concreteMat);
    pillar.position.set(xSide, 0.3, -1.35);
    pillar.castShadow = true;
    group.add(pillar);
  }

  const lintel = new THREE.Mesh(new THREE.BoxGeometry(5.1, 0.45, 0.55), concreteMat);
  lintel.position.set(0, 2.15, -1.35);
  group.add(lintel);

  return group;
}
