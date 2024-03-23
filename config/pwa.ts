import type { ModuleOptions } from '@vite-pwa/nuxt'
import settings from './settings'

const { description, title } = settings

export const pwa: ModuleOptions = {
  registerType: 'autoUpdate', // 注册类型
  workbox: {
    globPatterns: ['**/*.{js,css,html,json,webp,svg,png,jpg,heic}'],
    cleanupOutdatedCaches: true,
    runtimeCaching: [
      // 缓存 https://next.wtab.cn/_vercel/image?url=%2Fbg%2F2.heic&w=1536&q=100 配置
      {
        urlPattern: /^https:\/\/next\.wtab\.cn\/_vercel\/image\?url=/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'image-cache',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },

      // {
      //   urlPattern: '/^\/image/',
      //   handler: 'CacheFirst',
      //   options: {
      //     cacheName: 'images-cache',
      //     expiration: {
      //       maxEntries: 10,
      //       maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
      //     },
      //     cacheableResponse: {
      //       statuses: [0, 200],
      //     },
      //   },
      // }
    ]
  },
  manifest: {
    name: title,
    short_name: title,
    description,
    theme_color: '#ffffff',
    // display_override: ["fullscreen", "minimal-ui", "standalone"],
    display_override: ["window-controls-overlay", "standalone", "minimal-ui", "fullscreen", "browser"],
    screenshots: [
      {
        src: 'iShot_2024-01-13_17.13.52.png',
        sizes: '866x1512',
        type: 'image/png',
        form_factor: 'wide',
      },
      {
        src: 'iShot_2024-01-13_17.13.52.png',
        sizes: '866x1512',
        type: 'image/png',
        form_factor: 'narrow',
      },
    ],
    icons: [
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  },
  devOptions: {
    enabled: process.env.NODE_ENV === 'development',
    suppressWarnings: true, // 抑制警告
    type: 'module',
  },
  client: {
    installPrompt: true, // 安装提示
  },
}