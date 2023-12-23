<script setup lang="ts">
const props = defineProps({
  widget: {
    type: Object,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
})
const modelValue = defineModel()

const formData = ref({
  src: '',
  name: '网址导航',
})

watch(modelValue, (bl) => {
  if (!bl)
    return
  formData.value.src = props.widget.widgetData.src
  formData.value.name = props.widget.widgetData.widgetName
})

function onChange(e: any) {
//   const result = e.target.value.trim()
//   if (!result)
//     return
//   let result2
//   if (result.substring(0, 7) === 'http://')
//     result2 = result
//   else if (result.substring(0, 8) === 'https://')
//     result2 = result
//   else
//     result2 = 'http://'.concat(result)

//   formData.value.src = result2
}

async function getWebInfo() {
  try {
    const { data } = await $fetch('/api/favicon', {
      method: 'get',
      params: { host: 'https://github.com/' },
    })
    console.log(22, data)
  }
  catch (err) {
    console.log(11, err)
  }
  //   let domain: Array<string> | string = formData.value.src.split('/') // 以“/”进行分割

  //   if (domain[2]) {
  //     domain = domain[2]
  //     if (domain.substring(0, 4) === 'www.')
  //       domain = domain.slice(4)
  //   }
  //   else {
  //     domain = '' // 如果url不正确就取空
  //   }
  //   if (!domain)
  //     return

//   const res = await fetch(`http://localhost:3000/favicon?src=${domain}`)
}

function onSubmit() {
  props.widget.widgetData.src = formData.value.src
  props.widget.widgetData.widgetName = formData.value.name
  modelValue.value = false
}
</script>

<template>
  <WtabDialog v-model="modelValue" title="网址导航">
    <form method="dialog" ring-1 ring-gray-200 rounded-xl>
      <div p-8 class="grid gap-y-8">
        <div>
          <label for="src" block text-sm font-medium leading-6> 网站地址 </label>
          <div flex items-center mt-2>
            <input
              v-model="formData.src"
              flex-1 type="text" name="src" block w-full rounded-md py-1.5 px-3 border mr-2 outline-indigo
              caret-indigo placeholder="请输入网站地址" placeholder:text-gray-400 leading-6 text-sm required @change="onChange"
            >
            <WtButton text="获取信息" size="lg" @click="getWebInfo" />
          </div>
        </div>

        <div>
          <label for="name" block text-sm font-medium leading-6> 网站名称 </label>
          <input
            v-model="formData.name" type="text" name="name" mt-2 block w-full rounded-md py-1.5 px-3 border
            outline-indigo caret-indigo placeholder="请输入网站名称" placeholder:text-gray-400 leading-6 text-sm required
          >
        </div>

        <div>
          <label for="name" block text-sm font-medium leading-6> 图标 </label>
          <div bg-gray-100 border rounded-md overflow-hidden h-24 w-24>
            <img h-full w-full src="" alt="">
          </div>
        </div>
      </div>

      <div flex gap-2 justify-end py3 px6 border-t>
        <WtButton plain text="取消" @click="modelValue = false" />
        <WtButton text="确定" type="submit" @click="onSubmit" />
      </div>
    </form>
  </WtabDialog>
</template>
