<script setup lang="ts">
import { useUnaThemes } from '@/composables/useUnaThemes'
import { useUnaSettings } from '@/composables/useUnaSettings'

const { primaryThemes } = useUnaThemes()

const { settings } = useUnaSettings()

const currentPrimaryThemeHex = computed(() => settings.value.primaryColors?.['--wt-primary-hex'])

const currentPrimaryThemeName = computed(() => {
  const theme = primaryThemes.find(([, theme]) => theme['--wt-primary-hex'] === currentPrimaryThemeHex.value)
  return theme ? theme[0] : ''
})

// update theme in storage
function updatePrimaryTheme(theme: string) {
  settings.value.primary = theme
}
</script>

<template>
    <div py1.5 class="flex-[2]" grid grid-cols-7 grid-rows-3 gap-3 sm:grid-rows-2 sm:grid-cols-9>
      <div flex="~ items-center justify-center" v-for="[key, theme] in primaryThemes" :key="key">
        <button :style="{ background: theme['--wt-primary-hex'] }" h-4 w-4 rounded-full ring="primary offset-1"
          :class="[currentPrimaryThemeName === key ? 'ring-2' : '']" @click="updatePrimaryTheme(key)" />
      </div>
    </div>
</template>
