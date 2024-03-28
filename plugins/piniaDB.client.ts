import type { PiniaPluginContext } from 'pinia'
import { openDB } from 'idb';
import { clone } from 'remeda'

const initDb = () => {
  return openDB('wtabDB', 1, {
    upgrade(db) {
      db.createObjectStore('wtab');
    },
  });
}

async function PiniaPlugin({ store, options }: PiniaPluginContext) {
  const db = await initDb()
  const paths = options.paths || []

  const state = await db.get('wtab', store.$id);
  if (!state) return
  store.$patch(state);

  store.$subscribe(({ storeId }, state) => {
    // TODO：这里需要优化，不需要每次都存储所有的store
    db.put('wtab', clone(state), storeId)
  })
}


export default defineNuxtPlugin(({ $pinia }: any) => {
  $pinia.use(PiniaPlugin)
})
