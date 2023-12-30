<script setup lang="ts">
const list = [
  { title: '时间展示', desc: '是否在头部右侧展示时间', icon: 'i-solar-history-2-bold' },
  { title: '透明设置', desc: '头部是否默认透明，开启后鼠标移上会显示', icon: 'i-solar-sidebar-minimalistic-broken' },
]
</script>

<template>
  <NuxtLink v-slot="{ navigate }" to="/settings" custom>
    <button bg-red @click="navigate">
      back
    </button>
  </NuxtLink>

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
    时间开关
  </button>
</template>
