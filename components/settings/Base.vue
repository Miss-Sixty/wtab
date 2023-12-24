<script setup>
import useAppStore from '@/stores/app'

const appStore = useAppStore()
const modelValue = defineModel()
</script>

<template>
  <WtabDialog v-model="modelValue" title="基础设置">
    <h4>头部设置</h4>
    <WtButton text="时间开关" @click="appStore.headerDate = !appStore.headerDate" />
    <WtButton text="头部透明开关" @click="appStore.headerConstant = !appStore.headerConstant" />
  </WtabDialog>
</template>
