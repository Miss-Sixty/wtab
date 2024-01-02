<script setup lang="ts">
import dayjs from 'dayjs'
import useAppStore from '@/stores/app'

const appStore = useAppStore()
const clockVisible = ref(false)
const time = computed(() => dayjs(appStore.date).format(appStore.formatClock))
</script>

<template>
  <ClientOnly>
    <button tabular-nums text-xs @click="clockVisible = true">
      {{ time }}
    </button>
    <HeaderSettingDialog v-model="clockVisible" />
  </ClientOnly>
</template>
