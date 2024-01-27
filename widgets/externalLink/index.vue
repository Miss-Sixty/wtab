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

const widgetData = computed(() => props.widget.widgetData || {})
function toUrl() {
  if (props.dragging) return
  if (props.type === 'del') return dialogSettingVisible.value = true
  const url = widgetData.value.host
  url && window.open(url)
}

const iconNameLength = computed(() => widgetData.value.iconName?.length || 0)
</script>

<template>
  <div :title="widgetData.name" flex-col rounded-lg bg-white :style="{
    backgroundColor: widgetData.iconType === 'text' ? widgetData.iconBgColor : '',
    color: widgetData.iconType === 'text' ? '#fff' : ''
  }" p1.5>
    <NuxtLink overflow-hidden rounded-lg cursor-pointer w-full h-full @click="toUrl">
      <button v-if="!widgetData.iconUrl && !widgetData.iconName" w-full h-full bg-transparent
        @click="dialogSettingVisible = true">
        <div m-auto class="h-2/5 w-2/5" i-solar-add-square-linear />
      </button>
      <img v-else-if="widgetData.iconType === 'online'" w-full h-full :src="widgetData.iconUrl" alt="">
      <div v-show="widgetData.iconType === 'text'" flex="~ items-center justify-center" w-full h-full>
        <span truncate :class="[
          iconNameLength === 1 ? 'text-xl' : '',
          iconNameLength < 4 ? 'text-base' : '',
          iconNameLength === 4 ? 'text-sm' : '',
          iconNameLength > 4 ? 'text-xs' : ''
        ]">{{ widgetData.iconName }}</span>
      </div>
    </NuxtLink>
    <SettingDialog v-model="dialogSettingVisible" :size="size" :widget="widget" />
  </div>
</template>
