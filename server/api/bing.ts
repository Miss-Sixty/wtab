export default defineEventHandler(async () => {
  try {
    const { images }: any = await $fetch('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN')
    const baseData = {
      copyright: '威尼斯旧港，克里特岛，希腊 (© Gatsi/Getty Images)',
      urlbase: '/th?id=OHR.CreteHarbor_ZH-CN0937533372',
    }
    const [firstData = baseData] = images || []

    return {
      data: {
        copyright: firstData.copyright,
        urlbase: firstData.urlbase,
      }
    }
  } catch (e) {
    console.log('err', e);
  }
})

