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

  const wallpaperType = ref('base1')
  const wallpaperUrl = ref('') // 自定义壁纸地址

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
  }
})

