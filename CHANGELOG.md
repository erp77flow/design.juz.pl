# Changelog

Wszystkie istotne zmiany w design.juz.pl zapisujemy w tym pliku.

Format bazuje na prostym modelu:

- `Added` — nowe komponenty, ekrany, dokumenty i wzorce.
- `Changed` — zmiany wyglądu, API, tokenów albo zachowania.
- `Fixed` — poprawki wizualne, dostępnościowe i interakcyjne.
- `Removed` — usunięte komponenty, warianty albo nazwy.

## [Unreleased]

## [0.1.0]

Pierwsze publiczne wydanie design systemu juz.pl.

### Foundations

- Tokeny kolorów, typografii, spacing i radii w `src/styles/globals.css`.
- Theme dark/light spięty przez `addon-themes`.
- Logo `JuzLogo` / `JuzLogoMark`.

### Atoms (`src/components/ui/`)

Komponenty zgodne z architekturą shadcn/Radix + rozszerzenia juz.pl: Button, Badge, Input, NativeSelect, Checkbox, RadioGroup, Switch, Slider, Tabs, Card, Accordion, AlertDialog, Dialog, Drawer, Sheet, Popover, Tooltip, DropdownMenu, Menubar, ContextMenu, Command, Combobox, Calendar, MiniMonth, DateRangeInput, DateFilter, FilterSelect, SearchableSelect, MultiSelect, ColumnVisibilitySwitch, PageSizeControl, Pagination, Table, TablePrimitive, DataList, Empty, EmptyState, Skeleton, Spinner, Avatar, Breadcrumb, Kbd, Label, Separator, ScrollArea, Toggle, ToggleGroup, Toast, Typography, FieldDisplay, FormField, IconActionButton, IconTile, MetaTile, MetricCard, SummaryTile, AddressCard, AspectRatio, Carousel, BarChart, LineChart, DonutChart, Chart, InputGroup, InputOTP, DecimalInput, PhoneFrame, Upload.

### Molecules (`src/components/ds/`)

ActionButtons, AdvancedFiltersPanel, Autocomplete, BasicMenuItem, CalendarEvent, CalendarEventSection, ChartPrimitives, ClientDetail (referencyjny wzorzec), CollapsibleMenuItem, Combobox, DataList, DataTableMolecules, DataTablePattern, DatePicker, DetailHeader, FieldGrid + Field, FileActions, FormField, Header, InfoSection, JuzLogo, ModeToggle, NewClient (referencyjny wzorzec), Pagination, PrefixInput, ProfileMenu, ProgressLineCard, RecordPageLayout, RecordTabs, SectionNav + SectionNavEntry, SegmentedTabs, SocialCalendar, Stepper, SummaryPanel + SummaryRow, TextEditor, TimeInput, TimePicker, Timeline, WeekWorkstations.

### Organisms / layouts (`src/components/layout/`)

AppLayout, AppSidebar, AppSidebarGroup, AppSidebarItem, DataTable, DocumentLineItems, DocumentParties, DocumentPreview, DocumentSection, DocumentTotals, Navbar (z prop `nav` dla głównej nawigacji), Schedule, Sidebar, TopBar.

### Screens

Auth, rekord firmy (podgląd + dodawanie), zamówienia, magazyn, produkcja (lista / kalendarz / koszty / Gantt / mobile), CRM, admin, content.

### Dev tooling

- CI: TS + lint + build, axe-core a11y na każdym story, size-limit, pixel-diff visual regression na Linux Chromium.
- Storybook 8 z autodocs i `addon-themes`.
- Changesets do wersjonowania (`pnpm changeset` → release workflow tworzy tag + GitHub Release).
