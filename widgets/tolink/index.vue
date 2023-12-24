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
})

const router = useRouter()
function tolink() {
  router.push('/settings')
}
</script>

<template>
  <div flex items-center justify-between flex-col rounded-lg :class="[type === 'add' ? 'bg-white' : 'bg-red']" @click="tolink">
    22
  </div>
</template>
