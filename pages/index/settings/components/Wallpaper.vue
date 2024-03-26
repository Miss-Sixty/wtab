<script setup lang="ts">
import bg1 from '/bg/1.heic'
import bg2 from '/bg/2.heic'
import bg3 from '/bg/3.heic'
import bg4 from '/bg/4.heic'
import bg5 from '/bg/5.heic'
import bg6 from '/bg/6.heic'
import WallpaperContent from './WallpaperContent.vue'
import useWallpaperStore from '@/stores/wallpaper'
const wallpaperStore = useWallpaperStore()

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
  wallpaperStore.customFile = rawFile
  activeCustomChange()
})

const activeBaseChange = (item: string) => {
  wallpaperStore.url = item
  wallpaperStore.type = 'base'
}
const activeCustomChange = () => {
  wallpaperStore.url = wallpaperStore.custom
  wallpaperStore.type = 'custom'
}

</script>

<template>
  <WallpaperContent v-if="type === 'customWallpaper'" @click="activeCustomChange"
    :active="wallpaperStore.type === 'custom'" :src="wallpaperStore.custom" title="将您的图片设为壁纸。"
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
    <WallpaperContent @click="activeBaseChange('bg1')" :active="wallpaperStore.url === 'bg1'" :src="bg1" />
    <WallpaperContent @click="activeBaseChange('bg2')" :active="wallpaperStore.url === 'bg2'" :src="bg2" />
    <WallpaperContent @click="activeBaseChange('bg3')" :active="wallpaperStore.url === 'bg3'" :src="bg3" />
    <WallpaperContent @click="activeBaseChange('bg4')" :active="wallpaperStore.url === 'bg4'" :src="bg4" />
    <WallpaperContent @click="activeBaseChange('bg5')" :active="wallpaperStore.url === 'bg5'" :src="bg5" />
    <WallpaperContent @click="activeBaseChange('bg6')" :active="wallpaperStore.url === 'bg6'" :src="bg6" />
  </div>
</template>
