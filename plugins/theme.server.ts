import { useUnaSettings } from '@/composables/useUnaSettings'

export default defineNuxtPlugin(() => {
  const { defaultSettings } = useUnaSettings()
  useHead({
    script: [
      {
        innerHTML: `
        ;(function() {
          const settings = JSON.parse(localStorage.getItem('wtab-settings'))

          if (!settings) {
            settings = ${JSON.stringify(defaultSettings)}
          }

          const html = document.documentElement

          if (settings.primaryColors) {
            Object.entries(settings.primaryColors).map(i => html.style.setProperty(i[0], i[1]))
          }
          if (settings.grayColors) {
            Object.entries(settings.grayColors).map(i => html.style.setProperty(i[0], i[1]))
          }
        })()`.trim().replace(/\s*\n+\s*/g, ';'),
      },
    ],
  })
})
