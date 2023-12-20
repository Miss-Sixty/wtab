import { defineStore } from 'pinia'
import dayjs from 'dayjs'

export default defineStore('appLayout', () => {
  const formatClock = ref('YYYY-MM-DD HH:mm:ss')
  const date = ref(dayjs().valueOf())

  let timer: ReturnType<typeof rAF> | undefined
  const stopTimer = () => {
    if (!timer)
      return
    cAF(timer)
    timer = undefined
  }

  const startTimer = () => {
    const frameFunc = () => {
      date.value = dayjs().valueOf()

      timer = rAF(frameFunc)
    }
    timer = rAF(frameFunc)
  }

  const visibility = useDocumentVisibility()
  watchEffect(() => {
    visibility.value === 'hidden' ? stopTimer() : startTimer()
  })
  return {
    formatClock,
    date,
  }
})
