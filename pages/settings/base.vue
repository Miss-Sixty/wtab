<script setup lang="ts">

</script>

<template>
  <DialogPage title="基础设置" :width="1024">
    <div flex h-full>
      <ul max-w-80 w-full border-r pr-3 h-full>
        <li space-y-1>
          <button type="button" hover:bg-violet-50 bg-transparent flex justify-between items-center w-full rounded-md px-2 py-2 text-sm>
            <p>头部设置</p>
            <div i-solar-alt-arrow-right-linear />
          </button>
        </li>
      </ul>
      <div pl-3 w-full space-y-1>
        <button
          type="button"
          hover:bg-violet-50 bg-transparent flex justify-between items-center w-full rounded-md
          px6 py2
          p="x6 y2" text-sm
          @click="appStore.headerDate = !appStore.headerDate"
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
          type="button"
          hover:bg-violet-50 bg-transparent flex justify-between items-center w-full rounded-md
          p="x6 y2" text-sm
          @click="appStore.headerDate = !appStore.headerDate"
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
      </div>
    </div>
  </DialogPage>
</template>
