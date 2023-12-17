<script setup lang="ts">
import useLayoutStore from '@/stores/layout'

const layoutStore = useLayoutStore()
const formData = ref({
  text: '',
  to: '',
  icon: '',
})
function onSubmit() {
  layoutStore.addPage(formData.value)
}
</script>

<template>
  <WtabDialog>
    <form action="" method="dialog" ring-1 ring-gray-200 rounded-xl>
      <div p-8 class="grid gap-y-8">
        <div>
          <label for="name" block text-sm font-medium leading-6>名称</label>
          <input
            id="name"
            v-model="formData.text" type="text" name="name"
            mt-2
            block w-full rounded-md
            py-1.5 px-3
            border
            outline-indigo
            caret-indigo
            placeholder="请输入页面名称"
            placeholder:text-gray-400 leading-6 text-sm
            required
          >
        </div>
        <div>
          <label for="url" block text-sm font-medium leading-6>地址</label>
          <input
            id="url"
            v-model="formData.to" type="text" name="url"
            mt-2
            block w-full rounded-md
            py-1.5 px-3
            border
            outline-indigo
            caret-indigo
            placeholder="请输入页面地址"
            placeholder:text-gray-400 leading-6 text-sm
          >
        </div>
        <div>
          <label for="icon" block text-sm font-medium leading-6>图标</label>
          <input
            id="icon"
            v-model="formData.icon" type="text" name="icon"
            mt-2
            block w-full rounded-md
            py-1.5 px-3
            border
            outline-indigo
            caret-indigo
            placeholder="请输入页面图标"
            placeholder:text-gray-400 leading-6 text-sm
          >
        </div>
      </div>

      <div flex gap-2 justify-end py3 px6 border-t>
        <WtButton plain text="取消" @click="$emit('update:modelValue', false)" />
        <WtButton text="确定" type="submit" @click="onSubmit" />
      </div>
    </form>
  </WtabDialog>
</template>
