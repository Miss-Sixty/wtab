import { colors } from '@unocss/preset-mini/colors'
import { hexToRgb } from '@/utils/index'
import type { ColorPalette, Colors } from '@/types/index'

type Shade = keyof ColorPalette

const primaryColors = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']
const colorPalette = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']
const filteredPrimaryColors = filteredColors(primaryColors, colorPalette)
// 将 colors 中的颜色值过滤出 colorPalette 中的颜色值
function filteredColors(colorsName: Array<string>, colorPalette: Array<string>) {
  return Object.fromEntries(
    Object.entries(colors)
      .filter(([key]) => colorsName.includes(key))
      .map(([key, value]) => [key, Object.fromEntries(
        Object.entries(value)
          .filter(([key]) => colorPalette.includes(key)),
      )]),
  ) as unknown as Record<string, ColorPalette>
}

export function useUnaThemes() {
  const primaryThemes = Object.entries(filteredPrimaryColors).map(([color]) => [
    color,
    getColors(color, 'primary'),
  ]) as [string, Colors][]

  // transfer to utils
  function getColors(color: string, prefix: string): Colors {
    const colorPalette: ColorPalette = filteredPrimaryColors[color]
    const colors = {} as Required<Colors> // Initialize an empty object to store the theme colors

    colors[`--wt-${prefix}-hex`] = colorPalette[500] as string // Assign the primary color hex code to the corresponding theme variable

    // Iterate over each shade in the color palette and assign it to the corresponding theme variable
    for (const shade of Object.keys(colorPalette) as unknown as Shade[])
      colors[`--wt-${prefix}-${shade}`] = hexToRgb(colorPalette[shade]).join(', ')

    return colors
  }
  function getPrimaryColors(color: string) {
    return primaryThemes.filter(([colorName, _]) => colorName === color)[0][1]
  }

  return {
    primaryThemes,
    getPrimaryColors,
  }
}
