import { useStorage } from '@vueuse/core'
import { watchEffect } from 'vue'
import { useUnaThemes } from './useUnaThemes'
import type { UnaSettings } from '@/types'
import { useAppConfig } from '#imports'

export function useUnaSettings() {
  const { ui } = useAppConfig()

  const { getPrimaryColors, getGrayColors } = useUnaThemes()

  const defaultSettings: UnaSettings = {
    primaryColors: getPrimaryColors(ui.primary),
    grayColors: getGrayColors(ui.gray),
    primary: ui.primary,
    gray: ui.gray,
  } as const

  const settings = useStorage('wtab-settings', defaultSettings)

  watchEffect(() => {
    settings.value.primaryColors = getPrimaryColors(settings.value.primary)
    settings.value.grayColors = getGrayColors(settings.value.gray)
  })

  return {
    defaultSettings,
    settings,
  }
}
