import { defineStore } from 'pinia'
import useSetThemeColor from '@/composables/useSetThemeColor'

export default defineStore('wallpaperStore', () => {
  const type = ref('base') // base: 基础壁纸, custom: 自定义壁纸, bing: 必应壁纸
  const url = ref('')
  const customFile = ref() // 自定义壁纸文件
  const custom = computed(() => customFile.value ? URL.createObjectURL(customFile.value) : '')
  watchEffect(() => {
    if (type.value !== 'custom') return
    url.value = custom.value
  })

  const bingCopyright = ref('') // 必应壁纸版权
  // const bing_mini_url = ref('') // 必应壁纸小图
  // const bing_1080_url = ref('') // 必应壁纸1080P
  const bing_hd_url = ref('') // 必应壁纸4K
  const getBingWallpaper = async () => {
    if (bing_hd_url.value) return
    try {
      const { data }: any = await $fetch('/api/bing')
      const { copyright, urlbase } = data
      if (!urlbase) return
      bingCopyright.value = copyright
      // bing_mini_url.value = `https://www.bing.com${urlbase}_320x240.jpg`
      // bing_1080_url.value = `https://www.bing.com${urlbase}_1920x1080.jpg`
      bing_hd_url.value = `https://www.bing.com${urlbase}_UHD.jpg`
      // date.value = dayjs().format('YYYY-MM-DD')
    } catch (e) { }
  }


  watch(url, (url) => useSetThemeColor(url))

  function $reset() {
    type.value = 'base'
    customFile.value = null
  }

  return {
    $reset,
    type,
    url,
    customFile,
    custom,
    getBingWallpaper,
    bingCopyright,
    bing_hd_url
  }
}, {
  paths: ['type', 'url', 'customFile', 'bingCopyright', 'bing_hd_url']
})

