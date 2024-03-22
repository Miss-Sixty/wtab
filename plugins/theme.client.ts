import { watchEffect } from 'vue'
import { useUnaSettings } from '../composables/useUnaSettings'

let unaUIStyle: HTMLStyleElement

export default defineNuxtPlugin(() => {
  const { settings } = useUnaSettings()

  unaUIStyle = document.createElement('style')
  unaUIStyle.id = 'wt-ui-colors'
  document.head.appendChild(unaUIStyle)

  // remove mock attribute from html tag
  const html = document.documentElement
  html.removeAttribute('style')

  watchEffect(() => {
    const styleTag = document.getElementById('wt-ui-colors')
    if (styleTag) {
      styleTag.innerHTML = `
    :root {
        ${Object.entries(settings.value.primaryColors || {}).map(([k, v]) => `${k}: ${v};`).join('\n')}
    }
    `.replace(/\s*\n+\s*/g, '')
    }
  })
})
