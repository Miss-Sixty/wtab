// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/device',
    '@nuxtjs/color-mode',
    'nuxt-headlessui',
    'nuxt-swiper',
    '@pinia/nuxt',
    'dayjs-nuxt',
  ],
  colorMode: {
    classSuffix: '',
  },
  devServer: {
    host: '0', // 监听所有地址
  },
})
