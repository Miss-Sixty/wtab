<script setup lang="ts">
import DialogSetting from './dialog/setting.vue'

defineProps({
  widget: {
    type: Object,
    default: () => ({}),
  },
  type: { // 删除-del 新增-add ''-展示
    type: String,
    default: '',
  },
})

const dialogSettingVisible = ref(false)
</script>

<template>
  <div>
    11
    <button @click="dialogSettingVisible = true">
      click
    </button>
    <DialogSetting v-model="dialogSettingVisible" />
  </div>
</template>
