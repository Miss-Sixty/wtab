<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  width: {
    type: Number,
    default: 600,
  },
})
const emit = defineEmits(['update:modelValue'])
const _modelValue = computed({
  get() {
    return props.modelValue
  },
  set(bl) {
    emit('update:modelValue', bl)
  },
})
</script>

<template>
  <Teleport to="body">
    <div fixed left-0 top-0 z-999 @contextmenu.prevent.stop>
      <Transition enter-active-class="animate-fade-in" leave-active-class="animate-fade-out">
        <div v-show="modelValue" animate-duration-150ms fixed inset-0 h-full w-full backdrop-blur bg-black:25 />
      </Transition>
      <Transition enter-active-class="animate-zoom-in" leave-active-class="animate-zoom-out">
        <div v-show="modelValue" fixed inset-0 flex items-center justify-center animate-duration-150ms>
          <div
            :style="{ width: `${width}px` }" flex flex-col md:h600px h-full transform overflow-hidden md:rounded-xl
            bg-white pb6 shadow-xl transition-all md:mx-40px
          >
            <div flex justify-between items-center pl-6 pr-2 h52px shrink-0>
              <h3 text-lg font-medium leading-6 text-gray-900>
                {{ title }}
              </h3>
              <button flex h-9 w-11 items-center justify-center rounded-lg hover:bg-gray-200 @click="_modelValue = false">
                <div text-xl i-material-symbols-close-rounded />
              </button>
            </div>
            <div overflow-y-auto px6 py1>
              <slot />
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>
