<script setup lang="ts">
import useAppStore from '@/stores/app'
import useLayoutStore from '@/stores/layout'

const appStore: any = useAppStore()
const layoutStore: any = useLayoutStore()
const route: any = useRoute()

const menuData: any = {
  base: [
    { title: '时间展示', type: 'switch', switchModel: 'headerDate', desc: '是否在头部右侧展示时间', icon: 'i-solar-history-2-bold' },
    { title: '透明设置', type: 'switch', switchModel: 'headerConstant', desc: '头部按钮是否不透明，关闭后鼠标移上会显示', icon: 'i-solar-sidebar-minimalistic-broken' },
  ],
  layout: [
    { title: '卡片大小', type: 'inputNumber', switchModel: 'baseSize', desc: '卡片一个最小方块的大小', icon: 'i-solar-history-2-bold' },
    { title: '卡片间距', type: 'inputNumber', switchModel: 'baseMargin', desc: '桌面两个卡片之间的间距', icon: 'i-solar-sidebar-minimalistic-broken' },
  ],
  data: [
    { title: '导出数据', type: 'button', btnText: '导出', desc: '导出所有数据到本地', icon: 'i-solar-history-2-bold', fn: () => {} },
    { title: '导入数据', type: 'button', btnText: '导入', desc: '将本地数据导入，会覆盖已有数据', icon: 'i-solar-history-2-bold', fn: () => {} },
    { title: '重置数据', type: 'button', btnText: '重置', desc: '将所有数据重置到默认数据', icon: 'i-solar-history-2-bold', fn: () => {} },
  ],
}

const list = computed(() => menuData[route.params.id])
</script>

<template>
  <button
    v-for="(item, i) in list"
    :key="i"
    type="button" hover:bg-violet-50 flex justify-between
    items-center
    w-full rounded-md
    p3
    sm:p="x5"
    text-sm
    @click="appStore[item.switchModel] = !appStore[item.switchModel]"
  >
    <div flex items-center>
      <div sm:mr-5 mr-4 text-2xl :class="item.icon" />
      <div text-left>
        <p>
          {{ item.title }}
        </p>
        <p text-gray-400 text-xs>
          {{ item.desc }}
        </p>
      </div>
    </div>
    <WtSwitch v-if="item.type === 'switch'" v-model="appStore[item.switchModel]" @click.stop />
    <input
      v-if="item.type === 'inputNumber'"
      v-model.number="layoutStore[item.switchModel]"
      type="text" mt-2 block w-30 rounded-md py-1.5 px-3 border outline-violet
      caret-violet placeholder="请输入" placeholder:text-gray-400 leading-6 text-sm required @click.stop
    >
    <WtButton v-if="item.type === 'button'" :text="item.btnText" @click.stop="item.fn" />
  </button>
</template>
