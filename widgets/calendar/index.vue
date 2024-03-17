<script setup lang="ts">
import dayjs from 'dayjs'
import useLayoutStore from '@/stores/layout'
import useAppStore from '@/stores/app'
import size1x1 from './size/1x1.vue'
import size2x1 from './size/2x1.vue'
const layoutStore = useLayoutStore()
const appStore = useAppStore()
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
  dragging: {
    type: Boolean,
    default: false
  }
})


const days = ref()
const loading = ref(true)
async function init() {
  loading.value = true
  try {
    if (!appStore.calendar.length) {
      // 请求节假日数据
      await appStore.getCalendar()
    }
    days.value = appStore.calendar.filter((item: any) => dayjs(item.date).isAfter(dayjs()) && item.isOffDay)?.[0]
  }
  finally {
    loading.value = false
  }
}
init()

const minSize = computed(() => Math.min(...props.size.split(':').map(Number)) * layoutStore.baseSize)


const components: any = {
  size1x1: size1x1,
  size2x1: size2x1,
}

const router = useRouter()
if (!router.hasRoute('index-calendar')) {
  router.addRoute('index', {
    name: 'index-calendar',
    path: '/calendar',
    component: () => import('./page/calendar.vue'),
  })
}
</script>

<template>
  <div bg-white cursor-pointer w-full h-full flex flex-col rounded-lg py1 px2 relative overflow-hidden>
    <NuxtLink v-slot="{ navigate }" custom to="/calendar">
      <div @click="!dragging && navigate()" absolute opacity-10 i-solar-calendar-mark-bold-duotone
        class="-rotate-30 -right-2.5" text-primary :style="{ height: minSize + 'px', width: minSize + 'px' }" />
      <component :is="components[`size${size.replace(':','x')}`]" :data="days" />
    </NuxtLink>
  </div>
</template>
