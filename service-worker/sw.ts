/// <reference lib="WebWorker" />
/// <reference types="vite/client" />
// 用于预缓存
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'

// 适用于路由
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'

// 适用于缓存策略
import { NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies'

// 用于管理缓存。
import { ExpirationPlugin } from 'workbox-expiration'

// import { onNotificationClick, onPush } from './web-push-notifications'

// import { onShareTarget } from './share-target'

declare const self: ServiceWorkerGlobalScope

// self.addEventListener('message', (event) => {
//   if (event.data && event.data.type === 'SKIP_WAITING')
//     self.skipWaiting()
// })

// 用于预缓存
const entries = self.__WB_MANIFEST
if (import.meta.env.DEV)
  entries.push({ url: '/', revision: Math.random().toString() })

precacheAndRoute(entries)

// 清理旧资产
cleanupOutdatedCaches()

// allow only fallback in dev: we don't want to cache anything
// let allowlist: undefined | RegExp[]
// if (import.meta.env.DEV)
//   allowlist = [/^\/$/]

// // deny api and server page calls
// let denylist: undefined | RegExp[]
// if (import.meta.env.PROD) {
//   denylist = [
//     /^\/api\//,
//     /^\/web-share-target\//,
//     // exclude sw: if the user navigates to it, fallback to index.html
//     /^\/sw.js$/,
//   ]
// }

// // 仅在本地构建 + 启动或生产过程中缓存页面和外部资产
// if (import.meta.env.PROD) {
//   // 包括webmanifest缓存
//   registerRoute(
//     ({ request, sameOrigin }) =>
//       sameOrigin && request.destination === 'manifest',
//     new NetworkFirst({
//       cacheName: 'elk-webmanifest',
//       plugins: [
//         new CacheableResponsePlugin({ statuses: [200] }),
//         // we only need a few entries
//         new ExpirationPlugin({ maxEntries: 100 }),
//       ],
//     }),
//   )
//   // include emoji icons
//   registerRoute(
//     ({ sameOrigin, request, url }) =>
//       sameOrigin
//       && request.destination === 'image'
//       && url.pathname.startsWith('/emojis/'),
//     new StaleWhileRevalidate({
//       cacheName: 'elk-emojis',
//       plugins: [
//         new CacheableResponsePlugin({ statuses: [200] }),
//         // 15 days max
//         new ExpirationPlugin({ purgeOnQuotaError: true, maxAgeSeconds: 60 * 60 * 24 * 15 }),
//       ],
//     }),
//   )
//   // external assets: rn avatars from mas.to
//   // requires <img crossorigin="anonymous".../> and http header: Allow-Control-Allow-Origin: *
//   /*
//     registerRoute(
//       ({ sameOrigin, request }) => !sameOrigin && request.destination === 'image',
//       new NetworkFirst({
//         cacheName: 'elk-external-media',
//         plugins: [
//           // add opaque responses?
//           new CacheableResponsePlugin({ statuses: [/!* 0, *!/200] }),
//           // 15 days max
//           new ExpirationPlugin({ maxAgeSeconds: 60 * 60 * 24 * 15 }),
//         ],
//       }),
//     )
//   */
// }

// to allow work offline
// registerRoute(new NavigationRoute(
//   createHandlerBoundToURL('/'),
//   { allowlist, denylist },
// ))

// self.addEventListener('push', onPush)
// self.addEventListener('notificationclick', onNotificationClick)
// self.addEventListener('fetch', onShareTarget)
