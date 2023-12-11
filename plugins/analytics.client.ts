// import { SpeedInsights } from '@vercel/speed-insights/nuxt'
import { inject } from '@vercel/analytics'

export default defineNuxtPlugin(() => {
  // SpeedInsights()
  inject()
})
