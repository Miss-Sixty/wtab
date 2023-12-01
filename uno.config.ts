import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  shortcuts: {
    'bg-base': 'bg-gray-200  dark:bg-gray-800 ',
    'icon': 'p1.5 rounded-lg cursor-pointer hover:bg-base ',
  },
  theme: {
    extend: {
      colors: {
        green: {
          50: '#EFFDF5',
          100: '#D9FBE8',
          200: '#B3F5D1',
          300: '#75EDAE',
          400: '#00DC82',
          500: '#00C16A',
          600: '#00A155',
          700: '#007F45',
          800: '#016538',
          900: '#0A5331',
          950: '#052e16',
        },
      },

    },
    breakpoints: {
      md: `${40 * 16}px`,
      lg: `${62 * 16}px`,
    },
  },
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify(),
  ],
})
