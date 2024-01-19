import ColorPicker from './components/color-picker/ColorPicker.vue'
import ThemeSelect from './components/ThemeSelect.vue'
import { downloadConfig, uploadConfig } from '@/composables/useDownload'
import useLayoutStore from '@/stores/layout'
import useAppStore from '@/stores/app'


const { open, onChange } = useFileDialog({
  multiple: false,
  accept: '.wtab',
})

export default {
  style: [
    { title: '主题', type: 'theme', component: ThemeSelect },
    { title: '强调色', type: 'color', component: ColorPicker },
  ],
  base: [
    { title: '时间展示', hover: true, type: 'switch', switchModel: 'headerDate', desc: '是否在头部右侧展示时间', icon: 'i-solar-history-2-bold' },
    { title: '透明设置', hover: true, type: 'switch', switchModel: 'headerConstant', desc: '头部按钮是否不透明，关闭后鼠标移上会显示', icon: 'i-solar-sidebar-minimalistic-broken' },
  ],
  layout: [
    { title: '卡片大小', hover: true, type: 'inputNumber', switchModel: 'baseSize', desc: '卡片一个最小方块的大小', icon: 'i-solar-notes-minimalistic-broken' },
    { title: '卡片间距', hover: true, type: 'inputNumber', switchModel: 'baseMargin', desc: '桌面两个卡片之间的间距', icon: 'i-solar-widget-5-broken' },
  ],
  data: [
    { title: '导出数据', hover: true, type: 'button', props: { text: '导 出', type: 'primary', icon: 'i-solar-export-linear' }, desc: '导出所有数据到本地', icon: 'i-solar-upload-square-broken', fn: exportFile },
    { title: '导入数据', hover: true, type: 'button', props: { text: '导 入', type: 'primary', icon: 'i-solar-import-linear' }, desc: '将本地数据导入，会覆盖已有数据', icon: 'i-solar-download-square-broken', fn: open },
    { title: '重置数据', hover: true, type: 'button', props: { text: '重 置', type: 'danger', icon: 'i-solar-restart-bold' }, desc: '将所有数据重置到默认数据', icon: 'i-solar-restart-square-broken', fn: resetData },
  ],
} as any



async function exportFile() {
  if (!import.meta.client)
    return
  const _wtabSettings = localStorage.getItem('wtab-settings')
  const _nuxtColorMode = localStorage.getItem('nuxt-color-mode')
  const _layoutStore = localStorage.getItem('layoutStore')
  const _appStore = localStorage.getItem('appStore')
  downloadConfig({ _wtabSettings, _nuxtColorMode, _layoutStore, _appStore })
}


function resetData() {
  const layoutStore: any = useLayoutStore()
  const appStore: any = useAppStore()
  layoutStore.$reset()
  appStore.$reset()
}



onChange(async (files) => {
  const layoutStore: any = useLayoutStore()
  const appStore: any = useAppStore()
  const [rawFile]: any = files || []
  const { _wtabSettings, _nuxtColorMode, _layoutStore, _appStore } = await uploadConfig(rawFile)

  localStorage.setItem('wtab-settings', _wtabSettings)
  localStorage.setItem('nuxt-color-mode', _nuxtColorMode)

  if (_layoutStore) {
    const { baseSize, baseMargin, breakpoints, layouts, pageMenu } = JSON.parse(_layoutStore)
    layoutStore.baseSize = baseSize
    layoutStore.baseMargin = baseMargin
    layoutStore.breakpoints = breakpoints
    layoutStore.layouts = layouts
    layoutStore.pageMenu = pageMenu
  }
  if (_appStore) {
    const { headerDate, headerConstant, formatClock } = JSON.parse(_appStore)
    appStore.headerDate = headerDate
    appStore.headerConstant = headerConstant
    appStore.formatClock = formatClock
  }
})