<script setup lang="ts">
import type { UseWebNotificationOptions } from '@vueuse/core'
import useLayoutStore from '@/stores/layout'
import useAppStore from '@/stores/app'

defineEmits(['handleSettingIcon', 'confetti', 'handleColorPicker', 'handleCalendarIcon'])
const appStore = useAppStore()
const layoutStore = useLayoutStore()
const settingIconRef = ref()
const opacityClass = computed(() => ([
  appStore.headerConstant || layoutStore.editMode ? 'opacity-100' : '',
  'opacity-10',
  'hover:opacity-100',
]))

const options: UseWebNotificationOptions = {
  title: '您已开启浏览器通知。',
  requestPermissions: false,
}
const {
  isSupported,
  ensurePermissions,
  permissionGranted,
  show,
} = useWebNotification(options)

async function ensurePermissionsa() {
  const bl = await ensurePermissions()
  if (bl)
    show()
  else
    alert('您已禁用通知，请在浏览器开启。')
}
</script>

<template>
  <nav rounded-lg z-1 p="x2 y1.5" flex items-center gap-1.5>
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
    <WtButton type="primary" v-show="layoutStore.editMode" size="sm" round text="完成" @click="layoutStore.editMode = false" />
    <!-- <HeaderPremium /> -->
    <!-- <ClientOnly>
      <HeaderAddPWA :class="opacityClass" />
      <WtIcon v-if="isSupported && !permissionGranted" :class="opacityClass" icon="i-solar-bell-bing-bold-duotone"
        @click="ensurePermissionsa" />
    </ClientOnly> -->
    <!-- <WtIcon :class="opacityClass" icon="i-solar-confetti-bold-duotone" @click="$emit('confetti')" /> -->
    <WtIcon ref="settingIconRef" :class="opacityClass" icon="i-solar-settings-bold"
      @click="$emit('handleSettingIcon', settingIconRef)" />
  </nav>
</template>
