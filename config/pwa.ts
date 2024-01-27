import { isCI, isDevelopment } from 'std-env'
import type { ModuleOptions } from '@vite-pwa/nuxt'
import settings from './settings'

const { description, title } = settings

export const pwa: ModuleOptions = {
  mode: isCI ? 'production' : 'development',
  scope: '/',
  srcDir: './service-worker',
  filename: 'sw.ts',
  strategies: 'injectManifest',
  injectRegister: false,
  includeManifestIcons: false,
  manifest: false,
  injectManifest: {
    globPatterns: ['**/*.{js,json,css,html,txt,svg,png,ico,webp,woff,woff2,ttf,eot,otf,wasm}'],
    globIgnores: ['emojis/**', 'manifest**.webmanifest'],
  },
  devOptions: {
    enabled: process.env.VITE_DEV_PWA === 'true',
    type: 'module',
  },

  // registerType: 'autoUpdate', // 注册类型
  // minify: true, // 最小化
  // includeAssets: [
  //   'favicon.ico',
  //   'pwa-64x64.png',
  //   'pwa-192x192.png',
  //   'pwa-512x512.png',
  //   'maskable-icon-512x512.png',
  //   'apple-touch-icon.png',
  //   'apple-touch-icon-precomposed.png',
  // ],
  // manifest: {
  //   id: title,
  //   name: title,
  //   short_name: title,
  //   start_url: '/',
  //   description,
  //   display: 'fullscreen',
  //   theme_color: '#f00',
  //   display_override: ['standalone', 'minimal-ui'],
  //   screenshots: [
  //     {
  //       src: 'iShot_2024-01-13_17.13.52.png',
  //       sizes: '866x1512',
  //       type: 'image/png',
  //       form_factor: 'wide',
  //     },
  //     {
  //       src: 'iShot_2024-01-13_17.13.52.png',
  //       sizes: '866x1512',
  //       type: 'image/png',
  //       form_factor: 'narrow',
  //     },
  //   ],
  //   icons: [
  //     {
  //       src: 'pwa-192x192.png',
  //       sizes: '192x192',
  //       type: 'image/png',
  //     },
  //     {
  //       src: 'pwa-512x512.png',
  //       sizes: '512x512',
  //       type: 'image/png',
  //     },
  //     {
  //       src: 'pwa-512x512.png',
  //       sizes: '512x512',
  //       type: 'image/png',
  //       purpose: 'any',
  //     },
  //     {
  //       src: 'pwa-512x512.png',
  //       sizes: '512x512',
  //       type: 'image/png',
  //       purpose: 'maskable',
  //     },
  //   ],
  // },
  // client: {
  //   installPrompt: true, // 安装提示
  // },
  // workbox: {
  //   globPatterns: ['**/*.{js,css,html,txt,png,ico,svg}'], // 全局模式
  //   // navigateFallbackDenylist: [/^\/api\//],//导航回退拒绝列表
  //   // navigateFallback: '/', // 导航回退
  //   skipWaiting: true, // 跳过等待
  //   clientsClaim: true, // 客户端声明
  //   cleanupOutdatedCaches: true, // 清除旧缓存
  //   runtimeCaching: [// 运行时缓存
  //     {
  //       urlPattern: /^https:\/\/fonts.googleapis.com\/.*/i,
  //       handler: 'CacheFirst',
  //       options: {
  //         cacheName: 'google-fonts-cache',
  //         expiration: {
  //           maxEntries: 10,
  //           maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
  //         },
  //         cacheableResponse: {
  //           statuses: [0, 200],
  //         },
  //       },
  //     },
  //     {
  //       urlPattern: /^https:\/\/fonts.gstatic.com\/.*/i,
  //       handler: 'CacheFirst',
  //       options: {
  //         cacheName: 'gstatic-fonts-cache',
  //         expiration: {
  //           maxEntries: 10,
  //           maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
  //         },
  //         cacheableResponse: {
  //           statuses: [0, 200],
  //         },
  //       },
  //     },
  //   ],
  // },
}
