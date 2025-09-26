/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_APP_URL: string
  readonly VITE_PHONE: string
  readonly VITE_EMAIL: string
  readonly VITE_ADDRESS: string
  readonly VITE_ICO: string
  readonly VITE_DIC: string
  readonly DEV: boolean
  readonly PROD: boolean
  readonly MODE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}