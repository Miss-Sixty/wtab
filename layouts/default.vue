<script setup lang="ts">
// import settings from '@/config/settings'
defineEmits(['widgetContextmenu'])

// const width = computed(() => {
//   const width = settings.deviceList.find(item => item.type === layoutStore.deviceType)?.width
//   return width
// })
</script>

<template>
  <main flex flex-1 h-screen w-screen justify-center>
    <slot />
  </main>
</template>
