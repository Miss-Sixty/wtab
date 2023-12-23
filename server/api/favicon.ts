import { JSDOM } from 'jsdom'

function absolutizeUrl(url = '', origin = '') {
  const newUrl = new URL(url, origin)
  return newUrl.toString()
}
export default defineEventHandler(async (event) => {
  const { host }: { host: string } = getQuery(event)
  const baseUrl = host

  const favicons = []
  const favicon = {
    type: null,
    imgType: null,
    href: null,
    sizes: null,
  }

  const dom = await JSDOM.fromURL(host)
  const { document } = dom.window
  const htmlLink = document.querySelectorAll('link')

  htmlLink.forEach((link) => {
    const rel = (link.getAttribute('rel') || '').toLowerCase()

    if (['icon', 'shortcut icon'].includes(rel)) {
      favicons.push(Object.assign({}, favicon, {
        type: 'icon',
        imgType: link.getAttribute('type'),
        href: absolutizeUrl(link.getAttribute('href'), baseUrl),
        sizes: link.getAttribute('sizes'),
      }))
    }

    if (rel.startsWith('apple-touch-icon')) {
      favicons.push(Object.assign({}, favicon, {
        type: 'apple-touch-icon',
        imgType: link.getAttribute('type'),
        href: absolutizeUrl(link.getAttribute('href'), baseUrl),
        sizes: link.getAttribute('sizes'),
      }))
    }

    if (rel === 'image_src') {
      favicons.push(Object.assign({}, favicon, {
        type: 'image_src',
        imgType: link.getAttribute('type'),
        href: absolutizeUrl(link.getAttribute('href'), baseUrl),
        sizes: link.getAttribute('sizes'),
      }))
    }

    if (rel === 'twitter:image') {
      favicons.push(Object.assign({}, favicon, {
        type: 'image_src',
        imgType: link.getAttribute('type'),
        href: absolutizeUrl(link.getAttribute('href'), baseUrl),
        sizes: link.getAttribute('sizes'),
      }))
    }

    if (rel === 'mask-icon') {
      favicons.push(Object.assign({}, favicon, {
        type: 'mask-icon',
        imgType: link.getAttribute('type'),
        href: absolutizeUrl(link.getAttribute('href'), baseUrl),
        colors: link.getAttribute('sizes'),
      }))
    }
  })

  const metaLink = dom.window.document.querySelectorAll('meta')

  metaLink.forEach((meta) => {
    const name = (meta.getAttribute('name') || '').toLowerCase()

    if (name === 'theme-color') {
      favicons.push(Object.assign({}, favicon, {
        type: 'theme-color',
        content: meta.getAttribute('content'),
      }))
    }

    if (
      name.startsWith('msapplication')
      && name !== 'msapplication-notification'
    ) {
      favicons.push(Object.assign({}, favicon, {
        type: name,
        imgType: name.getAttribute('type'),
        href: absolutizeUrl(name.getAttribute('href'), baseUrl),
        sizes: name.getAttribute('sizes'),
      }))
    }

    const property = (meta.getAttribute('property') || '').toLowerCase()

    if (property === 'og:image') {
      favicons.push(Object.assign({}, favicon, {
        type: 'og:image',
        href: meta.getAttribute('content'),
      }))
    }
  })

  return {
    data: favicons,
  }
})
