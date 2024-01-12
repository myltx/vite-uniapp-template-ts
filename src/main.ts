import { createSSRApp } from 'vue'

import 'virtual:uno.css'

import App from './App.vue'

import store from './store/index'

import router from './router/index'
import routerGuards from './router/guards/index'

import api from './api/index'
import plugins from './plugins/index'
import mixins from './mixins/index'

import ViaIcon from './icons/components/ViaIcon/index.vue'
import { useDialog, useLoading, useToast } from './utils/modals/index'
import _showDictLabel from './utils/showDictLabel'

// 为 remote 时使用远程静态资源 常用于小程序
// 为 local 时使用本地静态资源
// import { useAssets } from './utils/assets/remote'
import { useAssets } from './utils/assets/local'

export function createApp() {
  const app = createSSRApp(App)

  app.use(store)

  app.use(router)
  app.use(routerGuards, router)

  app.use(api)
  app.use(plugins)
  app.use(mixins)
  app.component('ViaIcon', ViaIcon)

  app.config.globalProperties.$dialog = useDialog
  app.config.globalProperties.$toast = useToast
  app.config.globalProperties.$loading = useLoading

  app.config.globalProperties.$showDictLabel = _showDictLabel

  // 静态资源加载工具
  app.config.globalProperties.$assets = useAssets

  return {
    app,
    Pinia: store.Pinia,
  }
}
