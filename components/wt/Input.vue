<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  required: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  modelModifiers: {
    type: Object as PropType<{ trim?: boolean, lazy?: boolean, number?: boolean }>,
    default: () => ({}),
  },
})
const emit = defineEmits(['update:modelValue', 'blur', 'input'])

function looseToNumber(val: any): any {
  const n = Number.parseFloat(val)
  return Number.isNaN(n) ? val : n
}

const modelModifiers = ref({ trim: false, lazy: false, number: false, ...props.modelModifiers })
// Custom function to handle the v-model properties
function updateInput(value: string) {
  if (modelModifiers.value.trim)
    value = value.trim()

  if (modelModifiers.value.number || props.type === 'number')
    value = looseToNumber(value)

  emit('update:modelValue', value)
  // emitFormInput()
}

function onInput(event: Event) {
  if (!modelModifiers.value.lazy)
    updateInput((event.target as HTMLInputElement).value)
}

function onChange(event: Event) {
  const value = (event.target as HTMLInputElement).value

  if (modelModifiers.value.lazy)
    updateInput(value)

  // Update trimmed input so that it has same behaviour as native input https://github.com/vuejs/core/blob/5ea8a8a4fab4e19a71e123e4d27d051f5e927172/packages/runtime-dom/src/directives/vModel.ts#L63
  if (modelModifiers.value.trim)
    (event.target as HTMLInputElement).value = value.trim()
}

function onBlur(event: FocusEvent) {
  // emitFormBlur()
  emit('blur', event)
}
const inputRef = ref()
</script>

<template>
  <div>
    <input
      ref="inputRef"
      :value="modelValue"
      :type="type"
      :required="required"
      :placeholder="placeholder"
      :disabled="disabled"
      v-bind="$attrs"
      relative
      block
      w-full

      disabled:cursor-not-allowed disabled:opacity-75
      rounded-md
      placeholder-gray-400
      text-sm
      px-2.5
      py-1.5
      bg-white
      text-gray-900
      dark="focus:ring-primary-400 placeholder-gray-500 bg-gray-900 ring-gray-700 text-white"
      ring ring-gray-300
      focus:ring-2 focus:ring-primary ring-inset focus:outline-none
      @input="onInput"
      @blur="onBlur"
      @change="onChange"
    >
  </div>
</template>
