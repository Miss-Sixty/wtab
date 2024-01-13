<script setup lang="ts">
const beforeInstallEvent = ref()
async function addpwa() {
  // if (!$pwa)
  //   return
  // console.log(11, $pwa)
  // await $pwa.install()
  beforeInstallEvent.value.prompt()
}

onMounted(() => {
  useEventListener(window, 'beforeinstallprompt', (evt) => {
    evt.preventDefault()
    beforeInstallEvent.value = evt
  })

  // 监听appinstalled事件，指示Squoosh已安装。
  useEventListener(window, 'appinstalled', (evt) => {
    console.log(11, evt)

    beforeInstallEvent.value = undefined
  })
})
</script>

<template>
  <div v-if="beforeInstallEvent">
    <WtIcon icon="i-solar-monitor-smartphone-bold-duotone" @click="addpwa" />
  </div>
</template>
