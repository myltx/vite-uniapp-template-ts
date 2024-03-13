import { VITE_GLOB_APP_NAME } from '@/configs'

export default {
  data() {
    return {
      shareAppMessageProps: {},
      shareTimelineProps: {},
    }
  },
  onShareAppMessage() {
    return {
      title: VITE_GLOB_APP_NAME,
      path: '/pages/index/index',
      ...this.shareAppMessageProps,
    }
  },
  onShareTimeline() {
    return {
      title: VITE_GLOB_APP_NAME,
      query: '',
      ...this.shareTimelineProps,
    }
  },
}
