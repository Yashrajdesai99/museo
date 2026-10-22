import * as THREE from 'three';

export interface PhysicsTicketHandles {
  group: THREE.Group;
  mainBodyGroup: THREE.Group;
  stubGroup: THREE.Group;
  stampSeal: THREE.Mesh;
  goldenStickerMesh: THREE.Mesh;
  triggerLaunch: () => void;
  triggerTear: () => void;
  setGoldenSticker: (unlocked: boolean) => void;
  resetTicket: () => void;
  updatePhysics: (dt: number) => void;
}

/**
 * Physics-driven 3D Museum Admission Ticket with second-order spring kinematics,
 * rotational impulse, perforated detachable stub, crimson ADMITTED stamp seal,
 * and unlockable Golden Ammonite collector medallion.
 */
export function buildPhysicsTicket(): PhysicsTicketHandles {
  const group = new THREE.Group();
  const mainBodyGroup = new THREE.Group();
  const stubGroup = new THREE.Group();

  const ticketPaperMat = new THREE.MeshStandardMaterial({
    color: 0xf2ede4,
    roughness: 0.42,
    metalness: 0.08
  });

  const stubPaperMat = new THREE.MeshStandardMaterial({
    color: 0xffd400,
    roughness: 0.35,
    metalness: 0.15
  });

  const ticketBorderMat = new THREE.MeshStandardMaterial({
    color: 0x0e0e0e,
    roughness: 0.6,
    metalness: 0.2
  });

  const crimsonStampMat = new THREE.MeshStandardMaterial({
    color: 0xd9381e,
    roughness: 0.3,
    metalness: 0.35
  });

  const goldenStickerMat = new THREE.MeshStandardMaterial({
    color: 0xffd400,
    emissive: 0x553800,
    roughness: 0.16,
    metalness: 0.92
  });

  // 1. Main Ticket Left Portion (width 0.66)
  const cardBody = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.03, 0.48), ticketPaperMat);
  cardBody.position.set(-0.11, 0, 0);
  cardBody.castShadow = true;
  cardBody.userData = { ticketPart: 'main' };
  mainBodyGroup.add(cardBody);

  // Brutalist Ink Frame Strips on Main Body
  const topStrip = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.035, 0.06), ticketBorderMat);
  topStrip.position.set(-0.11, 0.002, -0.17);
  mainBodyGroup.add(topStrip);

  const barcodeStrip = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.035, 0.38), ticketBorderMat);
  barcodeStrip.position.set(-0.34, 0.002, 0);
  mainBodyGroup.add(barcodeStrip);

  // Crimson Stamped Seal (scales in when stamped)
  const stampSeal = new THREE.Mesh(
    new THREE.CylinderGeometry(0.105, 0.105, 0.04, 24),
    crimsonStampMat
  );
  stampSeal.position.set(0.06, 0.012, 0.06);
  stampSeal.scale.set(0.001, 1, 0.001);
  mainBodyGroup.add(stampSeal);

  // Golden Ammonite Collector Sticker (scales in when 5-click Robot Easter Egg is unlocked)
  const goldenStickerMesh = new THREE.Mesh(
    new THREE.TorusGeometry(0.065, 0.022, 12, 24),
    goldenStickerMat
  );
  goldenStickerMesh.rotation.x = Math.PI / 2;
  goldenStickerMesh.position.set(-0.14, 0.022, 0.06);
  goldenStickerMesh.scale.setScalar(0.001);
  mainBodyGroup.add(goldenStickerMesh);

  // 2. Perforated Right-Hand Detachable Stub (width 0.24)
  const stubBody = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.03, 0.48), stubPaperMat);
  stubBody.position.set(0.35, 0, 0);
  stubBody.castShadow = true;
  stubBody.userData = { ticketPart: 'stub' };
  stubGroup.add(stubBody);

  // Perforation Notch Dots along seam x = 0.225
  for (let z = -0.2; z <= 0.2; z += 0.08) {
    const notch = new THREE.Mesh(
      new THREE.CylinderGeometry(0.014, 0.014, 0.038, 10),
      ticketBorderMat
    );
    notch.position.set(0.225, 0.002, z);
    stubGroup.add(notch);
  }

  group.add(mainBodyGroup);
  group.add(stubGroup);

  // Initial resting position inside the counter slot
  const restPos = new THREE.Vector3(0, -0.02, 0.65);
  const targetPos = new THREE.Vector3(0, 0.42, 2.25);

  const currentPos = restPos.clone();
  const velocity = new THREE.Vector3(0, 0, 0);
  let isLaunched = false;
  let isTorn = false;
  let hasGolden = false;
  let launchElapsed = 0;

  const stubOffset = new THREE.Vector3(0, 0, 0);
  const stubVel = new THREE.Vector3(0, 0, 0);

  group.position.copy(restPos);

  const triggerLaunch = () => {
    isLaunched = true;
    launchElapsed = 0;
    velocity.set(0, 2.2, 3.4);
  };

  const triggerTear = () => {
    if (!isLaunched) {
      triggerLaunch();
    }
    if (isTorn) return;
    isTorn = true;
    stubVel.set(0.95, 0.65, 0.35);
  };

  const setGoldenSticker = (unlocked: boolean) => {
    hasGolden = unlocked;
  };

  const resetTicket = () => {
    isLaunched = false;
    isTorn = false;
    launchElapsed = 0;
    currentPos.copy(restPos);
    velocity.set(0, 0, 0);
    stubOffset.set(0, 0, 0);
    stubVel.set(0, 0, 0);
    stubGroup.position.set(0, 0, 0);
    stubGroup.rotation.set(0, 0, 0);
    group.position.copy(restPos);
    group.rotation.set(0, 0, 0);
    stampSeal.scale.set(0.001, 1, 0.001);
  };

  const updatePhysics = (dt: number) => {
    // Animate Golden Ammonite sticker scale
    const targetGoldenScale = hasGolden ? 1 : 0.001;
    const nextGolden = THREE.MathUtils.damp(
      goldenStickerMesh.scale.x,
      targetGoldenScale,
      10,
      dt
    );
    goldenStickerMesh.scale.setScalar(nextGolden);

    if (!isLaunched) {
      group.position.y = restPos.y + Math.sin(performance.now() * 0.003) * 0.015;
      return;
    }

    launchElapsed += dt;

    // Expand crimson stamp seal immediately upon stamp impact
    const sealScale = THREE.MathUtils.damp(stampSeal.scale.x, 1, 12, dt);
    stampSeal.scale.set(sealScale, 1, sealScale);

    // Second-order spring physics toward camera presentation focal point
    const stiffness = 18;
    const damping = 6.2;

    const forceX = -stiffness * (currentPos.x - targetPos.x) - damping * velocity.x;
    const forceY = -stiffness * (currentPos.y - targetPos.y) - damping * velocity.y;
    const forceZ = -stiffness * (currentPos.z - targetPos.z) - damping * velocity.z;

    velocity.x += forceX * dt;
    velocity.y += forceY * dt;
    velocity.z += forceZ * dt;

    currentPos.x += velocity.x * dt;
    currentPos.y += velocity.y * dt;
    currentPos.z += velocity.z * dt;

    group.position.copy(currentPos);

    // Tilt ticket toward viewer so they see the stamped face clearly
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, 0.92, 6, dt);
    group.rotation.y = Math.sin(launchElapsed * 2.5) * 0.14;
    group.rotation.z = THREE.MathUtils.damp(group.rotation.z, -0.08, 6, dt);

    // Perforated stub tear separation spring kinematics
    if (isTorn) {
      const targetStubX = 0.22;
      const targetStubY = -0.14;
      const targetStubZ = 0.08;
      const kStub = 16;
      const dStub = 5.5;

      stubVel.x += (-kStub * (stubOffset.x - targetStubX) - dStub * stubVel.x) * dt;
      stubVel.y += (-kStub * (stubOffset.y - targetStubY) - dStub * stubVel.y) * dt;
      stubVel.z += (-kStub * (stubOffset.z - targetStubZ) - dStub * stubVel.z) * dt;

      stubOffset.addScaledVector(stubVel, dt);
      stubGroup.position.copy(stubOffset);
      stubGroup.rotation.z = THREE.MathUtils.damp(stubGroup.rotation.z, -0.28, 7, dt);
      stubGroup.rotation.y = THREE.MathUtils.damp(stubGroup.rotation.y, 0.22, 7, dt);
    }
  };

  return {
    group,
    mainBodyGroup,
    stubGroup,
    stampSeal,
    goldenStickerMesh,
    triggerLaunch,
    triggerTear,
    setGoldenSticker,
    resetTicket,
    updatePhysics
  };
}
