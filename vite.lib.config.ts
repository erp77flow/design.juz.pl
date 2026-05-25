import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { copyFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// Standalone Vite config used only for building the distributable library bundle
// (`pnpm build:lib`). Keeps the main `vite.config.ts` (dev / Storybook host)
// untouched so consumers without the monorepo can `import` from `dist/`.
export default defineConfig({
  plugins: [
    react(),
    // Emits `.d.ts` files into `dist/`. `rollupTypes: true` bundles every
    // declaration into a single `dist/index.d.ts`, which sidesteps the
    // notorious TS2742 "inferred type cannot be named" errors that shadcn-style
    // components hit when re-exporting Radix primitives.
    dts({
      tsconfigPath: "./tsconfig.lib.json",
      rollupTypes: true,
      insertTypesEntry: true,
      copyDtsFiles: false
    }),
    {
      name: "juz-ds-copy-css",
      // Emit the global stylesheet as `dist/styles.css` so consumers can
      // `import "@juz/design-system/styles.css"` from the built package.
      closeBundle() {
        const outDir = resolve(__dirname, "dist");
        mkdirSync(outDir, { recursive: true });
        copyFileSync(
          resolve(__dirname, "src/styles/globals.css"),
          resolve(outDir, "styles.css")
        );
      }
    }
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  // Library bundle has no `public/` assets to ship — the dev/Storybook config
  // owns that. Disabling here keeps `dist/` minimal.
  publicDir: false,
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    cssCodeSplit: false,
    lib: {
      entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
      formats: ["es"],
      fileName: () => "index.js"
    },
    rollupOptions: {
      // Anything that should not be inlined into the bundle. Peer deps + every
      // runtime dependency declared in package.json — consumers install these
      // themselves so we keep the bundle small and avoid React duplication.
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        /^@radix-ui\//,
        "@tanstack/react-table",
        "bwip-js",
        "class-variance-authority",
        "clsx",
        "cmdk",
        "date-fns",
        "embla-carousel-react",
        "input-otp",
        "lucide-react",
        "next-themes",
        "react-day-picker",
        "react-dropzone",
        "recharts",
        "sonner",
        "tailwind-merge",
        "vaul"
      ],
      output: {
        preserveModules: false,
        exports: "named"
      }
    }
  }
});
