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

const AsyncComp = defineAsyncComponent(() => import(`~/widgets/${props.component}/index.vue`))
</script>

<template>
  <div relative select-none :class="scale" :style="{ ...widgetWH }">
    <template v-if="type">
      <div
        :class="[iconScale, type === 'add' ? 'i-solar-add-circle-bold' : 'i-solar-minus-circle-bold']" absolute left-0
        top-0 scale-100 cursor-pointer rounded-full transition text-2xl class="-translate-x-1/4 -translate-y-1/4 "
        @click="handleClick"
      />
    </template>
    <component
      :is="AsyncComp" overflow-hidden rounded-lg bg-white :style="widgetWH" :type="type"
      :widget="widget"
    />
  </div>
</template>
