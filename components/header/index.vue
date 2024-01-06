<script setup lang="ts">
import useLayoutStore from '@/stores/layout'
import useAppStore from '@/stores/app'

defineEmits(['handleSettingIcon', 'confetti', 'handleColorPicker', 'handleCalendarIcon'])
const appStore = useAppStore()
const layoutStore = useLayoutStore()
const settingIconRef = ref()
const colorPickerRef = ref()
const addPageVisible = ref(false)
// const { pageMenu } = storeToRefs(layoutStore)
const opacityClass = computed(() => ({
  'opacity-100': appStore.headerConstant || layoutStore.editMode,
  'opacity-10': true,
  'hover:opacity-100': true,
}))
</script>

<template>
  <nav
    rounded-lg z-1
    p="x2 y1.5" flex items-center gap-1.5
  >
    <!-- <NuxtLink v-for="(item, i) in pageMenu" :key="i" :to="item.to" exact-active-class="text-violet-500">
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
    <HeaderPremium />
    <Transition type="animation" enter-active-class="animate-fade-in" leave-active-class="animate-fade-out">
      <div v-show="layoutStore.editMode" flex gap-1 animate-duration-150ms>
        <WtButton round text="完成" @click="layoutStore.editMode = false" />
      </div>
    </Transition>
    <HeaderClock v-if="appStore.headerDate" :class="opacityClass" />
    <NuxtLink v-slot="{ navigate }" to="/calendar" custom>
      <WtIcon icon="i-solar-calendar-bold-duotone" :class="opacityClass" @click="navigate">
        节日
      </WtIcon>
    </NuxtLink>
    <WtIcon ref="colorPickerRef" :class="opacityClass" color-primary icon="i-solar-palette-round-bold-duotone" @click="$emit('handleColorPicker', colorPickerRef)" />
    <WtIcon :class="opacityClass" icon="i-solar-confetti-bold-duotone" @click="$emit('confetti')" />
    <WtIcon ref="settingIconRef" :class="opacityClass" icon="i-solar-settings-bold-duotone" @click="$emit('handleSettingIcon', settingIconRef)" />
    <!-- <AddPage v-model="addPageVisible" title="添加页面" /> -->
  </nav>
</template>
