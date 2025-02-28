interface ImportMetaEnv {
    readonly VITE_APP_HOST: string,
    readonly VITE_APP_PORT: number,
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}