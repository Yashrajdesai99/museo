import type { EvolutionStageId } from '../types/evolution';

/**
 * Zero-dependency procedural Web Audio API sound engine for MUSEO.
 * Synthesizes tactile brutalist switch clicks, pneumatic ticket stamps,
 * perforated paper tears, thermal ticket printing, robot docent Easter egg
 * arpeggios, timeline scrub ticks, hotspot pings, cross-fading 5-era ambient
 * sound beds, and the 66 Ma Chicxulub Asteroid Impact sequence.
 */
class SoundEngine {
  private ctx: AudioContext | null = null;
  private muted = false;
  private hiddenPaused = false;
  private lastTickTime = 0;

  // Cross-fading Era Ambient Bed nodes
  private currentEra: EvolutionStageId | null = null;
  private activeBedStop: (() => void) | null = null;

  constructor() {
    try {
      const saved = localStorage.getItem('museo_audio_muted');
      if (saved === 'true') this.muted = true;
    } catch {
      // ignore storage errors
    }
  }

  private getContext(): AudioContext | null {
    if (this.muted || this.hiddenPaused || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public setMuted(mute: boolean): void {
    this.muted = mute;
    try {
      localStorage.setItem('museo_audio_muted', String(mute));
    } catch {
      // ignore
    }
    if (this.muted) {
      this.stopEraAmbient();
      if (this.ctx && this.ctx.state === 'running') {
        this.ctx.suspend().catch(() => {});
      }
    } else {
      if (this.ctx && this.ctx.state === 'suspended' && !this.hiddenPaused) {
        this.ctx.resume().catch(() => {});
      }
      if (this.currentEra) {
        const target = this.currentEra;
        this.currentEra = null;
        this.setEraAmbient(target);
      }
    }
  }

  /**
   * Automatically suspends Web Audio synthesis when the browser tab is hidden
   * and restores it when the visitor returns (if not muted).
   */
  public handleVisibilityChange(isHidden: boolean): void {
    this.hiddenPaused = isHidden;
    if (!this.ctx) return;
    if (isHidden) {
      if (this.ctx.state === 'running') {
        this.ctx.suspend().catch(() => {});
      }
    } else if (!this.muted && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  /**
   * Cross-fades procedural ambient sound beds tailored to each of the 5 geological eras:
   * - Hadean–Archean: Low volcanic rumble & lava crackle (52 Hz + 78 Hz filtered sawtooth)
   * - Proterozoic: Sub-aquatic deep ocean resonance (110 Hz + 164.8 Hz underwater sweep)
   * - Paleozoic: Humid coal-swamp air & insect stridulation shimmer (196 Hz + 588 Hz LFO)
   * - Mesozoic: Warm greenhouse canopy & low archosaur resonance (146.8 Hz + 220 Hz + 293.6 Hz)
   * - Cenozoic: High-altitude wind & sparse avian harmonic fifths (261.6 Hz + 392 Hz + 587.3 Hz)
   */
  public setEraAmbient(stageId: EvolutionStageId | null): void {
    if (stageId === null) {
      this.currentEra = null;
      this.stopEraAmbient();
      return;
    }

    if (this.currentEra === stageId && this.activeBedStop) {
      return;
    }
    this.currentEra = stageId;

    if (this.muted || this.hiddenPaused) return;
    const ctx = this.getContext();
    if (!ctx) return;

    // Fade out previous era bed gracefully over 0.9s
    if (this.activeBedStop) {
      this.activeBedStop();
      this.activeBedStop = null;
    }

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, now);
    masterGain.gain.linearRampToValueAtTime(0.028, now + 1.1);
    masterGain.connect(ctx.destination);

    const oscs: OscillatorNode[] = [];
    const lfos: OscillatorNode[] = [];

    const config: Record<
      EvolutionStageId,
      { freqs: number[]; type: OscillatorType; filterFreq: number; lfoHz: number }
    > = {
      'hadean-archean': {
        freqs: [55, 82.4, 110],
        type: 'sawtooth',
        filterFreq: 145,
        lfoHz: 0.35
      },
      proterozoic: {
        freqs: [110, 164.81, 220],
        type: 'sine',
        filterFreq: 310,
        lfoHz: 0.18
      },
      paleozoic: {
        freqs: [164.81, 246.94, 493.88],
        type: 'triangle',
        filterFreq: 620,
        lfoHz: 3.2
      },
      mesozoic: {
        freqs: [146.83, 220, 293.66],
        type: 'triangle',
        filterFreq: 440,
        lfoHz: 0.25
      },
      cenozoic: {
        freqs: [261.63, 392.0, 587.33],
        type: 'sine',
        filterFreq: 880,
        lfoHz: 0.15
      }
    };

    const preset = config[stageId];
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(preset.filterFreq, now);
    filter.Q.setValueAtTime(1.8, now);
    filter.connect(masterGain);

    // Subtle LFO modulating the filter cutoff for organic motion
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(preset.lfoHz, now);
    lfoGain.gain.setValueAtTime(preset.filterFreq * 0.25, now);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start(now);
    lfos.push(lfo);

    preset.freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const voiceGain = ctx.createGain();
      osc.type = preset.type;
      osc.frequency.setValueAtTime(f, now);
      voiceGain.gain.setValueAtTime(idx === 0 ? 0.5 : 0.25, now);
      osc.connect(voiceGain);
      voiceGain.connect(filter);
      osc.start(now);
      oscs.push(osc);
    });

    let stopped = false;
    this.activeBedStop = () => {
      if (stopped) return;
      stopped = true;
      try {
        const stopAt = ctx.currentTime;
        masterGain.gain.cancelScheduledValues(stopAt);
        masterGain.gain.setValueAtTime(Math.max(0.0001, masterGain.gain.value), stopAt);
        masterGain.gain.exponentialRampToValueAtTime(0.0001, stopAt + 0.75);
        setTimeout(() => {
          oscs.forEach((o) => {
            try {
              o.stop();
              o.disconnect();
            } catch {
              // ignore
            }
          });
          lfos.forEach((l) => {
            try {
              l.stop();
              l.disconnect();
            } catch {
              // ignore
            }
          });
          try {
            masterGain.disconnect();
          } catch {
            // ignore
          }
        }, 800);
      } catch {
        // ignore
      }
    };
  }

  public stopEraAmbient(): void {
    if (this.activeBedStop) {
      this.activeBedStop();
      this.activeBedStop = null;
    }
  }

  /** Crisp mechanical switch click for Neo-Brutalist buttons */
  public playClick(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.035);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  /** Subtle mechanical detent tick when scrubbing the Deep Time Slider */
  public playScrubTick(ageMa = 66): void {
    const perfNow = performance.now();
    if (perfNow - this.lastTickTime < 42) return;
    this.lastTickTime = perfNow;

    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Pitch shifts higher as we move from 4600 Ma (deep bass) toward 0 Ma (bright click)
    const normalized = 1 - Math.min(1, Math.max(0, ageMa / 4600));
    const freq = 180 + normalized * 520;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, now + 0.022);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.022);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.025);
  }

  /** Magnetic detent snap sound when locking onto one of the 5 mass extinction markers */
  public playMagneticSnap(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.setValueAtTime(780, now + 0.025);

    gain.gain.setValueAtTime(0.07, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.075);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  /** Harmonic sonar ping when selecting an anatomical callout pin or specimen hotspot */
  public playHotspotPing(index = 0): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const baseFreq = 660 + (index % 5) * 55;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.33, now + 0.14);

    gain.gain.setValueAtTime(0.07, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.17);
  }

  /** Alias for playTicketStamp */
  public playStamp(): void {
    this.playTicketStamp();
  }

  /** Distinct positive/negative acoustic chime for Deep Time Quiz answers */
  public playQuizFeedback(correct: boolean): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = correct ? 'triangle' : 'sawtooth';
    if (correct) {
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08);
    } else {
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(140, now + 0.16);
    }

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.24);
  }

  /** Heavy brass pneumatic stamp thud for the 3D Admission Ticket */
  public playTicketStamp(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(135, now);
    osc.frequency.exponentialRampToValueAtTime(36, now + 0.22);

    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);

    const chime = ctx.createOscillator();
    const chimeGain = ctx.createGain();
    chime.type = 'triangle';
    chime.frequency.setValueAtTime(523.25, now + 0.12);
    chime.frequency.setValueAtTime(659.25, now + 0.22);

    chimeGain.gain.setValueAtTime(0.08, now + 0.12);
    chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);

    chime.connect(chimeGain);
    chimeGain.connect(ctx.destination);
    chime.start(now + 0.12);
    chime.stop(now + 0.45);
  }

  /** Mechanical thermal/matrix ticket feed sound during Preloader ticket printing */
  public playTicketPrint(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    for (let i = 0; i < 6; i++) {
      const stepTime = now + i * 0.055;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(240 + (i % 2) * 60, stepTime);
      gain.gain.setValueAtTime(0.035, stepTime);
      gain.gain.exponentialRampToValueAtTime(0.001, stepTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(stepTime);
      osc.stop(stepTime + 0.045);
    }
  }

  /** Crisp perforated cardstock tear sound when detaching the ticket stub */
  public playPaperTear(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const duration = 0.28;
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const progress = i / bufferSize;
      const perforationPulse = Math.sin(progress * Math.PI * 28) > 0 ? 1.0 : 0.35;
      data[i] = (Math.random() * 2 - 1) * perforationPulse * Math.sin(progress * Math.PI);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1600, now);
    filter.frequency.exponentialRampToValueAtTime(3200, now + duration);
    filter.Q.setValueAtTime(2.2, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + duration);
  }

  /** Playful 5-note synth-brass fanfare when unlocking the 5-click Robot Guide Easter Egg */
  public playRobotEasterEgg(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    notes.forEach((freq, idx) => {
      const t = now + idx * 0.075;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.09, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.19);
    });
  }

  /** Subtle mechanical shutter whoosh on 3-block Bauhaus page wipe */
  public playPageWipe(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(190, now);
    osc.frequency.exponentialRampToValueAtTime(75, now + 0.11);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  /**
   * Choreographed 7.5-second acoustic sequence for the 66 Ma Chicxulub Impact Cutscene:
   * 1. Bolide atmospheric entry whistle (0.0s - 1.3s)
   * 2. Detonation shockwave sub-bass boom + white-noise ejecta burst (1.3s - 4.2s)
   * 3. Vacuum silence & Cenozoic recovery harmonic chord (4.8s - 7.2s)
   */
  public playAsteroidImpactSequence(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // 1. Bolide entry descending whistle
    const whistle = ctx.createOscillator();
    const whistleGain = ctx.createGain();
    whistle.type = 'sawtooth';
    whistle.frequency.setValueAtTime(980, now);
    whistle.frequency.exponentialRampToValueAtTime(110, now + 1.35);

    whistleGain.gain.setValueAtTime(0.01, now);
    whistleGain.gain.linearRampToValueAtTime(0.09, now + 1.2);
    whistleGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

    whistle.connect(whistleGain);
    whistleGain.connect(ctx.destination);
    whistle.start(now);
    whistle.stop(now + 1.45);

    // 2. Impact Sub-Bass Shockwave at t + 1.35s
    const boom = ctx.createOscillator();
    const boomGain = ctx.createGain();
    boom.type = 'sine';
    boom.frequency.setValueAtTime(95, now + 1.35);
    boom.frequency.exponentialRampToValueAtTime(24, now + 4.0);

    boomGain.gain.setValueAtTime(0.28, now + 1.35);
    boomGain.gain.exponentialRampToValueAtTime(0.001, now + 4.1);

    boom.connect(boomGain);
    boomGain.connect(ctx.destination);
    boom.start(now + 1.35);
    boom.stop(now + 4.2);

    // White-noise ejecta roar filtered through lowpass
    const bufferSize = ctx.sampleRate * 2.5;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now + 1.35);
    filter.frequency.exponentialRampToValueAtTime(90, now + 3.8);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.16, now + 1.35);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);

    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    whiteNoise.start(now + 1.35);
    whiteNoise.stop(now + 3.85);

    // 3. Cenozoic Dawn Recovery Chord at t + 5.0s
    const chordFreqs = [220, 277.18, 329.63, 440];
    chordFreqs.forEach((f) => {
      const pad = ctx.createOscillator();
      const padGain = ctx.createGain();
      pad.type = 'sine';
      pad.frequency.setValueAtTime(f, now + 5.0);

      padGain.gain.setValueAtTime(0.001, now + 5.0);
      padGain.gain.linearRampToValueAtTime(0.03, now + 5.8);
      padGain.gain.exponentialRampToValueAtTime(0.0008, now + 7.4);

      pad.connect(padGain);
      padGain.connect(ctx.destination);
      pad.start(now + 5.0);
      pad.stop(now + 7.45);
    });
  }
}

export const soundEngine = new SoundEngine();
