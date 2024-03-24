import { defineStore } from 'pinia'
import settings from '@/config/settings'
import useLayoutStore from '@/stores/layout'
import { useUnaSettings } from '@/composables/useUnaSettings'

const { app } = settings
export default defineStore('appStore', () => {
  const formatClock = ref('YYYY-MM-DD HH:mm:ss')
  const date = ref(+new Date())
  const headerConstant = ref(app.headerConstant)
  const calendar: any = shallowRef([]) //假期数据

  const wallpaperType = ref('/bg/1.heic')
  const wallpaperBase = ref(['/bg/1.heic', '/bg/2.heic', '/bg/3.heic', '/bg/4.heic', '/bg/5.heic', '/bg/6.heic']) // 基础壁纸地址
  const wallpaperCustomFile = ref() // 自定义壁纸文件
  // 将 wallpagerCustomFile 转为 url
  const wallpaperCustomUrl = computed(() => {
    return wallpaperCustomFile.value ? URL.createObjectURL(wallpaperCustomFile.value) : ''
  })

  // 请求节假日数据
  async function getCalendar() {
    if (calendar.value.length) return calendar.value
    const { days }: any = await $fetch(`https://cdn.jsdelivr.net/gh/NateScarlet/holiday-cn@master/${2024}.json`)
    calendar.value = days
    return days
  }

  function $reset() {
    formatClock.value = 'YYYY-MM-DD HH:mm:ss'
    date.value = +new Date()
    headerConstant.value = false
    calendar.value = []
    wallpaperType.value = 'base'
  }

  function resetData() {
    const layoutStore: any = useLayoutStore()
    layoutStore.$reset()
    $reset
    const { settings } = useUnaSettings()
    const appConfig = useAppConfig()
    settings.value.primary = appConfig.ui.primary
  }

  return {
    formatClock,
    date,
    headerConstant,
    $reset,
    calendar,
    getCalendar,
    resetData,
    wallpaperType,
    wallpaperBase,
    wallpaperCustomUrl,
    wallpaperCustomFile
  }
})

