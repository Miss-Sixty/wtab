<script setup lang="ts">
import useAppStore from '@/stores/app'

const appStore: any = useAppStore()

const list = [
  { title: '时间展示', type: 'switch', switchModel: 'headerDate', desc: '是否在头部右侧展示时间', icon: 'i-solar-history-2-bold' },
  { title: '透明设置', type: 'switch', switchModel: 'headerConstant', desc: '头部是否默认透明，开启后鼠标移上会显示', icon: 'i-solar-sidebar-minimalistic-broken' },
]
</script>

<template>
  <button
    v-for="(item, i) in list"
    :key="i"
    type="button" hover:bg-violet-50 bg-transparent flex justify-between
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
  </button>
</template>
