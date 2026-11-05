# ORBIT architecture

Orbit is a React + TypeScript + Vite client served by an Express boundary. The client owns presentation and typed domain state. The server owns provider calls and is the only place where AI credentials can be read. The page route manifest is kept in `public/manus-routes.json` for the managed preview runtime.

Core domain records are profile, skill, evidence provenance, role requirements, roadmaps, roadmap tasks, certifications, and achievements. Readiness scoring is deterministic in `src/lib/scoring.ts`; AI explains and recommends but cannot change authorization, evidence status, or score values.

The current preview stores demo-safe state in local storage so the full flow remains demonstrable. A production deployment should replace `src/lib/storage.ts` with database repositories while keeping the same types and API contracts. This keeps a future Android client independent of the React UI.

## Main flows

1. Login/register → local session → optional onboarding.
2. Profile → typed student context → role selection.
3. Skills/evidence → deterministic coverage and priority gaps.
4. Career Brain → server AI adapter → provider-labelled response.
5. Roadmap → ordered tasks → persisted completion → achievement criteria.

## Deferred integration boundary

Production username-first authentication, Supabase Auth mapping, RLS, private storage, source-grounded RAG, and reviewer/admin access are intentionally documented as next steps. The preview labels local/demo state and does not present it as official VFSTR data.
