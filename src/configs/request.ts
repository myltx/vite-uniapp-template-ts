import { VITE_APP_FILE_PATH, VITE_APP_PROXY_PATH, VITE_APP_REQUEST_PATH, isDev } from './env'
import {
  useProxy,
} from './index'

// 请求基础域名
export function getBaseURL() {
  let tempURL = ''
  if (useProxy) {
    tempURL = isDev() ? VITE_APP_PROXY_PATH : window.location.origin + VITE_APP_REQUEST_PATH
  }
  else {
    tempURL = import.meta.env.VITE_APP_API_URL + VITE_APP_REQUEST_PATH
  }
  return tempURL
}

// 文件基础域名
export function getFileBaseURL() {
  let tempURL = ''
  if (useProxy) {
    tempURL = isDev()
      ? VITE_APP_FILE_PATH
      : window.location.origin + VITE_APP_FILE_PATH
  }
  else {
    tempURL = import.meta.env.VITE_APP_FILE_URL + VITE_APP_FILE_PATH
  }
  return tempURL
}

// 请求域名
export const baseURL = getBaseURL()
// 响应成功code值
export const responseSuccessCode = '20000'
// 超时时间
export const timeout = 60 * 1000
// 是否开启加密
export { VITE_APP_USE_ENCRYPT } from './env'
