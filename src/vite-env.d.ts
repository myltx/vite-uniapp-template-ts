/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string;
  readonly VITE_APP_FILE_URL: string;
  readonly VITE_APP_FILE_PATH: string;
  readonly VITE_APP_PROXY_PATH: string;
  readonly VITE_APP_REQUEST_PATH: string;
  readonly VITE_APP_BASE_PATH: string;
  readonly VITE_APP_PROXY_PORT: number;
  readonly VITE_APP_USE_REMOTE_MENU: boolean;
  readonly VITE_GLOB_APP_NAME: string;
  readonly VITE_GLOB_HOME_PAGE: string;
  readonly VITE_APP_USE_ENCRYPT: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Process {
  readonly env: ImportMetaEnv;
}