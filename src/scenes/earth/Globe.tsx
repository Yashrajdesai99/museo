import * as THREE from 'three';
import { getStageForAgeMa } from '../../data';
import {
  createContinentalDriftRig,
  type ContinentalDriftTextureRig
} from './ContinentalDrift';

export interface GlobeHandles {
  root: THREE.Group;
  earthMesh: THREE.Mesh;
  cloudMesh: THREE.Mesh;
  atmosphereMesh: THREE.Mesh;
  starfield: THREE.Points;
  driftRig: ContinentalDriftTextureRig;
  updateForAgeMa: (ageMa: number, delta: number, showGrid?: boolean) => void;
}

/**
 * Builds the 3D Earth Globe with fBm tectonic bump relief, custom GLSL Fresnel
 * atmospheric scattering rim shader, rotating procedural cloud bands, and a
 * 2,200-star deep-space skybox.
 */
export function buildEarthGlobe(): GlobeHandles {
  const root = new THREE.Group();
  const driftRig = createContinentalDriftRig();

  // 1. Deep-Space Starfield Skybox (2,200 stars)
  const starCount = 2200;
  const starPositions = new Float32Array(starCount * 3);
  const starColors = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    const r = 18 + Math.random() * 35;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    starPositions[i * 3 + 2] = r * Math.cos(phi);

    // Subtle warm/cool stellar color temperature variation
    const tint = 0.82 + Math.random() * 0.18;
    starColors[i * 3] = tint;
    starColors[i * 3 + 1] = tint;
    starColors[i * 3 + 2] = Math.min(1, tint + 0.08);
  }

  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

  const starMat = new THREE.PointsMaterial({
    size: 0.11,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    depthWrite: false
  });
  const starfield = new THREE.Points(starGeo, starMat);
  root.add(starfield);

  // 2. Primary Earth Sphere with fBm Tectonic Map & Elevation Bump Relief
  const earthGeo = new THREE.SphereGeometry(1.65, 64, 48);
  const earthMat = new THREE.MeshStandardMaterial({
    map: driftRig.texture,
    bumpMap: driftRig.bumpTexture,
    bumpScale: 0.065,
    roughness: 0.56,
    metalness: 0.14
  });

  const earthMesh = new THREE.Mesh(earthGeo, earthMat);
  earthMesh.castShadow = true;
  earthMesh.receiveShadow = true;
  root.add(earthMesh);

  // 3. Procedural Swirling Cloud & Cyclone Layer
  const cloudCanvas = document.createElement('canvas');
  cloudCanvas.width = 512;
  cloudCanvas.height = 256;
  const cctx = cloudCanvas.getContext('2d')!;
  cctx.clearRect(0, 0, 512, 256);
  cctx.fillStyle = 'rgba(242, 237, 228, 0.58)';
  for (let i = 0; i < 48; i++) {
    const x = (i * 79) % 460;
    const y = 20 + ((i * 47) % 215);
    const w = 32 + (i % 6) * 22;
    const h = 4 + (i % 3) * 3;
    cctx.fillRect(x, y, w, h);
  }
  const cloudTexture = new THREE.CanvasTexture(cloudCanvas);
  cloudTexture.colorSpace = THREE.SRGBColorSpace;
  cloudTexture.wrapS = THREE.RepeatWrapping;

  const cloudGeo = new THREE.SphereGeometry(1.688, 48, 32);
  const cloudMat = new THREE.MeshStandardMaterial({
    map: cloudTexture,
    transparent: true,
    opacity: 0.36,
    depthWrite: false,
    roughness: 0.9
  });
  const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
  cloudMesh.renderOrder = 2;
  root.add(cloudMesh);

  // 4. Custom GLSL Fresnel Atmospheric Scattering Rim Shader
  const atmoGeo = new THREE.SphereGeometry(1.82, 48, 32);
  const atmoShaderMat = new THREE.ShaderMaterial({
    uniforms: {
      uGlowColor: { value: new THREE.Color(0x4da6e8) },
      uIntensity: { value: 1.15 }
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
      uniform vec3 uGlowColor;
      uniform float uIntensity;
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      void main() {
        vec3 viewDir = normalize(vViewPosition);
        float rim = 1.0 - max(0.0, dot(viewDir, -vNormal));
        float scatter = pow(rim, 2.6) * uIntensity;
        gl_FragColor = vec4(uGlowColor, clamp(scatter * 0.65, 0.0, 0.85));
      }
    `,
    transparent: true,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const atmosphereMesh = new THREE.Mesh(atmoGeo, atmoShaderMat);
  atmosphereMesh.renderOrder = 3;
  root.add(atmosphereMesh);

  // 5. Bauhaus Equatorial Orbital Ring
  const orbitRingGeo = new THREE.RingGeometry(2.15, 2.17, 96);
  const orbitRingMat = new THREE.MeshBasicMaterial({
    color: 0xf2ede4,
    transparent: true,
    opacity: 0.22,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const orbitRing = new THREE.Mesh(orbitRingGeo, orbitRingMat);
  orbitRing.rotation.x = Math.PI / 2;
  root.add(orbitRing);

  const targetAtmoColor = new THREE.Color();

  const updateForAgeMa = (ageMa: number, delta: number, showGrid = true) => {
    driftRig.updateForAgeMa(ageMa, showGrid);
    const stage = getStageForAgeMa(ageMa);

    targetAtmoColor.set(stage.palette.atmosphereColor);
    (atmoShaderMat.uniforms.uGlowColor.value as THREE.Color).lerp(
      targetAtmoColor,
      Math.min(1, delta * 4)
    );

    cloudMat.opacity = THREE.MathUtils.damp(
      cloudMat.opacity,
      stage.palette.cloudOpacity,
      4,
      delta
    );

    cloudMesh.rotation.y += delta * 0.045;
    starfield.rotation.y += delta * 0.008;
  };

  return {
    root,
    earthMesh,
    cloudMesh,
    atmosphereMesh,
    starfield,
    driftRig,
    updateForAgeMa
  };
}
