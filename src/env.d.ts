interface ImportMetaEnv {
  readonly KB_SHOW_PLACEHOLDERS?: string;
  readonly VERCEL_GIT_COMMIT_SHA?: string;
  /** Telegram username without @. Overrides TELEGRAM_USERNAME in src/data/contact.ts. */
  readonly PUBLIC_TELEGRAM_USERNAME?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
