<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
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
  <WtabDialog v-model="_modelValue" title="关于">
    about
  </WtabDialog>
</template>
