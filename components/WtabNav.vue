<script setup lang="ts">
import useLayoutStore from '@/stores/layout'

defineEmits(['handleSettingIcon'])

const layoutStore = useLayoutStore()

interface RootObject {
  text: string
  to: string
  icon: string
}

const list: RootObject[] = [
  { text: '首页', to: '/', icon: 'i-solar-home-bold' },
  { text: '面板', to: '/roadmap', icon: 'i-solar-clipboard-check-bold' },
]

const settingIconRef = ref()
</script>

<template>
  <nav px2 py-1 flex items-center gap-1>
    <NuxtLink v-for="(item, i) in list" :key="i" :to="item.to" exact-active-class="bg-base" icon>
      <div :class="item.icon" text-lg />
    </NuxtLink>
    <div flex-auto />
    <div v-show="layoutStore.editMode" gap-1>
      <WtButton size="sm" round plain text="取消" @click="layoutStore.editMode = false" />
      <WtButton size="sm" round plain text="保存" @click="layoutStore.editMode = false" />
    </div>
    <WtIcon ref="settingIconRef" size="sm" icon="i-solar-settings-bold" @click="$emit('handleSettingIcon', settingIconRef)" />
  </nav>
</template>
