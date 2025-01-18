declare module "bun" {
  interface Env {
    PORT: number;
    LOG_LEVEL: string;
    TIMESTAMP_FORMAT: string;
    DATABASE_URL: string;
  }
}
