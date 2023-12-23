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
  const url = props.widget.widgetData?.url
  url && window.open(url)
}
</script>

<template>
  <div flex items-center justify-between flex-col rounded-lg :class="[type === 'add' ? 'bg-white' : '']">
    <div overflow-hidden rounded-lg cursor-pointer p1 :class="[type === 'add' ? 'w-full h-full' : 'w-58px h-58px border']" @click="toUrl">
      <button v-if="!widget.widgetData?.iconUrl" w-full h-full bg-white @click="dialogSettingVisible = true">
        <div m-auto class="h-2/5 w-2/5" i-solar-add-square-linear />
      </button>
      <img v-else w-full h-full :src="widget.widgetData?.iconUrl" alt="">
    </div>
    <p text-center text-xs font-medium leading-none mt-1 truncate w-full>
      {{ widget.widgetData?.name }}
    </p>

    <DialogSetting v-model="dialogSettingVisible" :size="size" :widget="widget" />
  </div>
</template>
