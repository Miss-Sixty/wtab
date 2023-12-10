<script setup lang="ts">
import './styles/base.css'
import '@unocss/reset/tailwind.css'
import useLayoutStore from '@/stores/layout'

const layoutStore = useLayoutStore()
const contextMunuRef = ref()
function handleSettingIcon(ref: any) {
  contextMunuRef.value?.open({ ref })
}

const settingsBaseVisible = ref(false)
const aboutVisible = ref(false)
const addWidgetsVisible = ref(false)

onMounted(() => {
  useEventListener(document, 'contextmenu', (e) => {
    e.preventDefault()
    const { clientX, clientY } = e
    const virtualEl = {
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

    contextMunuRef.value?.open({ ref: virtualEl, placement: 'right-start', transformOrigin: '0% 0%' })
  })
})
</script>

<template>
  <WtabNav @handle-setting-icon="handleSettingIcon" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ContextMenu
    ref="contextMunuRef" @settings-base="settingsBaseVisible = true" @add-widgets="addWidgetsVisible = true"
    @edit-mode="layoutStore.editMode = true" @about="aboutVisible = true"
  />

  <SettingsBase v-model="settingsBaseVisible" />
  <AddWidgets v-model="addWidgetsVisible" />
  <SettingsAbout v-model="aboutVisible" />
</template>
