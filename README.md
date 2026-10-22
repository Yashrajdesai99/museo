# MUSEO — Virtual Museum of Deep Time

**MUSEO** is an interactive 3D virtual museum platform exploring 4.6 billion years of Earth's geological evolution, continental drift, mass extinctions, and 20 institution-verified paleontological fossils and cultural artifacts.

Built as a GTU Diploma IT capstone project using **React + TypeScript (Strict) + Three.js + Zustand + Tailwind CSS**.

---

## Core Features

1. **Seven-Section Exhibition Home (`/`)**:
   - Visibility-gated 3D WebGL viewports (`IntersectionObserver` via `useInView` + `LazyCanvas`).
   - Interactive 24-Hour Deep Time Clock, Five Evolutionary Stages explorer, Flagship Specimens showcase, Mass Extinction Turning Points, and Live Discriminated Union Inspector.
2. **Museum of Deep Time 3D Ticket Counter (`/login`)**:
   - Articulated Bauhaus **Robot Docent Guide** that tracks pointer movement and stamps visitor passes.
   - **Physics-Driven 3D Ticket** with second-order spring kinematics and local session persistence.
   - Instant toggle and automatic detection for a **2D Accessible Form Fallback** (`prefers-reduced-motion`).
3. **4.6-Billion-Year Earth Evolution Timeline (`/earth`)**:
   - Piecewise non-linear **Deep Time Slider** (`4,600 Ma` to `0 Ma`).
   - Real-time procedural **Continental Drift** (Proto-cratons → Rodinia → Snowball Earth → Pangea → Modern Continents).
   - **Proximity-Based Asset Culling** (`culling.ts`) for orbital 3D specimen satellites.
   - **Single Cinematic Cutscene** at **66.0 Ma** for the **Chicxulub K-Pg Asteroid Impact**.
   - **Collapsible Bottom Control Dock** with Cinema / Zen Mode (`[H]` shortcut).
4. **Specimen Gallery & 360° 3D Detail Viewer (`/gallery` & `/gallery/:id`)**:
   - Strict TypeScript discriminated union (`FossilSpecimen | CulturalArtifact`) narrowed exclusively with `isFossil` and `isArtifact` type guards.
   - Interactive 3D `ModelViewer` with turntable toggle, wireframe topology inspection, and studio/raking lighting presets.

---

## Credits & Asset Provenance

All 20 catalog entries cite primary peer-reviewed literature and open-access museum repositories:
- **Smithsonian Institution (NMNH & 3D Digitization Program — CC0)**: *Tyrannosaurus rex* Cranium (`USNM 555000`), *Anomalocaris canadensis* (`USNM 57490`), *Placenticeras meeki* (`USNM PAL 412890`), *Mammuthus primigenius* Molar (`USNM PAL 23491`), Pilbara Conical Stromatolite, Olduvai Acheulean Handaxe Cast (`A412980`).
- **Natural History Museum London / Berlin / Vienna / British Museum / National Museum of Ethiopia**: *Paradoxides davidis*, *Archaeopteryx lithographica* (`MB.Av.101`), *Australopithecus afarensis* (`AL 288-1`), Gravettian Figurine, Uruk IV Proto-Cuneiform Tablet (`ME 116730`).
