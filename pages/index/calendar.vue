<script setup lang="ts">
// 请求节假日数据
const { days }: any = await $fetch(`https://cdn.jsdelivr.net/gh/NateScarlet/holiday-cn@master/${2024}.json`)
</script>

<template>
  <ClientOnly>
    <DialogPage title="节假日">
      <!-- <ul role="list" class="divide-y divide-gray-200">
        <li v-for="item in days" :key="item.id" class="px-4 py-2.5 sm:px-6" flex items-center>
          <div>{{ item.name }}</div><div>{{ item.date }}</div><div>{{ item.isOffDay }}</div>
        </li>
      </ul> -->

      <table class="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th scope="col" class="py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
              节假日名称
            </th>
            <th scope="col" class="px-3 py-2 text-left text-sm font-semibold text-gray-900">
              日期
            </th>
            <th scope="col" class="px-3 py-2 text-left text-sm font-semibold text-gray-900">
              是否放假
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="(day, i) in days" :key="i">
            <td class="whitespace-nowrap py-2.5 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
              {{ day.name }}
            </td>
            <td class="whitespace-nowrap px-3 py-2.5 text-sm text-gray-500">
              {{ day.date }}
            </td>
            <td class="whitespace-nowrap px-3 py-2.5 text-sm text-gray-500">
              <span
                v-if="day.isOffDay" class="inline-flex items-center rounded-md bg-primary-50 px-2 py-1 text-xs
                 text-primary ring-1 ring-inset ring-primary-600/20"
              >
                放假
              </span>
              <span
                v-else class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs
                 text-red ring-1 ring-inset ring-red-600/20"
              >
                上班
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </DialogPage>
  </ClientOnly>
</template>
