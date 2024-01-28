<script setup lang="ts">
import useGesture from './useGesture'
import useLayoutStore from '@/stores/layout'
const layoutStore = useLayoutStore()

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  colsNum: {
    type: Number,
    required: true,
  },
  baseSize: {
    type: Number,
    required: true,
  },
  baseMargin: {
    type: Number,
    required: true,
  },
  editMode: {
    type: Boolean,
    default: false,
  },
})

const gridRef = ref<HTMLElement | null>(null)
// 手势
const { dragging, childXY, draggingId, placeholderData } = useGesture({
  listener: computed(() => props.editMode), // 是否开启手势
  el: gridRef, // 绑定的元素
  baseSize: computed(() => props.baseSize), // 基础尺寸
  baseMargin: computed(() => props.baseMargin), // 基础间距
  layouts: computed(() => props.modelValue),
  colsNum: computed(() => props.colsNum),
})

provide('gridContextKey', {
  colsNum: computed(() => props.colsNum),
  baseSize: computed(() => props.baseSize),
  baseMargin: computed(() => props.baseMargin),
  layouts: computed(() => props.modelValue),
  childXY,
  draggingId,
  dragging,
  editMode: computed(() => props.editMode),
})



const cursorClass = computed(() => {
  if (gridWidth.value >= girdMaxWidth.value) {
    return 'cursor-w-resize'
  } else if (gridWidth.value > gridMinWidth.value && gridWidth.value < girdMaxWidth.value) {
    return 'cursor-ew-resize'
  } else {
    return 'cursor-e-resize'
  }
})

const handleRef = ref()
const { width } = useWindowSize()
const girdMaxWidth = computed(() => width.value - 48)
const gridMinWidth = ref(640)
const gridWidth = ref(girdMaxWidth.value)
watch(width, val => {
  if (gridWidth.value > val - 48) gridWidth.value = val - 48
  if (gridWidth.value < gridMinWidth.value) gridWidth.value = gridMinWidth.value
})
const { x } = useElementBounding(handleRef)
usePointerSwipe(handleRef, {
  disableTextSelect: true,
  threshold: 0,
  onSwipe(e: PointerEvent) {
    if (gridWidth.value <= gridMinWidth.value && e.clientX < x.value) return
    if (gridWidth.value >= girdMaxWidth.value && e.clientX > x.value) return
    gridWidth.value += e.movementX * 2
    if (gridWidth.value < gridMinWidth.value) gridWidth.value = gridMinWidth.value
    if (gridWidth.value > girdMaxWidth.value) gridWidth.value = girdMaxWidth.value
  }
})
</script>

<template>
  <ClientOnly>
    <div ref="gridRef" relative mx-auto :style="{
      width: `${gridWidth}px`,
    }" :class="{ 'ring-1': layoutStore.editMode }" p10 rounded-lg ring-slate-300 h-full>
      <div absolute inset-y-0 left-full hidden items-center px-2 flex v-if="layoutStore.editMode">
        <div ref="handleRef" :class="[cursorClass]" h-8 w-1.5 rounded-full bg-slate-400></div>
      </div>
      <GridItem v-show="dragging" :id="placeholderData?.id" :key="placeholderData?.id" bg-violet-50
        :placeholder="placeholderData" />
      <slot :dragging="dragging" />
    </div>
  </ClientOnly>
</template>
