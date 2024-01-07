import { defineStore } from 'pinia'

export default defineStore('appStore', () => {
  const formatClock = ref('YYYY-MM-DD HH:mm:ss')
  const date = ref(+new Date())
  const headerDate = ref(false)
  const headerConstant = ref(true)

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

  function $reset() {
    formatClock.value = 'YYYY-MM-DD HH:mm:ss'
    date.value = +new Date()
    headerDate.value = false
    headerConstant.value = true
  }

  return {
    formatClock,
    date,
    headerDate,
    headerConstant,
    $reset,
  }
}, { persist: {
  paths: ['formatClock', 'headerDate', 'headerConstant'],
  storage: persistedState.localStorage,
} })
