import * as THREE from 'three';
import { getStageForAgeMa } from '../../data';

export interface ContinentalDriftTextureRig {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  texture: THREE.CanvasTexture;
  bumpCanvas: HTMLCanvasElement;
  bumpCtx: CanvasRenderingContext2D;
  bumpTexture: THREE.CanvasTexture;
  updateForAgeMa: (ageMa: number, showGrid?: boolean) => void;
}

interface PlatePolygon {
  name: string;
  modernCenter: [number, number];
  pangeaCenter: [number, number];
  rodiniaCenter: [number, number];
  radiusX: number;
  radiusY: number;
  seed: number;
  vertices: [number, number][];
}

const TECTONIC_PLATES: PlatePolygon[] = [
  {
    name: 'Laurentia (North America)',
    modernCenter: [0.22, 0.3],
    pangeaCenter: [0.42, 0.38],
    rodiniaCenter: [0.5, 0.52],
    radiusX: 0.115,
    radiusY: 0.135,
    seed: 1.7,
    vertices: [
      [-1.0, -0.8],
      [-0.2, -1.0],
      [0.8, -0.6],
      [1.0, 0.2],
      [0.3, 0.9],
      [-0.5, 0.7]
    ]
  },
  {
    name: 'Amazonia & West Gondwana (South America)',
    modernCenter: [0.31, 0.66],
    pangeaCenter: [0.46, 0.64],
    rodiniaCenter: [0.62, 0.68],
    radiusX: 0.08,
    radiusY: 0.155,
    seed: 3.1,
    vertices: [
      [-0.6, -0.9],
      [0.5, -0.7],
      [0.9, 0.0],
      [0.2, 1.0],
      [-0.5, 0.6]
    ]
  },
  {
    name: 'Congo-Kalahari Craton (Africa)',
    modernCenter: [0.54, 0.54],
    pangeaCenter: [0.53, 0.56],
    rodiniaCenter: [0.46, 0.66],
    radiusX: 0.105,
    radiusY: 0.155,
    seed: 5.3,
    vertices: [
      [-0.8, -0.7],
      [0.6, -0.8],
      [1.0, -0.1],
      [0.5, 0.9],
      [-0.3, 0.8],
      [-0.9, 0.0]
    ]
  },
  {
    name: 'Baltica & Angara (Eurasia)',
    modernCenter: [0.68, 0.28],
    pangeaCenter: [0.56, 0.32],
    rodiniaCenter: [0.38, 0.42],
    radiusX: 0.175,
    radiusY: 0.125,
    seed: 7.9,
    vertices: [
      [-1.0, -0.5],
      [0.0, -0.9],
      [1.0, -0.6],
      [0.9, 0.6],
      [-0.2, 0.8],
      [-0.9, 0.4]
    ]
  },
  {
    name: 'Dharwar-Bastar Craton (India)',
    modernCenter: [0.71, 0.45],
    pangeaCenter: [0.61, 0.72],
    rodiniaCenter: [0.66, 0.42],
    radiusX: 0.048,
    radiusY: 0.068,
    seed: 11.4,
    vertices: [
      [-0.7, -0.7],
      [0.7, -0.7],
      [0.2, 1.0],
      [-0.6, 0.4]
    ]
  },
  {
    name: 'Pilbara-Yilgarn Craton (Australia)',
    modernCenter: [0.83, 0.7],
    pangeaCenter: [0.68, 0.76],
    rodiniaCenter: [0.58, 0.46],
    radiusX: 0.075,
    radiusY: 0.075,
    seed: 13.8,
    vertices: [
      [-0.9, -0.5],
      [0.7, -0.8],
      [1.0, 0.4],
      [-0.4, 0.8]
    ]
  },
  {
    name: 'East Antarctic Shield',
    modernCenter: [0.55, 0.91],
    pangeaCenter: [0.58, 0.84],
    rodiniaCenter: [0.55, 0.38],
    radiusX: 0.22,
    radiusY: 0.065,
    seed: 17.2,
    vertices: [
      [-1.0, -0.5],
      [1.0, -0.5],
      [0.8, 0.7],
      [-0.8, 0.7]
    ]
  }
];

function lerp2D(a: [number, number], b: [number, number], t: number): [number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

/**
 * Multi-octave Fractional Brownian Motion (fBm) coastline perturbation
 * so continents render with organic peninsulas, bays, and mountain belts.
 */
function traceFractalPolygon(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  vertices: [number, number][],
  scaleFactor: number,
  seed: number
) {
  ctx.beginPath();
  const n = vertices.length;
  const subdivisions = 8;

  for (let i = 0; i < n; i++) {
    const v1 = vertices[i];
    const v2 = vertices[(i + 1) % n];

    for (let s = 0; s < subdivisions; s++) {
      const t = s / subdivisions;
      const bx = v1[0] + (v2[0] - v1[0]) * t;
      const by = v1[1] + (v2[1] - v1[1]) * t;

      const angle = Math.atan2(by, bx);
      // 3-octave fBm coastline displacement
      const fbm =
        Math.sin(angle * 5 + seed) * 0.11 +
        Math.cos(angle * 11 - seed * 1.7) * 0.055 +
        Math.sin(angle * 23 + seed * 3.1) * 0.028;

      const rMod = scaleFactor * (1 + fbm);
      const px = cx + bx * rx * rMod;
      const py = cy + by * ry * rMod;

      if (i === 0 && s === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
  }
  ctx.closePath();
}

export function createContinentalDriftRig(): ContinentalDriftTextureRig {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = 512;
  bumpCanvas.height = 256;
  const bumpCtx = bumpCanvas.getContext('2d')!;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  const bumpTexture = new THREE.CanvasTexture(bumpCanvas);
  bumpTexture.wrapS = THREE.RepeatWrapping;
  bumpTexture.wrapT = THREE.ClampToEdgeWrapping;

  let lastRenderedMa = -9999;
  let lastShowGrid = true;

  const updateForAgeMa = (ageMa: number, showGrid = true) => {
    if (Math.abs(ageMa - lastRenderedMa) < 0.05 && showGrid === lastShowGrid) return;
    lastRenderedMa = ageMa;
    lastShowGrid = showGrid;

    const stage = getStageForAgeMa(ageMa);
    const { palette } = stage;
    const w = canvas.width;
    const h = canvas.height;

    // 1. Deep Ocean Bathymetric Base
    ctx.fillStyle = palette.oceanColor;
    ctx.fillRect(0, 0, w, h);

    bumpCtx.fillStyle = '#121212';
    bumpCtx.fillRect(0, 0, bumpCanvas.width, bumpCanvas.height);

    // Mid-ocean ridge bathymetry contours
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 2;
    for (let r = 0; r < 5; r++) {
      ctx.beginPath();
      for (let y = 0; y <= h; y += 16) {
        const x = ((r * 210 + Math.sin(y * 0.02 + ageMa * 0.002) * 38 + w) % w);
        if (y === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // 2. Render fBm Fractal Continents, Shelves & Orogenic Mountain Belts
    const cratonScale =
      ageMa > 2500 ? Math.max(0.32, 1 - (ageMa - 2500) / 2600) : 1.0;

    for (const plate of TECTONIC_PLATES) {
      let centerUV: [number, number];
      if (ageMa <= 250) {
        const t = 1 - ageMa / 250;
        centerUV = lerp2D(plate.pangeaCenter, plate.modernCenter, t);
      } else if (ageMa <= 850) {
        const t = (ageMa - 250) / 600;
        centerUV = lerp2D(plate.pangeaCenter, plate.rodiniaCenter, t);
      } else {
        const driftPhase = (ageMa - 850) * 0.0005;
        centerUV = [
          (plate.rodiniaCenter[0] + Math.sin(driftPhase) * 0.14 + 1) % 1,
          Math.max(0.2, Math.min(0.8, plate.rodiniaCenter[1] + Math.cos(driftPhase) * 0.1))
        ];
      }

      const cx = centerUV[0] * w;
      const cy = centerUV[1] * h;
      const rx = plate.radiusX * w * cratonScale;
      const ry = plate.radiusY * h * cratonScale;

      // Shallow Epicontinental Sea / Continental Shelf
      ctx.fillStyle = ageMa > 3000 ? 'rgba(217, 119, 36, 0.16)' : 'rgba(95, 190, 210, 0.22)';
      traceFractalPolygon(ctx, cx, cy, rx, ry, plate.vertices, 1.22, plate.seed);
      ctx.fill();

      // Primary Lowland Continent Basin
      ctx.fillStyle = palette.continentColor;
      traceFractalPolygon(ctx, cx, cy, rx, ry, plate.vertices, 1.0, plate.seed);
      ctx.fill();

      // Interior Cratonic Plateau
      ctx.fillStyle = palette.highlandColor;
      traceFractalPolygon(ctx, cx, cy, rx, ry, plate.vertices, 0.64, plate.seed + 1.2);
      ctx.fill();

      // Alpine / Orogenic Cordillera Ridge
      ctx.fillStyle = '#C9B89E';
      traceFractalPolygon(ctx, cx, cy, rx, ry, plate.vertices, 0.28, plate.seed + 2.5);
      ctx.fill();

      // Multi-tier Topographic Bump Relief Map
      const bx = centerUV[0] * bumpCanvas.width;
      const by = centerUV[1] * bumpCanvas.height;
      const brx = plate.radiusX * bumpCanvas.width * cratonScale;
      const bry = plate.radiusY * bumpCanvas.height * cratonScale;

      bumpCtx.fillStyle = '#787878';
      traceFractalPolygon(bumpCtx, bx, by, brx, bry, plate.vertices, 1.0, plate.seed);
      bumpCtx.fill();

      bumpCtx.fillStyle = '#C0C0C0';
      traceFractalPolygon(bumpCtx, bx, by, brx, bry, plate.vertices, 0.62, plate.seed + 1.2);
      bumpCtx.fill();

      bumpCtx.fillStyle = '#FFFFFF';
      traceFractalPolygon(bumpCtx, bx, by, brx, bry, plate.vertices, 0.28, plate.seed + 2.5);
      bumpCtx.fill();
    }

    // 3. Volcanic Rifts & Flood Basalts (Hadean Magma Ocean, Siberian Traps 252 Ma, CAMP 201 Ma)
    const volcanicStrength =
      ageMa > 3600
        ? 0.96
        : Math.abs(ageMa - 252) < 28
          ? 0.82
          : palette.volcanicIntensity;

    if (volcanicStrength > 0.22) {
      ctx.strokeStyle = palette.riftGlowColor;
      ctx.lineWidth = ageMa > 3600 ? 3.5 : 2.2;
      const fissureCount = Math.floor(volcanicStrength * 18);
      for (let f = 0; f < fissureCount; f++) {
        const startX = (f * 163) % w;
        const startY = 65 + ((f * 97) % (h - 130));
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + 38, startY + 18);
        ctx.lineTo(startX + 76, startY - 12);
        ctx.lineTo(startX + 110, startY + 9);
        ctx.stroke();
      }
    }

    // 4. Polar Ice Sheets (Snowball Earth 720-635 Ma, Ordovician 444 Ma, Pleistocene)
    let iceFactor = palette.iceCapCoverage;
    if (ageMa >= 635 && ageMa <= 720) {
      iceFactor = 0.9;
    }
    if (iceFactor > 0.02) {
      const capHeight = Math.max(18, iceFactor * (h * 0.44));
      ctx.fillStyle = '#F2EDE4';
      ctx.fillRect(0, 0, w, capHeight);
      ctx.fillRect(0, h - capHeight, w, capHeight);
    }

    // 5. Optional Cartographic Lat-Long Graticule Grid
    if (showGrid) {
      ctx.strokeStyle = 'rgba(242, 237, 228, 0.13)';
      ctx.lineWidth = 1;
      for (let lat = 1; lat < 6; lat++) {
        const y = (lat / 6) * h;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      for (let lon = 1; lon < 12; lon++) {
        const x = (lon / 12) * w;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
    }

    texture.needsUpdate = true;
    bumpTexture.needsUpdate = true;
  };

  updateForAgeMa(66, true);

  return {
    canvas,
    ctx,
    texture,
    bumpCanvas,
    bumpCtx,
    bumpTexture,
    updateForAgeMa
  };
}
