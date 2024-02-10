<script setup lang="ts">
const route: any = useRoute()

const widgetList = shallowRef()
async function init() {
  const widgets = await import('@/widgets')
  widgetList.value = await widgets.default()
}
init()

// 根据路由参数获取对应的组件数据
const widgetData = computed(() => {
  if(!widgetList.value) return {}
  const id = route.params.id
  return widgetList.value.find((item: any) => item.key === id)
})
</script>

<template>
  <div grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py4 gap10 sm:gap3>
    <div v-for="(data, i) in widgetData.sizes" :key="i">
      <div flex items-center justify-center h-full>
      <WidgetsContainer id="widgets-container" type="add" :size="data.size" :shadow="widgetData.shadow"
        :singleRow="data.singleRow" :widget="{ ...widgetData.data, ...data }" :component="widgetData.key" />
    </div>
  </div>
  </div>
</template>
