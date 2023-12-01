<script setup>
import { Pagination } from 'swiper/modules'
import widgetJson from '@/widgets'

const widgetList = shallowRef()
async function init() {
  const res = await widgetJson()
  widgetList.value = res
}

init()
</script>

<template>
  <WtabDialog title="添加小组件" :width="1024">
    <div grid grid-cols-1 gap-3 lg:grid-cols-2>
      <div v-for="(list, i) in widgetList" :key="i" flex h-96 flex-col overflow-hidden rounded-lg class="bg-black/10">
        <Swiper w-full flex-1 :pagination="true" :modules="[Pagination]" :loop="true">
          <SwiperSlide v-for="(data, size, j) in list.sizes" :key="j" flex items-center justify-center>
            <WidgetsContainer type="add" :size="size" :widget="{ ...list.data, ...data }" :component="list.key" />
          </SwiperSlide>
        </Swiper>

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
  </WtabDialog>
</template>
