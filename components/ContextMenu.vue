<script setup lang="ts">
import { computePosition, flip, shift } from '@floating-ui/dom'

const emit = defineEmits(['settingsBase', 'addWidgets', 'editMode', 'about', 'delWidgets'])

function originMiddlewareFn(type: string) {
  const placementMap: any = {
    'left-start': '90% 0%',
    'right-start': '0% 0%',
  }

  return {
    name: 'origin',
    fn: ({ placement }: any) => {
      const status: any = {
        settingsBase: '90% 0%',
        widget: placementMap[placement],
        base: placement === 'left-start' ? '90% 0%' : '0% 0%',
      }
      return {
        data: {
          transformOrigin: status[type],
        },
      }
    },
  }
}

const contextmenuType = ref('')
const menuList = [
  [{ label: '常规设置', active: () => emit('settingsBase') }],
  [
    { label: '添加小组件', active: () => emit('addWidgets') },
    { label: '编辑桌面', active: () => emit('editMode') },
    // { label: '删除此小组件', active: () => emit('delWidgets') },
  ],
  [{ label: '关于', active: () => emit('about') }],
]

const options: any = {
  settingsBase: {
    placement: 'bottom-start',
    middleware: [originMiddlewareFn('settingsBase')],
  },
  widget: {
    placement: 'right-start',
    middleware: [originMiddlewareFn('widget')],
  },
  base: {
    placement: 'right-start',
    middleware: [originMiddlewareFn('base')],
  },
}
// =================================================================
const floatingRef = ref()
const popperVisible = ref(false)
const styles = ref({
  top: '0px',
  left: '0px',
  transformOrigin: '0% 0%',
})
async function open(config = {}) {
  const { ref, type = 'base' }: any = config
  contextmenuType.value = type
  popperVisible.value = true
  const { placement, middleware } = options[type]
  const position = await computePosition(unrefElement(ref), floatingRef.value, {
    placement,
    middleware: [flip(), shift(), ...middleware],
    strategy: 'fixed',
  })

  styles.value.top = `${position.y}px`
  styles.value.left = `${position.x}px`
  styles.value.transformOrigin = position.middlewareData.origin.transformOrigin
}

// 点击外部关闭
onClickOutside(floatingRef, () => {
  popperVisible.value = false
})
function onClick(item: any) {
  popperVisible.value = false
  item.active()
}
watch(popperVisible, () => {
  contextmenuType.value = ''
})

defineExpose({ open })
</script>

<template>
  <Teleport to="body">
    <Transition enter-active-class="animate-zoom-in transition-none" leave-active-class="animate-zoom-out">
      <ul
        v-show="popperVisible" ref="floatingRef" transform-gpu animate-duration-150ms animate-fast :style="styles"
        ring-black:5 mt1 ring-1 absolute w40 right-0 origin-top-right divide-y divide-gray-100 rounded-md bg-white
        shadow-lg z-1
      >
        <div v-for="(items, i) in menuList" :key="i" p1>
          <template v-for="(item, j) in items" :key="j">
            <button
              flex w-full rounded-md px-2 py-2 text-sm text-gray-900 hover:bg-violet-500 hover:text-white
              @click="onClick(item)"
            >
              {{ item.label }}
            </button>
          </template>
        </div>
      </ul>
    </Transition>
  </Teleport>
</template>
