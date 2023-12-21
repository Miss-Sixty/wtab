<script setup lang="ts">
import DialogSetting from './dialog/setting.vue'

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
})

const dialogSettingVisible = ref(false)

function toUrl() {
  const src = props.widget.widgetData?.src
  src && window.open(src)
}
</script>

<template>
  <div @click="toUrl">
    <button v-if="!widget.widgetData?.src" w-full h-full flex items-center justify-center bg-transparent @click="dialogSettingVisible = true">
      <div class="h-2/5 w-2/5" i-solar-add-square-linear />
    </button>

    <DialogSetting v-model="dialogSettingVisible" :size="size" :widget="widget" />
  </div>
</template>
