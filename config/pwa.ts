import type { ModuleOptions } from '@vite-pwa/nuxt'
import settings from './settings'

const { description, title } = settings

export const pwa: ModuleOptions = {
  registerType: 'autoUpdate', // 注册类型
  // scope: '/',
  // base: '/',
  // registerWebManifestInRouteRules: true,
  workbox: {
    // navigateFallback: '/',
    globPatterns: ['**/*.{js,css,html,json,webp,svg,png,heic}'],
    // navigateFallbackDenylist: [/^\/api\//],//导航回退拒绝列表
  },
  manifest: {
    //   id: title,
    name: title,
    short_name: title,
    description,
    theme_color: '#ffffff',
    // start_url: '/',
    // scope: '/',
    //   display: 'fullscreen',
    //   display_override: ["fullscreen", "minimal-ui", "standalone"],
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
    // enabled: true,
    type: 'module',
    // suppressWarnings: true,
    // navigateFallback: '/',
    // navigateFallbackAllowlist: [/^\/$/]
  },
  client: {
    installPrompt: true, // 安装提示
  },
  // workbox: {
  //   globPatterns: ['**/*.{js,json,css,html,txt,svg,png,ico,webp,woff,woff2,ttf,eot,otf,wasm}'],
  //   // navigateFallback: '/', // 导航回退
  //   skipWaiting: true, // 跳过等待
  //   clientsClaim: true, // 客户端声明
  // },
  // writePlugin: true, // 写入插件
  // devOptions: {
  //   enabled: false,
  //   suppressWarnings: true, // 抑制警告
  //   type: 'module', // 模块类型
  // },
}