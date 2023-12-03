<script setup lang="ts">
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
} from '@headlessui/vue'
import settings from '@/config/settings'

import useLayoutStore from '@/stores/layout'

const layoutStore = useLayoutStore()

interface RootObject {
  text: string
  to: string
  icon: string
}

const list: RootObject[] = [
  { text: '首页', to: '/', icon: 'i-solar-home-bold' },
  { text: '面板', to: '', icon: 'i-solar-clipboard-check-bold' },
  { text: '游戏', to: '', icon: 'i-solar-gamepad-bold' },
  { text: '更多', to: '', icon: 'i-solar-menu-dots-square-bold' },
]
</script>

<template>
  <nav px2 py1 flex items-center h14 border-b>
    <div flex flex-1 gap-1>
      <NuxtLink v-for="(item, i) in list" :key="i" :to="item.to" exact-active-class="bg-base" icon>
        <div :class="item.icon" text-lg />
      </NuxtLink>
    </div>

    <div flex justify-center grow-2>
      <RadioGroup v-if="layoutStore.editMode" v-model="layoutStore.deviceType">
        <RadioGroupLabel class="sr-only">
          设备类型布局
        </RadioGroupLabel>
        <div flex justify-around gap-0.5 bg-gray-200 rounded-md h-full>
          <RadioGroupOption v-for="item in settings.deviceList" v-slot="{ checked }" :key="item.type" :value="item.type">
            <button
              flex items-center gap-0.5 py2 px4 rounded-md hover:bg-violet-500 hover:text-white :class="[
                checked ? 'bg-violet-500 text-white' : 'text-gray-900',
              ]" @click="layoutStore.deviceType = item.type"
            >
              <div :class="item.icon" text-lg /><span leading-none>{{ item.type }}</span>
            </button>
          </RadioGroupOption>
        </div>
      </RadioGroup>
    </div>
    <div flex flex-1 justify-end gap-2>
      <div v-show="layoutStore.editMode" flex gap-2>
        <button
          border py2 px4 rounded-md text-black text-sm leading-none
          class="hover:bg-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          取消
        </button>
        <button
          bg-violet-500 py2 px4 rounded-md text-white text-sm leading-none
          class="hover:bg-violet/100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          保存
        </button>
      </div>
      <WtabMenu />
    </div>
  </nav>
</template>
