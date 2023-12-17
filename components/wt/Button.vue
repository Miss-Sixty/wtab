<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'base',
  },
  icon: {
    type: String,
    default: '',
  },
  round: {
    type: Boolean,
    default: false,
  },
  plain: {
    type: Boolean,
    default: false,
  },
})

interface Status {
  [key: string]: {
    btn: string
    icon: string
  }
}
const btnClass = computed(() => {
  const status: Status = {
    sm: {
      btn: 'px-3 h-7 text-sm',
      icon: 'text-base',
    },
    base: {
      btn: 'px-3 h-8 text-sm',
      icon: 'text-lg',
    },
    lg: {
      btn: 'px-3.5 h-9 text-sm',
      icon: 'text-xl',
    },
  }
  return status[props.size]
})

const plainClass = computed(() => {
  const status = {
    plain: 'bg-gray-200 text-black hover:bg-indigo-100 dark:bg-gray-500 dark:hover:bg-gray-400 dark:focus-visible:outline-gray-500',
    default: `bg-indigo-600 text-white hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500`,
  }
  return status[props.plain ? 'plain' : 'default']
})
</script>

<template>
  <button
    type="button"
    shadow-sm
    flex="~ items-center"
    focus-visible="outline outline-2 outline-offset-2 outline-indigo-600"
    :class="[
      btnClass.btn,
      round ? 'rounded-full' : 'rounded-md',
      plainClass,
    ]"
  >
    <div v-if="icon" :class="[btnClass.icon, icon, { 'mr-1': $slots.default }]" aria-hidden="true" />
    <slot>{{ text }}</slot>
  </button>
</template>
