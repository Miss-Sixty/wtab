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
  ],
  colorMode: {
    classSuffix: '',
  },
  components: [
    // { path: '~/widgets/**/components', global: true },
    { path: '~/widgets', global: true, prefix: 'Widgets' },
    '~/components',
  ],
  devServer: {
    host: '0', // 监听所有地址
  },
})
