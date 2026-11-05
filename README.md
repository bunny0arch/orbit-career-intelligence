# ORBIT — Career Intelligence & Skill Evolution

ORBIT is a dark-first student workspace for VFSTR and other institutions. It helps a student move from goal discovery to evidence-backed skill gaps, learning roadmaps, and visible progress.

## Run

```bash
npm install
npm run dev
```

The app listens on port 3000. `npm run build` creates the production frontend bundle, and `npm run typecheck` runs TypeScript diagnostics.

## What is included

The current preview includes login-first access, simple registration, onboarding, editable profile context, technical/professional skills, provenance-aware evidence labels, five role templates, deterministic role comparison, Career Brain with Gemini → OpenRouter → local fallback routing, ordered roadmap tasks, certification tracking, achievements, a responsive shell, a route manifest, and component/source documentation.

## Honest boundaries

Preview state is local and demo-safe. It is not official VFSTR data, not a hiring prediction, and not certification verification. Production Supabase Auth username mapping, RLS-backed repositories, private proof storage, live RAG ingestion, verified opportunity feeds, and admin/reviewer workflows are documented in `docs/IMPLEMENTATION_NOTES.md` and are not represented as completed.

## Deployment boundary

The frontend is built as a Vite bundle for Vercel. The Career Brain and health endpoints are also exposed as Vercel serverless functions under `api/`, so deployed builds keep the same provider routing and safe fallback behavior as the local Express runtime. Provider keys must be configured as server-side Vercel environment variables; they are never `VITE_*` variables.

## Sources

See `COMPONENTS.md` for React Bits, shadcn/ui/Radix, and Lucide source URLs, licenses, dependencies, adaptations, and usage.
