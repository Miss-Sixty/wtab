<script setup lang="ts">
const list = [
  '移除广告',
  '云端同步',
  '系统通知提醒',
  '所有功能都可使用',
  '支持我们的长期开发',
]

const tiers = [
  {
    name: '按月计费',
    href: '#',
    priceMonthly: '¥0.9',
    date: '月',
  },
  {
    name: '按年计费',
    href: '#',
    priceMonthly: '¥9.9',
    date: '年',
  },
]
</script>

<template>
  <DialogPage title="高级版">
    <ul
      space-y-1
      mt-5
    >
      <li v-for="(item, i) in list" :key="i" flex items-center>
        <div text-primary mr-2 text-xl i-solar-verified-check-bold />
        <span text-gray font-normal class="dark:text-gray-300">{{ item }}</span>
      </li>
    </ul>
    <p text-center mt-12 mb-6 text-gray-900 class="dark:text-gray-300">
      通过购买高级版来支持项目健康发展。
    </p>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div v-for="(tier, i) in tiers" :key="i" class="flex flex-col justify-between rounded-2xl p-6 shadow-xl ring-1 ring-gray-900/10 sm:p-8">
        <h3 class="font-semibold leading-7 text-primary">
          {{ tier.name }}
        </h3>
        <div class="mt-4 flex items-baseline gap-x-2">
          <span class="text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-300">{{ tier.priceMonthly }}</span>
          <span class="font-semibold leading-7 text-gray-600 dark:text-gray-400">/每{{ tier.date }}</span>
        </div>
        <a
          :href="tier.href"
          class="mt-8 block rounded-md bg-primary px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          去按{{ tier.date }}付费
        </a>
      </div>
    </div>
  </DialogPage>
</template>
