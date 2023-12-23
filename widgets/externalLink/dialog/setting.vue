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
  name: '',
  host: '',
  iconUrl: '',
  bgColor: '',
})

watch(modelValue, (bl) => {
  if (!bl)
    return
  for (const key in formData.value) formData.value[key] = props.widget.widgetData[key]
})

function onChange(e: any) {
  const result = e.target.value.trim()
  if (!result)
    return
  let host
  if (result.substring(0, 7) === 'http://')
    host = result
  else if (result.substring(0, 8) === 'https://')
    host = result
  else
    host = 'http://'.concat(result)

  formData.value.host = host
}

// interface Icon {
//   host: string
//   icons: Array<string>
//   logo: string
// }
const icons: any = ref()
async function getWebInfo() {
  try {
    let host: Array<string> | string = formData.value.host.split('/') // 以“/”进行分割

    if (host[2]) {
      host = host[2]
      if (host.substring(0, 4) === 'www.')
        host = host.slice(4)
    }
    else {
      host = '' // 如果url不正确就取空
    }
    if (!host)
      return

    const { data }: any = await $fetch('/api/favicon', {
      method: 'get',
      params: { host: `https://${host}` },
    })

    icons.value = data.icons
    const [firstIcon] = data.icons
    if (firstIcon)
      formData.value.iconUrl = firstIcon
    formData.value.name = data.name
    formData.value.host = data.host
  }
  catch (err) {
    console.log(11, err)
  }
}

function onSubmit() {
  for (const key in formData.value)
    props.widget.widgetData[key] = formData.value[key]
  modelValue.value = false
}
</script>

<template>
  <WtabDialog v-model="modelValue" title="网址导航">
    <form method="dialog" ring-1 ring-gray-200 rounded-xl>
      <div p-8 class="grid gap-y-8">
        <div>
          <label for="url" block text-sm font-medium leading-6> 网站地址 </label>
          <div flex items-center mt-2>
            <input
              v-model="formData.url"
              flex-1
              type="text" name="url" block w-full rounded-md py-1.5 px-3 border mr-2 outline-indigo caret-indigo
              placeholder="请输入网站地址" placeholder:text-gray-400 leading-6 text-sm required @change="onChange"
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
          <ul grid flex gap-2>
            <li
              v-for="(item, i) in icons" :key="i"
              cursor-pointer
              :class="{ 'border-purple': formData.iconUrl === item }"
              bg-gray-100 border rounded-md overflow-hidden h-24 w-24 @click="formData.iconUrl = item"
            >
              <img h-full w-full :src="item">
            </li>
          </ul>
        </div>
      </div>

      <div flex gap-2 justify-end py3 px6 border-t>
        <WtButton plain text="取消" @click="modelValue = false" />
        <WtButton text="确定" type="submit" @click="onSubmit" />
      </div>
    </form>
  </WtabDialog>
</template>
