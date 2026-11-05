# ORBIT next-agent TODO

This checklist starts after commit `d19940f` on `chore/phase-1-structural-rewire`. Work on a new branch from the latest remote development branch and preserve the verified prototype behavior.

**Progress update:** The initial shadcn/ReactBits integration batch is now complete on this branch. Orbit has local Button, Input, Label, Card, Badge, and SpotlightCard primitives, with login/register and dashboard readiness/profile actions migrated first. The remaining route-wide extraction and animation rollout stays open below.

## 1. Restore and use the MCP toolkit safely

- [ ] Read `orbit-mcp-toolkit/docs/MCP_TOOLKIT.md`, `SETUP_GUIDE.md`, `PROJECT_RULES.md`, and `SOURCE_RESEARCH.md` before using connector tooling.
- [ ] Inspect the active MCP registry and reuse native GitHub, Playwright, Supabase, Vercel, Context7, Exa, and webdev integrations where available.
- [ ] Treat `orbit-mcp-toolkit` as a documentation/runbook repository, not an application dependency. Do not copy MCP server definitions into `package.json`, browser code, `.env` files, or production configuration.
- [ ] If a new MCP connector is genuinely required, verify its official source, license, runtime, authentication model, least-privilege scope, and exact tool schema first. Keep connector configuration outside the app repository and record only redacted status/evidence in project docs.
- [ ] Use Playwright for route screenshots, accessibility snapshots, console checks, responsive checks, and interaction verification.
- [ ] Record actual connector setup or validation in the toolkit’s documented inventory/log only when it was really performed; never infer “installed” from the repository documentation.

## 2. Stabilize the application structure

- [ ] Start from the latest `chore/phase-1-structural-rewire` commit and create a dedicated UI implementation branch.
- [ ] Preserve the React + TypeScript + Vite + Express architecture and existing `OrbitState` contracts.
- [ ] Extract the remaining page modules from `src/app/App.tsx` into route/page files without changing behavior: authentication, onboarding, dashboard, skills, career paths, Career Brain, roadmaps, certifications, achievements, profile, and settings.
- [ ] Keep shared shell, route registry, feedback/toast, and interaction utilities in reusable modules.
- [ ] Keep server-only AI provider calls and secrets in the server/API boundary. Do not move provider keys into `VITE_*` variables or client code.
- [ ] Avoid adding duplicate component libraries. Reuse the current Radix primitives and `motion` dependency unless a documented compatibility reason requires a change.

## 3. Discover and integrate free components

- [ ] For each major interaction, search React Bits first, then shadcn/ui, Radix, Motion Primitives, Aceternity UI, Magic UI, Cult UI, Origin UI, and Lucide as appropriate.
- [ ] Verify the source URL, license/usage conditions, installation method, dependencies, and framework compatibility before integration.
- [ ] Prefer copyable/adapted source components over opaque packages when the provider recommends that approach.
- [ ] Update `COMPONENTS.md` for every component actually integrated, including local path, source, dependencies, customizations, and route usage.
- [ ] Do not create a custom component when a suitable free sourced component exists. If a custom composition is necessary for Orbit-specific evidence semantics, document why.

## 4. Build the motion system across the existing routes

- [ ] Add purposeful page/content reveal transitions with reduced-motion support.
- [ ] Add smooth route, modal, sidebar, dropdown, tab, loading, success, error, and empty-state transitions where those interactions exist.
- [ ] Add meaningful micro-interactions for hover, press, focus, progress, active navigation, and icon states.
- [ ] Use React Bits patterns for selected animated lists, spotlight/background effects, text reveals, magnetic/hover effects, or scroll-linked motion only where they clarify product state.
- [ ] Avoid decorative animation loops, generic glow effects, excessive glassmorphism, random gradients, and motion that blocks interaction.
- [ ] Keep animations GPU-friendly, responsive on mobile, and disabled or reduced under `prefers-reduced-motion`.

## 5. Redesign each existing route without inventing fake features

- [ ] Preserve current functionality and data boundaries while improving hierarchy, density, focus states, and responsive composition.
- [ ] Give the dashboard meaningful data motion for readiness, evidence coverage, active roadmap, and recent activity.
- [ ] Make skills/evidence feel like a connected capability model rather than a static tag list.
- [ ] Make career comparison, readiness, and mandatory eligibility distinctions visually explicit.
- [ ] Make roadmap milestones, dependencies, completion state, and progress changes interactive and legible.
- [ ] Make certifications and achievements rewarding but evidence-grounded, not gamified clutter.
- [ ] Preserve honest labels around demo/local state, provider uncertainty, and non-guaranteed career advice.

## 6. Validate before delivery

- [ ] Run typecheck, production build, dependency audit, and `git diff --check`.
- [ ] Use Playwright to validate every route at desktop, tablet, and mobile widths.
- [ ] Check keyboard focus, accessible names, reduced-motion behavior, and console/network errors.
- [ ] Verify `/manus-routes.json` remains synchronized with real routes.
- [ ] Verify API health and Career Brain validation/fallback behavior without exposing secrets.
- [ ] Capture before/after screenshots and document remaining issues.
- [ ] Commit meaningful changes on the development branch and push only after verification; do not change production deployment settings or Supabase schema without explicit approval.
