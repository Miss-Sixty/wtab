<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

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
  <TransitionRoot appear :show="_modelValue" as="template">
    <Dialog as="div" relative z10>
      <TransitionChild
        as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0"
      >
        <div fixed inset-0 class="bg-black/25" />
      </TransitionChild>

      <div fixed inset-0 flex items-center justify-center>
        <TransitionChild
          as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <DialogPanel
            :style="{ width: `${width}px` }" flex flex-col md:h600px h-full transform overflow-hidden
            md:rounded-xl bg-white pb6 shadow-xl transition-all md:mx-40px
          >
            <div flex justify-between items-center pl-6 pr-2 h52px shrink-0>
              <DialogTitle as="h3" text-lg font-medium leading-6 text-gray-900>
                {{ title }}
              </DialogTitle>
              <button flex h-9 w-11 items-center justify-center rounded-lg hover:bg-gray-200 @click="_modelValue = false">
                <div text-xl i-material-symbols-close-rounded />
              </button>
            </div>
            <div overflow-y-auto px6 py1>
              <slot />
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
