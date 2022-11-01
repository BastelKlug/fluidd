// reset store function

import * as stores from '@/stores'

export const storesReset = async (payload?: string[]) => {
  const p: Promise<void>[] = [] // Maybe we do not need the async reset action? Pinia has a sync $reset function?
  if (payload) {
    for (const test of payload) {
      p.push(stores[test as keyof typeof stores]().reset())
    }
  } else { // if payload is undefined, reset all stores
    for (const test in stores) {
      p.push(stores[test as keyof typeof stores]().reset())
    }
  }
  return Promise.all(p)
}
