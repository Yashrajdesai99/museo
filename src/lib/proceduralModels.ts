import * as THREE from 'three';
import type { SpecimenModelPreset } from '../types/catalog';

let sharedXRayMaterial: THREE.ShaderMaterial | null = null;

export function getXRayShaderMaterial(): THREE.ShaderMaterial {
  if (!sharedXRayMaterial) {
    sharedXRayMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(0xffd400) },
        uRimColor: { value: new THREE.Color(0xf2ede4) },
        uOpacity: { value: 0.72 }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform vec3 uRimColor;
        uniform float uOpacity;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vec3 viewDir = normalize(vViewPosition);
          float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 2.1);
          vec3 finalColor = mix(uColor * 0.35, uRimColor, fresnel);
          float alpha = clamp(0.18 + fresnel * uOpacity, 0.15, 0.95);
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
  }
  return sharedXRayMaterial;
}

/**
 * Prepares sub-parts of a procedural specimen group for smooth Exploded-View kinematics
 * and caches original PBR materials for non-destructive X-Ray shader switching.
 */
function prepareExplodedRig(specimenSubGroup: THREE.Group) {
  specimenSubGroup.userData.isSpecimenSubGroup = true;
  const children = specimenSubGroup.children;
  const count = children.length;

  children.forEach((child, index) => {
    const basePos = child.position.clone();
    const radial = basePos.clone();

    if (radial.lengthSq() < 0.01) {
      // Spread central elements along a spiral/vertical axis so they separate cleanly
      const angle = (index / Math.max(1, count)) * Math.PI * 2;
      radial.set(
        Math.cos(angle) * 0.42,
        ((index % 3) - 1) * 0.38,
        Math.sin(angle) * 0.42
      );
    } else {
      radial.normalize().multiplyScalar(0.58 + (index % 3) * 0.14);
    }

    child.userData.basePosition = basePos;
    child.userData.explodeVector = radial;

    child.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        node.userData.originalMaterial = node.material;
      }
    });
  });
}

/**
 * Smoothly interpolates all sub-parts of a specimen group between assembled (0)
 * and exploded (1) states using frame-rate-independent exponential damping.
 */
export function updateExplodedView(
  rootGroup: THREE.Group,
  targetExplodeFactor: number,
  delta: number
) {
  rootGroup.traverse((obj) => {
    if (obj instanceof THREE.Group && obj.userData.isSpecimenSubGroup) {
      obj.children.forEach((part) => {
        const basePos = part.userData.basePosition as THREE.Vector3 | undefined;
        const explodeVec = part.userData.explodeVector as THREE.Vector3 | undefined;
        if (!basePos || !explodeVec) return;

        const targetX = basePos.x + explodeVec.x * targetExplodeFactor;
        const targetY = basePos.y + explodeVec.y * targetExplodeFactor;
        const targetZ = basePos.z + explodeVec.z * targetExplodeFactor;

        part.position.x = THREE.MathUtils.damp(part.position.x, targetX, 7, delta);
        part.position.y = THREE.MathUtils.damp(part.position.y, targetY, 7, delta);
        part.position.z = THREE.MathUtils.damp(part.position.z, targetZ, 7, delta);
      });
    }
  });
}

/**
 * Toggles between Studio PBR, Wireframe Topology, and Custom GLSL X-Ray Stratigraphy Shader.
 */
export function applySpecimenRenderMode(
  rootGroup: THREE.Group,
  mode: 'pbr' | 'wireframe' | 'xray'
) {
  const xrayMat = getXRayShaderMaterial();

  rootGroup.traverse((child) => {
    if (child instanceof THREE.Mesh && child.userData.originalMaterial) {
      const origMat = child.userData.originalMaterial as THREE.Material;
      if (mode === 'xray') {
        child.material = xrayMat;
      } else {
        child.material = origMat;
        if ('wireframe' in origMat) {
          (origMat as THREE.MeshStandardMaterial).wireframe = mode === 'wireframe';
        }
      }
    }
  });
}

/**
 * Builds a multi-part, museum-grade procedural 3D specimen assembly (THREE.Group)
 * with calibrated PBR roughness/metalness variation across primary silhouette,
 * secondary anatomical/structural read, and accent details.
 */
export function buildProceduralSpecimenGroup(
  preset: SpecimenModelPreset,
  options?: { wireframe?: boolean; includePedestal?: boolean }
): THREE.Group {
  const root = new THREE.Group();
  const wf = options?.wireframe ?? false;

  // Shared Museum Pedestal Base (optional, enabled in Detail Viewer)
  if (options?.includePedestal) {
    const plinthMat = new THREE.MeshStandardMaterial({
      color: 0x161616,
      roughness: 0.75,
      metalness: 0.15,
      wireframe: wf
    });
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xffd400,
      roughness: 0.25,
      metalness: 0.85,
      wireframe: wf
    });

    const basePlinth = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.22, 2.2), plinthMat);
    basePlinth.position.y = -1.25;
    basePlinth.receiveShadow = true;
    root.add(basePlinth);

    const upperStep = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.12, 1.85), plinthMat);
    upperStep.position.y = -1.08;
    upperStep.receiveShadow = true;
    root.add(upperStep);

    const brassPlaquet = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.08, 0.04), brassMat);
    brassPlaquet.position.set(0, -1.24, 1.11);
    root.add(brassPlaquet);

    const supportRod = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.85, 16), brassMat);
    supportRod.position.y = -0.6;
    root.add(supportRod);
  }

  const specimenGroup = new THREE.Group();
  root.add(specimenGroup);

  switch (preset) {
    case 'zircon-crystal': {
      const outerMat = new THREE.MeshPhysicalMaterial({
        color: 0xd95b26,
        roughness: 0.12,
        metalness: 0.1,
        transmission: 0.68,
        thickness: 1.4,
        ior: 1.92,
        clearcoat: 1.0,
        wireframe: wf
      });
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0xffd400,
        emissive: 0x552200,
        roughness: 0.35,
        metalness: 0.6,
        wireframe: wf
      });
      const matrixMat = new THREE.MeshStandardMaterial({
        color: 0x3b3530,
        roughness: 0.85,
        metalness: 0.1,
        wireframe: wf
      });

      const prism = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 1.1, 4), outerMat);
      prism.rotation.y = Math.PI / 4;
      prism.castShadow = true;
      specimenGroup.add(prism);

      const topPyramid = new THREE.Mesh(new THREE.ConeGeometry(0.48, 0.58, 4), outerMat);
      topPyramid.position.y = 0.84;
      topPyramid.rotation.y = Math.PI / 4;
      specimenGroup.add(topPyramid);

      const bottomPyramid = new THREE.Mesh(new THREE.ConeGeometry(0.48, 0.58, 4), outerMat);
      bottomPyramid.position.y = -0.84;
      bottomPyramid.rotation.x = Math.PI;
      bottomPyramid.rotation.y = Math.PI / 4;
      specimenGroup.add(bottomPyramid);

      for (let i = 0; i < 3; i++) {
        const s = 0.45 - i * 0.11;
        const zone = new THREE.Mesh(new THREE.OctahedronGeometry(s, 0), coreMat);
        zone.position.set((i - 1) * 0.08, (i - 1) * 0.1, 0);
        zone.scale.set(1, 1.8, 1);
        specimenGroup.add(zone);
      }

      const rockBase = new THREE.Mesh(new THREE.DodecahedronGeometry(0.55, 1), matrixMat);
      rockBase.position.set(-0.35, -0.65, -0.2);
      rockBase.scale.set(1.3, 0.6, 1.1);
      specimenGroup.add(rockBase);
      break;
    }

    case 'stromatolite-dome': {
      const chertMat = new THREE.MeshStandardMaterial({
        color: 0x5c4738,
        roughness: 0.78,
        metalness: 0.12,
        wireframe: wf
      });
      const laminaMat = new THREE.MeshStandardMaterial({
        color: 0xb88b5a,
        roughness: 0.45,
        metalness: 0.25,
        wireframe: wf
      });
      const matBio = new THREE.MeshStandardMaterial({
        color: 0x2f5e4e,
        roughness: 0.6,
        metalness: 0.15,
        wireframe: wf
      });

      for (let i = 0; i < 8; i++) {
        const t = i / 7;
        const radiusBottom = 0.85 * (1 - t * 0.55);
        const radiusTop = 0.75 * (1 - t * 0.62);
        const layer = new THREE.Mesh(
          new THREE.CylinderGeometry(radiusTop, radiusBottom, 0.16, 24),
          i % 2 === 0 ? chertMat : laminaMat
        );
        layer.position.y = -0.55 + i * 0.15;
        layer.castShadow = true;
        specimenGroup.add(layer);
      }
      const cap = new THREE.Mesh(
        new THREE.SphereGeometry(0.32, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2),
        matBio
      );
      cap.position.y = 0.55;
      specimenGroup.add(cap);
      break;
    }

    case 'grypania-coil': {
      const bifMat = new THREE.MeshStandardMaterial({
        color: 0x4a2520,
        roughness: 0.7,
        metalness: 0.35,
        wireframe: wf
      });
      const ironBandMat = new THREE.MeshStandardMaterial({
        color: 0x6e737b,
        roughness: 0.3,
        metalness: 0.8,
        wireframe: wf
      });
      const coilMat = new THREE.MeshStandardMaterial({
        color: 0x151515,
        roughness: 0.25,
        metalness: 0.45,
        wireframe: wf
      });

      const slab = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.22, 1.3), bifMat);
      slab.rotation.x = 0.35;
      specimenGroup.add(slab);

      for (let i = -2; i <= 2; i++) {
        const stripe = new THREE.Mesh(new THREE.BoxGeometry(1.52, 0.04, 0.12), ironBandMat);
        stripe.position.set(0, i * 0.04, i * 0.2);
        stripe.rotation.x = 0.35;
        specimenGroup.add(stripe);
      }

      const points: THREE.Vector3[] = [];
      for (let i = 0; i <= 90; i++) {
        const angle = (i / 90) * Math.PI * 6.5;
        const r = 0.06 + (i / 90) * 0.48;
        points.push(new THREE.Vector3(Math.cos(angle) * r, 0.14, Math.sin(angle) * r));
      }
      const curve = new THREE.CatmullRomCurve3(points);
      const ribbon = new THREE.Mesh(new THREE.TubeGeometry(curve, 100, 0.032, 12, false), coilMat);
      ribbon.position.set(0, 0.12, 0.08);
      ribbon.rotation.x = 0.35;
      specimenGroup.add(ribbon);
      break;
    }

    case 'dickinsonia-ribbed': {
      const quartziteMat = new THREE.MeshStandardMaterial({
        color: 0xc2a887,
        roughness: 0.82,
        metalness: 0.08,
        wireframe: wf
      });
      const bodyMat = new THREE.MeshStandardMaterial({
        color: 0x9e6b43,
        roughness: 0.5,
        metalness: 0.18,
        wireframe: wf
      });
      const ridgeMat = new THREE.MeshStandardMaterial({
        color: 0x6b4426,
        roughness: 0.38,
        metalness: 0.25,
        wireframe: wf
      });

      const slab = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.12, 0.2, 8), quartziteMat);
      slab.position.set(0, -0.1, 0);
      slab.rotation.x = 0.4;
      specimenGroup.add(slab);

      const centralAxis = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.02, 1.35, 12), ridgeMat);
      centralAxis.rotation.z = Math.PI / 2;
      centralAxis.position.set(0, 0.14, 0.08);
      specimenGroup.add(centralAxis);

      for (let i = -6; i <= 6; i++) {
        const norm = Math.abs(i) / 7;
        const ribLen = Math.sqrt(Math.max(0.05, 1 - norm * norm)) * 0.62;
        const ribL = new THREE.Mesh(new THREE.CapsuleGeometry(0.032, ribLen, 6, 12), bodyMat);
        ribL.position.set(i * 0.09, 0.12, ribLen * 0.52);
        ribL.rotation.x = Math.PI / 2;
        specimenGroup.add(ribL);

        const ribR = new THREE.Mesh(new THREE.CapsuleGeometry(0.032, ribLen, 6, 12), bodyMat);
        ribR.position.set(i * 0.09, 0.12, -ribLen * 0.52);
        ribR.rotation.x = Math.PI / 2;
        specimenGroup.add(ribR);
      }
      break;
    }

    case 'charnia-frond': {
      const frondMat = new THREE.MeshStandardMaterial({
        color: 0x3b6e5c,
        roughness: 0.45,
        metalness: 0.22,
        wireframe: wf
      });
      const stemMat = new THREE.MeshStandardMaterial({
        color: 0x264238,
        roughness: 0.65,
        metalness: 0.15,
        wireframe: wf
      });

      const holdfast = new THREE.Mesh(new THREE.SphereGeometry(0.26, 20, 16), stemMat);
      holdfast.position.y = -0.78;
      holdfast.scale.set(1.2, 0.8, 1.2);
      specimenGroup.add(holdfast);

      const rachis = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.08, 1.55, 12), stemMat);
      rachis.position.y = 0.0;
      specimenGroup.add(rachis);

      for (let i = 0; i < 10; i++) {
        const t = i / 9;
        const y = -0.5 + t * 1.15;
        const branchLen = Math.sin(Math.PI * (0.15 + t * 0.75)) * 0.48;
        const side = i % 2 === 0 ? 1 : -1;
        const lobe = new THREE.Mesh(new THREE.ConeGeometry(0.11, branchLen, 6), frondMat);
        lobe.position.set(side * (branchLen * 0.42), y, 0);
        lobe.rotation.z = -side * (Math.PI / 3.2);
        specimenGroup.add(lobe);
      }
      break;
    }

    case 'anomalocaris-predator': {
      const carapaceMat = new THREE.MeshStandardMaterial({
        color: 0x8c3b2b,
        roughness: 0.35,
        metalness: 0.3,
        wireframe: wf
      });
      const flapMat = new THREE.MeshStandardMaterial({
        color: 0xc46d4e,
        roughness: 0.55,
        metalness: 0.15,
        wireframe: wf
      });
      const eyeMat = new THREE.MeshStandardMaterial({
        color: 0xffd400,
        roughness: 0.15,
        metalness: 0.8,
        wireframe: wf
      });

      for (let i = 0; i < 8; i++) {
        const t = i / 7;
        const radius = 0.28 * (1 - t * 0.65);
        const seg = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius * 0.92, 0.18, 16), carapaceMat);
        seg.rotation.z = Math.PI / 2;
        seg.position.set(0.55 - i * 0.16, Math.sin(t * Math.PI) * 0.06, 0);
        specimenGroup.add(seg);

        const flapWidth = 0.42 * (1 - t * 0.55);
        for (const zDir of [-1, 1]) {
          const flap = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.025, flapWidth), flapMat);
          flap.position.set(0.55 - i * 0.16, Math.sin(t * Math.PI) * 0.06, zDir * (radius + flapWidth * 0.45));
          flap.rotation.x = zDir * Math.sin(i * 0.6) * 0.25;
          specimenGroup.add(flap);
        }
      }

      for (const zDir of [-1, 1]) {
        const eye = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 16), eyeMat);
        eye.position.set(0.65, 0.18, zDir * 0.28);
        specimenGroup.add(eye);

        const claw = new THREE.Mesh(
          new THREE.TorusGeometry(0.22, 0.045, 10, 20, Math.PI * 1.15),
          carapaceMat
        );
        claw.position.set(0.82, -0.08, zDir * 0.14);
        specimenGroup.add(claw);
      }
      break;
    }

    case 'trilobite-paradoxides': {
      const chitinMat = new THREE.MeshStandardMaterial({
        color: 0x2c3038,
        roughness: 0.28,
        metalness: 0.55,
        wireframe: wf
      });
      const lobeMat = new THREE.MeshStandardMaterial({
        color: 0x4c525e,
        roughness: 0.48,
        metalness: 0.35,
        wireframe: wf
      });

      const cephalon = new THREE.Mesh(
        new THREE.SphereGeometry(0.52, 24, 16, 0, Math.PI, 0, Math.PI / 2),
        chitinMat
      );
      cephalon.position.set(0, 0.05, -0.35);
      cephalon.scale.set(1.25, 0.55, 0.85);
      specimenGroup.add(cephalon);

      for (let i = 0; i < 9; i++) {
        const t = i / 8;
        const w = 0.52 * (1 - t * 0.55);
        const axialRing = new THREE.Mesh(new THREE.CylinderGeometry(w * 0.38, w * 0.38, 0.08, 12), chitinMat);
        axialRing.rotation.x = Math.PI / 2;
        axialRing.position.set(0, 0.08, -0.25 + i * 0.095);
        specimenGroup.add(axialRing);

        const pleura = new THREE.Mesh(new THREE.BoxGeometry(w * 2.2, 0.06, 0.075), lobeMat);
        pleura.position.set(0, 0.02, -0.25 + i * 0.095);
        specimenGroup.add(pleura);
      }
      break;
    }

    case 'dunkleosteus-jaw':
    case 'trex-skull': {
      const boneMat = new THREE.MeshStandardMaterial({
        color: preset === 'trex-skull' ? 0xd8cbb8 : 0x8f8273,
        roughness: 0.58,
        metalness: 0.14,
        wireframe: wf
      });
      const toothMat = new THREE.MeshStandardMaterial({
        color: 0xf5efe6,
        roughness: 0.22,
        metalness: 0.2,
        wireframe: wf
      });
      const darkCavityMat = new THREE.MeshStandardMaterial({
        color: 0x141414,
        roughness: 0.9,
        metalness: 0.05,
        wireframe: wf
      });

      const cranium = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.58, 0.68), boneMat);
      cranium.position.set(-0.22, 0.22, 0);
      specimenGroup.add(cranium);

      const snout = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.42, 0.52), boneMat);
      snout.position.set(0.45, 0.16, 0);
      specimenGroup.add(snout);

      const orbit = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.72, 16), darkCavityMat);
      orbit.rotation.x = Math.PI / 2;
      orbit.position.set(-0.15, 0.26, 0);
      specimenGroup.add(orbit);

      const lowerJaw = new THREE.Mesh(new THREE.BoxGeometry(1.32, 0.18, 0.48), boneMat);
      lowerJaw.position.set(0.15, -0.26, 0);
      lowerJaw.rotation.z = -0.25;
      specimenGroup.add(lowerJaw);

      const toothCount = preset === 'trex-skull' ? 6 : 2;
      for (let i = 0; i < toothCount; i++) {
        const xOff = 0.15 + (i / toothCount) * 0.62;
        for (const zSide of [-0.21, 0.21]) {
          const upperTooth = new THREE.Mesh(
            new THREE.ConeGeometry(preset === 'trex-skull' ? 0.038 : 0.12, 0.18, 8),
            toothMat
          );
          upperTooth.rotation.x = Math.PI;
          upperTooth.position.set(xOff, -0.1, zSide);
          specimenGroup.add(upperTooth);
        }
      }
      break;
    }

    case 'tiktaalik-limb': {
      const boneMat = new THREE.MeshStandardMaterial({
        color: 0x998467,
        roughness: 0.62,
        metalness: 0.15,
        wireframe: wf
      });
      const highlightBoneMat = new THREE.MeshStandardMaterial({
        color: 0xd9b37c,
        roughness: 0.35,
        metalness: 0.25,
        wireframe: wf
      });

      const flatSkull = new THREE.Mesh(new THREE.ConeGeometry(0.55, 1.15, 4), boneMat);
      flatSkull.rotation.z = -Math.PI / 2;
      flatSkull.scale.set(1, 1, 0.35);
      flatSkull.position.set(0.35, 0.12, 0);
      specimenGroup.add(flatSkull);

      const spine = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.06, 1.1, 12), boneMat);
      spine.rotation.z = Math.PI / 2;
      spine.position.set(-0.35, 0.1, 0);
      specimenGroup.add(spine);

      for (const zSide of [-1, 1]) {
        const humerus = new THREE.Mesh(new THREE.CapsuleGeometry(0.06, 0.22, 8, 12), highlightBoneMat);
        humerus.position.set(-0.1, -0.08, zSide * 0.38);
        humerus.rotation.x = zSide * 0.65;
        specimenGroup.add(humerus);

        const radiusBone = new THREE.Mesh(new THREE.CapsuleGeometry(0.04, 0.2, 8, 12), highlightBoneMat);
        radiusBone.position.set(0.04, -0.24, zSide * 0.56);
        specimenGroup.add(radiusBone);
      }
      break;
    }

    case 'ammonite-spiral': {
      const shellMat = new THREE.MeshPhysicalMaterial({
        color: 0x9e5a2b,
        roughness: 0.22,
        metalness: 0.55,
        iridescence: 0.9,
        iridescenceIOR: 1.45,
        clearcoat: 0.8,
        wireframe: wf
      });
      const sutureMat = new THREE.MeshStandardMaterial({
        color: 0xffd400,
        roughness: 0.35,
        metalness: 0.75,
        wireframe: wf
      });

      const totalSteps = 28;
      for (let i = 0; i < totalSteps; i++) {
        const t = i / totalSteps;
        const angle = t * Math.PI * 4.5;
        const orbitRadius = 0.08 + Math.pow(t, 1.35) * 0.68;
        const tubeRadius = 0.03 + Math.pow(t, 1.45) * 0.26;

        const chamber = new THREE.Mesh(
          new THREE.SphereGeometry(tubeRadius, 16, 12),
          i % 4 === 0 ? sutureMat : shellMat
        );
        chamber.position.set(Math.cos(angle) * orbitRadius, Math.sin(angle) * orbitRadius, 0);
        chamber.scale.set(1, 1, 0.58);
        specimenGroup.add(chamber);
      }
      break;
    }

    case 'archaeopteryx-slab': {
      const limestoneMat = new THREE.MeshStandardMaterial({
        color: 0xe6dac3,
        roughness: 0.75,
        metalness: 0.05,
        wireframe: wf
      });
      const fossilBoneMat = new THREE.MeshStandardMaterial({
        color: 0x593e25,
        roughness: 0.42,
        metalness: 0.2,
        wireframe: wf
      });
      const featherMat = new THREE.MeshStandardMaterial({
        color: 0x8c6d49,
        roughness: 0.55,
        metalness: 0.12,
        wireframe: wf
      });

      const slab = new THREE.Mesh(new THREE.BoxGeometry(1.55, 1.35, 0.14), limestoneMat);
      slab.position.set(0, 0, -0.05);
      specimenGroup.add(slab);

      const spine = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.035, 8, 24, Math.PI * 1.2), fossilBoneMat);
      spine.position.set(0, 0.05, 0.08);
      specimenGroup.add(spine);

      for (const side of [-1, 1]) {
        for (let f = 0; f < 6; f++) {
          const feather = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.04, 0.02), featherMat);
          feather.position.set(side * 0.36, 0.15 - f * 0.06, 0.09);
          feather.rotation.z = side * (-0.2 - f * 0.12);
          specimenGroup.add(feather);
        }
      }
      break;
    }

    case 'lucy-hominid': {
      const homininBoneMat = new THREE.MeshStandardMaterial({
        color: 0xb89c72,
        roughness: 0.52,
        metalness: 0.15,
        wireframe: wf
      });

      const pelvisCenter = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.14, 0.22, 16), homininBoneMat);
      pelvisCenter.position.set(0, 0.12, 0);
      specimenGroup.add(pelvisCenter);

      for (const side of [-1, 1]) {
        const ilium = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.28, 0.09), homininBoneMat);
        ilium.position.set(side * 0.24, 0.2, -0.04);
        ilium.rotation.y = side * 0.35;
        specimenGroup.add(ilium);

        const femur = new THREE.Mesh(new THREE.CapsuleGeometry(0.05, 0.62, 8, 16), homininBoneMat);
        femur.position.set(side * 0.2, -0.32, 0);
        femur.rotation.z = -side * 0.11;
        specimenGroup.add(femur);
      }

      for (let v = 0; v < 5; v++) {
        const vertebra = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.085, 0.07, 12), homininBoneMat);
        vertebra.position.set(0, 0.3 + v * 0.095, 0);
        specimenGroup.add(vertebra);
      }
      break;
    }

    case 'mammoth-molar': {
      const enamelMat = new THREE.MeshStandardMaterial({
        color: 0xd9ceb8,
        roughness: 0.32,
        metalness: 0.2,
        wireframe: wf
      });
      const cementumMat = new THREE.MeshStandardMaterial({
        color: 0x5c4938,
        roughness: 0.72,
        metalness: 0.1,
        wireframe: wf
      });

      const crownBlock = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.62, 0.52), cementumMat);
      crownBlock.position.set(0, -0.08, 0);
      specimenGroup.add(crownBlock);

      for (let i = -5; i <= 5; i++) {
        const plate = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.68, 0.56), enamelMat);
        plate.position.set(i * 0.095, 0.14, (i % 2) * 0.02);
        specimenGroup.add(plate);
      }
      break;
    }

    case 'lomekwi-core':
    case 'acheulean-handaxe': {
      const stoneMat = new THREE.MeshStandardMaterial({
        color: preset === 'acheulean-handaxe' ? 0x8a7968 : 0x3d3b38,
        roughness: 0.65,
        metalness: 0.18,
        flatShading: true,
        wireframe: wf
      });
      const scarMat = new THREE.MeshStandardMaterial({
        color: preset === 'acheulean-handaxe' ? 0xa89682 : 0x57544f,
        roughness: 0.42,
        metalness: 0.25,
        flatShading: true,
        wireframe: wf
      });

      const coreMesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.68, 1), stoneMat);
      if (preset === 'acheulean-handaxe') {
        coreMesh.scale.set(0.68, 1.28, 0.28);
      } else {
        coreMesh.scale.set(1.05, 0.82, 0.88);
      }
      specimenGroup.add(coreMesh);

      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const flakeScar = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.08, 6), scarMat);
        flakeScar.position.set(Math.cos(angle) * 0.32, Math.sin(angle) * 0.45, 0.14);
        flakeScar.rotation.x = Math.PI / 2;
        specimenGroup.add(flakeScar);
      }
      break;
    }

    case 'blombos-ochre': {
      const ochreMat = new THREE.MeshStandardMaterial({
        color: 0x8f2d1e,
        roughness: 0.58,
        metalness: 0.2,
        wireframe: wf
      });
      const incisionMat = new THREE.MeshStandardMaterial({
        color: 0xffd400,
        roughness: 0.25,
        metalness: 0.65,
        wireframe: wf
      });

      const plaque = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.68, 0.36), ochreMat);
      plaque.position.set(0, 0, -0.04);
      specimenGroup.add(plaque);

      for (let i = -3; i <= 3; i++) {
        const lineA = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.58, 0.02), incisionMat);
        lineA.position.set(i * 0.16, 0, 0.16);
        lineA.rotation.z = 0.52;
        specimenGroup.add(lineA);

        const lineB = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.58, 0.02), incisionMat);
        lineB.position.set(i * 0.16, 0, 0.17);
        lineB.rotation.z = -0.52;
        specimenGroup.add(lineB);
      }
      break;
    }

    case 'venus-figurine': {
      const ooliteMat = new THREE.MeshStandardMaterial({
        color: 0xc9ab81,
        roughness: 0.68,
        metalness: 0.1,
        wireframe: wf
      });

      const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 20, 16), ooliteMat);
      head.position.y = 0.62;
      specimenGroup.add(head);

      const torso = new THREE.Mesh(new THREE.SphereGeometry(0.38, 24, 18), ooliteMat);
      torso.position.y = 0.12;
      torso.scale.set(1.1, 1.15, 0.92);
      specimenGroup.add(torso);

      const lower = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.68, 20), ooliteMat);
      lower.position.y = -0.45;
      lower.rotation.x = Math.PI;
      specimenGroup.add(lower);
      break;
    }

    case 'jomon-vessel': {
      const clayMat = new THREE.MeshStandardMaterial({
        color: 0x8c5336,
        roughness: 0.72,
        metalness: 0.12,
        side: THREE.DoubleSide,
        wireframe: wf
      });
      const cordMat = new THREE.MeshStandardMaterial({
        color: 0x59321f,
        roughness: 0.5,
        metalness: 0.25,
        wireframe: wf
      });

      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.26, 1.05, 24, 1, true), clayMat);
      body.position.y = -0.1;
      specimenGroup.add(body);

      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.08, 24), clayMat);
      base.position.y = -0.62;
      specimenGroup.add(base);

      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const crest = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.045, 10, 20), cordMat);
        crest.position.set(Math.cos(angle) * 0.52, 0.52, Math.sin(angle) * 0.52);
        crest.rotation.y = -angle;
        specimenGroup.add(crest);
      }
      break;
    }

    case 'cuneiform-tablet': {
      const clayTabletMat = new THREE.MeshStandardMaterial({
        color: 0xc4a47c,
        roughness: 0.64,
        metalness: 0.08,
        wireframe: wf
      });
      const wedgeMat = new THREE.MeshStandardMaterial({
        color: 0x4a3b28,
        roughness: 0.8,
        metalness: 0.15,
        wireframe: wf
      });

      const tablet = new THREE.Mesh(new THREE.BoxGeometry(1.05, 1.32, 0.24), clayTabletMat);
      tablet.position.set(0, 0, -0.04);
      specimenGroup.add(tablet);

      for (let r = -2; r <= 2; r++) {
        const ruleLine = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.015, 0.02), wedgeMat);
        ruleLine.position.set(0, r * 0.22, 0.1);
        specimenGroup.add(ruleLine);

        for (let c = -2; c <= 2; c++) {
          const wedge = new THREE.Mesh(new THREE.ConeGeometry(0.038, 0.11, 3), wedgeMat);
          wedge.position.set(c * 0.18, r * 0.22 + 0.08, 0.11);
          wedge.rotation.z = (r + c) * 0.4;
          specimenGroup.add(wedge);
        }
      }
      break;
    }
  }

  prepareExplodedRig(specimenGroup);
  return root;
}
