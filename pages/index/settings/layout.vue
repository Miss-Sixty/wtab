<script setup lang="ts">
import useLayoutStore from '@/stores/layout'

const layoutStore: any = useLayoutStore()

const list = [
  { title: '卡片大小', type: 'input', switchModel: 'baseSize', desc: '卡片一个最小方块的大小', icon: 'i-solar-history-2-bold' },
  { title: '卡片间距', type: 'input', switchModel: 'baseMargin', desc: '桌面两个卡片之间的间距', icon: 'i-solar-sidebar-minimalistic-broken' },
]
</script>

<template>
  <button
    v-for="(item, i) in list"
    :key="i"
    type="button" hover:bg-violet-50 bg-transparent flex justify-between
    items-center
    w-full rounded-md
    p="x1 y0"
    sm:p="x5 y2"
    text-sm
  >
    <div flex items-center>
      <div sm:mr-5 mr-2 text-2xl :class="item.icon" />
      <div text-left>
        <p>
          {{ item.title }}
        </p>
        <p text-gray-400 text-xs>
          {{ item.desc }}
        </p>
      </div>
    </div>

    <input
      v-model.number="layoutStore[item.switchModel]" type="text" mt-2 block w-30 rounded-md py-1.5 px-3 border
      outline-violet caret-violet placeholder="请输入" placeholder:text-gray-400 leading-6 text-sm required
    >
  </button>
</template>
