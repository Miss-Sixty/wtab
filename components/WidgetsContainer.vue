<script setup lang="ts">
import useLayoutStore from '@/stores/layout'

const props: any = defineProps({
  widget: {
    type: Object,
    default: () => ({}),
  },
  size: {
    type: String,
    default: '1:1',
  },
  component: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: '',
  },
})
const layoutStore = useLayoutStore()
const { baseMargin, baseSize } = storeToRefs(layoutStore)
const wh = computed(() => {
  return props.size.split(':')
})

const widgetWH = computed(() => {
  const [w, h] = wh.value
  return {
    width: `${w * baseSize.value + (w - 1) * baseMargin.value}px`,
    height: `${h * baseSize.value + (h - 1) * baseMargin.value}px`,
  }
})

const scale = computed(() => {
  const [w, h] = wh.value
  let scale = 'scale-100'
  if (props.type === 'add' && (h > 2 || w > 4))
    scale = 'scale-65'
  return scale
})

const iconScale = computed(() => {
  const [w, h] = wh.value
  let scale = 'scale-100'
  if (props.type === 'add' && (h > 2 || w > 4))
    scale = 'scale-150'
  return scale
})

function handleClick() {
  props.type === 'add' && layoutStore.addWidget(props.widget, props.component, props.size)
  props.type === 'edit' && layoutStore.delWidget(props.widget)
}

// const AsyncComp = defineAsyncComponent(() => import(`~/widgets/${props.component}/index.vue`))
</script>

<template>
  <div relative select-none :class="scale" :style="widgetWH" bg-red rounded-lg>
    <template v-if="type">
      <button
        :class="iconScale" absolute left-0 top-0 class="-translate-x-1/4 -translate-y-1/4" text-2xl cursor-pointer
        @click="handleClick"
      >
        <div bg-white :class="[type === 'add' ? 'i-solar-add-circle-bold' : 'i-solar-minus-circle-bold']" />
      </button>
    </template>

    <!-- <component :is="AsyncComp" :style="widgetWH" overflow-hidden :type="type" :widget="widget" /> -->
    <!-- <div absolute bottom-0 class="translate-y-3/4" left-0 right-0 flex justify-center will-change-auto duration-150>
      <div
        flex items-center border border-gray-300 dark:border-gray-600 px-2 py-0.5 gap-1 sm:text-sm font-medium
        bg-white text-slate-700 dark:text-slate-50 rounded-lg shadow-lg
      >
        <button button p1 button-icon-only flex items-center p-0.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded>
          <div i-solar-trash-bin-minimalistic-linear />
        </button>
        <button button p1 button-icon-only flex items-center p-0.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded>
          <div i-solar-pen-2-linear />
        </button>
        <div class="w-px h-[16px] bg-slate-300" />
      </div>
    </div> -->
  </div>
</template>

<style scoped>
.tooltip {
  pointer-events: none;
  z-index: 50;
  white-space: pre;
  overflow-wrap: break-word;
  border-radius: 0.25rem;
  padding-left: 0.625rem;
  padding-right: 0.625rem;
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  text-align: center;
  font-size: 0.75rem;
  line-height: 1rem;
  color: #fff;
  text-decoration: none;
  text-shadow: none;
  text-transform: none;
  letter-spacing: normal;
  background: #1f1f1f;
}
</style>
