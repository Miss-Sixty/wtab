<script setup lang="ts">
import dayjs from 'dayjs'
import useAppStore from '@/stores/app'
const appStore = useAppStore()
</script>

<template>
  <DialogPage title="节假日">
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
        <tr v-for="(day, i) in appStore.calendar" :key="i">
          <td
            class="whitespace-nowrap py-2.5 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
            :class="dayjs(day.date).isBefore(dayjs()) ? 'line-through' : ''"
          >
            {{ day.name }}
          </td>
          <td
            class="whitespace-nowrap px-3 py-2.5 text-sm text-gray-500"
            :class="dayjs(day.date).isBefore(dayjs()) ? 'line-through' : ''"
          >
            {{ day.date }}
          </td>
          <td class="whitespace-nowrap px-3 py-2.5 text-sm text-gray-500">
            <span
              class="inline-flex items-center rounded-md  px-2 py-1 text-xs ring-1 ring-inset"
              :class="[
                dayjs(day.date).isBefore(dayjs()) ? 'line-through' : '',
                day.isOffDay ? 'bg-primary-50 text-primary ring-primary-600/20' : 'bg-red-50 text-red ring-red-600/20',
              ]"
            >
              {{ day.isOffDay ? '放假' : '上班' }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </DialogPage>
</template>
