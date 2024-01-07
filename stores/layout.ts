import { defineStore } from 'pinia'
import { useBreakpoints } from '@vueuse/core'
import dayjs from 'dayjs'
import { nanoid } from 'nanoid/non-secure'
import settings from '@/config/settings'

const { layout } = settings
function findPosition([widgetW, widgetH]: [any, number], layouts: any, colsNum: number) {
  if (!widgetW)
    widgetW = colsNum
  for (let y = 0; ; y++) {
    for (let x = 0; x <= colsNum - widgetW; x++) {
      let canPlace = true
      for (let i = 0; i < layouts.length; i++) {
        const rect = layouts[i]
        const [rectX, rectY] = rect.position[colsNum]
        let [rectW, rectH] = rect.widgetSize.split(':').map(Number)
        if (!rectW)
          rectW = colsNum
        if (
          x <= rectX + (rectW || widgetW) - 1
          && x + widgetW - 1 >= rectX
          && y <= rectY + rectH - 1
          && y + widgetH - 1 >= rectY
        ) {
          canPlace = false
          break
        }
      }
      if (canPlace)
        return [x, y]
    }
  }
}

export default defineStore('layoutStore', () => {
  const baseSize = ref(layout.baseSize) // 图标大小
  const baseMargin = ref(layout.baseMargin) // 图标间距
  const layouts: any = ref(layout.defaultLayout) // 布局组件数据
  const breakpoints = ref(layout.breakpoints)// 布局宽度数据
  const breakpointsData = useBreakpoints(breakpoints.value)
  const current: ComputedRef<string[]> = breakpointsData.current() // 当前布局断点
  const editMode = ref(false) // 编辑模式
  const pageMenu = ref([
    { text: '首页', to: '/', icon: 'i-solar-home-bold' },
  ])

  // 一共多少列
  const colsNum: ComputedRef<number> = computed(() => {
    const [firstData] = Object.keys(breakpoints.value)
    const colsNum = current.value.at(-1) || firstData
    return Number(colsNum)
  })

  const addWidget = (widget: any, component: 'string', size: string) => {
    const position: any = {} // 布局位置
    const [w, h] = size.split(':').map(Number)

    for (const colsNum in breakpoints.value) {
      // 首次添加
      if (layouts.value.length === 0) {
        position[colsNum] = [0, 0]
        continue
      }

      const [x, y] = findPosition([w, h], layouts.value, +colsNum)
      position[colsNum] = [x, y]
    }
    const id = `${component}-${nanoid()}`
    layouts.value.push(JSON.parse(JSON.stringify({ id, widgetData: widget, widgetSize: size, position, update: dayjs().valueOf(), component })))
  }

  const delWidget = (widget: any) => {
    const index = layouts.value.findIndex((item: any) => item.id === widget.id)
    layouts.value.splice(index, 1)
  }

  const addPage = (data: any) => {
    pageMenu.value.push(data)
  }

  function $reset() {
    baseSize.value = layout.baseSize
    baseMargin.value = layout.baseMargin
    layouts.value = layout.defaultLayout
    breakpoints.value = layout.breakpoints
    editMode.value = false
    pageMenu.value = [
      { text: '首页', to: '/', icon: 'i-solar-home-bold' },
    ]
  }

  return {
    baseSize,
    baseMargin,
    addWidget,
    delWidget,
    editMode,
    breakpoints,
    colsNum,
    layouts,
    pageMenu,
    addPage,
    $reset,
  }
}, { persist: { storage: persistedState.localStorage } })
