interface ImportMetaEnv {
  readonly KB_SHOW_PLACEHOLDERS?: string;
  readonly VERCEL_GIT_COMMIT_SHA?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
