<script setup>
import { Navigation, Pagination } from 'swiper/modules'
import widgetJson from '@/widgets'

const modules = [Pagination, Navigation]
const widgetList = shallowRef()
async function init() {
  const res = await widgetJson()
  widgetList.value = res
}

init()
</script>

<template>
  <WtabDialog title="添加小组件" :width="1024">
    <div v-for="(list, i) in widgetList" :key="i" flex h-96 flex-col overflow-hidden rounded-lg class="bg-black/10">
      <Swiper w-full flex-1 navigation loop pagination :modules="modules">
        <SwiperSlide v-for="(data, size, j) in list.sizes" :key="j">
          <div flex items-center justify-center h-full>
            <WidgetsContainer
              id="widgets-container" type="add" :size="size" :widget="{ ...list.data, ...data }"
              :component="list.key"
            />
          </div>
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
  </WtabDialog>
</template>

<style>
.swiper-button-prev,
.swiper-button-next {
  width: 28px;
  border-radius: 50%;
  background: #B1B9C0;
  height: 28px;
}

.swiper-button-prev:hover,
.swiper-button-next:hover {
  background: #9DA4AA;
}

:root {
  --swiper-navigation-size: 12px;
  --swiper-navigation-top-offset: 50%;
  --swiper-navigation-sides-offset: 10px;
  --swiper-navigation-color: #fff;
}
</style>
