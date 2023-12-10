<script setup lang="ts">
// import settings from '@/config/settings'
defineEmits(['widgetContextmenu'])

// const width = computed(() => {
//   const width = settings.deviceList.find(item => item.type === layoutStore.deviceType)?.width
//   return width
// })
</script>

<template>
  <main flex flex-1 py-2 h-screen w-screen overflow-hidden justify-center overflow-y-auto>
    <slot />
  </main>
</template>
