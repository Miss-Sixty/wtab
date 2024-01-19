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
  if (props.type === 'add' && (h > 2 || w >= 4 || !w))
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
  props.type === 'del' && layoutStore.delWidget(props.widget)
}

const AsyncComp = defineAsyncComponent(() => import(`~/widgets/${props.component}/index.vue`))

const widgetW = computed(() => {
  const [w] = props.size.split(':').map(Number)
  return w
})
</script>

<template>
  <div shadow-xl relative select-none :style="widgetWH" rounded-lg border border-color-transparent :class="[type && !widgetW ? 'border-color-violet' : '', scale]">
    <template v-if="type">
      <button
        :class="iconScale" absolute left-0 top-0 class="-translate-x-1/4 -translate-y-1/4" text-2xl cursor-pointer
        hover:text-violet-600 @click="handleClick"
      >
        <div bg-red hover:bg-red-300 :class="type === 'add' ? 'i-solar-add-circle-bold' : 'i-solar-minus-circle-bold'" />
      </button>

      <div
        v-if="!widgetW"
        absolute right-0 top-0 text-xs cursor-pointer
        bg-violet text-white px-2 py-0.5 rounded-bl-lg rounded-tr-lg
      >
        独占一行
      </div>
    </template>

    <component :is="AsyncComp" :style="widgetWH" overflow-hidden :type="type" :widget="widget" :size="size" />
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
