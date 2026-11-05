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

## Visual transformation plan — 2026-11-05

### Audit findings

The existing app has nine implemented page routes: login/register and three-step onboarding are gates rather than routes; authenticated pages are Dashboard, Skills, Career Paths, Career Brain, Roadmaps, Certifications, Achievements, Profile, and Settings. Navigation is hand-rolled with History API and mobile horizontal navigation. There is no router dependency. State is localStorage-backed; Career Brain calls `/api/ai/career-brief`; role readiness is deterministic in `src/lib/scoring.ts`. No persistence/auth/database behavior is to be changed as part of this visual pass.

The current surface already has a dark graphite and signal-lime direction, Radix tabs/progress, Motion animations, React Bits AnimatedList, and bespoke domain content. Weak points are repetitive rectangular panels, an all-static skill-bar visualization, hard-coded recent-activity rows that look like real user events, limited navigation/page transitions, and low differentiation between page surfaces. The login/onboarding flow is intentional and remains; it is not to be removed or replaced with a public marketing template.

### Chosen visual treatment

Keep the existing quiet-orbital-atelier identity and sharpen it into an evidence-led field-notes instrument. Use a deep graphite surface, subtle technical grid/registration marks, paper-like surface separation without glassmorphism, lime only for actionable/confirmed signal, amber for incomplete evidence, and restrained metallic gold for earned milestones. Use page-specific information hierarchy rather than repeating dashboard-card grids. Interactions should reveal focus/proximity, clarify state changes, and honor reduced-motion preferences.

Integrate the official free React Bits SpotlightCard source into selected high-value interactive surfaces while retaining the already-integrated AnimatedList for actual activity only. Keep accessible Radix primitives already in the repo where they provide shadcn-style behavior; source shadcn/ui copyable controls only when they fit the existing stack without introducing an incompatible global CSS framework. Use existing Motion for short route entrances and transitions. Do not add decorative effects on every surface or invent user records.

### Project structure and implementation boundaries

Keep the existing project structure: `src/app/App.tsx` owns all current route/page composition and domain interactions; `src/components/ui/` owns source-attributed reusable UI primitives; `src/styles/global.css` owns design tokens, composition styles, responsive states, and reduced-motion behavior; `public/manus-routes.json` remains the route declaration. `server/`, `src/lib/`, `src/data/`, authentication/session logic, API contracts, scoring, and storage behavior are outside the redesign except where a visible false claim must be removed.

The separate `orbit-mcp-toolkit` repository is a security-conscious documentation/setup record, not the site source and not an implementation repository. It remains read-only for this site task; the site repo will carry the component inventory and implementation notes.

## Delivery boundary

P0 product surfaces are implemented in this first pass. A production-grade username-to-Supabase-Auth mapping, private proof storage, RLS migrations, live source-grounded RAG ingestion, verified opportunity feeds, and reviewer/admin workflows remain documented as next integrations unless the managed project exposes the required resources during implementation. The UI does not label local/demo records as official institutional data.
