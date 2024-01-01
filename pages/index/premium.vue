<script setup lang="ts">
const list = [
  '使用多个 URL 和文件作为聊天上下文',
  '云端同步',
  '无限免费的文字转语音',
  '永久有效，无重复收费',
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
        <span text-gray font-normal>{{ item }}</span>
      </li>
    </ul>
    <p text-center mt-12 mb-6 text-gray-900>
      成为 PRO 并通过支持其开发人员积极为此扩展的开发做出贡献。
    </p>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div v-for="(tier, i) in tiers" :key="i" class="flex flex-col justify-between rounded-2xl p-6 shadow-xl ring-1 ring-gray-900/10 sm:p-8">
        <h3 class="font-semibold leading-7 text-primary">
          {{ tier.name }}
        </h3>
        <div class="mt-4 flex items-baseline gap-x-2">
          <span class="text-5xl font-bold tracking-tight text-gray-900">{{ tier.priceMonthly }}</span>
          <span class="font-semibold leading-7 text-gray-600">/每{{ tier.date }}</span>
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
