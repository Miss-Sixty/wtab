// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  vue: {
    defineModel: true,
  },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/device',
    '@nuxtjs/color-mode',
    'nuxt-swiper',
    '@pinia/nuxt',
    'dayjs-nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  colorMode: {
    classSuffix: '',
  },
  devServer: {
    host: '0', // 监听所有地址
  },
  app: {
    head: {
      title: 'WTab',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover',
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/miaomiao.svg' }],
    },
  },
})
