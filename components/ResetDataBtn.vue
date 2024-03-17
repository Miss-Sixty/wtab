<script setup lang="ts">
import useAppStore from '@/stores/app'
const appStore = useAppStore()

const messageBoxVisible = ref(false)
const confirm = () => {
  appStore.resetData()
  notificationVisible.value = true
}

const show = () => {
  messageBoxVisible.value = true
}

const notificationVisible = ref(false)
</script>

<template>
  <WtMessageBox @confirm="confirm" v-model="messageBoxVisible" title="重置数据" message="您确定要重置您的数据吗？您的所有数据都将被清空！" />
  <slot :show="show">
    <WtButton v-bind="$attrs" @click="messageBoxVisible = true" />
  </slot>
  <WtNotification v-model="notificationVisible" title="重置成功"/>
</template>
