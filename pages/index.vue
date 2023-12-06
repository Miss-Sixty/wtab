<script setup lang="ts">
import useLayoutStore from '@/stores/layout'

defineEmits(['widgetContextmenu'])
const layoutStore = useLayoutStore()
const { layouts, baseMargin, baseSize, editMode } = storeToRefs(layoutStore)
</script>

<template>
  <ClientOnly>
    <Grid v-model="layouts" :base-size="baseSize" :base-margin="baseMargin" :edit-mode="editMode">
      <GridItem v-for="item in layouts" :id="item.id" :key="item.id">
        <WidgetsContainer
          :type="editMode ? 'del' : ''" :size="item.widgetSize" :widget="item"
          :component="item.component"
        />
      </GridItem>
    </Grid>
  </ClientOnly>
</template>
