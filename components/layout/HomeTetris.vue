<script setup lang="ts">
import useWallpaperStore from '@/stores/wallpaper'
import bg1 from '/bg/1.heic'
import bg2 from '/bg/2.heic'
import bg3 from '/bg/3.heic'
import bg4 from '/bg/4.heic'
import bg5 from '/bg/5.heic'
import bg6 from '/bg/6.heic'
const wallpaperStore = useWallpaperStore()

onMounted(() => {
  if (!wallpaperStore.url) {
    wallpaperStore.url = 'bg1'
  }
})

const bgList: any = {
  bg1,
  bg2,
  bg3,
  bg4,
  bg5,
  bg6,
}

</script>

<template>
  <Transition enter-active-class="animate-fade-in">
    <div v-if="wallpaperStore.url"
      :style="{ backgroundImage: `url(${bgList[wallpaperStore.url] || wallpaperStore.url})` }" s select-none z--1 fixed
      size-full bg-cover bg-no-repeat bg-fixed bg-center>
    </div>
  </Transition>
</template>