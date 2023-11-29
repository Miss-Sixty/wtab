<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

const isOpenSettings = ref(false)
const isOpenAbout = ref(false)
const isOpenAddWidgets = ref(false)
const menuList = [
  [{ label: '常规设置', active: () => isOpenSettings.value = true }],
  [{ label: '添加小组件', active: () => isOpenAddWidgets.value = true }, { label: '编辑小组件', active: () => { } }],
  [{ label: '关于', active: () => isOpenAbout.value = true }],
]
</script>

<template>
  <Menu as="div" relative inline-block>
    <MenuButton icon>
      <div i-solar-settings-bold text-lg />
    </MenuButton>

    <transition
      enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="ring-black/5" mt1 ring-1 absolute w40 right-0 origin-top-right divide-y divide-gray-100 rounded-md
        bg-white shadow-lg
      >
        <ThemeSelect />
        <div v-for="(items, i) in menuList" :key="i" p1>
          <MenuItem v-for="(item, j) in items" v-slot="{ active }" :key="j">
            <button
              flex w-full rounded-md px-2 py-2 text-sm :class="[
                active ? 'bg-violet-500 text-white' : 'text-gray-900',
              ]" @click="item.active"
            >
              {{ item.label }}
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
  <ClientOnly>
    <WtabSettings v-model="isOpenSettings" />
    <WtabAbout v-model="isOpenAbout" />
    <WtabAddWidgets v-model="isOpenAddWidgets" />
  </ClientOnly>
</template>
