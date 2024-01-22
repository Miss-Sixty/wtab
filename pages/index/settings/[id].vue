<script setup lang="ts">
import useLayoutStore from '@/stores/layout'
import useAppStore from '@/stores/app'
import ColorPicker from './components/color-picker/ColorPicker.vue'
import ThemeSelect from './components/ThemeSelect.vue'
import { downloadConfig, uploadConfig } from '@/composables/useDownload'

const layoutStore: any = useLayoutStore()
const appStore: any = useAppStore()
const route: any = useRoute()

const { open, onChange } = useFileDialog({
  multiple: false,
  accept: '.wtab',
})

const menuData = {
  style: [
    { title: '主题', type: 'theme', component: ThemeSelect },
    { title: '强调色', type: 'color', component: ColorPicker },
  ],
  base: [
    { title: '透明设置', hover: true, type: 'switch', switchModel: 'headerConstant', desc: '头部按钮是否不透明，关闭后鼠标移上会显示', icon: 'i-solar-sidebar-minimalistic-broken' },
  ],
  layout: [
    { title: '卡片大小', type: 'inputNumber', switchModel: 'baseSize', desc: '卡片一个最小方块的大小', icon: 'i-solar-notes-minimalistic-broken' },
    { title: '卡片间距', type: 'inputNumber', switchModel: 'baseMargin', desc: '桌面两个卡片之间的间距', icon: 'i-solar-widget-5-broken' },
  ],
  data: [
    { title: '导出数据', type: 'button', props: { text: '导 出', type: 'primary', icon: 'i-solar-export-linear' }, desc: '导出所有数据到本地', icon: 'i-solar-upload-square-broken', fn: exportFile },
    { title: '导入数据', type: 'button', props: { text: '导 入', type: 'primary', icon: 'i-solar-import-linear' }, desc: '将本地数据导入，会覆盖已有数据', icon: 'i-solar-download-square-broken', fn: open },
    { title: '重置数据', type: 'button', props: { text: '重 置', type: 'danger', icon: 'i-solar-restart-bold' }, desc: '将所有数据重置到默认数据', icon: 'i-solar-restart-square-broken', fn: resetData },
  ],
} as any


const list = computed(() => menuData[route.params.id])





async function exportFile() {
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
    const { headerConstant, formatClock } = JSON.parse(_appStore)
    appStore.headerConstant = headerConstant
    appStore.formatClock = formatClock
  }
})
</script>

<template>
  <button v-for="(item, i) in list" :key="i" type="button" flex justify-between items-center w-full
    :class="[item.hover ? 'hover:bg-primary-50 cursor-pointer' : 'cursor-default']" rounded-md p3 sm:px5 text-sm
    @click="appStore[item.switchModel] = !appStore[item.switchModel]">
    <div w-full flex items-center>
      <div sm:mr-5 mr-4 text-2xl :class="item.icon" />
      <div w-full text-left>
        <p>
          {{ item.title }}
        </p>
        <p text-gray-400 text-xs>
          {{ item.desc }}
        </p>
        <component :is="item.component" />
      </div>
    </div>
    <div flex>
      <WtSwitch v-if="item.type === 'switch'" v-model="appStore[item.switchModel]" @click.stop />
      <WtInput v-if="item.type === 'inputNumber'" v-model.number="layoutStore[item.switchModel]" placeholder="请输入"
        @click.stop />
      <WtButton v-if="item.type === 'button'" v-bind="item.props" @click.stop="item.fn" />
    </div>
  </button>
</template>
