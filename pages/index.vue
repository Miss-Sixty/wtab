<script setup lang="ts">
import useLayoutStore from '@/stores/layout'

defineEmits(['widgetContextmenu'])
const layoutStore = useLayoutStore()
// const { layouts, baseMargin, baseSize, colsNum, editMode } = storeToRefs(layoutStore)

const gridRef = ref()

watch(() => layoutStore.editMode, async (val) => {
  await nextTick()
  const gridRect = gridRef.value?.getBoundingClientRect()
  layoutStore.gridBoundingClientRect = val ? gridRect : null
})
</script>

<template>
  <ClientOnly>
    <div id="grid" ref="gridRef" bg-yellow w-full h-full>
      222
    </div>
    <!-- <Grid v-model="layouts" :cols-num="colsNum" :base-size="baseSize" :base-margin="baseMargin" :edit-mode="editMode">
    <GridItem v-for="item in layouts" :id="item.id" :key="item.id">
      <WidgetsContainer
        :type="editMode ? 'del' : ''" :size="item.widgetSize" :widget="item"
        :component="item.component"
      />
    </GridItem>
  </Grid> -->
  </ClientOnly>
</template>
