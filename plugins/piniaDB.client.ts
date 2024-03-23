import type { PiniaPluginContext } from 'pinia'
import { openDB } from 'idb';
import { clone } from 'remeda'
import useLayoutStore from '@/stores/layout'
import useAppStore from '@/stores/app'

// export default defineNuxtPlugin(() => {
const initDb = () => {
  return openDB('wtabDB', 1, {
    upgrade(db) {
      db.createObjectStore('wtab');
    },
  });
}

async function PiniaPlugin({ store }: PiniaPluginContext) {
  // 需要优化，可以并行获取
  const db = await initDb()

  let layoutData = await db.get('wtab', 'layoutStore');
  const layoutStore = useLayoutStore()
  layoutStore.$patch(layoutData)

  let appData = await db.get('wtab', 'appStore');
  const appStore = useAppStore()
  appStore.$patch(appData)


  store.$subscribe(({ storeId }, state) => {
    // TODO：这里需要优化，不需要每次都存储所有的store
    db.put('wtab', clone(state), storeId)
  })
}

const piniaPlugina = ({ $pinia }: any) => {
  $pinia.use(PiniaPlugin)
}
//   return piniaPlugina
// })
export default piniaPlugina
