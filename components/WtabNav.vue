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
    <div v-show="layoutStore.editMode" flex gap-2>
      <button
        border py2 px4 rounded-md text-black text-sm leading-none
        class="hover:bg-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        @click="layoutStore.editMode = false"
      >
        取消
      </button>
      <button
        bg-violet-500 py2 px4 rounded-md text-white text-sm leading-none
        class="hover:bg-violet/100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      >
        保存
      </button>
    </div>
    <button ref="settingIconRef" icon @click="$emit('handleSettingIcon', settingIconRef)">
      <div text-lg i-solar-settings-bold />
    </button>
  </nav>
</template>
