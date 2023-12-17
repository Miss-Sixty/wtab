<script setup lang="ts">
import useLayoutStore from '@/stores/layout'

defineEmits(['handleSettingIcon'])
const layoutStore = useLayoutStore()
const settingIconRef = ref()
const addPageVisible = ref(false)
</script>

<template>
  <nav px2 py-1 flex items-center gap-1>
    <NuxtLink v-for="(item, i) in layoutStore.pageMenu" :key="i" :to="item.to" exact-active-class="text-indigo-500">
      <WtIcon :icon="item.icon" />
    </NuxtLink>

    <Transition
      type="animation" enter-active-class="animate-fade-in"
      leave-active-class="animate-fade-out"
    >
      <WtIcon
        v-show="layoutStore.editMode"
        animate-duration-150ms
        icon="i-solar-add-circle-bold"
        @click="addPageVisible = true"
      />
    </Transition>

    <div flex-auto />
    <Transition
      type="animation" enter-active-class="animate-fade-in"
      leave-active-class="animate-fade-out"
    >
      <div v-show="layoutStore.editMode" flex gap-1 animate-duration-150ms>
        <WtButton round plain text="取消" @click="layoutStore.editMode = false" />
        <WtButton round plain text="保存" @click="layoutStore.editMode = false" />
      </div>
    </Transition>
    <WtIcon ref="settingIconRef" icon="i-solar-settings-bold" @click="$emit('handleSettingIcon', settingIconRef)" />
    <AddPage v-model="addPageVisible" title="添加页面" />
  </nav>
</template>
