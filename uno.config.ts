import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  // shortcuts: {
  // 'bg-base': 'bg-green-100 dark:bg-gray-800 color-green-500',
  // 'icon': 'p1 rounded-lg cursor-pointer hover:bg-base ',
  // },
  rules: [
    ['titlebar-area-y', { 'padding-top': 'env(titlebar-area-y, 0)' }],
    ['safe-area-inset-top', { 'padding-top': 'env(safe-area-inset-top, 0)' }],
    ['area-top', { 'padding-top': 'max(env(titlebar-area-height, 0), env(safe-area-inset-top, 0))' }],
    ['safe-area-inset-bottom', { 'padding-top': 'env(safe-area-inset-bottom, 0)' }],
    ['titlebar-area-x', { 'margin-left': 'env(titlebar-area-x, 0)' }],
    ['titlebar-area-height', { 'height': 'env(titlebar-area-height, 38px)' }],
    ['titlebar-area-width', { 'width': 'env(titlebar-area-width, 100%)' }],
    ['drag', { 'app-region': 'drag' }],
    ['no-drag', { 'app-region': 'no-drag' }],
  ],
  theme: {
    colors: {
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
        DEFAULT: `rgba(var(--wt-primary-500))`,
      }
    },
    breakpoints: {
      sm: `${40 * 16}px`,
      md: `${52 * 16}px`,
      lg: `${62 * 16}px`,
    },
    textShadow: {
      default: '0px 0px 1px rgb(0 0 0 / 20%), 0px 0px 1px rgb(1 0 5 / 10%)',
      sm: '1px 1px 3px rgb(36 37 47 / 25%)',
      md: '0px 1px 2px rgb(30 29 39 / 19%), 1px 2px 4px rgb(54 64 147 / 18%)',
      lg: '3px 3px 6px rgb(0 0 0 / 26%), 0 0 5px rgb(15 3 86 / 22%)',
      xl: '1px 1px 3px rgb(0 0 0 / 29%), 2px 4px 7px rgb(73 64 125 / 35%)',
      none: 'none',
    },
  },
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify(),
  ],
})
