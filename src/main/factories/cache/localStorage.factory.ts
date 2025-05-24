import { LocalStorageAdapter } from '@/infra/cache/localStorage.adapter'

export const makeLocalStorageAdapter = (): LocalStorageAdapter => new LocalStorageAdapter()