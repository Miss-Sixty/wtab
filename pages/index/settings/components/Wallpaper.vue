<script setup lang="ts">
import WallpaperContent from './WallpaperContent.vue'
import useAppStore from '@/stores/app'
const appStore = useAppStore()

defineEmits(['click'])
export interface Props {
  type?: 'customWallpaper' | 'bingWallpaper' | 'baseWallpaper'
}
defineProps<Props>()

const { open, onChange } = useFileDialog({
  multiple: false,
})

onChange(async (files) => {
  const [rawFile]: any = files || []
  if (!rawFile) return
  appStore.wallpaperCustomFile = rawFile
  appStore.wallpaperType = 'custom'
})

const activeBaseChange = (item: string) => {
  appStore.wallpaperBase = item
  appStore.wallpaperType = 'base'
}
</script>

<template>
  <WallpaperContent v-if="type === 'customWallpaper'" @click="appStore.wallpaperType = 'custom'"
    :active="appStore.wallpaperType === 'custom'" :src="appStore.wallpaperActive" title="将您的图片设为壁纸。"
    tip="建议分辨率：1920×1080 或更高">
    <WtButton style="width: 130px" mt-auto type="primary" @click="open">浏览…</WtButton>
  </WallpaperContent>
  <!--  <WallpaperContent v-if="type === 'bingWallpaper'" @click="wallpaperStore.type = 'my'"
    :active="wallpaperStore.type === 'my'" :src="wallpaperStore.my_url" title="来自 Bing 的壁纸，每日更新。"
    :tip="wallpaperStore.bingCopyright" :loading="true">
    <div>
      <span style="vertical-align: middle">图像来源：</span>
      <a href="https://cn.bing.com" target="_blank" flex-inline items-center text-primary>
        Bing <div class="i-solar-arrow-right-up-linear"></div>
      </a>
      <a style="margin-left: 10px" :href="wallpaperStore.bing_hd_url || wallpaperStore.bing_1080_url" target="_blank"
        flex-inline items-center text-primary>
        原图 <div class="i-solar-arrow-right-up-linear"></div>
      </a>
    </div>
  </WallpaperContent> -->

  <div v-if="type === 'baseWallpaper'" grid sm:grid-cols-3 sm:gap-6 gap-3 grid-cols-2>
    <WallpaperContent v-for="item in appStore.wallpaperBaseList" @click="activeBaseChange(item)"
      :active="appStore.wallpaperBase === item" :src="item" />
  </div>
</template>
