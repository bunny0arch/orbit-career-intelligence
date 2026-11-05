# ORBIT Phase 1 structural rewire

**Branch:** `chore/phase-1-structural-rewire`

**Baseline:** `68ca05c` (`main`)

## Completed

- Preserved the existing React + TypeScript + Vite + Express architecture.
- Brought the existing Vercel/API hardening commit into this development branch:
  - `server/request.ts` validates and bounds Career Brain input.
  - `api/health.ts` and `api/ai/career-brief.ts` provide Vercel-compatible serverless boundaries.
  - `vercel.json` declares the Vite build and `dist` output.
  - Express development routing uses the same request parser and safe provider error response.
- Extracted the shared route registry into `src/app/navigation.ts` so shell labels and route metadata do not remain duplicated inside the monolithic app file.
- Kept the existing `OrbitState` contracts, local preview persistence, deterministic scoring, and provider adapter unchanged.

## Dependency boundary

The current direct dependencies are sufficient for the prototype and build cleanly with the checked-in lockfile. No MCP server is a frontend runtime dependency. The `orbit-mcp-toolkit` repository is a documentation and environment setup record; its connector definitions must not be copied into `package.json`, shipped to the browser, or committed as application secrets.

Existing native integrations should be reused for repository, deployment, database, browser, and documentation operations. Component libraries remain an implementation concern for the next UI phase: React Bits patterns can be adapted locally, while Radix primitives already provide the accessible foundation for the current tabs and progress controls.

## Intentionally deferred

- Supabase writes, migrations, auth wiring, and storage changes. The connected project has an unrelated placement/conferencing schema and must not be used as an Orbit persistence target without an explicit schema decision.
- Vercel project settings or production deployment changes. The matching Vercel project currently deploys from `feat/vercel-ai-routes`; branch alignment requires a separate release decision.
- Large UI extraction or redesign. The next phase can move page modules out of `App.tsx` incrementally while preserving the verified prototype flow.

## Verification

- `npm ci --ignore-scripts`
- `npm run typecheck`
- `npm run build`
- `npm audit --omit=dev --audit-level=moderate`
- `git diff --check`
- Local `/api/health` and `/manus-routes.json` responses returned HTTP 200 before the rewire.
