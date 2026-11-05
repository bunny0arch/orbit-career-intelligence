# ORBIT implementation plan

## Scope

Orbit is a login-first student career-intelligence workspace for VFSTR and other institutions. This delivery prioritizes a dependable P0 journey in a coherent product shell: authentication entry, onboarding/profile editing, evidence-aware skills, role comparison, AI-assisted recommendations, roadmap progress, certifications, achievements, and a dashboard that clearly separates recorded data from assessed or demonstrated evidence. The architecture is deliberately modular so a later Android client can consume the same domain contracts.

## Implementation approach

The app will use React + TypeScript + Vite with a lightweight server-side API layer. Core domain state is modeled as typed records and persisted through the app's database contract when available, with a local development fallback that keeps the product usable without pretending that fallback data is verified. AI requests are routed through a server adapter: Gemini is the preferred provider, while OpenRouter is a transparent fallback. Deterministic career readiness calculations stay in application code; AI explains and recommends but does not authorize, verify credentials, or invent scores. All AI results include provider status and uncertainty language.

The initial release will ship the dashboard as the product's strongest end-to-end surface, with navigation into Skills, Career Paths, Career Brain, Roadmaps, Certifications, Achievements, Profile, and Settings. Forms and actions will have visible feedback and persist in the client/domain store for this prototype. Deferred production integrations are documented rather than represented as completed.

## Project structure

- `src/app/` — app bootstrap, routing, shell, and page state.
- `src/components/ui/` — sourced accessible primitives and small composition helpers.
- `src/components/orbit/` — application-specific dashboard, skill, roadmap, and evidence compositions.
- `src/data/` — typed demo-safe role templates, learning resources, and initial state.
- `src/lib/` — provider adapter contracts, persistence helpers, scoring functions, and utilities.
- `src/styles/` — global tokens, typography, responsive layout, and reduced-motion rules.
- `server/` — server-side AI adapter and future API boundaries; secrets never enter client bundles.
- `public/` — route manifest and static metadata.
- `docs/` — architecture, database, AI, RAG, security, API, and Android-readiness notes.

## Design direction

### Alternatives

- 0.06 — Swiss data-instrument: strict grid, editorial hierarchy, and clinical evidence labels.
- 0.08 — Neo-brutalist academic console: hard edges, high contrast, and louder utility cues.
- 0.05 — Quiet orbital atelier: dark graphite canvas, lime signal marks, thin orbital lines, and calm data density.

### Chosen movement: quiet orbital atelier

**Core principles:** evidence before aspiration; calm density over dashboard clutter; every accent communicates state; motion confirms system work rather than decorating it.

**Color philosophy:** near-black graphite creates a serious workspace; off-white text protects reading comfort; signal-lime marks progress and action; amber flags uncertainty; gold is reserved for earned achievements. No gradients are needed to create hierarchy.

**Layout paradigm:** a persistent left rail anchors orientation while the main content reads as a vertical evidence ledger: greeting and next move first, then readiness context, then detailed records. Cards are shallow, rectangular, and grouped by meaning rather than repeated as a generic grid.

**Signature elements:** the ORBIT mark is a small ring interrupted by a forward notch; skill tags use provenance-aware micro-labels; progress uses thin signal lines and compact circular markers instead of oversized gauges.

**Interaction philosophy:** controls should explain their consequence. Add, assess, compare, generate, and continue actions stay close to the record they affect. Empty states teach the next step. AI work shows the real provider state and degrades honestly.

**Animation:** use subtle enter/exit and progress transitions, with reduced-motion fallbacks. No fake “thinking” loops; only show loading while a real action is pending. Sidebar and modal motion should be short and directional.

**Typography:** use Geist/Inter-like sans-serif hierarchy with compact uppercase metadata, restrained page titles, and tabular numerals for metrics. Avoid oversized hero typography inside the authenticated product.

**Brand essence:** evidence-backed career intelligence for students who want to turn learning into demonstrable capability. Precise, grounded, forward-looking.

**Brand voice:** headlines are direct and specific; CTAs describe the next useful move. Example lines: “Close the next gap.” “Your profile is a claim until evidence moves it forward.”

**Wordmark & logo:** a compact ring mark with a forward notch paired with the ORBIT wordmark in spaced uppercase lettering.

**Signature brand color:** signal lime `#c8f169`, used sparingly as the system's action and progress signal.

## Component sourcing decisions

React Bits is the primary source for motion and interface patterns. shadcn/ui and Radix primitives cover accessible structural controls where React Bits does not provide a suitable copyable primitive. Lucide supplies the open-source icon set. The exact selections, URLs, licenses, dependencies, adaptations, and feature usage are recorded in `COMPONENTS.md`.

## Delivery boundary

P0 product surfaces are implemented in this first pass. A production-grade username-to-Supabase-Auth mapping, private proof storage, RLS migrations, live source-grounded RAG ingestion, verified opportunity feeds, and reviewer/admin workflows remain documented as next integrations unless the managed project exposes the required resources during implementation. The UI does not label local/demo records as official institutional data.
