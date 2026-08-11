import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  build: {
    // Target modern browsers shipped since 2017 – smaller output without IE polyfills.
    target: 'es2017',

    // Split CSS per chunk so a page only downloads the styles it needs.
    cssCodeSplit: true,

    // Inline small assets (< 4 KB) as data-URIs to eliminate round-trips.
    assetsInlineLimit: 4096,

    // Warn when any single chunk exceeds 600 KB before gzip.
    chunkSizeWarningLimit: 600,

    // Source maps only in development; skip in production for smaller output.
    sourcemap: false,

    rollupOptions: {
      output: {
        // Stable, content-hashed file names for long-term caching.
        chunkFileNames:  'assets/js/[name]-[hash].js',
        entryFileNames:  'assets/js/[name]-[hash].js',
        assetFileNames:  'assets/[ext]/[name]-[hash].[ext]',

        /**
         * Manual chunk strategy:
         *
         *   vendor-react    → react + react-dom + react-router-dom
         *   vendor-lucide   → lucide-react icon tree
         *   vendor-misc     → any other node_modules (zod, etc.)
         *   app-utils       → hooks/, lib/, components/shared/
         *   app-sections    → components/sections/, components/ui/
         *   [page name]     → each lazy-loaded page (via React.lazy)
         *
         * WHY app-utils + app-sections exist:
         *   Without explicit grouping, Rollup's sharing algorithm splits every
         *   module used by more than one lazy route into its own intermediate
         *   chunk.  That produces ~12 individual 1-2 KB files (ServicesGrid,
         *   AwardsSection, TestimonialSlider, CTASection, GlassCard, apiClient,
         *   useSEO, JsonLd, PageState, …) which all load as separate round-trips
         *   when Home first renders.  On a 60-100 ms RTT connection those 12
         *   requests stretch the chunk waterfall from ~2.2 s to ~3.4 s, delaying
         *   every above-the-fold paint.
         *
         *   Grouping them into two chunks (app-utils ~8 KB, app-sections ~25 KB)
         *   reduces 12+ round-trips to 2 while keeping the total transferred bytes
         *   nearly identical.  Subsequent pages that only need a subset of
         *   app-sections still receive and execute the full chunk, but the combined
         *   size is small enough that the one-time overhead is cheaper than the
         *   saved round-trips.
         *
         *   Layout components (Navbar, Footer) are imported by the non-lazy Layout
         *   wrapper, so they stay in the main entry bundle and are unaffected.
         */
        manualChunks(id) {
          // ── Node modules ─────────────────────────────────────────────────
          if (id.includes('node_modules')) {
            if (
              id.includes('/react-dom/') ||
              id.includes('/react-router') ||
              id.includes('/react/')
            ) {
              return 'vendor-react';
            }
            if (id.includes('/lucide-react/')) {
              return 'vendor-lucide';
            }
            return 'vendor-misc';
          }

          // ── App utilities ─────────────────────────────────────────────────
          // Hooks, lib helpers, and shared display components (JsonLd, PageState).
          // These are tiny (< 2 KB each) and used across many pages, which makes
          // Rollup split each into its own chunk.  One combined chunk is faster.
          if (
            id.includes('/src/hooks/') ||
            id.includes('/src/lib/') ||
            id.includes('/src/components/shared/')
          ) {
            return 'app-utils';
          }

          // ── UI + Section components ───────────────────────────────────────
          // Section components (ServicesGrid, AwardsSection, TestimonialSlider,
          // CTASection, CaseStudyPreview, CaseStudyCard, GlassCard, …) and UI
          // primitives (Badge, Button, StickyCTA, …) are all 1-3 KB each and
          // shared across multiple lazy-loaded pages.  Grouping them eliminates
          // 8-10 individual round-trips without meaningful size cost.
          if (
            id.includes('/src/components/sections/') ||
            id.includes('/src/components/ui/')
          ) {
            return 'app-sections';
          }
        },
      },
    },
  },

  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
