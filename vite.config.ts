/// <reference types="vitest" />
import path from 'node:path'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  envPrefix: 'PUBLIC_',
  resolve: {
    alias: {
      '@/src': path.resolve(__dirname, './src'),
      '@/fonts': path.resolve(__dirname, './src/assets/fonts'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./setupTests.ts'],
  },
  build: {
    assetsInlineLimit: 0,
  },
  define: {
    'process.env': {},
  },
})
