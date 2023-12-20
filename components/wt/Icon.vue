<script setup lang="ts">
const props = defineProps({
  size: {
    type: String,
    default: 'base',
  },
  icon: {
    type: String,
    default: '',
  },
})

interface Status {
  [key: string]: string
}
const btnClass = computed(() => {
  const status: Status = {
    sm: 'p-1 text-base',
    base: 'p-1 text-base',
    lg: 'p-2 text-lg',
    xl: 'p-2.5 text-xl',
  }
  return status[props.size]
})
</script>

<template>
  <button
    type="button"
    rounded-full bg-transparent hover:text-indigo-600
    flex="~ items-center"
    focus-visible="outline outline-2 outline-offset-2 outline-indigo-600"
    :class="btnClass"
    dark="hover:text-indigo-400 focus-visible:outline-indigo-500"
    transition
  >
    <div :class="icon" aria-hidden="true" />
  </button>
</template>
