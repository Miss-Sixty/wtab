<script setup lang="ts">
import dayjs from 'dayjs'
import SettingDialog from './components/SettingDialog.vue'
import calendar from '@/utils/lunar/index'
import { cAF, rAF } from '@/utils/raf'

defineProps({
  widget: {
    type: Object,
    default: () => ({}),
  },
  type: { // 删除-del 新增-add ''-展示
    type: String,
    default: '',
  },
  size: {
    type: String,
    required: true,
  },
})
const dateTime = ref(+new Date())
let timer: ReturnType<typeof rAF> | undefined
function stopTimer() {
  if (!timer)
    return
  cAF(timer)
  timer = undefined
}

function startTimer() {
  const frameFunc = () => {
    dateTime.value = +new Date()

    timer = rAF(frameFunc)
  }
  timer = rAF(frameFunc)
}

const visibility = useDocumentVisibility()
watchEffect(() => {
  visibility.value === 'hidden' ? stopTimer() : startTimer()
})

const lunar: any = calendar.solar2lunar(
  dayjs().get('year'),
  dayjs().get('month') + 1,
  dayjs().get('date'),
)

const date = computed(() => dayjs(dateTime.value).format('YYYY年MM月DD日'))
const time = computed(() => dayjs(dateTime.value).format('HH:mm:ss'))
const YMD = computed(() => ` ${lunar.IMonthCn}${lunar.IDayCn} ${lunar.ncWeek}`)
const dialogSettingVisible = ref(false)
</script>

<template>
  <div flex items-center justify-center flex-col rounded-lg tabular-nums>
    <div text-18 leading-none>
      {{ time }}
    </div>
    <div text-5>
      {{ date }}{{ YMD }}
    </div>
    <SettingDialog v-model="dialogSettingVisible" :size="size" :widget="widget" />
  </div>
</template>
