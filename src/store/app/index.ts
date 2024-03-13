import { defineStore } from 'pinia'
import storage from '@/utils/storages'
import { getSiteConfig } from '@/api/base/index'

import { VITE_APP_PRIMARY_COLOR } from '@/configs/'

export const useAppStore = defineStore({
  id: 'app',
  state() {
    return {
      themeConfig: storage.get('app/themeConfig') || {
        primaryColor: VITE_APP_PRIMARY_COLOR,
      },
      siteInfo: {},
      systemInfo: {},
    }
  },
  getters: {
    primaryColor: state => state.themeConfig?.primaryColor,
  },
  actions: {
    getSystemInfo() {
      return new Promise((resolve) => {
        uni.getSystemInfo({
          success: (res) => {
            this.systemInfo = res
            resolve(res)
          },
        })
      })
    },
    async getSiteConfig() {
      const res = await getSiteConfig()
      if (res.success) {
        const { title } = res.data
        this.siteInfo = {
          appName: title,
        }
      }
    },
  },
})
