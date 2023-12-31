<script setup lang="ts">
import { vConfetti } from '@neoconfetti/vue'
import useLayoutStore from '@/stores/layout'

const layoutStore = useLayoutStore()
const contextMunuRef = ref()
function handleSettingIcon(ref: any) {
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
</script>

<template>
  <div>
    <NuxtPage />
    <div v-if="confettiVisible" v-confetti="{ stageHeight: 1000 }" class="inset-x-1/2" top-0 fixed />
    <Header @handle-setting-icon="handleSettingIcon" @confetti="onConfetti" />
    <LayoutMain @widget-contextmenu="widgetContextmenu" />
    <ContextMenu
      ref="contextMunuRef" @settings-base="onSettingsBase" @add-widgets="addWidgetsVisible = true"
      @edit-mode="layoutStore.editMode = true" @about="aboutVisible = true" @del-widgets="layoutStore.delWidget(widgetData)"
      @closed="widgetData = null" @roadmap="roadmapVisible = true"
    />

    <AddWidgets v-model="addWidgetsVisible" />
    <SettingsAbout v-model="aboutVisible" />
    <Roadmap v-model="roadmapVisible" />
  </div>
</template>
