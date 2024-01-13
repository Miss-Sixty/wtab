<script setup lang="ts">
const beforeInstallEvent = ref()
async function addpwa() {
  beforeInstallEvent.value.prompt()
}

onMounted(() => {
  useEventListener(window, 'beforeinstallprompt', (evt) => {
    evt.preventDefault()
    beforeInstallEvent.value = evt
  })

  useEventListener(window, 'appinstalled', () => {
    beforeInstallEvent.value = undefined
  })
})
</script>

<template>
  <div v-if="beforeInstallEvent">
    <WtIcon icon="i-solar-monitor-smartphone-bold-duotone" @click="addpwa" />
  </div>
</template>
