<script setup lang="ts">

</script>

<template>
  <NuxtLink v-slot="{ navigate }" to="/settings" custom>
    <button bg-red @click="navigate">
      back
    </button>
  </NuxtLink>

  <button
    type="button" hover:bg-violet-50 bg-transparent flex justify-between items-center w-full rounded-md px6 py2
    p="x6 y2" text-sm @click="appStore.headerDate = !appStore.headerDate"
  >
    <div flex items-center>
      <div mr-6 text-2xl i-solar-history-2-bold />
      <div text-left>
        <p>时间展示</p>
        <p text-gray-400 text-xs>
          是否在头部右侧展示时间
        </p>
      </div>
    </div>
    时间开关
  </button>

  <button
    type="button" hover:bg-violet-50 bg-transparent flex justify-between items-center w-full rounded-md p="x6 y2"
    text-sm @click="appStore.headerDate = !appStore.headerDate"
  >
    <div flex items-center>
      <div mr-6 text-2xl i-solar-sidebar-minimalistic-broken />
      <div text-left>
        <p>透明设置</p>
        <p text-gray-400 text-xs>
          头部是否默认透明，开启后鼠标移上会显示
        </p>
      </div>
    </div>
    时间开关
  </button>
</template>
