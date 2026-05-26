---
"@juz/design-system": minor
---

Add `AppSidebar` suite — a composable app-shell sidebar with pin/hover/collapse state and per-group collapsing.

New exports:

- `SidebarProvider`, `useSidebar` (from `@juz/design-system`) — context with
  pinned / hovered / mobile-open state, derived `isExpanded`, and per-group
  collapsed state. Persists `isPinned` and `collapsedGroups` to
  `localStorage`; storage namespace is configurable via the
  `storagePrefix` prop (default `"juz-sidebar"`).
- `AppSidebar` — fixed left rail with logo slot, scroll body, mobile
  drawer pattern, and a pin/collapse toggle at the bottom.
- `AppSidebarGroup` — collapsible nav section with a header (icon + label
  + chevron). Degrades to a single tooltipped icon when the sidebar is
  in icon-only mode.
- `AppSidebarItem` — nav row that supports `asChild` + Radix `Slot` so
  the host app composes its own routing primitive (Next.js `<Link>`,
  React Router `<Link>`, plain anchor, …) without the DS taking a hard
  dependency on a router. Plus `isActive` / `isStandalone` modifiers.

The suite is intended to compose with the existing `Navbar` for the
top-bar — the demo story under `Organisms / AppSidebar` shows the
intended layout. No new top-bar component is added; the sidebar-aware
margin is one line of consumer-side composition shown in the story.
