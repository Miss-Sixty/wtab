import { JSDOM } from 'jsdom'

function absolutizeUrl(url = '', origin = '') {
  const newUrl = new URL(url, origin)
  return newUrl.toString()
}
export default defineEventHandler(async (event) => {
  const { host }: { host: string } = getQuery(event)
  const baseUrl = host

  const icons: Array<string> = []
  const dom = await JSDOM.fromURL(host, { pretendToBeVisual: true })
  const { document } = dom.window
  const htmlLink = document.querySelectorAll('link')
  
  htmlLink.forEach((link: any) => {
    const rel = (link.getAttribute('rel') || '').toLowerCase()

    if (['icon', 'shortcut icon'].includes(rel))
      icons.push(absolutizeUrl(link.getAttribute('href'), baseUrl))

    if (rel.startsWith('apple-touch-icon'))
      icons.push(absolutizeUrl(link.getAttribute('href'), baseUrl))

    if (rel === 'image_src')
      icons.push(absolutizeUrl(link.getAttribute('href'), baseUrl))

    if (rel === 'twitter:image')
      icons.push(absolutizeUrl(link.getAttribute('href'), baseUrl))

    if (rel === 'mask-icon')
      icons.push(absolutizeUrl(link.getAttribute('href'), baseUrl))
  })

  const metaLink = dom.window.document.querySelectorAll('meta')

  let themeColor
  metaLink.forEach((meta) => {
    const name = (meta.getAttribute('name') || '').toLowerCase()
    if (name === 'theme-color') {
      themeColor = meta.getAttribute('content') || ''
    }
  })

  return {
    data: {
      host,
      icons: [...new Set(icons)].slice(0,18),
      name: document.title,
      themeColor
    },
  }
})

