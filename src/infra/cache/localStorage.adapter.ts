import { GetStorage } from '@/data/protocols/cache/getStorage'
import { SetStorage } from '@/data/protocols/cache/setStorage'

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set (key: string, value: object): void {
    if (Object.keys(value).length != 0) {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      localStorage.removeItem(key)
    }
  }

  get (key: string): any {
    const value = localStorage.getItem(key)
    if(value) return JSON.parse(value)
  }
}