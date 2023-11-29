<script setup lang="ts">
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
  <nav px2 py1 flex="~ gap-1 items-center">
    <NuxtLink v-for="(item, i) in list" :key="i" :to="item.to" exact-active-class="bg-base" icon>
      <div :class="item.icon" text-lg />
    </NuxtLink>

    <div flex-auto />
    <WtabMenu />
  </nav>
</template>
