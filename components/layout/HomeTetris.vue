<script setup lang="ts">
import useWallpaperStore from '@/stores/wallpaper'
import bg1 from '/bg/1.heic'
const wallpaperStore = useWallpaperStore()

onMounted(() => {
  if (!wallpaperStore.url) {
    wallpaperStore.url = bg1
  }
})

</script>

<template>
  <Transition enter-active-class="animate-fade-in">
    <div v-if="wallpaperStore.url" :style="{ backgroundImage: `url(${wallpaperStore.url})` }" s select-none z--1 fixed
      size-full bg-cover bg-no-repeat bg-fixed bg-center>
    </div>
  </Transition>
</template>