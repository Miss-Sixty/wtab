<script setup lang="ts">
import useGesture from './useGesture'

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

const widthStyle = computed(() => `${props.colsNum * (props.baseSize + props.baseMargin) - props.baseMargin + 80}px`)
const heightStyle = computed(() => {
  let h = 0
  let y = 0
  props.modelValue.forEach((widget: any) => {
    const widgetY = widget.position[props.colsNum][1]
    const widgetH = Number(widget.widgetSize.split(':')[1])
    if (widgetY + widgetH > y + h) {
      h = widgetH
      y = widgetY
    }
  })
  return `${(y + h) * (props.baseSize + props.baseMargin) - props.baseMargin + 80}px`
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


const { width } = useWindowSize()
const girdRightWidth = computed(() => width.value - 80)
const gridLeftWidth = ref(640)
const gridBaseWidth = ref(girdRightWidth.value)
watch(width, () => {
  if (gridBaseWidth.value > girdRightWidth.value) gridBaseWidth.value = girdRightWidth.value
})

const cursorClass = computed(() => {
  if (isSwiping.value) return 'cursor-none'
  if (gridBaseWidth.value >= girdRightWidth.value) {
    return 'cursor-w-resize'
  } else if (gridBaseWidth.value > gridLeftWidth.value && gridBaseWidth.value < girdRightWidth.value) {
    return 'cursor-ew-resize'
  } else {
    return 'cursor-e-resize'
  }
})

const handleRef = ref()
const { isSwiping } = usePointerSwipe(handleRef, {
  disableTextSelect: true,
  threshold: 0,
  onSwipe(e: PointerEvent) {
    gridBaseWidth.value += e.movementX * 2
    if(gridBaseWidth.value < gridLeftWidth.value) gridBaseWidth.value = gridLeftWidth.value
    if(gridBaseWidth.value > girdRightWidth.value) gridBaseWidth.value = girdRightWidth.value
  },
})
</script>

<template>
  <ClientOnly>
    <div ref="gridRef" relative mx-auto :style="{
      width: `${gridBaseWidth}px`,
    }" p10 rounded-lg ring-1 ring-slate-300 h-full>
      <div absolute inset-y-0 left-full hidden items-center px-2 flex>
        <div ref="handleRef" :class="[cursorClass]" h-8 w-1.5 rounded-full bg-slate-400></div>
      </div>
      <GridItem v-show="dragging" :id="placeholderData?.id" :key="placeholderData?.id" bg-violet-50
        :placeholder="placeholderData" />
      <slot :dragging="dragging" />
    </div>
  </ClientOnly>
</template>
