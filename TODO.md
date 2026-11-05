# ORBIT delivery checklist

## Visual transformation and sourced component system

- [x] Preserve the existing application and its working backend integrations, database/storage behavior, authentication, routes, and data; redesign the frontend rather than rebuild the application.
- [x] Inspect the complete frontend and all routes before making page changes; document current visual weaknesses and the redesigned component inventory.
- [x] Use free, open-source React Bits and shadcn/ui/Radix components where they match the existing React + TypeScript + Vite stack; verify source, license/availability, installation/dependencies, actual use, and adaptations in `COMPONENTS.md`.
- [x] Create a recognizable, dark-first ORBIT identity with restrained graphite/neutral surfaces, purposeful signal accents, strong hierarchy, intentional space, fine detail, and no generic AI dashboard styling.
- [x] Restyle every existing user-visible page and state, including login/registration, onboarding, dashboard, skills, career paths, Career Brain, roadmaps, certifications, achievements, profile, and settings; retain existing core actions.
- [x] Add page, hover, focus, press, loading, progress, feedback, and task-completion interactions; use reduced-motion styling and responsive layout behavior.
- [x] Make skill evidence, role readiness, learning roadmaps, achievements, and dashboard metrics clearer without adding synthetic activity rows presented as user events.
- [x] Apply one reusable design system for typography, color, spacing, borders, depth, controls, navigation, feedback states, motion, and responsive breakpoints.
- [ ] Validate all major routes and principal controls at desktop, tablet, and mobile sizes; report observable test scope, errors, and any remaining issue.
- [x] Commit visual changes on a separate development branch and push to the site GitHub repository; correct the repository-local GitHub noreply identity.
- [ ] Verify a new Vercel deployment for the pushed branch. No deployment is currently listed for its commit; the Vercel deployment connector returned transport errors when asked to create one, and the project's prior latest deployment remains `BLOCKED` for account configuration.

## Login-first access and account flow

- [ ] The first screen is the ORBIT login experience, not a public landing page.
- [ ] The login surface includes username, password, password visibility, validation, loading feedback, authentication errors, and a create-account action.
- [ ] Registration asks only for username, password, and confirm password; username format, uniqueness, password strength, matching passwords, and duplicate submissions are handled.
- [ ] Sessions restore securely; logout works; unauthenticated visitors cannot access private dashboard information.

## Profile and onboarding

- [ ] New students complete a structured profile after registration with personal and educational information.
- [ ] VFSTR is a first-class institution option while other institutions remain supported.
- [ ] Profile data is saved permanently, onboarding is not repeated for completed profiles, interrupted onboarding can resume, and profile edits persist.

## Skills, evidence, and assessment

- [ ] Students can add technical and professional skills and update proficiency.
- [ ] Self-claimed, assessed, demonstrated, validated, and submitted/pending evidence states remain distinguishable.
- [ ] Evidence can be attached to skills and projects, with source/provenance visible.
- [ ] Students can complete an assessment; results and weak topics are stored and shown using the defined rubric.

## Career intelligence

- [ ] At least five role templates are available with structured requirements, source references, and review metadata.
- [ ] Role comparison calculates reproducible readiness and identifies missing skills.
- [ ] Explainable skill-gap analysis separates mandatory eligibility from skill coverage and never implies a hiring or certification guarantee.
- [ ] A non-mutating hypothetical career scenario can compare a role without changing canonical profile data.

## AI recommendations and Career Brain

- [ ] AI uses the authenticated student's actual profile context and selected objective.
- [ ] Gemini is the preferred provider through a server-side adapter, with transparent OpenRouter fallback when Gemini is unavailable.
- [ ] AI recommendations cover relevant courses/certifications and state uncertainty when source evidence is incomplete.
- [ ] AI failure does not break the core product; the UI retains input and offers a retryable error state.

## Roadmaps, resources, progress, and achievements

- [ ] Students can generate a personalized ordered roadmap with stages, measurable tasks, prerequisites, target proficiency, and learning resources.
- [ ] Task order and completion criteria are visible; progress persists and completed tasks remain completed after reload/login.
- [ ] Certification completion tracking distinguishes user-declared and verified credentials and supports optional proof upload integration.
- [ ] Achievements unlock only when deterministic criteria are met and duplicates are prevented.

## Dashboard and responsive application shell

- [ ] Dashboard metrics derive from actual profile/skill/roadmap/certification records in the app state.
- [ ] Dashboard shows strengths, evidence status, priority gaps, readiness context, active roadmap, achievements, opportunities, and next actions without meaningless filler.
- [ ] Desktop navigation is concise and mobile navigation remains usable on narrow screens.
- [ ] All visible actions have a working state transition, feedback, or documented integration boundary.

## Security and architecture

- [ ] Provider secrets are server-side only and never shipped in frontend code.
- [ ] User-owned data boundaries, private storage, RLS, role-aware admin routes, audit logs, and safe signed URLs are documented for the production persistence layer.
- [ ] API/domain types are stable enough for a future Android client.
- [ ] `COMPONENTS.md`, architecture, database, AI, RAG, security, API, and Android-readiness docs are maintained.

## Validation and delivery

- [ ] TypeScript diagnostics and production build pass.
- [ ] `/manus-routes.json` matches the implemented page routes.
- [ ] Preview is reachable on the configured port and the main login-to-dashboard flow is checked with browser automation.
- [ ] Changes are committed with a descriptive message and pushed to the project GitHub repository through the managed canonical workflow.

## Deferred, not silently removed

- [ ] Production username-to-Supabase-Auth identity mapping and account recovery after verified email.
- [ ] Private certification/evidence storage and production RLS migrations against a dedicated Orbit Supabase schema.
- [ ] Live source-grounded RAG ingestion/citation validation and verified opportunity ingestion.
- [ ] Reviewer/admin console, notifications, advanced adaptive assessments, and Android client.
