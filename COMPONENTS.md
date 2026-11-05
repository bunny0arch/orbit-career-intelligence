# Orbit component inventory

Orbit uses copyable/free sources for standard interface and motion patterns. Application-specific compositions remain in `src/app/App.tsx`, while sourced primitives live in `src/components/ui/`.

## Animated List

- **Provider:** React Bits
- **Source:** https://reactbits.dev/components/animated-list
- **Implementation source:** https://github.com/DavidHDev/react-bits/tree/main/src/ts-default/Components/AnimatedList
- **License/conditions:** React Bits publishes components under MIT with Commons Clause condition v1.0. The component can be used in the application, but the component itself must not be sold, sublicensed, redistributed alone, or offered as a substantially similar hosted service.
- **Installation/dependencies:** Adapted into the local source tree; Orbit uses `motion` for the entrance/hover motion and no React Bits runtime package.
- **Location:** `src/components/ui/AnimatedList.tsx`, `src/components/ui/animated-list.css`
- **Modifications:** Replaced the example file icons with Orbit evidence icons, removed the file-manager defaults, and kept the source interaction pattern focused on real activity records.
- **Features:** Dashboard recent activity.

## SpotlightCard

- **Provider:** React Bits, free copyable source (`ts-default` variant).
- **Source:** https://reactbits.dev/components/spotlight-card
- **Implementation source:** https://github.com/DavidHDev/react-bits/tree/main/src/ts-default/Components/SpotlightCard
- **License/conditions:** MIT + Commons Clause License Condition v1.0 (see https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md). The component may be used as part of the ORBIT website/product; do not sell, sublicense, or redistribute the component itself as a standalone component or bundle.
- **Installation/dependencies:** Copied from the official TypeScript source; no new runtime package. Uses the project's existing React and CSS build.
- **Location:** `src/components/ui/spotlight-card/SpotlightCard.tsx`, `src/components/ui/spotlight-card/SpotlightCard.css`.
- **Modifications:** Component source retained, color and size props configured to ORBIT's restrained lime signal, effects limited to two dashboard evidence panels, component padding/radius aligned to ORBIT's rectangular surfaces. Reduced-motion CSS suppresses animated spotlight details.
- **Features:** Pointer-proximity lighting and focus-visible response on career readiness and Skill Genome panels.

## Radix primitives / shadcn/ui composition patterns

- **Provider:** Radix UI primitives, aligned to shadcn/ui's copyable composition model; the site's shell itself is ORBIT-specific, not a copied shadcn Sidebar component.
- **Sources:** https://ui.shadcn.com/docs/components/base/tabs, https://ui.shadcn.com/docs/components/base/progress, https://www.radix-ui.com/primitives/docs/components/progress
- **License/conditions:** shadcn/ui source is MIT-licensed; the installed Radix primitives are MIT-licensed.
- **Installation/dependencies:** Existing project dependencies `@radix-ui/react-tabs` and `@radix-ui/react-progress`; no CSS framework migration.
- **Location:** `src/components/ui/Tabs.tsx`, `src/components/ui/ProgressBar.tsx`, `src/app/App.tsx`.
- **Modifications:** Small typed wrappers and ORBIT token styles; the current responsive sidebar/mobile navigation remains app-specific.
- **Features:** Accessible progress indicator used throughout app; tab primitive available for accessible tabbed content.

## Tabs and Progress

- **Provider:** shadcn/ui patterns over Radix UI
- **Sources:** https://ui.shadcn.com/docs/components/base/tabs and https://ui.shadcn.com/docs/components/base/progress
- **License/conditions:** shadcn/ui copyable source and Radix MIT license.
- **Installation/dependencies:** `@radix-ui/react-tabs`, `@radix-ui/react-progress`.
- **Location:** `src/components/ui/Tabs.tsx`, `src/components/ui/ProgressBar.tsx`
- **Modifications:** Wrapped primitives with small typed Orbit components and applied CSS tokens.
- **Features:** Evidence metrics and future tabbed workspace surfaces.

## Icons

- **Provider:** Lucide
- **Source:** https://lucide.dev/guide/react/
- **License/conditions:** Lucide is released under the ISC License. Imports are tree-shakable React components.
- **Installation/dependencies:** `lucide-react`.
- **Location:** `src/app/App.tsx`
- **Modifications:** Icons are selected and sized for Orbit's dark console; no icon sprites or broad library import is used.
- **Features:** Navigation, evidence labels, actions, status, and feedback.

## Custom Orbit compositions

`OrbitMark`, the domain cards, forms, role comparison, evidence ladder, and roadmap timeline are application-specific because no sourced component captures the product's evidence semantics. They use the sourced primitives and documented interaction patterns rather than replacing them with decorative copies.
