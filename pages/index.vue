<script setup lang="ts">
import confetti from 'canvas-confetti'
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

async function onConfetti() {
  const duration = 2 * 1000
  const end = Date.now() + duration;

  (function frame() {
    // launch a few confetti from the left edge
    confetti({
      particleCount: 7,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    })
    // and launch a few from the right edge
    confetti({
      particleCount: 7,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    })

    // keep going until we are out of time
    if (Date.now() < end)
      requestAnimationFrame(frame)
  }())
}

const router = useRouter()
function onSettingsBase() {
  router.push('/settings')
}
</script>

<template>
  <div overflow-hidden select-none touch-none class="pb-[var(safe-area-inset-bottom)] pt-[var(safe-area-inset-top)] ">
    <ClientOnly>
      <LayoutHomeTetris />
    </ClientOnly>
    <NuxtPage />
    <Header @handle-setting-icon="handleHeaderIcon" @confetti="onConfetti" />
    <LayoutMain @widget-contextmenu="widgetContextmenu" />
    <ContextMenu ref="contextMunuRef" @settings-base="onSettingsBase" @edit-mode="layoutStore.editMode = true"
      @del-widgets="layoutStore.delWidget(widgetData)">
    </ContextMenu>
  </div>
</template>
