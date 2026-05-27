#!/usr/bin/env node
// Regeneruje tabelę "Components map" w src/stories/Components.Map.mdx
// na podstawie:
//   - src/index.ts (publiczne re-exporty per warstwa)
//   - src/stories/*.stories.tsx (mapowanie komponentu -> title story)
//
// Tabelę wstrzykuje pomiędzy markery (komentarze MDX, nie HTML — Storybook
// odrzuca HTML-owe komentarze w plikach .mdx):
//   {/* components-map:start */}
//   ...
//   {/* components-map:end */}
//
// Dzięki temu możemy odświeżyć tabelę kiedy dodamy nowy komponent
// bez ręcznego dopisywania wiersza w MDX.
//
// Użycie:
//   node scripts/regen-component-map.mjs
//   pnpm exec node scripts/regen-component-map.mjs
//
// Skrypt jest deterministyczny: ten sam stan repo = ta sama tabela.

import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const INDEX_TS = resolve(ROOT, "src/index.ts");
const STORIES_DIR = resolve(ROOT, "src/stories");
const TARGET_MDX = resolve(ROOT, "src/stories/Components.Map.mdx");

const START_MARK = "{/* components-map:start */}";
const END_MARK = "{/* components-map:end */}";

// ───────────────────────────────────────────────────────────────────────────
// 1. Czytaj src/index.ts i wyciągnij ścieżki per warstwa.
//    Format linii: export * from "./components/ui/<file>";
// ───────────────────────────────────────────────────────────────────────────
const indexSrc = readFileSync(INDEX_TS, "utf8");
const exportRe = /export \* from "\.\/components\/(ui|ds|layout)\/([a-z0-9-]+)";/g;

/**
 * Każdy wpis: { category, file, displayName, sourcePath }
 *  - category   : "Atom" | "Molecule" | "Layout"
 *  - file       : kebab-case nazwa pliku, np. "button"
 *  - displayName: PascalCase, np. "Button"
 *  - sourcePath : relatywna ścieżka od roota repo
 */
const components = [];
for (const m of indexSrc.matchAll(exportRe)) {
  const [, layer, file] = m;
  const category =
    layer === "ui" ? "Atom" : layer === "ds" ? "Molecule" : "Layout";
  const folder = layer === "ui" ? "ui" : layer === "ds" ? "ds" : "layout";
  components.push({
    category,
    file,
    displayName: kebabToPascal(file),
    sourcePath: `src/components/${folder}/${file}.tsx`,
  });
}

// ───────────────────────────────────────────────────────────────────────────
// 2. Zbierz wszystkie story titles z src/stories/*.stories.tsx.
//    Mapujemy displayName (PascalCase) -> { title, slug }.
//    Slug jest taki, jak Storybook 8 buduje story ID: lowercase
//    + slashe i wszystko inne nie-alfanumeryczne na "-", po czym
//    zwija kilka "-" w jeden i przycina krańce.
// ───────────────────────────────────────────────────────────────────────────
const titles = collectStoryTitles(STORIES_DIR);
const titleByDisplayName = new Map();
for (const title of titles) {
  // "Atoms/Button" -> "Button", "Screens/Records/ClientDetail" -> "ClientDetail"
  const last = title.split("/").pop();
  if (!last) continue;
  // Pierwsze trafienie wygrywa — jeżeli ktoś dał dwie story z tą samą
  // ostatnią segmentem (Atom + Pattern), atom wygrywa, bo idzie alfabetycznie
  // wcześniej w naszej kolejności.
  if (!titleByDisplayName.has(last)) {
    titleByDisplayName.set(last, title);
  }
}

// ───────────────────────────────────────────────────────────────────────────
// 3. Wzbogać każdy komponent o title + slug story (jeżeli istnieje).
// ───────────────────────────────────────────────────────────────────────────
for (const c of components) {
  const title = titleByDisplayName.get(c.displayName);
  if (title) {
    c.storyTitle = title;
    c.storySlug = storySlug(title);
  }
}

// ───────────────────────────────────────────────────────────────────────────
// 4. Zbuduj markdown table — sortuj alfabetycznie po displayName,
//    żeby tabela była stabilna i łatwo znaleźć komponent po nazwie.
// ───────────────────────────────────────────────────────────────────────────
components.sort((a, b) => a.displayName.localeCompare(b.displayName));

const lines = [
  "| Component | Category | Source file | Story |",
  "|-----------|----------|-------------|-------|",
];
for (const c of components) {
  const storyCell = c.storySlug
    ? `[${c.storyTitle}](?path=/docs/${c.storySlug}--docs)`
    : "_brak story_";
  lines.push(
    `| \`${c.displayName}\` | ${c.category} | \`${c.sourcePath}\` | ${storyCell} |`
  );
}
const table = lines.join("\n");

// ───────────────────────────────────────────────────────────────────────────
// 5. Wpisz tabelę między markery w MDX (lub zgłoś brak markerów).
// ───────────────────────────────────────────────────────────────────────────
if (!existsSync(TARGET_MDX)) {
  console.error(`brak pliku ${TARGET_MDX}`);
  process.exit(1);
}
const mdx = readFileSync(TARGET_MDX, "utf8");
const startIdx = mdx.indexOf(START_MARK);
const endIdx = mdx.indexOf(END_MARK);
if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
  console.error(
    `nie znaleziono markerów ${START_MARK} / ${END_MARK} w ${TARGET_MDX}`
  );
  process.exit(1);
}
const before = mdx.slice(0, startIdx + START_MARK.length);
const after = mdx.slice(endIdx);
const next = `${before}\n\n${table}\n\n${after}`;

if (next === mdx) {
  console.log(`bez zmian: ${components.length} komponentów, tabela aktualna`);
} else {
  writeFileSync(TARGET_MDX, next, "utf8");
  console.log(
    `OK: wygenerowano ${components.length} wierszy w ${TARGET_MDX}`
  );
}

// ───────────────────────────────────────────────────────────────────────────
// helpers
// ───────────────────────────────────────────────────────────────────────────

function kebabToPascal(s) {
  return s
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
}

function collectStoryTitles(dir) {
  const out = new Set();
  const files = readdirSync(dir);
  for (const f of files) {
    if (!f.endsWith(".stories.tsx") && !f.endsWith(".stories.ts")) continue;
    const src = readFileSync(resolve(dir, f), "utf8");
    // Bierzemy tylko top-level "title: \"...\"" — z meta = { title: "..." }.
    // Wewnątrz inline mocków bywają inne wystąpienia "title:", ale tylko
    // top-level pasuje do title atoma/molecule/pattern.
    const re = /\btitle:\s*"([^"]+)"/g;
    for (const m of src.matchAll(re)) {
      const value = m[1];
      // Heurystyka: pomijaj fragmentaryczne stringi (np. wewnątrz mocków,
      // których wartości nie są ścieżką "Sekcja/Nazwa").
      if (!value.includes("/")) continue;
      out.add(value);
    }
  }
  return [...out];
}

// Storybook 8 buduje story ID przez sanitize:
//   "Screens/CRM/Phone" -> "screens-crm-phone"
//   Slashe i wszystko nie-alfanumeryczne -> "-", potem zwijamy "-+" do "-".
function storySlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
