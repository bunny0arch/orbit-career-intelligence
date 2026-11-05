# ORBIT visual audit and redesign record

## Audit scope

Reviewed the entire user-provided transformation brief, all tracked site source and project documentation, the route manifest, server/API boundary, design inventory, TODO, and every tracked file in `bunny0arch/orbit-mcp-toolkit`. The toolkit repository is an MCP setup/security documentation project, not the ORBIT frontend or feature source; it was left unchanged.

The site is a React + TypeScript + Vite app with nine authenticated routes: Dashboard, My Skills, Career Paths, Career Brain, Roadmaps, Certifications, Achievements, Profile, and Settings. Login/register and three-step onboarding are flow gates, not separate routes. Navigation uses the History API and mobile horizontal navigation. Domain state is persisted via the existing `src/lib/storage.ts`; AI requests go to `/api/ai/career-brief`; readiness scoring remains deterministic in `src/lib/scoring.ts`. The visual pass did not alter those contracts, user state types, backend routes, or data persistence behavior.

## Baseline visual findings

The site already had a restrained graphite/lime direction, a hand-drawn ORBIT mark, accessible Radix Progress and Tabs wrappers, Motion, and a React Bits AnimatedList. The biggest shortcomings were repetitive flat panels, muted and weak page hierarchy, low interaction feedback outside a few controls, no route-level content entrance, and an activity panel with hard-coded rows that could be mistaken for real user events. Most page-specific content was otherwise already functional, so a new dashboard template or login replacement would have been counterproductive.

## Changes in this pass

- Preserved the login, registration, onboarding, navigation, dashboard, skill and role interactions, Career Brain API calls, roadmap task actions, certification status/proof actions, achievements, profile editing, and settings.
- Added an ORBIT field-notes style layer: deeper graphite, fine technical grid texture, stricter lime/amber/gold state semantics, a title registration rule, sharper surfaces, short hover/press/focus feedback, and matching mobile/reduced-motion rules.
- Integrated the official free React Bits SpotlightCard source on the career-readiness and Skill Genome panels; tuned its light and geometry for ORBIT and retained the complete upstream MIT + Commons Clause license notice in `docs/licenses/react-bits-mit-commons-clause.md`.
- Kept the existing React Bits AnimatedList and changed its Dashboard use to derive from current skill records instead of hard-coded sample activity.
- Added short Motion route entrances keyed to the active page. No new animation package was added.
- Continued using the existing Radix Tabs and Progress primitives/wrappers consistent with shadcn/ui's accessible copyable composition model. The source inventory explicitly does not claim that the ORBIT-specific navigation shell is a copied shadcn Sidebar component.
- Updated the design plan, outcome list, and component inventory. No core server, scoring, data, or authentication code was changed.

## Routes and states reviewed

The local browser rendered the login/registration flow, all three onboarding steps, dashboard, skills, career paths, Career Brain, roadmaps, certifications, achievements, profile, and settings. The dashboard and Skills route were inspected at 390px; the desktop dashboard was inspected at 1366px. A separate clean worktree of the original `main` branch was run temporarily to capture the pre-redesign login screenshot.

Screenshots are in `docs/screenshots/`. The page source remains the authority for the full route set; `public/manus-routes.json` did not need a route change.

## Checks and limits

- `npm ci`: completed, zero reported package vulnerabilities.
- `npm run build`: passed after source integration.
- `git diff --check`: passed before final documentation.
- Development app: HTTP 200 on port 3000.
- Playwright: registered a temporary local-only test account, completed all onboarding steps, rendered authenticated routes, inspected accessibility snapshots, checked mobile dimensions, and reviewed browser console output. The redesign render reported zero errors and zero warnings. This did not exercise live external AI credentials or a production database.
- Network failure testing, exhaustive keyboard-only coverage, and a backend/production-data regression suite were not run; no production data was changed.

## Vercel and Git identity diagnosis

The existing Vercel project is linked to `bunny0arch/orbit-career-intelligence` under the Hobby team `Trinetras`. Its newest historic deployment is `BLOCKED`, with Vercel linking to its account-configuration collaboration troubleshooting. The checked GitHub API did not associate that historical commit author with a GitHub account. The sandbox's inherited Git email was malformed as `1.76206065e+08+bunny0arch@users.noreply.github.com`; the authenticated GitHub account reports numeric ID `176206065`. This checkout now uses the repo-local, verified-format address `176206065+bunny0arch@users.noreply.github.com` and keeps the existing `bunny0arch` name. No global Git config or Vercel account setting was changed. A newly authored commit will be checked for GitHub association before evaluating its deployment result.

## Screenshots

- Original login: `docs/screenshots/before-login.png`
- Redesigned login: `docs/screenshots/after-login.png`
- Redesigned desktop dashboard: `docs/screenshots/after-dashboard-desktop.png`
- Redesigned mobile dashboard: `docs/screenshots/after-dashboard-mobile.png`
