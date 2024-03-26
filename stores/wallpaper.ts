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
    custom
  }
})

