import { useStorage } from '@vueuse/core'
import { watchEffect } from 'vue'
import { useUnaThemes } from './useUnaThemes'
import type { UnaSettings } from '@/types'
import { useAppConfig } from '#imports'

export function useUnaSettings() {
  const { ui } = useAppConfig()

  const { getPrimaryColors } = useUnaThemes()

  const defaultSettings: UnaSettings = {
    primaryColors: getPrimaryColors(ui.primary),
    primary: ui.primary,
  } as const

  const settings = useStorage('wtab-settings', defaultSettings)

  watchEffect(() => {
    settings.value.primaryColors = getPrimaryColors(settings.value.primary)
  })

  return {
    defaultSettings,
    settings,
  }
}
