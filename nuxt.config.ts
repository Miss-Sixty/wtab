// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: process.env.VITE_DEV_VUE !== 'true',
  colorMode: {
    classSuffix: '',
  },
  css: [
    '@unocss/reset/tailwind-compat.css',
    '~/styles/base.css',
    '~/styles/scrollbars.css'
  ],
  app: {
    baseURL: process.env.VITE_DEV_VUE === 'true' ? '/wtab/' : '/',
    buildAssetsDir: 'assets', // don't use "_" at the begining of the folder name to avoids nojkill conflict
    head: {
      viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
      link: [
        { rel: 'icon', sizes: 'any', type: 'image/svg+xml', href: '/miaomiao.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'apple-touch-icon-precomposed', href: '/apple-touch-icon-precomposed.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)', href: '/splash_screens/iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)', href: '/splash_screens/iPhone_15_Pro__iPhone_15__iPhone_14_Pro_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)', href: '/splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)', href: '/splash_screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)', href: '/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)', href: '/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)', href: '/splash_screens/iPhone_11__iPhone_XR_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)', href: '/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)', href: '/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)', href: '/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)', href: '/splash_screens/12.9__iPad_Pro_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)', href: '/splash_screens/11__iPad_Pro__10.5__iPad_Pro_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)', href: '/splash_screens/10.9__iPad_Air_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)', href: '/splash_screens/10.5__iPad_Air_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)', href: '/splash_screens/10.2__iPad_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)', href: '/splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)', href: '/splash_screens/8.3__iPad_Mini_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)', href: '/splash_screens/iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)', href: '/splash_screens/iPhone_15_Pro__iPhone_15__iPhone_14_Pro_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)', href: '/splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)', href: '/splash_screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)', href: '/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)', href: '/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)', href: '/splash_screens/iPhone_11__iPhone_XR_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)', href: '/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)', href: '/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)', href: '/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)', href: '/splash_screens/12.9__iPad_Pro_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)', href: '/splash_screens/11__iPad_Pro__10.5__iPad_Pro_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)', href: '/splash_screens/10.9__iPad_Air_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)', href: '/splash_screens/10.5__iPad_Air_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)', href: '/splash_screens/10.2__iPad_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)', href: '/splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)', href: '/splash_screens/8.3__iPad_Mini_portrait.png' },
      ],
      meta: [
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },
  devtools: { enabled: false },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    'dayjs-nuxt',
    '@nuxt/image',
    'unplugin-info/nuxt'
  ],
  devServer: {
    host: '0', // 监听所有地址
  },
  dayjs: {
    plugins: ['utc', 'timezone'],
    defaultLocale: 'zh-cn',
    defaultTimezone: 'Asia/Shanghai',
  },
})
