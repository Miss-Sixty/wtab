<script setup lang="ts">
import dayjs from 'dayjs'
import useLayoutStore from '@/stores/layout'
const layoutStore = useLayoutStore()
const props = defineProps({
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


const data = ref()
const loading = ref(true)
async function init() {
  loading.value = true
  try {
    // 请求节假日数据
    const { days }: any = await $fetch(`https://cdn.jsdelivr.net/gh/NateScarlet/holiday-cn@master/${2024}.json`)
    data.value = days.filter(item => dayjs(item.date).isAfter(dayjs()) && item.isOffDay)?.[0]
    console.log(11, data.value);

  }
  finally {
    loading.value = false
  }
}
init()

const minSize = computed(() => Math.min(...props.size.split(':').map(Number)) * layoutStore.baseSize)
</script>

<template>
  <NuxtLink v-slot="{ navigate }" to="/calendar" custom>
    <div bg-white cursor-pointer w-full h-full flex flex-col rounded-lg @click="navigate" py1 px2
      relative overflow-hidden>
      <div absolute opacity-10  i-solar-calendar-mark-bold-duotone class="-rotate-30 -right-2.5"
        :style="{ height: minSize + 'px', width: minSize + 'px' }" />
      <p text-sm>下个节日：{{ data.name }}</p>
      <p text-sm>{{ data.date }}</p>
    </div>
  </NuxtLink>
</template>
