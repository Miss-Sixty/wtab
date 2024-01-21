<script setup lang="ts">
export interface Props {
  text?: string
  size?: 'sm' | 'base' | 'lg'
  type?: 'danger' | 'primary' | 'default'
  icon?: string
  round?: boolean
  loading?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'base',
  type: 'default',
})

interface SizeStatus {
  [key: string]: string
}
const sizeClass = computed(() => {
  const status: SizeStatus = {
    sm: 'h-6 px-2',
    base: 'h-8 px-4 py-1',
    lg: 'h-10 px-4 py-1.5',
  }
  return status[props.size]
})

const typeClass = computed(() => {
  const status: any = {
    danger: `
    text-#fff
    bg-red-500
    hover:bg-red
    active:bg-red-500
    disabled:hover:bg-red-500
    dark:bg-red-600
    dark:hover:bg-red-700
    dark:active:bg-red-600
    dark:disabled:hover:bg-red-600
   `,
    primary: `
    text-#fff
    bg-primary
    hover:bg-primary-400
    active:bg-primary
    disabled:hover:bg-primary
    dark:bg-primary-600
    dark:hover:bg-primary-700
    dark:active:bg-primary-600
    dark:disabled:hover:bg-primary-600
    `,
    default: `
    text-black
    bg-gray-200
    hover:bg-gray-100
    active:bg-gray-200
    disabled:hover:bg-gray-200
    dark:bg-gray-300
    dark:hover:bg-gray-400
    dark:active:bg-gray-300
    dark:disabled:hover:bg-gray-300
   `,
  }
  return status[props.type]
})
</script>

<template>
  <button type="button" 
    inline-flex items-center
    shadow-sm text-sm leading-none select-none touch-manipulation
    focus-visible="outline outline-2 outline-offset-1 outline-primary" disabled:opacity-50 dark:disabled:opacity-40
    disabled:cursor-not-allowed whitespace-nowrap 
    :class="[
      'next-[button]-ml3',
      sizeClass,
      typeClass,
      round ? 'rounded-full' : 'rounded-md',
    ]" :disabled="disabled || loading">
    <svg v-if="loading" animate-spin mr-1 w-1em h-1em fill="none" viewBox="0 0 24 24">
      <circle opacity-25 cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path opacity-75 fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
    <div v-else-if="icon" mr-1 :class="[icon]" aria-hidden="true" />
    <slot>{{ text }}</slot>
  </button>
</template>
