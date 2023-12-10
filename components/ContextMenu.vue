<script setup lang="ts">
import { computePosition, flip, shift } from '@floating-ui/dom'
import useLayoutStore from '@/stores/layout'
const emit = defineEmits(['settingsBase', 'addWidgets', 'editMode', 'about', 'delWidgets'])
// defineOptions({
//   name: 'ContextMenu',
// })
// const props = defineProps({
//   addWidget: {
//     type: Boolean,
//     default: false,
//   },
// })
// const emit = defineEmits(['update:addWidget', 'del'])
// const layoutStore = useLayoutStore()
// const { editMode } = storeToRefs(layoutStore)
// const options: any = {
//   settingIcon: {
//     placement: 'bottom-end',
//     middleware: [
//       offset(6),
//       flip(),
//       shift(),
//       { fn: () => (styles.value.transformOrigin = '90% 0%') },
//     ],
//     transformOrigin: '90% 0%',
//   },
//   widgetContextmenu: {
//     placement: 'bottom-start',
//     middleware: [
//       offset(6),
//       flip(),
//       shift(),
//       {
//         fn: ({ placement }: any) => {
//           const placementMap: any = {
//             'bottom-start': '0% 0%',
//             'bottom-end': '100% 0%',
//             'top-start': '0% 100%',
//             'top-end': '100% 100%',
//           }
//           return (styles.value.transformOrigin = placementMap[placement])
//         },
//       },
//     ],
//     transformOrigin: '90% 0%',
//   },
//   base: {
//     placement: 'right-start',
//     middleware: [
//       flip(),
//       shift(),
//       {
//         fn: ({ placement }: any) =>
//           (styles.value.transformOrigin = placement === 'left-start' ? '90% 0%' : '0% 0%'),
//       },
//     ],
//     transformOrigin: '0% 0%',
//   },
// }

const menuList = [
  [{ label: '常规设置', active: () => emit('settingsBase') }],
  [
    { label: '添加小组件', active: () => emit('addWidgets') },
    { label: '编辑桌面', active: () => emit('editMode') },
    { label: '删除此小组件', active: () => emit('delWidgets') },
  ],
  [{ label: '关于', active: () => emit('about') }],
]
// =================================================================
const floatingRef = ref()
const popperVisible = ref(false)
const styles = ref({
  top: '0px',
  left: '0px',
  transformOrigin: '0% 0%',
})
async function open(config = {}) {
  const { ref, placement = 'bottom-end', transformOrigin = '90% 0%' }: any = config
  popperVisible.value = true
  const position = await computePosition(unrefElement(ref), floatingRef.value, {
    placement,
    middleware: [flip(), shift()],
    strategy: 'fixed',
  })
  styles.value.transformOrigin = transformOrigin
  styles.value.top = `${position.y}px`
  styles.value.left = `${position.x}px`
}

// 点击外部关闭
onClickOutside(floatingRef, () => {
  popperVisible.value = false
})
function onClick(item: any) {
  popperVisible.value = false
  item.active()
}
defineExpose({ open })
</script>

<template>
  <Teleport to="body">
    <Transition enter-active-class="animate-zoom-in transition-none" leave-active-class="animate-zoom-out">
      <ul
        v-show="popperVisible" ref="floatingRef" transform-gpu animate-duration-200ms animate-fast :style="styles"
        ring-black:5 mt1 ring-1 absolute w40 right-0 origin-top-right divide-y divide-gray-100 rounded-md bg-white
        shadow-lg z-1
      >
        <div v-for="(items, i) in menuList" :key="i" p1>
          <button
            v-for="(item, j) in items" :key="j" flex w-full rounded-md px-2 py-2 text-sm text-gray-900
            hover:bg-violet-500 hover:text-white @click="onClick(item)"
          >
            {{ item.label }}
          </button>
        </div>
      </ul>
    </Transition>
  </Teleport>
</template>
