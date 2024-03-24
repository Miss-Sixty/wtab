<script setup lang="ts">
import configs from '@/config/settings'
import dayjs from 'dayjs'
import now from '~build/time'
import { version } from '~build/package';
import miaomiao from '/miaomiao.svg'
// const links = [
//   {
//     link: 'https://web.wtab.cn',
//     text: '官方网站',
//   },
//   {
//     link: 'https://support.qq.com/products/592621/',
//     text: '问题反馈',
//   },
// ]
</script>

<template>
  <DialogPage title="关于">
    <div flex h-full flex-col items-center antialiased>
      <NuxtImg mb-3 mt-14 w-28 :src="miaomiao" />
      <p text-xl font-bold> {{ configs.title }} </p>
      <p mt-3 text-sm> {{ configs.description }} </p>
      <!--  <div class="mx-1 mt-4 divide-x divide-current text-sm">
        <a v-for="(item, i) in links" :key="i" class="px-1.5" hover:text-primary :href="item.link" target="_blank">
          {{ item.text }}
        </a>
      </div> -->
      <ClientOnly>
        <p text-xs text-gray mt1> V{{ version }} {{ dayjs(now).format('YYYY-MM-DD HH:mm:ss') }} </p>
      </ClientOnly>
    </div>
  </DialogPage>
</template>
