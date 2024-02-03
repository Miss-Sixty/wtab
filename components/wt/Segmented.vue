<script setup>
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
} from '@headlessui/vue'
const emit = defineEmits(['change'])
defineProps({
  list: {
    type: Array,
    default: () => [],
  }
})
const modelValue = defineModel()
const labelRef = ref()
const firstDomRef = computed(() => labelRef?.[0])
const clientWidth = ref(0)
const offsetLeft = ref(0)
const isInit = ref(false)

const onActive = (ev, item) => {
  clientWidth.value = ev.target.clientWidth;
  offsetLeft.value = ev.target.offsetLeft;
  emit('change', item.value);
}
watch(firstDomRef, val => {
  console.log(99, val);
}, { initial: true })
watch(labelRef, val => {
  console.log(88, val);
})

// async function init() {
//   await nextTick()
//   console.log(11, labelRef.value);
//   // const [firstEl] = labelRef.value
//   console.log(22, firstDomRef.value);
//   clientWidth.value = firstDomRef.$el.clientWidth;
//   offsetLeft.value = firstDomRef.$el.offsetLeft;
//   console.log(33, clientWidth.value);
//   console.log(44, offsetLeft.value);
//   isInit.value = true;
// }

// onMounted(() => {
//   init()
// })
</script>

<template>
  <RadioGroup v-model="modelValue" p0.5 h7 bg-gray-200 rounded-md text-sm>
    <div relative flex="~ items-center" h-full w-full>
      <span v-if="isInit" bg-primary rounded h-full absolute left-0 top-0 transition-all :style="{
        width: clientWidth + 'px',
        transform: `translateX(${offsetLeft}px)`,
      }" />
      <RadioGroupOption ref="labelRef" v-for="item in list" v-slot="{ disabled, checked }" :disabled="item.disabled"
        :key="item.value" :value="item.value" @click="onActive($event, item)">
        <button transition px2 relative :class="{
          'text-white': checked,
          'disabled:opacity-50 dark:disabled:opacity-40 disabled:cursor-not-allowed': disabled
        }" :disabled="disabled">
          {{ item.label }}
        </button>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>
