import { defineStore } from 'pinia'
import settings from '@/config/settings'

const { app } = settings
export default defineStore('appStore', () => {
  const formatClock = ref('YYYY-MM-DD HH:mm:ss')
  const date = ref(+new Date())
  const headerConstant = ref(app.headerConstant)
  const calendar: any = shallowRef([]) //假期数据

  // let timer: ReturnType<typeof rAF> | undefined
  // const stopTimer = () => {
  //   if (!timer)
  //     return
  //   cAF(timer)
  //   timer = undefined
  // }

  // const startTimer = () => {
  //   const frameFunc = () => {
  //     date.value = +new Date()

  //     timer = rAF(frameFunc)
  //   }
  //   timer = rAF(frameFunc)
  // }

  // const visibility = useDocumentVisibility()
  // watchEffect(() => {
  //   visibility.value === 'hidden' ? stopTimer() : startTimer()
  // })

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
    headerConstant.value = true
    calendar.value = []
  }

  return {
    formatClock,
    date,
    headerConstant,
    $reset,
    calendar,
    getCalendar
  }
}, {
  persist: {
    paths: ['formatClock', 'headerConstant', 'calendar'],
    storage: persistedState.localStorage,
  }
})

