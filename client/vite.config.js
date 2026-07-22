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
         *   vendor-react   → react + react-dom + react-router-dom
         *   vendor-lucide  → lucide-react icon tree
         *   vendor-misc    → any other node_modules (zod, etc.)
         *   [page name]    → each lazy-loaded page is its own chunk (via React.lazy)
         *
         * Separating React from app code means a product code change won't bust
         * the React cache entry (React changes far less frequently than UI copy).
         */
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
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
