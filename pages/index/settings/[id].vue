<script setup lang="ts">
import menuData from './menu'
import useLayoutStore from '@/stores/layout'
import useAppStore from '@/stores/app'

const layoutStore: any = useLayoutStore()
const appStore: any = useAppStore()
const route: any = useRoute()
const list = computed(() => menuData[route.params.id])

</script>

<template>
  <button v-for="(item, i) in list" :key="i" type="button" flex justify-between items-center w-full
    :class="[item.hover ? 'hover:bg-primary-50 cursor-pointer' : 'cursor-default']" rounded-md p3 sm:px5 text-sm
    @click="appStore[item.switchModel] = !appStore[item.switchModel]">
    <div w-full flex items-center>
      <div sm:mr-5 mr-4 text-2xl :class="item.icon" />
      <div w-full text-left>
        <p>
          {{ item.title }}
        </p>
        <p text-gray-400 text-xs>
          {{ item.desc }}
        </p>
        <component :is="item.component" />
      </div>
    </div>
    <WtSwitch v-if="item.type === 'switch'" v-model="appStore[item.switchModel]" @click.stop />
    <WtInput v-if="item.type === 'inputNumber'" v-model.number="layoutStore[item.switchModel]" placeholder="请输入"
      @click.stop />
    <WtButton v-if="item.type === 'button'" v-bind="item.props" @click.stop="item.fn" />
  </button>
</template>
