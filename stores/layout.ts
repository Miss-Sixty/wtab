import { defineStore } from 'pinia'
import { useBreakpoints } from '@vueuse/core'
import { nanoid } from 'nanoid/non-secure'
import settings from '@/config/settings'

const dayjs = useDayjs()

function findPosition([widgetW, widgetH]: [number, number], layouts: any, colsNum: number) {
  for (let y = 0; ; y++) {
    for (let x = 0; x <= colsNum - widgetW; x++) {
      let canPlace = true
      for (let i = 0; i < layouts.length; i++) {
        const rect = layouts[i]
        const [rectX, rectY] = rect.position[colsNum]
        const [rectW, rectH] = rect.widgetSize.split(':').map(Number)
        if (
          x <= rectX + rectW - 1
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

export default defineStore('storeLayout', () => {
  const baseSize = ref(settings.baseSize) // 图标大小
  const baseMargin = ref(settings.baseMargin) // 图标间距
  const layouts: any = ref(settings.defaultLayout) // 布局组件数据
  // const breakpoints = ref(settings.breakpoints)// 布局宽度数据
  // const breakpointsData = useBreakpoints(breakpoints.value)
  // const current: ComputedRef<string[]> = breakpointsData.current() // 当前布局断点
  const editMode = ref(false) // 编辑模式
  const deviceType = ref('Desktop')
  const rowsNum = ref(0)
  const gridBoundingClientRect = ref(null)

  // 一共多少列
  // const colsNum: ComputedRef<number> = computed(() => {
  //   const [firstData] = Object.keys(breakpoints.value)
  //   const colsNum = current.value.at(-1) || firstData
  //   return Number(colsNum)
  // })

  function addWidget(widget: any, component: 'string', size: string) {

    // const position: any = {} // 布局位置
    // const [w, h] = size.split(':').map(Number)
    // const { devices } = settings

    // for (const device in devices) {
    //   console.log(11, device)

    //   // 首次添加
    //   if (devices[device].layouts.length === 0) {
    //     position[device] = [0, 0]
    //     continue
    //   }
    // }

    // console.log(22, position)

    // const [x, y] = findPosition([w, h], layouts.value, +colsNum)
    // position[colsNum] = [x, y]

    // const id = `${component}-${nanoid()}`
    // addRoute(component)
    // layouts.value.push({ id, widgetData: widget, widgetSize: size, position, update: dayjs().valueOf(), component })
  }

  function delWidget(widget: any) {
    // const index = layouts.value.findIndex((item: any) => item.id === widget.id)
    // layouts.value.splice(index, 1)
  }

  // const router = useRouter()
  // async function addRoute(component: string) {
  //   const componentsFile: any = import.meta.glob('@/widgets/*/dialog/*.vue', { eager: true })
  //   for (const path in componentsFile) {
  //     const filePath = path.split('/')[2]
  //     if (filePath !== component)
  //       continue
  //     const name = path.split('/').pop()?.replace('.vue', '')
  //     router.addRoute({ path: `/${component}/${name}`, component: componentsFile[path].default })
  //   }
  // }

  return {
    baseSize,
    baseMargin,
    addWidget,
    delWidget,
    editMode,
    // breakpoints,
    // colsNum,
    rowsNum,
    layouts,
    deviceType,
    gridBoundingClientRect,
  }
})
