<script setup lang="ts">
import dayjs from 'dayjs'
import useLayoutStore from '@/stores/app'

const layoutStore = useLayoutStore()
const clockVisible = ref(false)
const time = computed(() => dayjs(layoutStore.date).format(layoutStore.formatClock))
</script>

<template>
  <ClientOnly>
    <button text-xs bg-transparent @click="clockVisible = true">
      {{ time }}
    </button>
    <HeaderSettingDialog v-model="clockVisible" />
  </ClientOnly>
</template>
