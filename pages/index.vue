<script setup lang="ts">
import { vConfetti } from '@neoconfetti/vue'
import useLayoutStore from '@/stores/layout'

const layoutStore = useLayoutStore()
const contextMunuRef = ref()
function handleHeaderIcon(ref: any) {
  contextMunuRef.value?.open({ type: 'settingsBase', ref })
}

const aboutVisible = ref(false)
const addWidgetsVisible = ref(false)
const roadmapVisible = ref(false)

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
  <div overflow-hidden class="dark:bg-#121212">
    <!-- <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" data-v-6728c029=""><defs data-v-6728c029=""><linearGradient id="grad" x1="0" x2="0" y1="0" y2="1" data-v-6728c029=""><stop offset="0%" stop-color="rgba(236, 72, 153, .05)" data-v-6728c029="" /><stop offset="20%" stop-color="rgba(217, 70, 239, .3)" data-v-6728c029="" /><stop offset="70%" stop-color="rgba(139, 92, 246, .25)" data-v-6728c029="" /><stop offset="100%" stop-color="rgba(59, 130, 246, .05)" data-v-6728c029="" /></linearGradient><pattern id="smallGrid" width="16" height="16" patternUnits="userSpaceOnUse" data-v-6728c029=""><path d="M 16 0 L 0 0 0 16" fill="none" stroke="gray" stroke-width="0.5" data-v-6728c029="" /></pattern><pattern id="grid" width="160" height="160" patternUnits="userSpaceOnUse" data-v-6728c029=""><rect width="160" height="160" fill="url(#smallGrid)" data-v-6728c029="" /><path d="M 160 0 L 0 0 0 160" fill="none" stroke="gray" stroke-width="1" data-v-6728c029="" /></pattern><mask id="mask" data-v-6728c029=""><rect width="100%" height="100%" fill="url(#grid)" data-v-6728c029="" /></mask></defs><rect width="100%" height="100%" fill="url(#grad)" mask="url(#mask)" data-v-6728c029="" /></svg> -->

    <NuxtPage />
    <div v-if="confettiVisible" v-confetti="{ stageHeight: 1000 }" class="inset-x-1/2" top-0 fixed />
    <Header
      @handle-setting-icon="handleHeaderIcon" @confetti="onConfetti"
      @handle-color-picker="handleColorPicker"
    />
    <LayoutMain @widget-contextmenu="widgetContextmenu" />
    <ContextMenu
      ref="contextMunuRef" @settings-base="onSettingsBase" @add-widgets="addWidgetsVisible = true"
      @edit-mode="layoutStore.editMode = true" @about="aboutVisible = true" @del-widgets="layoutStore.delWidget(widgetData)"
      @closed="contextMenuClosed" @roadmap="roadmapVisible = true"
    >
      <ColorPicker v-if="themeColorPickerVisible" />
    </ContextMenu>

    <AddWidgets v-model="addWidgetsVisible" />
    <SettingsAbout v-model="aboutVisible" />
    <Roadmap v-model="roadmapVisible" />
  </div>
</template>
