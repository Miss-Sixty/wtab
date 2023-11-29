<script setup>
import { register } from 'swiper/element/bundle'
import widgetJson from '@/widgets'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:modelValue'])
register()
const _modelValue = computed({
  get() {
    return props.modelValue
  },
  set(bl) {
    emit('update:modelValue', bl)
  },
})

const widgetList = shallowRef()
async function init() {
  const res = await widgetJson()
  widgetList.value = res
}

init()
</script>

<template>
  <WtabDialog v-model="_modelValue" title="添加小组件" :width="1024">
    <div class="grid grid-cols-1 gap-3 lg:grid-cols-2">
      <div v-for="(list, i) in widgetList" :key="i" class="flex h-96 flex-col overflow-hidden rounded-lg bg-base-3">
        <swiper-container
          :loop="true" :pagination="{
            clickable: true,
          }" class="w-full flex-1"
        >
          <swiper-slide v-for="(data, size, j) in list.sizes" :key="j" class="flex items-center justify-center">
            11  <!-- <WidgetsContainer type="add" :size="size" :widget="{ ...list.data, ...data }" :component="list.key" /> -->
          </swiper-slide>
        </swiper-container>

        <div class="footer h-24 p-4 leading-none">
          <p class="text-base font-bold">
            {{ list.name }}
          </p>
          <p class="line-clamp-2 text-sm text-slate-500">
            {{ list.text }}
          </p>
        </div>
      </div>
    </div>
  </WtabDialog>
</template>
