<script setup lang="ts">
import { Switch } from '@headlessui/vue'

const modelValue = defineModel({ default: false })
</script>

<template>
  <Switch
    v-model="modelValue"
    :class="[modelValue ? 'bg-primary' : 'bg-gray-200']"
    focus-visible="outline outline-2 outline-offset-1 outline-primary"
    p0.5
    inline-flex h-6 w-11
    cursor-pointer
    rounded-full transition-colors
    duration-200 ease-in-out
  >
    <span
      pointer-events-none
      inline-block h-5 w-5
      transform rounded-full bg-white transition duration-200 ease-in-out
      :class="[modelValue ? 'translate-x-5' : 'translate-x-0']"
    />
  </Switch>
</template>
