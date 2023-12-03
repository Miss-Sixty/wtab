<script setup lang="ts">
// import settings from '@/config/settings'

// import useLayoutStore from '@/stores/layout'

// const layoutStore = useLayoutStore()

// const width = computed(() => {
//   const width = settings.deviceList.find(item => item.type === layoutStore.deviceType)?.width
//   return width
// })
</script>

<template>
  <main flex flex-col flex-1 h-screen overflow-hidden justify-center>
    <slot />
  </main>
</template>
