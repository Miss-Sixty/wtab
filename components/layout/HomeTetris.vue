<script setup lang="ts">
import useAppStore from '@/stores/app'
const appStore = useAppStore()

defineEmits(['click'])
export interface Props {
  type?: 'customWallpaper' | 'bingWallpaper' | 'baseWallpaper'
}
defineProps<Props>()
</script>

<template>
  <div :style="{ backgroundImage: `url(${appStore.wallpaperType})` }" select-none z--1 fixed size-full bg-cover
    bg-no-repeat bg-fixed bg-center />
</template>