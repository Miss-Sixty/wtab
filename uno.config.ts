import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  shortcuts: {
    // 'bg-base': 'bg-green-100 dark:bg-gray-800 color-green-500',
    // 'icon': 'p1 rounded-lg cursor-pointer hover:bg-base ',
  },
  theme: {
    colors: {
      veryCool: '#0000ff', // class="text-very-cool"
      primary: {
        50: `rgba(var(--wt-primary-50))`,
        100: `rgba(var(--wt-primary-100))`,
        200: `rgba(var(--wt-primary-200))`,
        300: `rgba(var(--wt-primary-300))`,
        400: `rgba(var(--wt-primary-400))`,
        500: `rgba(var(--wt-primary-500))`,
        600: `rgba(var(--wt-primary-600))`,
        700: `rgba(var(--wt-primary-700))`,
        800: `rgba(var(--wt-primary-800))`,
        900: `rgba(var(--wt-primary-900))`,
        950: `rgba(var(--wt-primary-950))`,
        DEFAULT: `rgba(var(--wt-primary-DEFAULT))`,
      },
      gray: {
        50: `rgba(var(--wt-gray-50))`,
        100: `rgba(var(--wt-gray-100))`,
        200: `rgba(var(--wt-gray-200))`,
        300: `rgba(var(--wt-gray-300))`,
        400: `rgba(var(--wt-gray-400))`,
        500: `rgba(var(--wt-gray-500))`,
        600: `rgba(var(--wt-gray-600))`,
        700: `rgba(var(--wt-gray-700))`,
        800: `rgba(var(--wt-gray-800))`,
        900: `rgba(var(--wt-gray-900))`,
        950: `rgba(var(--wt-gray-950))`,
        DEFAULT: `rgba(var(--wt-gray-DEFAULT))`,
      },
    },
    breakpoints: {
      sm: `${40 * 16}px`,
      md: `${52 * 16}px`,
      lg: `${62 * 16}px`,
    },
  },
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify(),
  ],
})
