<script setup>
import { Navigation, Pagination } from 'swiper/modules'
import { nanoid } from 'nanoid/non-secure'
import widgetJson from '@/widgets'
import useDraggablea from '@/composables/useDraggable'
import useLayoutStore from '@/stores/layout'

const layoutStore = useLayoutStore()
const modules = [Pagination, Navigation]
const widgetList = shallowRef()
async function init() {
  const res = await widgetJson()
  widgetList.value = res
}

init()

const copyRef = ref()
let widgetData
let pointerDom
async function onStart() {
  await nextTick()
  const { offsetWidth, offsetHeight } = pointerDom
  const copyDom = pointerDom.cloneNode(true)
  copyDom.style.width = `${offsetWidth}px`
  copyDom.style.height = `${offsetHeight}px`
  copyRef.value.appendChild(copyDom)
}

const isIntersecting = ref(false)
function onMove(pos) {
  const { right, left, top, bottom } = layoutStore.gridBoundingClientRect
  const { x, y } = pos
  isIntersecting.value = !(x < left || x > right || y < top || y > bottom)
}
watch(isIntersecting, (val) => {
  const id = `${widgetData.component}-${nanoid()}`
  widgetData.widget.id = id
  val ? layoutStore.addWidget(widgetData) : layoutStore.delWidget(widgetData)
})

const { isDragging, style, start } = useDraggablea({
  onStart,
  onMove,
})

function pointerdown(e, widget, component, size) {
  // 向上查找，直到找到 id 为 widgets-container 的元素
  const widgetsContainerDom = e.target.closest('#widgets-container')
  widgetData = { widget, component, size }
  pointerDom = widgetsContainerDom
  start(widgetsContainerDom, e)
}
</script>

<template>
  <div w-sm overflow-y-auto grid grid-cols-1 gap-3 class="add-widgets">
    <div v-if="isDragging" ref="copyRef" :style="style" z-10 top-0 left-0 :class="{ fixed: isDragging }" />
    <div v-for="(list, i) in widgetList" :key="i" flex h-96 flex-col overflow-hidden rounded-lg class="bg-black/10">
      <Swiper w-full flex-1 navigation loop pagination :modules="modules">
        <SwiperSlide v-for="(data, size, j) in list.sizes" :key="j">
          <div flex items-center justify-center h-full>
            <WidgetsContainer
              id="widgets-container" type="add" :size="size" :widget="{ ...list.data, ...data }"
              :component="list.key" @pointerdown.stop="pointerdown($event, { ...list.data, ...data }, list.key, size)"
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
  </div>
</template>

<style lang="scss">
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
