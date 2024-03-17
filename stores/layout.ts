import { defineStore } from 'pinia'
import { useBreakpoints } from '@vueuse/core'
import dayjs from 'dayjs'
import { nanoid } from 'nanoid/non-secure'
import settings from '@/config/settings'

const { layout } = settings
function findPosition(widget: any, layouts: any, colsNum: number) {
  let maxX = 0
  let maxY = 0
  let itemWH
  layouts.forEach((item: any) => {
    const { position, widgetData } = item
    const { size, singleRow } = widgetData
    let [x, y] = position[colsNum]
    itemWH = size.split(':').map(Number)
    if (singleRow) itemWH[0] = colsNum
    if (y > maxY) maxY = y
    if (x > maxX) maxX = x

    const widgetWH = size.split(':').map(Number)
    if (widget.singleRow) widgetWH[0] = colsNum

    if (maxX + itemWH[0] > colsNum || singleRow || maxX + itemWH[0] + widgetWH[0] > colsNum) {
      maxX = 0
      maxY = maxY + itemWH[1]
    } else {
      maxX = maxX + itemWH[0]
      maxY = maxY
    }

  })
  return [maxX, maxY]
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

  const addWidget = (widget: any, component: 'string', size: string, shadow: boolean) => {
    const position: any = {} // 布局位置

    for (const colsNum in breakpoints.value) {
      // 首次添加
      if (layouts.value.length === 0) {
        position[colsNum] = [0, 0]
        continue
      }
      const [x, y] = findPosition(widget, layouts.value, +colsNum)
      position[colsNum] = [x, y]
    }
    const id = `${component}-${nanoid()}`
    layouts.value.push(JSON.parse(JSON.stringify({ id, widgetData: widget, shadow, widgetSize: size, position, update: dayjs().valueOf(), component })))
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
})
