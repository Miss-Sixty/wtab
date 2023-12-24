<script setup lang="ts">
import dayjs from 'dayjs'
import useLayoutStore from '@/stores/app'

const modelValue = defineModel()
const layoutStore = useLayoutStore()
const formatClock = ref(layoutStore.formatClock)
const time = computed(() => dayjs(layoutStore.date).format(formatClock.value))

function onSubmit() {
  layoutStore.formatClock = formatClock.value
  modelValue.value = false
}
</script>

<template>
  <WtabDialog v-model="modelValue" title="时间设置">
    <form action="" method="dialog" ring-1 ring-gray-200 rounded-xl>
      <div p-8 class="grid gap-y-8">
        <div>
          <label for="name" flex justify-between block text-sm font-medium leading-6>
            <span>时间格式：{{ time }}</span>
            <a text-gray hover:text-gray-300 flex text-xs items-center href="https://dayjs.fenxianglu.cn/category/display.html#%E6%A0%BC%E5%BC%8F%E5%8C%96" target="_black">
              <span>格式参考链接</span> <div i-solar-arrow-right-up-linear />
            </a>

          </label>
          <input
            id="name" v-model="formatClock" type="text" name="name" mt-2 block w-full rounded-md py-1.5 px-3 border
            outline-violet caret-violet placeholder="请输入页面名称" placeholder:text-gray-400 leading-6 text-sm required
          >
        </div>
      </div>

      <div flex gap-2 justify-end py3 px6 border-t>
        <WtButton plain text="取消" @click="modelValue = false" />
        <WtButton text="确定" type="submit" @click="onSubmit" />
      </div>
    </form>
  </WtabDialog>
</template>
