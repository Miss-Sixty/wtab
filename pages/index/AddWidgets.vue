<script setup>
import widgetJson from '@/widgets'

const widgetList = shallowRef()
async function init() {
  const res = await widgetJson()
  widgetList.value = res
}

init()
</script>

<template>
  <DialogPage title="添加小组件" :width="1024">
    <div class="grid grid-cols-1 gap-3 lg:grid-cols-2">
      <div v-for="(list, i) in widgetList" :key="i" flex h-96 flex-col overflow-hidden rounded-lg class="bg-black/10">
        <div w-full flex-1 navigation loop pagination>
          <div v-for="(data, j) in list.sizes" :key="j">
            <div flex items-center justify-center h-full>
              <WidgetsContainer id="widgets-container" type="add" :size="data.size" :shadow="list.shadow"
                :singleRow="data.singleRow" :widget="{ ...list.data, ...data }" :component="list.key" />
            </div>
          </div>
        </div>
        <div h-24 p-4 leading-none>
          <p text-base font-bold>
            {{ list.name }}
          </p>
          <p line-clamp-2 text-sm text-gray-500>
            {{ list.text }}
          </p>
        </div>
      </div>
    </div>
  </DialogPage>
</template>
