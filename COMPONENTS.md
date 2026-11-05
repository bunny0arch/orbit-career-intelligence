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

## Sidebar composition

- **Provider:** shadcn/ui, using Radix composition patterns
- **Source:** https://ui.shadcn.com/docs/components/radix/sidebar
- **License/conditions:** shadcn/ui components are copyable open code; the shadcn/ui repository is MIT-licensed. Radix primitives are MIT-licensed.
- **Installation/dependencies:** Orbit uses the documented composition approach for the responsive navigation shell and installs Radix Tabs/Progress primitives for accessible behavior.
- **Location:** `src/app/App.tsx`, `src/components/ui/Tabs.tsx`, `src/components/ui/ProgressBar.tsx`
- **Modifications:** The sidebar is adapted to Orbit's fixed desktop rail and mobile horizontal navigation; controls use Orbit tokens and route state.
- **Features:** Authenticated shell, dashboard, responsive navigation.

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

## Button, form, card, and badge primitives

- **Provider:** shadcn/ui composition patterns, adapted to the existing Orbit CSS token system.
- **Source:** https://ui.shadcn.com/docs/components/button, https://ui.shadcn.com/docs/components/input, https://ui.shadcn.com/docs/components/card, https://ui.shadcn.com/docs/components/badge
- **License/conditions:** shadcn/ui components are copyable open code; the source repository is MIT-licensed. No shadcn runtime package is shipped.
- **Location:** `src/components/ui/button.tsx`, `src/components/ui/form.tsx`, `src/components/ui/card.tsx`, `src/lib/utils.ts`
- **Modifications:** Replaced Tailwind utility composition with Orbit's existing CSS tokens and a small local `cn` helper; kept native HTML semantics and ref forwarding.
- **Features:** Login/register controls, dashboard readiness card, profile action, accessible form inputs, status metadata.

## Spotlight card

- **Provider:** React Bits
- **Source:** https://reactbits.dev/components/spotlight-card
- **Implementation reference:** React Bits spotlight-card pointer tracking pattern, adapted into `src/components/ui/SpotlightCard.tsx`.
- **License/conditions:** React Bits publishes components under MIT with Commons Clause condition v1.0. The component can be used in the application, but the component itself must not be sold, sublicensed, redistributed alone, or offered as a substantially similar hosted service.
- **Location:** `src/components/ui/SpotlightCard.tsx`, `src/styles/global.css`
- **Modifications:** Uses CSS custom properties for pointer position and Orbit's lime/dark palette; includes a reduced-motion fallback and no runtime package.
- **Features:** Pointer-responsive login panel surface; ready for dashboard cards where the effect clarifies focus rather than acting as decoration.
