import type { ModuleOptions } from '@vite-pwa/nuxt'
import settings from './settings'

const { description, title } = settings
const scope = '/'

export const pwa: ModuleOptions = {
  registerType: 'prompt',
  scope,
  base: scope,
  // includeAssets: [
  //   'favicon.ico',
  //   'pwa-64x64.png',
  //   'pwa-192x192.png',
  //   'pwa-512x512.png',
  //   'maskable-icon-512x512.png',
  //   'apple-touch-icon-180x180.png',
  // ],
  manifest: {
    id: scope,
    scope,
    name: title,
    short_name: title,
    description,
    theme_color: '#ffffff',
    icons: [
      {
        src: 'pwa-64x64.png',
        sizes: '64x64',
        type: 'image/png',
      },
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: 'maskable-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  },
  workbox: {
    importScripts: ['https://progressier.app/ej9vMKDPjDqR8tpEQmJO/sw.js'],
    globPatterns: ['**/*.{js,css,html,txt,png,ico,svg}'],
    navigateFallbackDenylist: [/^\/api\//],
    navigateFallback: '/',
    cleanupOutdatedCaches: true,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts.googleapis.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^https:\/\/fonts.gstatic.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'gstatic-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
  registerWebManifestInRouteRules: true,
  writePlugin: true,
  devOptions: {
    enabled: true,
    navigateFallback: scope,
  },
}
