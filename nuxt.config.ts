import dayjs from 'dayjs'
import { pwa } from './config/pwa'
import pkg from './package.json'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  features: {
    inlineStyles: false,
  },
  colorMode: {
    classSuffix: '',
  },
  app: {
    head: {
      title: 'WTab',
      charset: 'utf-8',
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/miaomiao.svg' }],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
      ],
    },
  },
  devtools: { enabled: false },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    'nuxt-swiper',
    '@pinia/nuxt',
    'dayjs-nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt/image',
    '@vite-pwa/nuxt',
  ],
  devServer: {
    host: '0', // 监听所有地址
  },
  dayjs: {
    plugins: ['utc', 'timezone'],
    defaultLocale: 'zh-cn',
    defaultTimezone: 'Asia/Shanghai',
  },
  pwa,
  vite: {
    define: {
      'process.env.buildTime': JSON.stringify(dayjs().format('YYYY-MM-DD HH:mm:ss')),
      'process.env.version': JSON.stringify(pkg.version),
    },
  },
})
