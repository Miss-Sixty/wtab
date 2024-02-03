<script setup>
import {
  RadioGroup,
  RadioGroupOption,
} from '@headlessui/vue'
const emit = defineEmits(['change', 'update:modelValue'])
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  list: {
    type: Array,
    default: () => [],
  }
})

const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})
const index = computed(() => props.list.findIndex((item) => item.value === modelValue.value))
const activeIndex = ref(index.value === -1 ? -1.1 : index.value)
const beforeWidth = computed(() => (1 / props.list.length) * 100 + '%')
</script>

<template>
  <div inline-flex class="radio-group" p0.5 h7 bg-gray-200 rounded-md text-sm>
    <RadioGroup v-model="modelValue" grid grid-flow-col auto-cols-fr relative class="radio-group-box 
      before:bg-primary before:rounded before:transition-all">
      <RadioGroupOption v-for="(item, i) in list" v-slot="{ disabled, checked }" :disabled="item.disabled"
        :key="item.value" :value="item.value" as="label">
        <input type="radio" sr-only>
        <button truncate transition px2 relative size-full rounded :class="{
          'text-white': checked,
          'disabled:opacity-50 dark:disabled:opacity-40 disabled:cursor-not-allowed': disabled
        }" :disabled="disabled" @click="activeIndex = i">
          {{ item.label }}
        </button>
      </RadioGroupOption>
    </RadioGroup>
  </div>
</template>

<style scoped>
.radio-group :deep(.radio-group-box::before) {
  content: '';
  height: 100%;
  position: absolute;
  pointer-events: none;
  width: v-bind(beforeWidth);
  translate: calc(v-bind(activeIndex) * 100%) 0;
}
</style>