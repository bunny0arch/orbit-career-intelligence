# Implementation notes

## Database

The managed project database is enabled, but this first application pass keeps the preview independently usable with local demo-safe state. The production schema should include `profiles`, `skills`, `skill_evidence`, `assessments`, `roles`, `role_requirements`, `certifications`, `roadmaps`, `roadmap_tasks`, `achievements`, and `audit_events`, with an owner key and row-level policies on every user-owned table. Private proof files should live in authenticated storage with signed URLs and a database index.

## AI_AGENT

`server/ai.ts` exposes one provider adapter. It calls Gemini first using the OpenAI-compatible Gemini endpoint and `GEMINI_API_KEY`. If Gemini fails, it calls OpenRouter using `OPENROUTER_API_KEY`. If both fail, it returns a deterministic profile-based fallback and labels it `Orbit fallback`. Provider keys never enter the client bundle. AI output is explanatory only; deterministic scoring stays in `src/lib/scoring.ts`.

## RAG

A production Career Brain should ingest approved official/provider/institutional documents, store source URL, title, version, reviewed date, passage, and hash, and validate citations against retrieved passages. Untrusted retrieved text must not override system instructions or permissions. This preview uses source labels on role templates and does not claim to implement live RAG ingestion.

## Security

The final production authentication path should normalize usernames, enforce uniqueness transactionally, map username credentials to a private auth identity server-side, use secure application sessions, set Preview cookies as `SameSite=None; Secure`, enforce owner checks/RLS, keep admin/reviewer routes role-aware, and record sensitive actions in an audit table. No secret values are committed.

## API

- `GET /api/health` — unauthenticated readiness check.
- `POST /api/ai/career-brief` — accepts `{name,targetRole,strengths,gaps,roadmap}` and returns `{provider,text}`. The endpoint is intentionally narrow and does not persist AI output.

## ANDROID_READINESS

The domain types are UI-independent and the server adapter is isolated behind HTTP. A future Expo client can reuse profile, skill, evidence, role, roadmap, and achievement contracts without duplicating identity or data. Replace local storage with authenticated API repositories before Android release.
