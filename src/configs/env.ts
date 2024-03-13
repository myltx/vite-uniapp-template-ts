export const {
  VITE_APP_API_URL,
  VITE_APP_REQUEST_PATH,
  VITE_APP_PROXY_PATH,
  VITE_APP_FILE_URL,
  VITE_APP_FILE_PATH,
  VITE_APP_BASE_PATH,
  VITE_GLOB_APP_NAME,
  VITE_GLOB_HOME_PAGE,
  VITE_APP_USE_REMOTE_MENU,
  VITE_APP_PRIMARY_COLOR,
  VITE_APP_USE_ENCRYPT,
} = import.meta.env

export function isDev() {
  return import.meta.env.MODE === 'development'
}

export function isProduction() {
  return import.meta.env.MODE === 'production'
}
