<script setup lang="ts">
defineEmits(['click'])
defineProps({
  src: {
    type: String,
    default: ''
  },
  active: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  tip: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div flex>
    <div class="w-[145px] h-[96px]" rounded-md overflow-hidden relative flex-shrink-0 @click="src && $emit('click')">
      <NuxtImg v-if="src" fit="cover" size-full :src="src" absolute :style="{ cursor: src ? 'pointer' : '' }"
        placeholder />

      <div v-else="active" flex items-center justify-center absolute right-0 bottom-0 left-0 top-0 text-2xl w-full
        h-full text-gray-400 bg-gray-200>
        <svg v-if="loading" animate-spin mr-1 w-1em h-1em fill="none" viewBox="0 0 24 24">
          <circle opacity-25 cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path opacity-75 fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <div v-else class="i-solar-gallery-add-bold"></div>
      </div>
    </div>
    <div v-if="title || tip" ml-5 flex flex-col>
      <p v-if="title" m-0 text-base font-bold>{{ title }}</p>
      <p v-if="tip" text-xs pb-2 text-gray-400>{{ tip }}</p>
      <slot />
    </div>
  </div>
</template>