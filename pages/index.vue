<script setup lang="ts">
import { vConfetti } from '@neoconfetti/vue'
import useLayoutStore from '@/stores/layout'

const layoutStore = useLayoutStore()
const contextMunuRef = ref()
function handleHeaderIcon(ref: any) {
  contextMunuRef.value?.open({ type: 'settingsBase', ref })
}

function getBoundingClientRect({ clientX, clientY }: any) {
  return {
    getBoundingClientRect() {
      return {
        width: 0,
        height: 0,
        x: clientX,
        y: clientY,
        top: clientY,
        left: clientX,
        right: clientX,
        bottom: clientY,
      }
    },
  }
}

onMounted(() => {
  useEventListener(document, 'contextmenu', (e) => {
    e.preventDefault()
    const virtualEl = getBoundingClientRect(e)
    contextMunuRef.value?.open({ ref: virtualEl })
  })
})

// 存储右键点击的 widget 数据
const widgetData = ref()
function widgetContextmenu({ e, widget }: any) {
  const virtualEl = getBoundingClientRect(e)
  contextMunuRef.value?.open({ ref: virtualEl, type: 'widget' })
  widgetData.value = widget
}

const confettiVisible = ref(false)
async function onConfetti() {
  confettiVisible.value = false
  await nextTick()
  confettiVisible.value = true
}

const router = useRouter()
function onSettingsBase() {
  router.push('/settings')
}

const themeColorPickerVisible = ref(false)
function handleColorPicker(ref: Ref) {
  themeColorPickerVisible.value = true
  handleHeaderIcon(ref)
}

function contextMenuClosed() {
  widgetData.value = null
  if (themeColorPickerVisible.value) {
    setTimeout(() => {
      themeColorPickerVisible.value = false
    }, 150)
  }
}
</script>

<template>
  <div overflow-hidden select-none touch-none class="pb-[var(safe-area-inset-left)]">
    <ClientOnly>
      <LayoutHomeTetris />
    </ClientOnly>
    <NuxtPage />
    <div v-if="confettiVisible" v-confetti="{ stageHeight: 1000 }" class="inset-x-1/2" top-0 fixed />
    <Header
      @handle-setting-icon="handleHeaderIcon" @confetti="onConfetti"
      @handle-color-picker="handleColorPicker"
    />
    <LayoutMain @widget-contextmenu="widgetContextmenu" />
    <ContextMenu
      ref="contextMunuRef" @settings-base="onSettingsBase"
      @edit-mode="layoutStore.editMode = true" @del-widgets="layoutStore.delWidget(widgetData)"
      @closed="contextMenuClosed"
    >
      <ColorPicker v-if="themeColorPickerVisible" />
    </ContextMenu>
  </div>
</template>
