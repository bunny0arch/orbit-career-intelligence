# ORBIT continuation prompt

You are the next development agent continuing the existing ORBIT application. Do not rebuild it from zero and do not replace working functionality.

## Starting point

Repository: `https://github.com/bunny0arch/orbit-career-intelligence`

Toolkit repository: `https://github.com/bunny0arch/orbit-mcp-toolkit`

Start from the latest remote branch `chore/phase-1-structural-rewire`, which contains the Phase 1 structural/API work. Read `README.md`, `docs/ARCHITECTURE.md`, `docs/IMPLEMENTATION_NOTES.md`, `docs/PHASE_1_REWIRE.md`, `COMPONENTS.md`, `TODO.md`, and `TODO_NEXT_AGENT.md` before editing. Read the toolkit repository’s `docs/MCP_TOOLKIT.md`, `docs/SETUP_GUIDE.md`, `docs/PROJECT_RULES.md`, and `docs/SOURCE_RESEARCH.md` before using MCPs.

## First audit steps

Inspect the current Git status, branch, latest commit, package manifest, lockfile, source tree, route manifest, and existing component inventory. Run the current typecheck/build before changing code. Start the app and use Playwright to capture a baseline accessibility snapshot, screenshot, console log, and responsive state for the major routes.

## MCP toolkit instruction

Use `orbit-mcp-toolkit` as a safe setup and documentation reference. Cloning it does not install connectors. Inspect the active Manus MCP registry first and reuse native GitHub, Playwright, Supabase, Vercel, Context7, Exa, and webdev integrations when available. Do not copy MCP server configs into the frontend, do not add MCP servers to `package.json`, do not put connector credentials in `.env` or source files, and do not commit session-specific connector configuration. If you truly need a new MCP, verify its official source, license, runtime, authentication, least-privilege scope, and exact schema before using it. Record only redacted, factual validation notes.

## Main implementation goal

Begin the animated UI transformation across the existing website using free, established components. React Bits is the first source for motion and visual interaction patterns. Use shadcn/ui and Radix for accessible structural primitives. Use Motion/Framer Motion and Lucide only where they complement the sourced components already in the app.

For each major visual or interaction component, search the provider documentation, inspect the actual implementation, verify compatibility and license, integrate it into the app, test it in the real route, and update `COMPONENTS.md`. Do not claim a component was used unless its code is actually present and used. Do not create a custom component when a suitable free sourced component exists. Orbit-specific evidence visualizations may remain custom compositions when no provider component expresses the domain semantics; document that reason.

## Required UI work

Extract the remaining page modules from `src/app/App.tsx` incrementally while preserving the current `OrbitState` contracts and local/demo-safe data behavior. Establish shared shell, page transition, toast/feedback, loading, empty, error, focus, button, input, modal, tab, tooltip, and progress patterns.

Apply purposeful animations across all existing routes: route/content reveals, navigation indicators, sidebar/mobile navigation transitions, modal/dropdown/tab transitions, button hover/press states, input focus states, progress changes, roadmap completion, animated lists, skill visualizations, dashboard activity, and Career Brain loading/success/error states. Use reduced-motion fallbacks, avoid blocking interaction, and keep mobile performance smooth.

Do not invent routes or fake metrics. Preserve honest messaging that preview data is local/demo-safe, AI output is explanatory, and readiness is not a hiring or certification guarantee. Do not wire the app to the current Supabase project yet: its observed schema is a broader placement/conferencing system and requires a separate persistence decision.

## Validation and delivery

Use Playwright at desktop, tablet, and mobile sizes to validate every implemented route. Check keyboard accessibility, console errors, failed network requests, reduced-motion behavior, and real interaction states. Keep `/manus-routes.json` synchronized. Run `npm run typecheck`, `npm run build`, `npm audit --omit=dev --audit-level=moderate`, and `git diff --check`. Capture before/after screenshots and document remaining issues.

Work on a new development branch. Commit meaningful, reviewable changes and push the branch to GitHub after verification. Do not merge to `main`, change production Vercel settings, change production deployment targets, run Supabase migrations, or alter production data without explicit approval.

Your final report must list the routes redesigned, the actual React Bits/shadcn/Radix/Lucide components integrated, animation behavior, dependency changes, screenshots/tests performed, unresolved issues, and the branch/commit pushed.
