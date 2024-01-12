import storage from '@/utils/storages/index'

export function setToken(data) {
  storage.set('token', data)
}

export const getToken = () => storage.get('token')

export function removeToken() {
  storage.remove('token')
}
