<script setup lang="ts">
import useLayoutStore from '@/stores/layout'

defineEmits(['widgetContextmenu'])
const layoutStore = useLayoutStore()
const { layouts, baseMargin, baseSize, colsNum, editMode } = storeToRefs(layoutStore)
</script>

<template>
  <Grid v-model="layouts" :cols-num="colsNum" :base-size="baseSize" :base-margin="baseMargin" :edit-mode="editMode">
    <GridItem v-for="item in layouts" :id="item.id" :key="item.id">
      <WidgetsContainer
        :type="editMode ? 'del' : ''" :size="item.widgetSize" :widget="item"
        :component="item.component"
      />
    </GridItem>
  </Grid>
</template>
