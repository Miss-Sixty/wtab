<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import { computed } from 'vue'
import { useUnaThemes } from '@/composables/useUnaThemes'
import { useUnaSettings } from '@/composables/useUnaSettings'

const { primaryThemes, grayThemes } = useUnaThemes()

const { settings, reset } = useUnaSettings()

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

const [value, toggle] = useToggle()
function shuffleTheme() {
  const randomPrimaryTheme = primaryThemes[Math.floor(Math.random() * primaryThemes.length)][0]
  const randomGrayTheme = grayThemes[Math.floor(Math.random() * grayThemes.length)][0]
  updatePrimaryTheme(randomPrimaryTheme)
  updateGrayTheme(randomGrayTheme)
  toggle()
}
</script>

<template>
  <div class="flex flex-col space-y-4 p3">
    <div class="grid grid-cols-5 gap-3 border-b pb-4">
      <button
        v-for="[key, theme] in primaryThemes" :key="key" :style="{ background: theme['--wt-primary-hex'] }"
        h-5 w-5 rounded-full ring="primary offset-1"
        :class="[currentPrimaryThemeName === key ? 'ring-2' : '']"
        @click="updatePrimaryTheme(key)"
      />
    </div>

    <div class="grid grid-cols-5 gap-3 border-b pb-4">
      <button
        v-for="[key, theme] in grayThemes" :key="key" :style="{ background: theme['--wt-gray-hex'] }"
        h-5 w-5 rounded-full ring="gray offset-1"
        :class="[currentGrayThemeName === key ? 'ring-2' : '']"
        @click="updateGrayTheme(key)"
      />
    </div>

    <div class="grid grid-cols-2 gap-3">
      <button
        btn="~ solid block"
        :wt="{
          btnLeading: value ? 'rotate-180 transform' : 'rotate-0',
        }"
        @click="shuffleTheme"
      >
        <div i-heroicons-adjustments-horizontal-solid />
      </button>

      <button btn="~ solid-gray" @click="reset">
        <div i-heroicons-arrow-uturn-left />
      </button>
    </div>
  </div>
</template>
