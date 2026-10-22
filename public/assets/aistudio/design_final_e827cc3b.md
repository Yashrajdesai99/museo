# MUSEO — design.md

> Single source of truth for how MUSEO looks, feels, and is built.
> Read this before generating or editing any UI, 3D scene, or data code.
> Items marked **[TBD]** are not decided yet. Hex values marked *(proposed)* are starting points, not locked.

---

## 1. Overview

**MUSEO** is a virtual museum platform that combines:

1. A cinematic 3D **Earth Evolution** experience (a 4.6-billion-year interactive globe timeline).
2. A browsable **fossil and artifact gallery** backed by a fact-verified catalog.

Built as a GTU Diploma IT project. Origin: Semester 5 Generative AI Tools ideation, approved as "Virtual Museum Creator", then branded MUSEO.

**Tagline:** [TBD, paste final tagline here]

### Experience goals
- Feel like walking into a real museum, not browsing a website.
- Make deep time (billions of years) emotionally understandable.
- Every fact on screen is verifiable and traceable to a catalog entry.
- Run smoothly on a mid-range laptop. Performance is a feature.

---

## 2. Design Principles

1. **Bauhaus / neo-brutalist.** Flat, geometric, honest. Structure is visible.
2. **Hard edges, hard shadows.** No gradients, no blur shadows, no glassmorphism.
3. **Contrast does the work.** Near-black and warm off-white carry the page; yellow is reserved for action.
4. **Cinematic 3D, restrained 2D.** The 3D scenes are expressive; the surrounding UI stays quiet and typographic.
5. **Data first.** UI is generated from the typed catalog, never hand-copied.
6. **Render only what's visible.** Scenes pause when off-screen.

---

## 3. Visual Design System

### 3.1 Color tokens

| Token | Role | Value |
|---|---|---|
| `--color-ink` | Primary dark background, text on light | `#0E0E0E` *(proposed)* |
| `--color-paper` | Primary light background, text on dark | `#F2EDE4` *(proposed)* |
| `--color-accent` | CTAs, key highlights only | `#FFD400` *(proposed)* |
| `--color-ink-soft` | Secondary surfaces on dark | `#1C1C1C` *(proposed)* |
| `--color-line` | Borders and dividers | same as `--color-ink` |

Rules:
- Yellow is for **calls to action and the single most important highlight per view**. Never decorative.
- No gradients anywhere in 2D UI.
- Text must meet WCAG AA contrast on its background.

### 3.2 Typography

- **Headlines:** Space Grotesk, bold, tight tracking, often uppercase.
- **Body:** [TBD, e.g. Space Grotesk Regular or a neutral sans/mono pairing]
- **Data / labels:** [TBD, optional monospace for dates, ages (Ma), catalog IDs]

Scale (suggested): 12 / 14 / 16 / 20 / 28 / 40 / 64 / 96 px. Headlines use the top of the scale and can be oversized.

### 3.3 Shape, borders, shadow

- Borders: 2 to 4 px solid `--color-ink`. Corners are square (radius 0) by default.
- Shadow: **hard block shadow only**, e.g. `box-shadow: 6px 6px 0 var(--color-ink)`. No blur, no spread softness.
- Hover: shift the element toward the shadow (translate 2 to 4 px) and reduce shadow offset to simulate a press.

### 3.4 Components

| Component | Spec |
|---|---|
| **Button (primary)** | Yellow fill, ink border, hard shadow, uppercase label, press-down hover |
| **Button (secondary)** | Paper fill, ink border, hard shadow |
| **Card** | Paper fill, 3 px border, hard shadow, catalog image on top, type badge |
| **Badge** | Small block, ink border, distinguishes `Fossil` vs `Artifact` |
| **Section header** | Oversized headline, thick rule underneath, section number |
| **Slider (Deep Time)** | Chunky block track, square thumb, yellow active segment, era labels |
| **Event marker** | Square or triangle glyph on the timeline, yellow for extinction events |

### 3.5 Motion

- 2D UI: short, snappy, linear or step-eased transitions (120 to 200 ms). No bouncy easing.
- 3D: cinematic, slow, camera-driven. Allowed to be dramatic.
- Respect `prefers-reduced-motion`: disable cutscenes and large camera moves, show static fallbacks.

### 3.6 3D art direction

- Stylized-realistic models (Smithsonian CC0 where available), flat or simple lighting that fits the neo-brutalist palette.
- Scene backgrounds use the palette (ink or paper), not gradient skies.
- One strong key light plus soft fill; avoid heavy post-processing.

---

## 4. Technical Architecture

### 4.1 Stack

- **React + TypeScript (strict mode)**
- **Three.js via React Three Fiber** (+ drei for helpers)
- State / routing / build tooling: **[TBD, e.g. Vite, Zustand, React Router]**
- Styling: **[TBD, e.g. CSS Modules / Tailwind with the tokens above]**

### 4.2 Suggested structure

```
src/
  app/            # routes, layout, providers
  components/     # 2D UI components (design system)
  scenes/         # R3F scenes (login, earth-evolution, gallery)
  data/           # catalog + evolution stages (typed)
  lib/            # type guards, helpers, culling utilities
  styles/         # tokens, global CSS
  assets/         # models, textures, fonts
```

### 4.3 Data schema (discriminated union)

The catalog is strictly typed. UI renders from these types only.

```ts
type EvolutionStageId = string; // [TBD] union of the five stage ids

interface BaseEntity {
  id: string;
  name: string;
  description: string;
  stageIds: EvolutionStageId[]; // cross-links to evolution stages
  model?: string;               // path to 3D asset
  image?: string;
  source: string;               // fact-verification source
}

interface FossilSpecimen extends BaseEntity {
  type: "fossil";
  ageMa: number;                // millions of years ago
  // [TBD] taxon, locality, etc.
}

interface CulturalArtifact extends BaseEntity {
  type: "artifact";
  // [TBD] origin, period, culture, etc.
}

type CatalogEntity = CulturalArtifact | FossilSpecimen;

const isFossil = (e: CatalogEntity): e is FossilSpecimen => e.type === "fossil";
const isArtifact = (e: CatalogEntity): e is CulturalArtifact => e.type === "artifact";
```

Rules:
- Always narrow with the type guards. Never cast.
- Catalog: **20 fact-verified entities**, each linked to one or more of **five evolution stages**.
- Adding an entity means adding a verified `source`.

---

## 5. Experiences

### 5.1 Home page
Seven sections. Each R3F canvas is gated by an `IntersectionObserver` so the `frameloop` only runs while the section is in view (`"always"` when visible, `"never"` when not).

Section list: **[TBD, list the seven sections in order]**

### 5.2 Login: "Museum of Deep Time"
Fully 3D cinematic entrance.
- Physics-based **ticket animation** (the ticket is the login affordance).
- **Robot guide** stands at the ticket counter.
- Login form is presented as part of the scene, styled with the design system.
- Fallback: standard 2D form for reduced-motion or low-power devices.

### 5.3 Earth Evolution timeline
4.6-billion-year interactive globe.
- **Deep Time Slider** scrubs the full timeline.
- **Morph-target continental drift** driven by slider position.
- **Extinction event markers** on the timeline, highlighted in yellow.
- **Proximity-based asset culling:** only load and render models near the current slider position.
- **Single cinematic cutscene** reserved for the **Asteroid Impact** era. No other cutscenes.
- Catalog entities appear contextually for the active stage.

### 5.4 Gallery
- Browsable grid of catalog cards (fossils and artifacts).
- Filter by type and by evolution stage.
- Detail view with 3D model viewer and verified facts.
- **[TBD]** search, sorting, favorites.

---

## 6. Performance Rules

- Pause off-screen canvases (`frameloop` gating).
- Cull and lazy-load models by proximity to the active timeline position.
- Compress models and textures (glTF + Draco/KTX2 where possible).
- Budget: **[TBD, e.g. target 60 fps on mid-range laptop, max draw calls, max texture size]**.
- Dispose geometries, materials, and textures on unmount.

---

## 7. Assets

- 23-model 3D asset sourcing list maintained separately.
- Smithsonian **CC0** assets confirmed for key models.
- Every asset records license and source in the catalog or an assets manifest.

---

## 8. Roadmap

| Phase | Status | Scope |
|---|---|---|
| 1. Foundation | Done | Typed schema, 20-entity catalog, seven-section home page |
| 2. Core Experience | In progress | Login scene, Earth Evolution timeline |
| 3. **[TBD]** | Planned | **[TBD]** |
| 4. **[TBD]** | Planned | **[TBD]** |

---

## 9. Do / Don't (for AI coding tools)

**Do**
- Use the color, type, shadow, and border tokens above.
- Render from typed catalog data and narrow with type guards.
- Gate every canvas with visibility-based `frameloop`.
- Provide reduced-motion fallbacks for cinematic scenes.

**Don't**
- Don't add gradients, blurred shadows, rounded pill buttons, or glassmorphism.
- Don't use yellow decoratively.
- Don't hardcode catalog facts into components.
- Don't add extra cutscenes beyond the Asteroid Impact one.
- Don't use `any` or type assertions to bypass the schema.

---

## 10. Open Questions

- [ ] Final tagline
- [ ] Names of the five evolution stages
- [ ] Phase 3 and 4 scope
- [ ] Final hex values and body/data fonts
- [ ] Performance budget numbers
