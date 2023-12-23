<script setup lang="ts">
import useLayoutStore from '@/stores/layout'

defineEmits(['widgetContextmenu'])
const layoutStore = useLayoutStore()
const { layouts, baseMargin, baseSize, editMode, colsNum } = storeToRefs(layoutStore)
</script>

<template>
  <ClientOnly>
    <Grid v-model="layouts" :cols-num="colsNum" :base-size="baseSize" :base-margin="baseMargin" :edit-mode="editMode">
      <GridItem
        v-for="item in layouts" :id="item.id" :key="item.id"
        @contextmenu.prevent.stop="$emit('widgetContextmenu', { e: $event, widget: item })"
      >
        <WidgetsContainer
          :type="editMode ? 'del' : ''" :size="item.widgetSize" :widget="item"
          :component="item.component"
        />
      </GridItem>
    </Grid>
  </ClientOnly>
</template>
