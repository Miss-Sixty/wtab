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

const widthStyle = computed(() => `${props.colsNum * (props.baseSize + props.baseMargin) - props.baseMargin}px`)
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
  return `${(y + h) * (props.baseSize + props.baseMargin) - props.baseMargin}px`
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
</script>

<template>
  <ClientOnly>
    <div
      ref="gridRef" relative mx-auto transition-all :style="{
        width: widthStyle,
        height: heightStyle,
      }"
    >
      <GridItem
        v-show="dragging" :id="placeholderData?.id" :key="placeholderData?.id" bg-violet-50 opacity-35
        :placeholder="placeholderData"
      />
      <slot :dragging="dragging"/>
    </div>
  </ClientOnly>
</template>
