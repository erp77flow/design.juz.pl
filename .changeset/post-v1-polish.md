---
"@juz/design-system": patch
---

Small post-v1.0.0 polish across menus, charts and InputGroup.

- **Menubar**: items now paint the `bg-muted` background on keyboard
  navigation as well as on hover (Radix tracks the highlighted item via
  `data-highlighted`, not `:focus`).
- **Popover background**: `--popover` / `--popover-foreground` tokens are
  now declared, so Radix popovers (Menubar dropdown, HoverCard, Popover,
  Command) no longer render transparent under Tailwind v4.
- **BarChart / LineChart**: dropped the `aspect-video` constraint inherited
  from `ChartContainer` so the chart fills the parent width when an
  explicit `h-*` is set. Their Storybook preview wrappers also lost the
  fixed `w-[540px]`.
- **InputGroup**: cleaner slot styling — leading slot keeps a soft
  `bg-muted/40` wash, trailing slot is transparent with a `border-l`
  separator, and any button inside the trailing slot gets its rounding,
  border and shadow stripped so it sits flush inside the group.
