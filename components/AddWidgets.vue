<script setup>
import { Navigation, Pagination } from 'swiper/modules'
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
let pointerDom
async function onStart() {
  await nextTick()
  const { offsetWidth, offsetHeight } = pointerDom
  const copyDom = pointerDom.cloneNode(true)
  copyDom.style.width = `${offsetWidth}px`
  copyDom.style.height = `${offsetHeight}px`
  copyRef.value.appendChild(copyDom)
}

function onMove(pos) {
  const { right, left, top, bottom } = layoutStore.gridBoundingClientRect
  const { x, y } = pos
  const isIntersecting = !(x < left || x > right || y < top || y > bottom)
  isIntersecting ? layoutStore.addWidget(111) : layoutStore.delWidget(111)
  // console.log(11, isIntersecting)
}

let saveOnStart
const { isDragging, style } = useDraggablea({
  onStart,
  onMove,
  onBeforeStart: start => saveOnStart = start,
})

function pointerdown(e) {
  // 向上查找，直到找到 id 为 widgets-container 的元素
  const widgetsContainerDom = e.target.closest('#widgets-container')
  pointerDom = widgetsContainerDom
  saveOnStart(widgetsContainerDom, e)
}
</script>

<template>
  <div w-sm overflow-y-auto grid grid-cols-1 gap-3>
    <div v-if="isDragging" ref="copyRef" :style="style" z-10 top-0 left-0 :class="{ fixed: isDragging }" />
    <div v-for="(list, i) in widgetList" :key="i" flex h-96 flex-col overflow-hidden rounded-lg class="bg-black/10">
      <Swiper w-full flex-1 navigation loop pagination :modules="modules">
        <SwiperSlide v-for="(data, size, j) in list.sizes" :key="j" flex items-center justify-center>
          <WidgetsContainer
            id="widgets-container" type="add" :size="size" :widget="{ ...list.data, ...data }"
            :component="list.key" @pointerdown.stop="pointerdown"
          />
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
