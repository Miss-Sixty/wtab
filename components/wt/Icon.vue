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
    rounded-full bg-transparent hover:text-violet-600
    flex="~ items-center"
    focus-visible="outline outline-2 outline-offset-2 outline-violet-600"
    :class="btnClass"
    dark="hover:text-violet-400 focus-visible:outline-violet-500"
    transition
  >
    <div :class="icon" />
  </button>
</template>
