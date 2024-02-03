<script setup lang="ts">
import getUrls from 'get-urls';
import { useUnaThemes } from '@/composables/useUnaThemes'
import useImage2Base64 from '~/composables/useImage2Base64';

const { primaryThemes, } = useUnaThemes()


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
const modelValue = defineModel({ default: false })

const formData: any = ref({
  url: '',
  name: '',
  host: '',
  bgColor: '',
  iconType: 'online',
  iconUrl: '',
  iconName: '',
  iconUpload: '',
  iconBgColor: '',
  iconColorType: 1,//0:固定色 1:自选色
})

watch(modelValue, (bl) => {
  if (!bl) return
  for (const key in formData.value) formData.value[key] = props.widget.widgetData[key]
  props.widget.widgetData.iconUrl && icons.value.add(props.widget.widgetData.iconUrl)
})

const icons: any = ref(new Set())
const loading = ref(false)
async function getWebInfo() {
  loading.value = true
  formData.value.iconType = 'online'
  clear({ clearUrl: false })

  try {
    const host = getUrls(formData.value.url, { stripWWW: false })
    const [firstHost = ''] = host || [];
    if (!firstHost) return;
    formData.value.host = firstHost

    const { data }: any = await $fetch('/api/favicon', {
      method: 'get',
      params: { host: firstHost },
    })

    data.icons.forEach((item: string) => icons.value.add(item))
    const [firstIcon] = data.icons
    if (firstIcon) formData.value.iconUrl = firstIcon
    else {
      formData.value.iconType = 'text'
    }
    if (data.themeColor) {
      formData.value.iconColorType = 2
      formData.value.iconBgColor = data.themeColor
    }
    else formData.value.iconBgColor = colors[0]
    formData.value.name = data.name
    formData.value.host = data.host
    formData.value.iconName = data.name
  }
  finally {
    loading.value = false
  }
}

async function onSubmit() {
  for (const key in formData.value) props.widget.widgetData[key] = formData.value[key]
  props.widget.widgetData.iconUrl = await useImage2Base64(formData.value.iconUrl)
  modelValue.value = false
  clear()
}

const iconNameLength = computed(() => formData.value?.iconName?.length || 0)

const closed = () => {
  modelValue.value = false
  clear()
}

const clear = (options?: any) => {
  const { clearUrl = true } = options || {}
  icons.value.clear()
  formData.value = {
    url: clearUrl ? '' : formData.value.url,
    name: '',
    host: '',
    bgColor: '',
    iconType: 'online',
    iconUrl: '',
    iconName: '',
    iconUpload: '',
    iconBgColor: '',
    iconColorType: 1,
  }
}

const colors = [
  ...primaryThemes.map(([, theme]) => theme['--wt-primary-hex']),
]

const setBgColor = (color: string | null, type: 1 | 2) => {
  formData.value.iconBgColor = color
  formData.value.iconColorType = type
}

const radioTabData = [
  { label: '在线图标', value: 'online' },
  { label: '文字图标', value: 'text' },
  { label: '上传图标', value: 'upload', disabled: true },
]
</script>

<template>
  <WtabDialog v-model="modelValue" title="网址导航">
    <form method="dialog" rounded-xl flex="~ col" h-full divide-y>
      <div px2 flex="~ col 1" gap-y-6>
        <div>
          <label for="externalLinkUrl" block text-sm font-medium leading-6 mb-2> 网站地址 </label>
          <div flex items-center>
            <WtInput id="externalLinkUrl" v-model="formData.url" flex-1 mr-2 placeholder="请输入网站地址" />
            <WtButton type="primary" text="获取信息" :loading="loading" @click="getWebInfo" />
          </div>
        </div>

        <div>
          <label for="externalLinkName" block text-sm font-medium leading-6 mb-2> 网站名称 </label>
          <WtInput id="externalLinkName" v-model="formData.name" w-full placeholder="请输入网站名称" />
        </div>
        <div>
          <div flex gap-2>
            <label block text-sm font-medium leading-6 mb-2> 图标 </label>
            <div>
              <WtSegmented v-model="formData.iconType" :list="radioTabData" />
              <!-- <WtButton size="sm" @click="formData.iconType = 'online'"
                :type="formData.iconType === 'online' ? 'primary' : 'default'" text="在线图标" />
              <WtButton size="sm" @click="formData.iconType = 'text'"
                :type="formData.iconType === 'text' ? 'primary' : 'default'" text="文字图标" />
              <WtButton size="sm" @click="formData.iconType = 'upload'"
                :type="formData.iconType === 'upload' ? 'primary' : 'default'" text="上传图标" /> -->
            </div>
          </div>
          <ul grid flex gap-2 mt-1 v-show="formData.iconType === 'online'">
            <li v-for="(item, i) in icons" :key="i" cursor-pointer
              :class="['h-[72px]', 'w-[72px]', formData.iconUrl === item ? 'border-purple' : '']" border rounded-md
              overflow-hidden p1.5 @click="formData.iconUrl = item" flex="~ items-center justify-center">
              <img size-full :src="item">
            </li>
          </ul>
          <div v-show="formData.iconType === 'text'" mt-1 rounded-md p1.5 flex="~ items-center justify-center" :class="[
            'h-[72px]', 'w-[72px]',
            iconNameLength === 1 ? 'text-xl' : '',
            iconNameLength < 4 ? 'text-base' : '',
            iconNameLength === 4 ? 'text-sm' : '',
            iconNameLength > 4 ? 'text-xs' : '',
            'text-white'
          ]" :style="{ backgroundColor: formData.iconType === 'text' ? formData.iconBgColor : '' }">
            <div truncate>{{ formData.iconName }}</div>
          </div>
        </div>

        <div v-if="formData.iconType === 'text'">
          <label for="externalLinkIconName" block text-sm font-medium leading-6 mb-2> 图标名称 </label>
          <WtInput id="externalLinkIconName" :maxlength="10" v-model="formData.iconName" w-full placeholder="请输入图标名称" />
        </div>

        <div>
          <label block text-sm font-medium leading-6 mb-2> 背景色 </label>

          <div flex gap-2>
            <button class="color-item" v-for="item in colors" :key="item" h-5 w-5 rounded-full
              :style="{ backgroundColor: item }" :class="[formData.iconBgColor === item ? 'ring-2' : '']"
              ring="primary offset-1" @click="setBgColor(item, 1)" />
            <div h-5 w-5 rounded-full bg-primary relative
              style="background: conic-gradient(red, #ff4d00, #ff9900, #ffe600, #ccff00, #80ff00, #33ff00, #00ff1a, #00ff66, #00ffb3, aqua, #00b3ff, #0066ff, #001aff, #3300ff, #8000ff, #cc00ff, #ff00e6, #ff0099, #ff004d, red)"
              ring="primary offset-1" :class="[formData.iconColorType === 2 ? 'ring-2' : '']">
              <input type="color" @input="setBgColor($event.target?.value, 2)" opacity-0 inset-0 absolute
                cursor-pointer />
            </div>
          </div>
        </div>
      </div>

      <div flex justify-end pt4 pb3 px6>
        <WtButton text="取消" @click="closed" />
        <WtButton text="确定" type="primary" @click="onSubmit" />
      </div>
    </form>
  </WtabDialog>
</template>
