<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { useToggle } from '@vueuse/core'
import { computed } from 'vue'
import { useUnaThemes } from '@/composables/useUnaThemes'
import { useUnaSettings } from '@/composables/useUnaSettings'

const { primaryThemes, grayThemes } = useUnaThemes()
</script>

<template>
  <ClientOnly>
    <Popover class="relative inline-block">
      <PopoverButton
        rounded-full bg-transparent hover:text-violet-600
        flex="~ items-center"
        focus-visible="outline outline-2 outline-offset-2 outline-violet-600"
        dark="hover:text-violet-400 focus-visible:outline-violet-500"
        transition
        p-1 text-base
      >
        <div i-solar-palette-bold />
      </PopoverButton>

      <PopoverPanel class="absolute right-0 z-100 mt-2 w-54 border-1 border-base rounded-xl bg-muted px-4 py-5 shadow-lg">
        <div class="flex flex-col space-y-5">
          <div class="grid grid-cols-5 gap-3">
            <button
              v-for="[key, theme] in primaryThemes" :key="key"
              h-5 w-5 rounded-full bg-red
            />
          </div>

          <div class="grid grid-cols-5 gap-3">
            <button
              v-for="[key, theme] in grayThemes" :key="key"
              h-5 w-5 rounded-full bg-red
            />
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  </ClientOnly>
</template>
