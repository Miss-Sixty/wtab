<script setup lang="ts">
defineOptions({
  name: 'GridItem',
})
const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  placeholder: {
    type: Object,
    default: () => ({}),
  },
})
const { colsNum, baseSize, baseMargin, layouts, childXY, draggingId, editMode }: any
  = inject('gridContextKey')

/**
 * item的数据
 */
const dragingData: any = computed(() => {
  return layouts.value.find((item: any) => item.id === props.id)
})
const singleRow = computed(() => {
  if (!dragingData.value) return
  return dragingData.value.widgetData.singleRow
})

const xywh = computed(() => {
  if (!props.id) return
  if (props.id === 'placeholder') {
    let { x, y, w, h } = props.placeholder
    if (singleRow.value || props.placeholder?.singleRow) w = colsNum.value
    return { x, y, w, h }
  }

  const { position, widgetSize } = dragingData.value
  const [x, y] = position[colsNum.value]
  let [w, h] = widgetSize.split(':').map(Number)
  if (singleRow.value) w = colsNum.value

  return { x, y, w, h }
})

// 初始排序
const initStyle = computed(() => {
  if (!xywh.value) return
  return {
    transform: `translate3d(
        ${xywh.value.x * (baseMargin.value + baseSize.value)}px,
        ${xywh.value.y * (baseMargin.value + baseSize.value)}px,
        0
    )`,
    width: `${xywh.value.w * baseSize.value + (xywh.value.w - 1) * baseMargin.value}px`,
    height: `${xywh.value.h * baseSize.value + (xywh.value.h - 1) * baseMargin.value}px`,
  }
})

const dragStyle = computed(() => {
  if (props.id !== draggingId.value)
    return
  if (!childXY.value?.length)
    return
  const [x, y] = childXY.value

  return {
    transform: `translate3d(${x}px, ${y}px,0)`,
    zIndex: 2,
    transition: 'none',
  }
})

const itemRef = ref()
</script>

<template>
  <div :id="`grid-item-${id}`" ref="itemRef" class="absolute rounded-lg transition-all"
    :class="editMode ? 'touch-none' : 'touch-auto'" :style="{ ...initStyle, ...dragStyle }">
    <slot />
  </div>
</template>
