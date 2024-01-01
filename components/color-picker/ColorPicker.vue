<script setup lang="ts">
import { useUnaThemes } from '@/composables/useUnaThemes'
import { useUnaSettings } from '@/composables/useUnaSettings'

const { primaryThemes, grayThemes } = useUnaThemes()

const { settings } = useUnaSettings()

const currentPrimaryThemeHex = computed(() => settings.value.primaryColors?.['--wt-primary-hex'])

const currentPrimaryThemeName = computed(() => {
  const theme = primaryThemes.find(([, theme]) => theme['--wt-primary-hex'] === currentPrimaryThemeHex.value)
  return theme ? theme[0] : ''
})

const currentGrayThemeHex = computed(() => settings.value.grayColors?.['--wt-gray-hex'])

const currentGrayThemeName = computed(() => {
  const theme = grayThemes.find(([, theme]) => theme['--wt-gray-hex'] === currentGrayThemeHex.value)
  return theme ? theme[0] : ''
})

// update theme in storage
function updatePrimaryTheme(theme: string) {
  settings.value.primary = theme
}

function updateGrayTheme(theme: string) {
  settings.value.gray = theme
}
</script>

<template>
  <div space-y-3 p3>
    <div grid grid-cols-5 gap-3 border-b pb-3>
      <button
        v-for="[key, theme] in primaryThemes" :key="key" :style="{ background: theme['--wt-primary-hex'] }"
        h-4.5 w-4.5 rounded-full ring="primary offset-1"
        :class="[currentPrimaryThemeName === key ? 'ring-2' : '']"
        @click="updatePrimaryTheme(key)"
      />
    </div>

    <div grid grid-cols-5 gap-3>
      <button
        v-for="[key, theme] in grayThemes" :key="key" :style="{ background: theme['--wt-gray-hex'] }"
        h-4.5 w-4.5 rounded-full ring="gray offset-1"
        :class="[currentGrayThemeName === key ? 'ring-2' : '']"
        @click="updateGrayTheme(key)"
      />
    </div>
  </div>
</template>
