<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: '',
  },
  width: {
    type: Number,
    default: 600,
  },
  header: {
    type: Boolean,
    default: true,
  },
  className: {
    type: String,
    default: '',
  },
  backRouter: {
    type: String,
    default: '',
  },
})
defineEmits(['update:modelValue', 'closed'])
const router = useRouter()
const modelValue = ref(false)
onMounted(() => {
  modelValue.value = true
})

function closed() {
  modelValue.value = false
  setTimeout(() => router.push('/'), 150)
}
</script>

<template>
  <div fixed left-0 top-0 z-999 right-0 bottom-0 @contextmenu.prevent.stop>
    <Transition enter-active-class="animate-fade-in" leave-active-class="animate-fade-out">
      <div v-show="modelValue" animate-duration-150ms fixed inset-0 h-full w-full backdrop-blur bg-black:25 />
    </Transition>
    <Transition enter-active-class="animate-zoom-in" leave-active-class="animate-zoom-out">
      <div v-show="modelValue" fixed inset-0 flex items-center justify-center animate-duration-150ms>
        <div
          :style="{ width: `${width}px` }" flex flex-col sm:h600px h-full transform overflow-hidden sm:rounded-xl
          bg-white shadow-xl transition-all sm:mx-40px
        >
          <div flex justify-between items-center sm:pl-6 px-1 sm:pr-2 sm:h-14 h-10 shrink-0>
            <div flex justify-between items-center>
              <NuxtLink v-if="backRouter" v-slot="{ navigate }" :to="backRouter" custom>
                <button bg-transparent mr-2 @click="navigate">
                  <div text-2xl i-solar-arrow-left-linear />
                </button>
              </NuxtLink>

              <h3 text-lg font-medium leading-6 text-gray-900>
                {{ title }}
              </h3>
            </div>
            <button
              flex h-9 w-11 items-center justify-center rounded-lg hover:bg-gray-200
              bg-transparent
              transition
              @click="closed"
            >
              <div text-xl i-material-symbols-close-rounded />
            </button>
          </div>
          <div overflow-y-auto flex-1 px1 py1 sm:px6>
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
