<script setup lang="ts">
import useLayoutStore from '@/stores/layout'
import useAppStore from '@/stores/app'
import ColorPicker from './components/ColorPicker.vue'
import ThemeSelect from './components/ThemeSelect.vue'
import Wallpaper from './components/Wallpaper.vue'
import { downloadConfig, uploadConfig } from '@/composables/useDownload'
import { openDB } from 'idb';

const layoutStore: any = useLayoutStore()
const appStore: any = useAppStore()
const route: any = useRoute()

const { open, onChange } = useFileDialog({
  multiple: false,
  accept: '.wtab',
})

const menuData = {
  base: [
    { title: '主题', type: 'theme', component: ThemeSelect },
    { title: '强调色', type: 'color', component: ColorPicker },
    { title: '头部透明', hover: true, type: 'switch', divided: true, switchModel: 'headerConstant', desc: '头部按钮是否透明，关闭后鼠标移才上会显示', icon: 'i-solar-sidebar-minimalistic-broken' },
    { title: '卡片大小', type: 'inputNumber', switchModel: 'baseSize', desc: '卡片一个最小方块的大小', icon: 'i-solar-notes-minimalistic-broken' },
    { title: '卡片间距', type: 'inputNumber', switchModel: 'baseMargin', desc: '桌面两个卡片之间的间距', icon: 'i-solar-widget-5-broken' },
    { title: '导出数据', type: 'button', divided: true, props: { text: '导 出', type: 'primary', icon: 'i-solar-export-linear' }, desc: '导出所有数据到本地', icon: 'i-solar-upload-square-broken', fn: exportFile },
    { title: '导入数据', type: 'button', props: { text: '导 入', type: 'primary', icon: 'i-solar-import-linear' }, desc: '将本地数据导入，会覆盖已有数据', icon: 'i-solar-download-square-broken', fn: open },
    { title: '重置数据', type: 'button', key: 'resetData', props: { text: '重 置', type: 'danger', icon: 'i-solar-restart-bold' }, desc: '将所有数据重置到默认数据', icon: 'i-solar-restart-square-broken', },
  ],
  wallpaper: [
    { title: '自定义壁纸', type: 'customWallpaper', component: Wallpaper },
    { title: '每日 Bing', type: 'bingWallpaper', component: Wallpaper },
    { title: '默认壁纸', type: 'baseWallpaper', component: Wallpaper },
  ]
} as any


const list = computed(() => menuData[route.params.id])

async function exportFile() {
  const db = await openDB('wtabDB');

  const [layoutStoreData, appStoreData] = await Promise.all([
    db.get('wtab', 'layoutStore'),
    db.get('wtab', 'appStore')
  ]);

  downloadConfig({ layoutStoreData, appStoreData })
}

onChange(async (files) => {
  const db = await openDB('wtabDB');
  const [rawFile]: any = files || []
  const { layoutStoreData, appStoreData }: any = await uploadConfig(rawFile)
  const tx = db.transaction('wtab', 'readwrite');
  await Promise.all([
    tx.store.put(layoutStoreData, 'layoutStore'),
    tx.store.put(appStoreData, 'appStore'),
    tx.done,
  ]);

  layoutStore.$patch(layoutStoreData)
  appStore.$patch(appStoreData)
})
</script>

<template>
  <template v-for="(item, i) in list" :key="i">
    <div v-if="item.divided" border-b my-5></div>
    <button type="button" flex justify-between items-center w-full
      :class="[item.hover ? 'hover:bg-primary-50 cursor-pointer' : 'cursor-default']" rounded-md p3 sm:px5 text-sm
      @click="appStore[item.switchModel] = !appStore[item.switchModel]">
      <div w-full flex items-center>
        <div v-if="item.icon" sm:mr-5 mr-4 text-2xl :class="item.icon" />
        <div v-if="item.title || item.desc" w-full text-left>
          <p v-if="item.title" py2>
            {{ item.title }}
          </p>
          <p v-if="item.desc" text-gray-400 text-xs>
            {{ item.desc }}
          </p>
          <component :is="item.component" :type="item.type" />
        </div>
      </div>
      <div flex>
        <WtSwitch v-if="item.type === 'switch'" v-model="appStore[item.switchModel]" @click.stop />
        <WtInput v-if="item.type === 'inputNumber'" v-model.number="layoutStore[item.switchModel]" placeholder="请输入"
          @click.stop />
        <ResetDataBtn v-if="item.key === 'resetData'" v-bind="item.props" />
        <WtButton v-else-if="item.type === 'button'" v-bind="item.props" @click.stop="item.fn" />
      </div>
    </button>
  </template>
</template>
