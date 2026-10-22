/**
 * Piecewise non-linear geological time mapping between a normalized slider [0, 1000]
 * and age in Millions of Years Ago (Ma) [4600 -> 0].
 *
 * Why piecewise?
 * - Hadean–Archean (4600 – 2500 Ma): Slider 0 – 220 (22%)
 * - Proterozoic (2500 – 541 Ma):     Slider 220 – 450 (23%)
 * - Paleozoic (541 – 252 Ma):        Slider 450 – 650 (20%)
 * - Mesozoic (252 – 66 Ma):          Slider 650 – 820 (17%)
 * - Cenozoic (66 – 0 Ma):            Slider 820 – 1000 (18%)
 *
 * This ensures every era—including the fossil-rich Phanerozoic and artifact-rich Cenozoic—
 * has generous, scrubbable resolution on the Deep Time Slider.
 */

export const SLIDER_MIN = 0;
export const SLIDER_MAX = 1000;
export const MAX_AGE_MA = 4600;

interface TimeSegment {
  sliderStart: number;
  sliderEnd: number;
  maStart: number;
  maEnd: number;
}

const SEGMENTS: TimeSegment[] = [
  { sliderStart: 0, sliderEnd: 220, maStart: 4600, maEnd: 2500 },
  { sliderStart: 220, sliderEnd: 450, maStart: 2500, maEnd: 541 },
  { sliderStart: 450, sliderEnd: 650, maStart: 541, maEnd: 252 },
  { sliderStart: 650, sliderEnd: 820, maStart: 252, maEnd: 66 },
  { sliderStart: 820, sliderEnd: 1000, maStart: 66, maEnd: 0 }
];

export function sliderToMa(sliderValue: number): number {
  const clamped = Math.max(SLIDER_MIN, Math.min(SLIDER_MAX, sliderValue));
  for (const seg of SEGMENTS) {
    if (clamped >= seg.sliderStart && clamped <= seg.sliderEnd) {
      const t = (clamped - seg.sliderStart) / (seg.sliderEnd - seg.sliderStart);
      const rawMa = seg.maStart + t * (seg.maEnd - seg.maStart);
      if (rawMa > 100) return Math.round(rawMa);
      if (rawMa > 10) return Number(rawMa.toFixed(1));
      if (rawMa > 1) return Number(rawMa.toFixed(2));
      return Number(rawMa.toFixed(3));
    }
  }
  return 0;
}

export function maToSlider(ageMa: number): number {
  const clamped = Math.max(0, Math.min(MAX_AGE_MA, ageMa));
  for (const seg of SEGMENTS) {
    if (clamped <= seg.maStart && clamped >= seg.maEnd) {
      const t = (clamped - seg.maStart) / (seg.maEnd - seg.maStart);
      return seg.sliderStart + t * (seg.sliderEnd - seg.sliderStart);
    }
  }
  return SLIDER_MAX;
}

export function maToNormalizedProgress(ageMa: number): number {
  return maToSlider(ageMa) / SLIDER_MAX;
}

export function formatAgeMa(ageMa: number): string {
  if (ageMa >= 100) {
    return `${Math.round(ageMa).toLocaleString()} Ma`;
  }
  if (ageMa >= 1) {
    return `${ageMa.toFixed(1)} Ma`;
  }
  if (ageMa >= 0.01) {
    const ka = Math.round(ageMa * 1000);
    return `${ageMa.toFixed(3)} Ma (${ka.toLocaleString()} ka)`;
  }
  if (ageMa > 0) {
    const yearsBp = Math.round(ageMa * 1_000_000);
    return `${ageMa.toFixed(3)} Ma (${yearsBp.toLocaleString()} BP)`;
  }
  return '0 Ma (Present Day)';
}
