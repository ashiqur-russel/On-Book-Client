/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_API_URL_LIVE: string;
  readonly VITE_APP_API_URL_DEV: string;
  // more env variables...
  readonly VITE_APP_STRIPE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
