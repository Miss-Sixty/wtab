<script setup>
defineProps({
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
defineEmits(['update:modelValue'])
</script>

<template>
  <Teleport to="body">
    <div fixed left-0 top-0 z-5 @contextmenu.prevent.stop>
      <Transition enter-active-class="animate-fade-in" leave-active-class="animate-fade-out">
        <div v-show="modelValue" animate-duration-150ms fixed inset-0 h-full w-full backdrop-blur bg-black:25 />
      </Transition>
      <Transition enter-active-class="animate-zoom-in" leave-active-class="animate-zoom-out">
        <div v-show="modelValue" fixed inset-0 flex items-center justify-center animate-duration-150ms>
          <div
            :style="{ width: `${width}px` }" flex flex-col sm:h600px h-full transform overflow-hidden sm:rounded-xl
            bg-white shadow-xl transition-all sm:mx-40px
          >
            <div flex justify-between items-center pl-6 pr-2 h52px shrink-0>
              <h3 text-lg font-medium leading-6 text-gray-900>
                {{ title }}
              </h3>
              <button
                flex h-9 w-11 items-center justify-center rounded-lg hover:bg-primary-100
                transition
                @click="$emit('update:modelValue', false)"
              >
                <div text-xl i-material-symbols-close-rounded text-gray-400 />
              </button>
            </div>
            <div overflow-y-auto flex-1 px6 py1>
              <slot />
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>
