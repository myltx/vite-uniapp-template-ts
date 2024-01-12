import * as Pinia from 'pinia'
import { useAppStore } from './app/index'
import { useMenuStore } from './menu/index'
import { useUserStore } from './user/index'
import { useDictStore } from './dict/index'

export default {
  install(app) {
    app.use(Pinia.createPinia())
    app.config.globalProperties.$store = {
      app: useAppStore(),
      menu: useMenuStore(),
      user: useUserStore(),
      dict: useDictStore(),
    }

    app.config.globalProperties.$permission = key =>
      useMenuStore().permission[key]
  },
  useAppStore,
  useMenuStore,
  useUserStore,
  useDictStore,
  Pinia,
}
