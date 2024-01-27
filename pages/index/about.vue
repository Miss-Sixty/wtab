<script setup lang="ts">
import configs from '@/config/settings'
import dayjs from '#dayjs'
import now from '~build/time'
import { version } from '~build/package';
const buildTime = dayjs(now).format('YYYY-MM-DD HH:mm:ss')
const links = [
  {
    link: 'https://web.wtab.cn',
    text: '官方网站',
  },
  {
    link: 'https://support.qq.com/products/592621/',
    text: '问题反馈',
  },
]
</script>

<template>
  <DialogPage title="关于">
    <div class="relative flex h-full flex-col items-center antialiased">
      <NuxtPicture class="mb-3 mt-14 w-28" src="/miaomiao.svg" />
      <p class="text-xl font-bold">
        {{ configs.title }}
      </p>
      <p class="mt-3 text-xs text-gray">
        {{ configs.description }}
      </p>
      <div class="mx-1 mt-4 divide-x divide-current text-sm">
        <a v-for="(item, i) in links" :key="i" class="px-1.5" hover:text-primary :href="item.link" target="_blank">
          {{ item.text }}
        </a>
      </div>
      <div class="absolute bottom-3 flex w-full justify-between">
        <ClientOnly>
          <p class="text-xs text-gray">
            最后更新：{{ buildTime }}
          </p>
          <p class="text-xs text-gray">
            V{{ version }}
          </p>
        </ClientOnly>
      </div>
    </div>
  </DialogPage>
</template>
