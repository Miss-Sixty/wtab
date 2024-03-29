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
  dragging: {
    type: Boolean,
    default: false
  },
  singleRow: {
    type: Boolean,
    default: false
  },
  shadow: {
    type: Boolean,
    default: true
  }
})
const layoutStore = useLayoutStore()
const { baseMargin, baseSize } = storeToRefs(layoutStore)
const wh = computed(() => {
  return props.size.split(':')
})

const widgetWH = computed(() => {
  const [w, h] = wh.value
  return {
    width: props.singleRow ? '100%' : `${w * baseSize.value + (w - 1) * baseMargin.value}px`,
    height: `${h * baseSize.value + (h - 1) * baseMargin.value}px`,
  }
})

function handleClick() {
  props.type === 'add' && layoutStore.addWidget(props.widget, props.component, props.size, props.shadow)
  props.type === 'del' && layoutStore.delWidget(props.widget)
}

const AsyncComp = defineAsyncComponent(() => import(`~/widgets/${props.component}/index.vue`))

const className = computed(() => {
  let name = ''
  if (!props.singleRow) return 'border-color-transparent'
  if (props.type) name += ' border border-color-primary'
  return name
})
</script>

<template>
  <div relative select-none :style="widgetWH" rounded-lg :class="[className, shadow ? 'shadow-xl' : '']">
    <template v-if="type">
      <button absolute left-0 top-0 z1 class="-translate-x-1/3 -translate-y-1/3" text-2xl cursor-pointer
        hover:text-primary @click="handleClick">
        <div bg-red hover:bg-red-300
          :class="type === 'add' ? 'i-solar-add-circle-bold' : 'i-solar-minus-circle-bold'" />
      </button>
      <div v-if="singleRow" absolute text-xs cursor-pointer bg-primary text-white px-2 py-0.5 rounded-bl-lg
        rounded-tr-lg class="-right-[1px] -top-[1px]">
        独占一行
      </div>
    </template>
    <component :dragging="dragging" w-full h-full :is="AsyncComp" overflow-hidden :type="type" :widget="widget"
      :size="size" />
  </div>
</template>