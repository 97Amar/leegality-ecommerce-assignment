/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_AUTH_URL: string;
    readonly VITE_APP_ENCRYPT: string;
    readonly VITE_APP_ENCRYPT_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
