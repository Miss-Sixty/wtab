<script setup lang="ts">
const { $pwa } = useNuxtApp()
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
  window.addEventListener('beforeinstallprompt', (e) => {
  // Prevents the default mini-infobar or install dialog from appearing on mobile
    e.preventDefault()
    // Save the event because you'll need to trigger it later.
    pwaEvent = e
  // Show your customized install prompt for your PWA
  // Your own UI doesn't have to be a single element, you
  // can have buttons in different locations, or wait to prompt
  // as part of a critical journey.
  // showInAppInstallPromotion();
  })
})
</script>

<template>
  <div>
    <WtIcon v-if="isShow" icon="i-solar-monitor-smartphone-bold-duotone" @click="addpwa" />
  </div>
</template>
