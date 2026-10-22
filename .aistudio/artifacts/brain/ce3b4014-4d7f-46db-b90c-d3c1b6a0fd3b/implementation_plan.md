# MUSEO — Deep Time Motion & Shader Architecture (Nine-System Animation Upgrade)

MUSEO is an interactive 3D virtual museum of deep time upgraded with a unified nine-system motion and shader architecture—combining live WebGL-over-HTML effects, liquid-metal CTAs, precision border beams, spring-calibrated layout transitions, and state-reactive AI Docent thinking orbs and annotation tools across all museum halls and a dedicated Interactive Motion Lab.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and product choices have been confirmed from your answers and govern this implementation:

- **Confirmed Decision 1 — Scope & Showcase Strategy**: Upgrade all existing MUSEO views (Home Exhibition, Login Ticket Counter, Earth Evolution Timeline, Specimen Gallery, and 3D Detail Lab) **plus** add an interactive **Motion & Shader Lab** where visitors can inspect and tune all nine animation systems live.
- **Confirmed Decision 2 — Focused AI Primitives, Thinking Orbs & Annotation Scope**: Apply the AI agent chat components (`aicss.dev`), animated thinking orbs (`orbs.jakubantalik.com`), crafted AI primitives (`beautiful-ui-five`), and structured UI annotation pins (`agentation.com`) **strictly to the existing Robot Docent Guide and Curatorial Field Notebook UI**, preserving the museum's authentic paleontological focus without adding generic chatbot clutter.
- **Confirmed Decision 3 — Adaptive 60fps WebGL & Shader Performance Profile**: Run WebGL HTML overlays (`canvasui.dev`) and pointer-reactive liquid metal shaders (`metal.jakubantalik.com`) in an **Adaptive 60fps Mode** with automatic software-renderer protection and an always-accessible **Shader FX Toggle** so users can switch between full GPU shader fidelity and lightweight compositor mode at any time.

---

### 1. Overview & Core Concept

- **What It Does**: Elevates MUSEO's five-act virtual museum journey with nine best-in-class web animation paradigms while introducing an interactive **Curatorial Motion & Shader Lab** to test and customize each effect in real time:
  1. **WebGL Effects Over Live HTML (`canvasui.dev`)**: Interactive GPU ripple, refraction, and thermal era distortion planes synchronized over live HTML cards and hero typography.
  2. **Animated Border Beams (`beam.jakubantalik.com`)**: Conic-gradient and dual-beam specular perimeter traces that orbit flagship fossil cards, active geological stages, and the Admission Portal.
  3. **Animated Component Primitives (`originkit.dev`)**: Spring-physics accordions, kinetic specimen flip-comparators, magnetic action docks, and staggered velocity lists.
  4. **AI Agent Chat Primitives (`aicss.dev`)**: Token-streamed curatorial narration, collapsible "Stratigraphic Reasoning" trace steps, and verified source citation chips inside the Robot Docent & Field Notebook.
  5. **Essential Web App Transitions (`transitions.dev`)**: Spring-calibrated card-to-detail morphs, smooth auto-height drawer resizes, blur-scale tab cross-fades, and skeleton-to-specimen reveals.
  6. **Liquid Metal Buttons (`metal.jakubantalik.com`)**: Pointer-tracked chrome and brushed brass liquid-metal specular buttons with dynamic normal-mapped highlight sweeps on primary museum CTAs.
  7. **Crafted AI Interface Primitives (`beautiful-ui-five.vercel.app`)**: Tactile segmented switches, morphing command pills, and radial mastery rings inside the Field Notebook and Command Palette.
  8. **UI & Specimen Annotation Pinning (`agentation.com`)**: A Curatorial Annotation overlay inside the Field Notebook allowing visitors to click any UI element or specimen feature, attach structured notes, and copy/export a machine-readable Curatorial Brief.
  9. **Animated Thinking Orbs (`orbs.jakubantalik.com`)**: Multi-layered morphing energy orbs integrated into the Robot Docent avatar and Field Notebook header that shift harmonic states (`Idle`, `Synthesizing`, `Narrating`, `Impact Alert`).
- **Target Audience / Persona**: Design engineering juries, university capstone evaluators, and museum visitors exploring 4.6 billion years of Earth history on desktop and mobile.
- **Key Value**: Fuses Bauhaus neo-brutalist institutional clarity with tactile 60fps GPU shaders and physically grounded micro-interactions—making every button press, timeline scrub, and docent narration feel alive.

---

### 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Hero & Exhibition Flow (`canvasui.dev` + `metal.jakubantalik.com` + `beam.jakubantalik.com` + `originkit.dev`)**:
     - Visitors arrive at the Hero marquee where a live WebGL lens/ripple canvas (`canvasui.dev`) subtly refracts the oversized display typography and specimen previews on pointer movement.
     - Primary CTAs (*"Claim Admission Pass"*, *"Explore 3D Earth"*) feature the interactive **Liquid Metal** surface (`metal.jakubantalik.com`) with real-time pointer specular reflections and spring compression.
     - Flagship specimens and stratigraphic comparators animate with precision **Border Beams** (`beam.jakubantalik.com`) and spring-physics **OriginKit** flip/accordion cards (`originkit.dev`).
  2. **Robot Docent & Field Notebook Flow (`aicss.dev` + `orbs.jakubantalik.com` + `beautiful-ui-five` + `agentation.com`)**:
     - At the Admission Desk, Earth Evolution HUD, and Field Notebook, the **Robot Docent** is accompanied by a live **Animated Thinking Orb** (`orbs.jakubantalik.com`) that morphs between calm orbital rings (`Idle`), rapid harmonic turbulence (`Thinking`), rhythmic waveform pulses (`Narrating`), and crimson shockwave rings (`66 Ma Asteroid Impact`).
     - Docent commentary renders using **AI Agent Chat Primitives** (`aicss.dev`)—complete with a collapsible *"Stratigraphic Telemetry & Reasoning"* step trace, token-by-token typewriter streaming, and interactive specimen link pills (`beautiful-ui-five`).
     - Opening the **Field Notebook** reveals a new **Annotation Mode (`agentation.com`)** tab and toggle: visitors can drop numbered Bauhaus annotation pins onto any on-screen UI component or specimen card, write curatorial or UI notes, inspect selector/element bounds, and export a structured JSON/Markdown brief.
  3. **Seamless View & Modal Transitions (`transitions.dev`)**:
     - Switching tabs in the Field Notebook, filtering the 20-specimen Gallery, expanding specimen cards into the 3D Detail Lab, and opening the `⌘K` Command Console use **Transitions.dev** spring curves (`cubic-bezier(0.22, 1, 0.36, 1)`) with zero layout jump and smooth auto-height container interpolation.
  4. **Interactive Motion & Shader Lab Flow (`/motion-lab`)**:
     - Accessible from the top navigation bar and `⌘K` Command Console, the **Motion Lab** presents all nine animation systems in an interactive curatorial workbench with live parameter sliders (beam speed/color, liquid metal chrome vs. gold, orb state switcher, transition curve inspector, WebGL ripple viscosity, and live UI annotation tester) plus the global **Adaptive 60fps Shader FX Toggle**.

- **Visual Identity & Theme**:
  - *Aesthetic Direction*: **Bauhaus Neo-Brutalist Institutional Archive** enhanced with high-craft specular shaders. Flat `#F2EDE4` warm archival paper and `#0E0E0E` ink surfaces framed by `2px`–`4px` solid borders and hard `6px 6px 0 #0E0E0E` offset shadows, contrasted against optically rich liquid-metal CTAs, luminous border beams, and harmonic thinking orbs.
  - *Color Palette & Mood*:
    - `--color-ink`: `#0E0E0E` (Structural borders, dark surfaces, and shadow offsets)
    - `--color-paper`: `#F2EDE4` (Primary warm archival canvas)
    - `--color-accent`: `#FFD400` (Signal Yellow for primary actions, active beams, and highlights)
    - `--color-crimson`: `#D9381E` (Extinction markers, stamps, and annotation pins)
    - *Era Shader Tints*: `#B3261E` (Hadean), `#1F6F8B` (Proterozoic), `#4C9A5B` (Paleozoic), `#E0701A` (Mesozoic), `#4F86F7` (Cenozoic).
  - *Typography & Hierarchy*:
    - **Display & Headings**: `Space Grotesk` Bold (`700`) with balanced wrapping (`text-wrap: balance`) and masked slide-up line reveals.
    - **Body Prose**: `Space Grotesk` Regular (`400`) constrained to `65ch`–`75ch` reading measure.
    - **Data, Telemetry & Annotations**: `Space Mono` (`tabular-nums`) for Ma ages, FPS/shader budgets, accession IDs, and annotation coordinates.
  - *Component Styling & Layout*:
    - Adheres to the **Top Bar Contract** (Zone 1: Brand Wordmark, Zone 2: 5 concise single-line nav links including `Motion Lab`, Zone 3: Primary Liquid-Metal CTA + `⌘K` trigger).
    - Zero static pill enclosures on metadata; metadata uses clean typographic separators (`·`).

- **Interactive Feedback & Motion**:
  - Routine micro-interactions settle within `150ms–200ms` using compositor-only properties (`transform`, `opacity`, `filter`).
  - Full `prefers-reduced-motion` compliance and automatic software-WebGL fallback (`isSoftwareGl`).

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Adaptive 60fps WebGL HTML Overlay & Liquid Metal Shaders**
  - *Chosen Approach*: Drive the `canvasui.dev` HTML-synchronized distortion canvas and `metal.jakubantalik.com` liquid-metal button shaders using an on-demand/pointer-activated WebGL/Canvas2D shader pipeline with a persistent `shaderFxEnabled` toggle in the global study store and bottom HUD.
  - *Why*: Delivers genuine GPU-accelerated specular and refraction effects at 60fps on hardware GPUs while automatically pausing when idle or on software WebGL renderers.
  - *Alternatives Considered*: Always-on full-screen multi-pass WebGL post-processing over the entire DOM, which was rejected because it can starve scroll performance and block pointer events on lower-tier laptops.

- **Decision 2: Domain-Scoped AI Primitives (`aicss.dev`, `orbs`, `beautiful-ui-five`, `agentation`) inside Robot Docent & Field Notebook**
  - *Chosen Approach*: Embed the morphing Thinking Orbs, streaming reasoning traces, crafted AI segmented controls, and UI annotation pin tool directly into the existing **Robot Docent** dialogue panels (Login Counter & Earth Evolution HUD) and **Field Notebook Modal**.
  - *Why*: Honors your explicit preference to enhance the existing Robot Guide and Field Notebook without cluttering the museum with a separate generic chat widget.

---

### 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                     MUSEO APPLICATION SHELL & ADAPTIVE SHADER ENGINE                     │
│  ┌─────────────────────┐  ┌──────────────────────┐  ┌────────────────┐  ┌──────────────┐ │
│  │ Transitions.dev     │  │ CanvasUI WebGL       │  │ Liquid Metal   │  │ BorderBeam   │ │
│  │ Route & Layout      │  │ HTML Overlay Layer   │  │ CTA Button     │  │ Conic Trace  │ │
│  │ Morph Engine        │  │ (Adaptive 60fps FX)  │  │ Shader Surface │  │ Perimeter FX │ │
│  └──────────┬──────────┘  └──────────┬───────────┘  └───────┬────────┘  └──────┬───────┘ │
└─────────────┼────────────────────────┼──────────────────────┼──────────────────┼─────────┘
              ▼                        ▼                      ▼                  ▼
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                 SHARED MOTION, ANNOTATION & DOCENT STATE (ZUSTAND STORES)                │
│  • shaderFxEnabled (60fps Adaptive Toggle)   • docentOrbState (idle|thinking|narrating)  │
│  • uiAnnotations[] (Agentation Pin Store)    • activeTransitionPreset & labConfig        │
└─────────────┬───────────────────────────────────────────────┬────────────────────────────┘
              ▼                                               ▼
┌─────────────────────────────────────────────┐ ┌──────────────────────────────────────────┐
│ ROBOT DOCENT & FIELD NOTEBOOK AI PRIMITIVES │ │ EXHIBITION HALLS & INTERACTIVE MOTION LAB│
│ • Orbs (orbs.jakubantalik.com): 4-state     │ │ • Home & Gallery: OriginKit Flip/Spring  │
│   harmonic morphing orb on Docent & Header  │ │   Cards, CanvasUI Hero Lens, BorderBeams │
│ • AICSS (aicss.dev): Streaming token text,  │ │ • Earth Evolution: Docent Thinking Orb   │
│   Reasoning Step Drawer & Citation Chips    │ │   + 66 Ma Impact Alert Orb synchronization│
│ • Beautiful-UI Primitives: Segmented tabs,  │ │ • Motion Lab (/motion-lab): Live 9-system│
│   Command Pills & Mastery Progress Rings    │ │   workbench with real-time parameter HUD │
│ • Agentation (agentation.com): Interactive  │ │                                          │
│   UI/Specimen Pin Overlay & Brief Exporter  │ │                                          │
└─────────────────────────────────────────────┘ └──────────────────────────────────────────┘
```

- **Data Model & State**:
  - **Motion & Annotation State (Extended in `studyStore`)**:
    - `shaderFxEnabled: boolean`: Controls adaptive 60fps WebGL over HTML and liquid metal shader intensity.
    - `annotationModeActive: boolean`: Toggles the interactive `agentation.com` cross-hair pin overlay across the viewport.
    - `annotations: Array<{ id, xPercent, yPercent, targetLabel, selector, note, stageId, createdAt }>`: Persists user-created UI and specimen annotations with one-click JSON/Markdown brief export.
    - `docentOrbState: 'idle' | 'thinking' | 'narrating' | 'alert'`: Synchronizes the `orbs.jakubantalik.com` Thinking Orb visuals with Robot Docent speech synthesis, tour transitions, and the 66 Ma Chicxulub impact sequence.

- **Interactive Component & State Mapping**:
  - **Liquid Metal Button (`LiquidMetalButton` / `Button variant="metal"`)**: Tracks pointer `(x, y)` coordinates relative to button bounds, updating a multi-layered metallic conic-sheen and specular rim shader with spring press physics (`metal.jakubantalik.com`).
  - **Conic Perimeter Border Beam (`BorderBeam` upgrade)**: Supports single or dual counter-rotating beams, customizable trail angle, era-matched color stops, and pause-on-hover (`beam.jakubantalik.com`).
  - **WebGL Live HTML Overlay (`CanvasUiEffectLayer`)**: Renders an interactive GPU/Canvasdisplacement & chromatic wave field over tagged HTML regions when `shaderFxEnabled` is active, automatically throttling to zero CPU/GPU usage when pointers are stationary (`canvasui.dev`).
  - **Robot Docent Thinking Orb & AICSS Stream (`ThinkingOrb` + `DocentReasoningStream`)**: Whenever the user changes geological eras, stamps a ticket, or advances a Guided Tour, the Thinking Orb enters `thinking` mode (350ms reasoning step trace expansion) before streaming the Docent's dry curatorial remark in `narrating` mode (`orbs.jakubantalik.com`, `aicss.dev`, `beautiful-ui-five`).
  - **Field Notebook UI Annotation Overlay (`AgentationOverlay`)**: Activated from the Field Notebook or bottom utility bar; clicking any UI element records its DOM selector, bounding box, and curatorial comment into a copyable structured brief (`agentation.com`).
  - **OriginKit & Transitions.dev Primitives**: Powers the expandable stratigraphic FAQ/notes accordions, interactive 3D-tilt/flip specimen cards, smooth auto-height modal containers, and the 9-card interactive showcase inside `/motion-lab`.
