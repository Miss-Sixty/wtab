import { defineStore } from 'pinia'

export default defineStore('appLayout', () => {
  const formatClock = ref('YYYY-MM-DD HH:mm:ss')
  const date = ref(+new Date())
  const headerDate = ref(false)
  const headerConstant = ref(false)

  let timer: ReturnType<typeof rAF> | undefined
  const stopTimer = () => {
    if (!timer)
      return
    cAF(timer)
    timer = undefined
  }

  const startTimer = () => {
    const frameFunc = () => {
      date.value = +new Date()

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
    headerDate,
    headerConstant,
  }
}, { persist: {
  paths: ['formatClock', 'headerDate', 'headerConstant'],
} })
