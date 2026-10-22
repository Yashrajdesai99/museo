import * as THREE from 'three';

export interface RobotGuideHandles {
  root: THREE.Group;
  head: THREE.Group;
  rightArm: THREE.Group;
  leftArm: THREE.Group;
  visor: THREE.Mesh;
}

/**
 * Builds the articulated Bauhaus Robot Docent Guide standing behind the ticket counter.
 */
export function buildRobotGuide(): RobotGuideHandles {
  const root = new THREE.Group();
  root.position.set(0, 0.25, -0.55);

  const chassisMat = new THREE.MeshStandardMaterial({
    color: 0xf2ede4,
    roughness: 0.35,
    metalness: 0.3
  });

  const jointMat = new THREE.MeshStandardMaterial({
    color: 0x161616,
    roughness: 0.45,
    metalness: 0.75
  });

  const accentMat = new THREE.MeshStandardMaterial({
    color: 0xffd400,
    emissive: 0x443300,
    roughness: 0.2,
    metalness: 0.8
  });

  // Torso Chassis
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.95, 1.05, 0.58), chassisMat);
  torso.position.y = 0.1;
  torso.castShadow = true;
  root.add(torso);

  // Chest Curatorial Badge Plate
  const chestPlate = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.38, 0.06), jointMat);
  chestPlate.position.set(0, 0.22, 0.3);
  root.add(chestPlate);

  const chestBadge = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.12, 0.08), accentMat);
  chestBadge.position.set(0.14, 0.25, 0.31);
  root.add(chestBadge);

  // Neck Joint
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 0.25, 16), jointMat);
  neck.position.y = 0.72;
  root.add(neck);

  // Articulated Head Group
  const head = new THREE.Group();
  head.position.set(0, 1.06, 0);

  const cranium = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.52, 0.54), chassisMat);
  cranium.castShadow = true;
  head.add(cranium);

  const visor = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.18, 0.06), accentMat);
  visor.position.set(0, 0.04, 0.26);
  head.add(visor);

  // Optical Lenses
  for (const xEye of [-0.16, 0.16]) {
    const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.08, 16), jointMat);
    lens.rotation.x = Math.PI / 2;
    lens.position.set(xEye, 0.04, 0.27);
    head.add(lens);
  }

  // Antenna
  const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.28, 8), jointMat);
  antenna.position.set(0.24, 0.38, 0);
  head.add(antenna);

  const antennaTip = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 12), accentMat);
  antennaTip.position.set(0.24, 0.53, 0);
  head.add(antennaTip);

  root.add(head);

  // Articulated Left & Right Arms (Right arm holds the admission stamp)
  const leftArm = new THREE.Group();
  leftArm.position.set(-0.62, 0.45, 0);
  const leftShoulder = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), jointMat);
  leftArm.add(leftShoulder);
  const leftForearm = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.72, 0.2), chassisMat);
  leftForearm.position.set(0, -0.38, 0.15);
  leftForearm.rotation.x = -0.35;
  leftArm.add(leftForearm);
  root.add(leftArm);

  const rightArm = new THREE.Group();
  rightArm.position.set(0.62, 0.45, 0);
  const rightShoulder = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), jointMat);
  rightArm.add(rightShoulder);
  const rightForearm = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.72, 0.2), chassisMat);
  rightForearm.position.set(0, -0.35, 0.25);
  rightForearm.rotation.x = -0.65;
  rightArm.add(rightForearm);

  // Brass Admission Stamp held in right hand
  const stampTool = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, 0.22, 16), accentMat);
  stampTool.position.set(0, -0.64, 0.46);
  rightArm.add(stampTool);

  root.add(rightArm);

  return { root, head, rightArm, leftArm, visor };
}
