<script setup lang="ts">
import SettingDialog from './components/SettingDialog.vue'

const props = defineProps({
  widget: {
    type: Object,
    default: () => ({}),
  },
  type: { // 删除-del 新增-add ''-展示
    type: String,
    default: '',
  },
  size: {
    type: String,
    required: true,
  },
  dragging: {
    type: Boolean,
    default: false
  }
})

const dialogSettingVisible = ref(false)

function toUrl() {
  if (props.dragging) return
  const url = props.widget.widgetData?.url
  url && window.open(url)
}
</script>

<template>
  <div :title="widget.widgetData?.name" flex items-center justify-between flex-col rounded-lg
    :class="[type === 'add' ? 'bg-white' : '']">
    <div overflow-hidden rounded-lg cursor-pointer w-full h-full @click="toUrl">
      <button v-if="!widget.widgetData?.iconUrl" w-full h-full bg-white @click="dialogSettingVisible = true">
        <div m-auto class="h-2/5 w-2/5" i-solar-add-square-linear />
      </button>
      <img v-else w-full h-full :src="widget.widgetData?.iconUrl" alt="">
    </div>
    <SettingDialog v-model="dialogSettingVisible" :size="size" :widget="widget" />
  </div>
</template>
