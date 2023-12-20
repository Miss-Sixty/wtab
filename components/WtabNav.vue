<script setup lang="ts">
import useLayoutStore from '@/stores/layout'

defineEmits(['handleSettingIcon', 'confetti'])
const layoutStore = useLayoutStore()
const settingIconRef = ref()
const addPageVisible = ref(false)
// const { pageMenu } = storeToRefs(layoutStore)
</script>

<template>
  <nav
    m1 rounded-lg z-1 px2 py-1 flex items-center gap-1 hover="opacity-100 backdrop-blur" opacity-10
    :class="{ 'opacity-100': layoutStore.editMode }"
    class="transition-opacity transition-background-color"
  >
    <!-- <NuxtLink v-for="(item, i) in pageMenu" :key="i" :to="item.to" exact-active-class="text-indigo-500">
      <WtIcon :icon="item.icon">
        {{ item.text }}
      </WtIcon>
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
    </Transition> -->

    <div flex-auto />
    <Transition type="animation" enter-active-class="animate-fade-in" leave-active-class="animate-fade-out">
      <div v-show="layoutStore.editMode" flex gap-1 animate-duration-150ms>
        <WtButton round plain text="完成" @click="layoutStore.editMode = false" />
      </div>
    </Transition>

    <HeaderClock />
    <WtIcon ref="settingIconRef" icon="i-solar-confetti-bold-duotone" @click="$emit('confetti')" />
    <WtIcon ref="settingIconRef" icon="i-solar-settings-bold" @click="$emit('handleSettingIcon', settingIconRef)" />

    <AddPage v-model="addPageVisible" title="添加页面" />
  </nav>
</template>
