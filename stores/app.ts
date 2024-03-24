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

  const wallpaperType = ref('base') // base: 基础壁纸, custom: 自定义壁纸, bing: 必应壁纸
  const wallpaperBaseList = ['/bg/1.heic', '/bg/2.heic', '/bg/3.heic', '/bg/4.heic', '/bg/5.heic', '/bg/6.heic']
  const wallpaperBase = ref('') // 基础壁纸地址

  const wallpaperActive = computed(() => {
    if (wallpaperType.value === 'base') return wallpaperBase.value || wallpaperBase.value[0]
    if (wallpaperType.value === 'custom') return wallpaperCustomFile.value ? URL.createObjectURL(wallpaperCustomFile.value) : ''
  })

  const wallpaperCustomFile = ref() // 自定义壁纸文件
  const wallpaperCustom = ref('') // 自定义壁纸地址


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
    wallpaperBaseList,
    wallpaperBase,
    wallpaperActive,
    wallpaperCustomFile,
    wallpaperCustom
  }
})

