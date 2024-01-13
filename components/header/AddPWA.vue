<script setup lang="ts">
let pwaEvent: any
const isShow = ref(false)
async function addpwa() {
  // if (!$pwa)
  //   return
  // console.log(11, $pwa)
  // await $pwa.install()
  pwaEvent.prompt()
}

// useEventListener(document, 'beforeinstallprompt', (evt) => {
//   console.log(evt)
//   pwaEvent = evt
//   isShow.value = true
// })

// window.addEventListener('beforeinstallprompt', (e) => {
//   e.preventDefault()
//   pwaEvent = e
//   isShow.value = true
// })

onMounted(() => {
  console.log(22)
  window.addEventListener('beforeinstallprompt', (e) => {
    console.log(11, e)
  })
})
</script>

<template>
  <div>
    <WtIcon v-if="isShow" icon="i-solar-monitor-smartphone-bold-duotone" @click="addpwa" />
  </div>
</template>
