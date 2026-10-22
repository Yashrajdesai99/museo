# MUSEO — Product Requirements Document (PRD)

> Status: Draft v1 | Project: GTU Diploma IT capstone
> Items marked **[TBD]** are undecided. Items marked *(assumption)* are my best guess, so confirm or change them.

---

## 1. Summary

**MUSEO** is a virtual museum platform that lets anyone explore deep time from a browser. It combines two things:

1. **Earth Evolution**: a cinematic, interactive 3D globe that walks through 4.6 billion years of Earth's history.
2. **Gallery**: a browsable collection of fossils and cultural artifacts, each fact-verified and linked to the evolution stage it belongs to.

**Tagline:** [TBD]

---

## 2. Problem

- Deep time is hard to grasp. Textbooks and flat timelines don't make billions of years feel real.
- Most online "virtual museums" are just photo galleries with long captions. They lack immersion and structure.
- Museum content online is often unverified or scattered across sources, so students can't trust or cross-reference it.

## 3. Vision

Make visiting a museum feel like an experience, not a search result: step in, scrub through time, watch continents move, and see real specimens in the era they belong to.

---

## 4. Goals and Non-Goals

### Goals
- G1. Deliver an immersive 3D experience that runs smoothly in a normal browser.
- G2. Make the 4.6-billion-year timeline intuitive and explorable.
- G3. Provide a trustworthy catalog where every entry has a verified source.
- G4. Present a consistent, distinctive Bauhaus / neo-brutalist identity.
- G5. Ship a polished, demonstrable capstone project on schedule.

### Non-Goals (v1)
- No user-generated museums or content uploads. *(assumption)*
- No native mobile apps. Web only. *(assumption)*
- No multiplayer or social features.
- No e-commerce or real ticket sales (the ticket is a login metaphor).
- No more than one cinematic cutscene (Asteroid Impact).

---

## 5. Target Users *(assumption, confirm)*

| Persona | Needs |
|---|---|
| **Student / learner** | Understand evolution and Earth history visually; trustworthy facts for study |
| **Curious visitor** | A fun, shareable, cinematic experience with no learning curve |
| **Project evaluator (GTU faculty)** | A working demo showing technical depth: 3D, typed data, performance, design system |

---

## 6. Core User Stories

- As a visitor, I want to enter through an immersive login scene so the product feels like a real museum.
- As a learner, I want to drag a slider through 4.6 billion years and see the Earth change so I can grasp deep time.
- As a learner, I want extinction events marked on the timeline so I can see major turning points.
- As a visitor, I want to see the Asteroid Impact as a cinematic moment because it is the most dramatic event.
- As a learner, I want to browse fossils and artifacts and filter by type and evolution stage so I can find what's relevant.
- As a learner, I want each entry to show a verified source so I can trust and cite it.
- As a user on a weaker device, I want the app to stay smooth and offer a simpler fallback so it's still usable.

---

## 7. Features and Requirements

Priority: **P0** = must ship, **P1** = should ship, **P2** = nice to have.

### 7.1 Home page (P0): Foundation, done
- Seven-section landing page introducing MUSEO. Section list: [TBD]
- 3D canvases only render while visible (IntersectionObserver-gated frameloop).
- Follows the design system (see `design.md`).

### 7.2 Catalog and data layer (P0): Foundation, done
- Strict TypeScript discriminated union: `CulturalArtifact | FossilSpecimen`, with type guards.
- 20 fact-verified entities, cross-linked to five evolution stages.
- Every entity has a recorded source.

### 7.3 Login: "Museum of Deep Time" (P0): in progress
- Fully 3D cinematic entrance scene.
- Physics-based ticket animation acts as the login affordance.
- Robot guide stands at the ticket counter.
- Login validation and auth method: [TBD]
- Accessible 2D fallback for reduced-motion / low-power devices.

### 7.4 Earth Evolution timeline (P0): in progress
- 4.6-billion-year interactive globe.
- **Deep Time Slider** to scrub the full timeline.
- **Morph-target continental drift** tied to slider position.
- **Extinction event markers** on the timeline.
- **Proximity-based asset culling:** only load and render models near the active time.
- **One cinematic cutscene** for the Asteroid Impact era.
- Relevant catalog entities surface for the active stage.

### 7.5 Gallery (P0/P1)
- Card grid of fossils and artifacts. (P0)
- Filter by type and evolution stage. (P0)
- Detail view with 3D model viewer, facts, and source. (P1)
- Search and sorting. (P2) [TBD]

### 7.6 Platform and quality (P0)
- Responsive layout for desktop and tablet; mobile behavior [TBD].
- Reduced-motion support and static fallbacks.
- Keyboard-navigable 2D UI; AA color contrast.

### 7.7 Future (P2) [TBD]
- Guided tours led by the robot guide.
- Quizzes tied to catalog entries.
- Expanded catalog beyond 20 entities.

---

## 8. Design and Technical Constraints

- **Stack:** React, TypeScript (strict), React Three Fiber / Three.js.
- **Design system:** Bauhaus / neo-brutalist. Near-black, warm off-white, yellow CTAs only, Space Grotesk headlines, hard block shadows, no gradients.
- **Assets:** 23-model sourcing list; Smithsonian CC0 assets confirmed for key models. All assets must have a clear license.
- **Performance:** smooth on a mid-range laptop. Target: **[TBD, e.g. 60 fps]**.
- Details live in `design.md`.

---

## 9. Success Metrics

Because this is a capstone, success is mostly demo and quality based *(assumption)*:

| Metric | Target |
|---|---|
| Core flow works end to end (login → timeline → gallery) | 100% in demo |
| Frame rate during Earth Evolution on a mid-range laptop | [TBD] fps |
| Catalog entries with verified source | 100% |
| Type errors in strict mode | 0 |
| Faculty / evaluator feedback | Positive on immersion and technical depth |
| Lighthouse accessibility score | [TBD] |

---

## 10. Milestones

| Phase | Status | Deliverables |
|---|---|---|
| 1. Foundation | Done | Schema, 20-entity catalog, seven-section home page |
| 2. Core Experience | In progress | Login scene, Earth Evolution timeline |
| 3. [TBD] | Planned | [TBD, e.g. Gallery detail views, polish] |
| 4. [TBD] | Planned | [TBD, e.g. testing, deployment, final submission] |

Submission / demo deadline: **[TBD]**

---

## 11. Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| 3D performance on weak devices | Janky or unusable demo | Frameloop gating, asset culling, compressed models, 2D fallback |
| Asset licensing problems | Can't ship a model | Prefer CC0 (Smithsonian), record license per asset |
| Scope creep in cinematic scenes | Missed deadline | Hard rule: one cutscene only |
| Fact errors in catalog | Loss of trust | Source required per entry, verification before merge |
| Large model file sizes | Slow load | glTF compression, lazy loading by proximity |
| Solo-dev time limits | Incomplete features | Strict P0/P1/P2 prioritization |

---

## 12. Open Questions

- [ ] Final tagline
- [ ] Names of the five evolution stages
- [ ] Auth method for login (real accounts vs. demo-only)
- [ ] Hosting / deployment target
- [ ] Phase 3 and 4 scope and deadlines
- [ ] Mobile support level
- [ ] Performance targets
