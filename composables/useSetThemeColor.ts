// @ts-ignore
import { FastAverageColor } from 'fast-average-color';
// 使用原生语法查找head标签中有无 名称为 theme-color 的 meta 标签，有则替换，无则添加
const colorMeta = (color: string) => {
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) {
    meta.setAttribute('content', color)
  } else {
    const meta = document.createElement('meta')
    meta.setAttribute('name', 'theme-color')
    meta.setAttribute('content', color)
    document.head.appendChild(meta)
  }
}

// 设置主题色
export default async (url: string) => {
  const fac = new FastAverageColor();
  const res = await fac.getColorAsync(url, { height: 10 })
  colorMeta(res.hex)
  fac.destroy();
}
