import { Flame, X } from 'lucide-react';
import * as THREE from 'three';
import { Button } from '../../components/ui/Button';

export interface AsteroidCutscene3DHandles {
  group: THREE.Group;
  updateCutscene: (
    isActive: boolean,
    progress: number,
    camera: THREE.PerspectiveCamera,
    reducedMotion: boolean
  ) => void;
}

/**
 * Builds the 3D bolide asteroid, incandescent plasma entry trail, and expanding
 * Chicxulub shockwave ring for the single 66.0 Ma K-Pg Asteroid Impact cutscene.
 */
export function buildAsteroidImpact3DRig(): AsteroidCutscene3DHandles {
  const group = new THREE.Group();
  group.visible = false;

  // Impact target point on globe surface
  const impactPoint = new THREE.Vector3(0.02, 0.61, 1.54);
  const startPoint = new THREE.Vector3(3.8, 2.9, 5.2);

  // Irregular Carbonaceous Chondrite Bolide Mesh
  const bolideGeo = new THREE.DodecahedronGeometry(0.18, 1);
  const bolideMat = new THREE.MeshStandardMaterial({
    color: 0x2b221e,
    emissive: 0xff4500,
    emissiveIntensity: 1.5,
    roughness: 0.75,
    flatShading: true
  });
  const bolideMesh = new THREE.Mesh(bolideGeo, bolideMat);
  group.add(bolideMesh);

  // Incandescent Wake Cone
  const wakeGeo = new THREE.ConeGeometry(0.22, 1.1, 12, 1, true);
  const wakeMat = new THREE.MeshBasicMaterial({
    color: 0xffd400,
    transparent: true,
    opacity: 0.75,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const wakeMesh = new THREE.Mesh(wakeGeo, wakeMat);
  wakeMesh.position.set(0, -0.55, 0);
  bolideMesh.add(wakeMesh);

  // Impact Flash Sphere & Expanding Shockwave Ring at Yucatán target
  const impactRig = new THREE.Group();
  impactRig.position.copy(impactPoint);
  impactRig.lookAt(0, 0, 0);

  const flashSphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.28, 24, 24),
    new THREE.MeshBasicMaterial({
      color: 0xffd400,
      transparent: true,
      opacity: 0,
      depthWrite: false
    })
  );
  impactRig.add(flashSphere);

  const shockwaveRing = new THREE.Mesh(
    new THREE.RingGeometry(0.18, 0.28, 48),
    new THREE.MeshBasicMaterial({
      color: 0xff5500,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false
    })
  );
  shockwaveRing.position.z = -0.03;
  impactRig.add(shockwaveRing);

  group.add(impactRig);

  const updateCutscene = (
    isActive: boolean,
    progress: number,
    camera: THREE.PerspectiveCamera,
    reducedMotion: boolean
  ) => {
    if (!isActive) {
      group.visible = false;
      return;
    }

    group.visible = true;
    const flashMat = flashSphere.material as THREE.MeshBasicMaterial;
    const ringMat = shockwaveRing.material as THREE.MeshBasicMaterial;

    if (progress < 0.45) {
      // Phase 1: Bolide Approaches Yucatán Peninsula
      const t = progress / 0.45;
      bolideMesh.visible = true;
      bolideMesh.position.lerpVectors(startPoint, impactPoint, t);
      bolideMesh.lookAt(impactPoint);
      bolideMesh.rotation.z += 0.15;

      flashMat.opacity = 0;
      ringMat.opacity = 0;

      if (!reducedMotion) {
        camera.position.set(1.8 - t * 0.8, 1.3 - t * 0.3, 4.1 - t * 0.9);
        camera.lookAt(impactPoint.x * 0.4, impactPoint.y * 0.4, impactPoint.z * 0.4);
      }
    } else {
      // Phase 2 & 3: Hypervelocity Impact Flash & Global Ejecta Shockwave
      bolideMesh.visible = false;
      const postT = (progress - 0.45) / 0.55;

      const flashIntensity = Math.max(0, 1 - postT * 2.2);
      flashMat.opacity = flashIntensity;
      flashSphere.scale.setScalar(1 + postT * 3.5);

      const waveScale = 1 + postT * 6.5;
      shockwaveRing.scale.setScalar(waveScale);
      ringMat.opacity = Math.max(0, 1 - postT * 1.15);

      if (!reducedMotion) {
        const shake = flashIntensity * 0.06;
        camera.position.set(
          1.0 + Math.sin(postT * 50) * shake,
          1.0 + Math.cos(postT * 45) * shake,
          3.4 + postT * 0.8
        );
        camera.lookAt(0, 0, 0);
      }
    }
  };

  return { group, updateCutscene };
}

interface AsteroidCutsceneOverlayProps {
  progress: number;
  onClose: () => void;
}

export function AsteroidImpactCutsceneOverlay({
  progress,
  onClose
}: AsteroidCutsceneOverlayProps) {
  const phaseLabel =
    progress < 0.45
      ? 'PHASE 01 · BOLIDE ATMOSPHERIC ENTRY (20 KM/S)'
      : progress < 0.75
        ? 'PHASE 02 · CHICXULUB PEAK-RING IMPACT & THERMAL PULSE'
        : 'PHASE 03 · GLOBAL IRIDIUM FALLOUT & K-PG BOUNDARY TRANSITION';

  return (
    <div className="absolute inset-x-6 top-6 z-30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0E0E0E] text-[#F2EDE4] border-[3px] border-[#FFD400] shadow-[6px_6px_0px_#FFD400] p-4 sm:p-5 max-w-4xl mx-auto">
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-xs font-mono-tabular font-bold text-[#FFD400]">
          <Flame className="w-4 h-4" />
          <span>66.0 MA · CRETACEOUS–PALEOGENE (K-PG) EXTINCTION EVENT</span>
        </div>
        <h2 className="text-lg sm:text-xl font-bold font-display">
          {phaseLabel}
        </h2>
        <p className="text-xs sm:text-sm text-[#F2EDE4]/85 max-w-2xl leading-relaxed">
          A 10-kilometer carbonaceous chondrite strikes the Yucatán carbonate platform (21.40°N, 89.51°W), vaporizing anhydrite evaporites, ejecting global tektites, and extinguishing 75% of Earth species including non-avian dinosaurs and ammonites.
        </p>
      </div>

      <div className="shrink-0">
        <Button variant="primary" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
          <span>Exit Cutscene</span>
        </Button>
      </div>
    </div>
  );
}
