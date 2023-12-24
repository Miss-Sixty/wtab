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
  loading: {
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
      btn: 'px-3 h-6 text-sm',
      icon: 'text-base',
    },
    base: {
      btn: 'px-3 h-6 text-sm',
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
    plain: 'bg-gray-200 text-black hover:bg-violet-100 dark:bg-gray-500 dark:hover:bg-gray-400 dark:focus-visible:outline-gray-500',
    default: `bg-violet-600 text-white hover:bg-violet-500 dark:bg-violet-500 dark:hover:bg-violet-400 dark:focus-visible:outline-violet-500`,
  }
  return status[props.plain ? 'plain' : 'default']
})

const iconOrLoading = computed(() => {
  return props.loading ? '' : props.icon
})
</script>

<template>
  <button
    type="button"
    shadow-sm
    flex="~ items-center"
    focus-visible="outline outline-2 outline-offset-2 outline-violet-600"
    :class="[
      btnClass.btn,
      round ? 'rounded-full' : 'rounded-md',
      plainClass,
      loading ? 'cursor-not-allowed outline-violet-300' : '',
    ]"
  >
    <svg v-if="loading" class="animate-spin mr-1 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
    <div v-else-if="icon" :class="[btnClass.icon, iconOrLoading, { 'mr-1': $slots.default }]" aria-hidden="true" />

    <slot>{{ text }}</slot>
  </button>
</template>
