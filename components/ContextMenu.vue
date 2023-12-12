<script setup lang="ts">
import { computePosition, flip, shift } from '@floating-ui/dom'

const emit = defineEmits(['settingsBase', 'addWidgets', 'editMode', 'about', 'delWidgets', 'closed'])

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

const floatingRef = ref()
const popperVisible = ref(false)
const styles = ref({
  top: '0px',
  left: '0px',
  transformOrigin: '0% 0%',
})
const contextMenuType = ref('base')
async function open(config = {}) {
  const { ref, type = 'base' }: any = config
  contextMenuType.value = type
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

const menuList = [
  [{ label: '常规设置', type: 'settingsBase' }],
  [
    { label: '添加小组件', type: 'addWidgets' },
    { label: '编辑桌面', type: 'editMode' },
    { label: '删除此小组件', type: 'delWidgets', visibles: ['widget'] },
  ],
  [{ label: '关于', type: 'about', visibles: ['settingsBase'], active: () => emit('about') }],
]
const showMenuList = computed(() => {
  return menuList.map((item) => {
    return item.filter((i) => {
      if (Array.isArray(i.visibles))
        return i.visibles.includes(contextMenuType.value)
      return i.visibles || true
    })
  }).filter(item => item.length)
})

// 点击外部关闭
onClickOutside(floatingRef, () => {
  popperVisible.value = false
  emit('closed')
})
function onClick(item: any) {
  popperVisible.value = false
  emit(item.type)
}

defineExpose({ open })
</script>

<template>
  <Teleport to="body">
    <Transition
      type="animation" enter-active-class="animate-zoom-in transition-none"
      leave-active-class="animate-zoom-out "
    >
      <ul
        v-show="popperVisible" ref="floatingRef" animate-duration-150ms :style="styles" ring-black:5 mt1 ring-1 absolute
        w40 right-0 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg z-1 transition-width
        transition-height
      >
        <div v-for="(items, i) in showMenuList" :key="i" p1>
          <template v-for="(item, j) in items" :key="j">
            <button
              flex w-full rounded-md px-2 py-2 text-sm hover:text-white
              :class="item.type === 'delWidgets' ? 'text-red-500  hover:bg-red-400' : 'hover:bg-violet-500 text-gray-900'"
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
