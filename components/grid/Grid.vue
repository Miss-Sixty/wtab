<script setup lang="ts">
import useGesture from './useGesture'

import useLayoutStore from '@/stores/layout'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
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

const layoutStore = useLayoutStore()

const gridRef = ref<HTMLElement | null>(null)

// 获取 gridRef 高度
const clientHeight = computed(() => {
  return gridRef.value?.clientHeight || 0
})

// 计算 gridRef 高度可以放下多少行
const rowsNum = computed(() => {
  const num = Math.floor((clientHeight.value - props.baseMargin) / (props.baseSize + props.baseMargin))
  layoutStore.rowsNum = num
  return num
})

// 计算 rowsNum 能放下多少个 widget的高度
const clientHeightPadding = computed(() => {
  let padding = 0
  if (rowsNum.value > 0) {
    const height = rowsNum.value * (props.baseSize + props.baseMargin) - props.baseMargin
    padding = (clientHeight.value - height) / 2
  }
  return padding
})

// 手势
const { dragging, childXY, draggingId, placeholderData } = useGesture({
  listener: computed(() => props.editMode), // 是否开启手势
  el: gridRef, // 绑定的元素
  baseSize: computed(() => props.baseSize), // 基础尺寸
  baseMargin: computed(() => props.baseMargin), // 基础间距
  layouts: computed(() => props.modelValue),
})

provide('gridContextKey', {
  baseSize: computed(() => props.baseSize),
  baseMargin: computed(() => props.baseMargin),
  layouts: computed(() => props.modelValue),
  childXY,
  draggingId,
  dragging,
  editMode: computed(() => props.editMode),
})

const scrollLeftStart = ref(0)
const { distanceX } = usePointerSwipe(gridRef, {
  threshold: 0,
  pointerTypes: ['mouse'],
  onSwipeStart() {
    scrollLeftStart.value = gridRef.value?.scrollLeft || 0
  },
  onSwipe() {
    if (gridRef.value)
      gridRef.value.scrollLeft = scrollLeftStart.value + distanceX.value
  },
})
</script>

<template>
  <ClientOnly>
    <div
      ref="gridRef" relative transition-all bg-yellow h-full overflow-x-auto
      :style="{ padding: `${clientHeightPadding}px 2.5rem` }"
    >
      <!-- <div w-500 bg-blue h-100>
        22
      </div> -->
      <GridItem
        v-show="dragging" :id="placeholderData?.id" :key="placeholderData?.id" bg-red-200
        :placeholder="placeholderData"
      />
      <slot />
    </div>
  </ClientOnly>
</template>
