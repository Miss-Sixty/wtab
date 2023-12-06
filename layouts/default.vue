<script setup lang="ts">
// import settings from '@/config/settings'

import useLayoutStore from '@/stores/layout'

const layoutStore = useLayoutStore()

// const width = computed(() => {
//   const width = settings.deviceList.find(item => item.type === layoutStore.deviceType)?.width
//   return width
// })
</script>

<template>
  <main flex flex-1 h-screen w-screen overflow-hidden justify-center>
    <div flex-1 overflow-hidden>
      <slot />
    </div>
    <div v-if="layoutStore.editMode" bg-blue>
      <AddWidgets />
    </div>
  </main>
</template>
