// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/device',
    '@nuxtjs/color-mode',
    'nuxt-headlessui',
  ],
  colorMode: {
    classSuffix: '',
  },
  devServer: {
    host: '0', // 监听所有地址
  },
  vue: {
    compilerOptions: {
      // 将所有带短横线的标签名都视为自定义元素
      isCustomElement: tag => tag.includes('swiper-'),
    },
  },
})
