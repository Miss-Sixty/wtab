<script setup lang="ts">
import useLayoutStore from '@/stores/layout'

defineEmits(['widgetContextmenu'])
const layoutStore = useLayoutStore()
const { layouts, baseMargin, baseSize, editMode, colsNum } = storeToRefs(layoutStore)
</script>

<template>
  <main overflow-hidden flex-1 h-full justify-center bg-yellow p6>
    <Grid v-model="layouts" :cols-num="colsNum" :base-size="baseSize" :base-margin="baseMargin" :edit-mode="editMode"
      v-slot="{ dragging }">
      <GridItem v-for="item in layouts" :id="item.id" :key="item.id"
        @contextmenu.prevent.stop="$emit('widgetContextmenu', { e: $event, widget: item })">
        <WidgetsContainer :type="editMode ? 'del' : ''" :singleRow="item.widgetData.singleRow" :size="item.widgetSize"
          :widget="item" :component="item.component" :dragging="dragging" :shadow="item.shadow" />
      </GridItem>
    </Grid>
  </main>
</template>
