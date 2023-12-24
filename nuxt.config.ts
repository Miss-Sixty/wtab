// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'WTab',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover',
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/miaomiao.svg' }],
    },
  },
  devtools: { enabled: false },
  vue: {
    defineModel: true,
  },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    'nuxt-swiper',
    '@pinia/nuxt',
    'dayjs-nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  devServer: {
    host: '0', // 监听所有地址
  },
})
