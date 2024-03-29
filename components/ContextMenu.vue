<script setup lang="ts">
import { computePosition, flip, shift } from '@floating-ui/dom'

const emit = defineEmits(['editMode', 'delWidgets'])

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
  [{ label: '常规设置', type: 'settingsBase', to: '/settings' }],
  [
    { label: '添加小组件', type: 'addWidgets', to: '/widgets' },
    { label: '编辑桌面', type: 'editMode' },
    { label: '删除此小组件', type: 'delWidgets', visibles: ['widget'] },
  ],
  [
    { label: '关于', type: 'about', to: '/about', visibles: ['settingsBase'] },
  ],
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
})
async function onClick(item: any) {
  popperVisible.value = false
  const paths = ['roadmap', 'about', 'addWidgets']
  if (paths.includes(item.type))
    await navigateTo({ path: `/${item.type}` })

  else emit(item.type)
}

defineExpose({ open })

const activeItem = (activeItem: Function) => {
  popperVisible.value = false
  activeItem()
}
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition type="animation" enter-active-class="animate-zoom-in transition-none"
        leave-active-class="animate-zoom-out ">
        <div v-show="popperVisible" ref="floatingRef" animate-duration-100ms :style="styles" ring-black:5 mt1 ring-1
          absolute w40 right-0 origin-top-right divide-y rounded-md shadow-lg z-1
          class="bg-white dark:bg-#18181B dark:divide-gray-800 transition-property-[top,left] transition-duration-100ms">
          <slot>
            <div v-for="(items, i) in showMenuList" :key="i" p1>
              <template v-for="(item, j) in items" :key="j">
                <NuxtLink v-if="item.to" v-slot="{ navigate }" :to="item.to" custom>
                  <button bg-inherit flex w-full rounded-md px-2 py-2 text-sm hover:text-white dark:text-gray-300
                    dark:hover:text-gray-300
                    :class="item.type === 'delWidgets' ? 'text-red-500  hover:bg-red-400' : 'hover:bg-primary text-gray-900'"
                    @click="activeItem(navigate)">
                    {{ item.label }}
                  </button>
                </NuxtLink>

                <button v-else bg-inherit flex w-full rounded-md px-2 py-2 text-sm hover:text-white dark:text-gray-300
                  dark:hover:text-gray-300
                  :class="item.type === 'delWidgets' ? 'text-red-500  hover:bg-red-400' : 'hover:bg-primary text-gray-900'"
                  @click="onClick(item)">
                  {{ item.label }}
                </button>
              </template>
            </div>
          </slot>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>
