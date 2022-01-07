export interface Config {
  readonly APP_NAME: string;
  readonly APP_PORT: number;

  readonly PUBLIC_URL: string;
  readonly CDN_URL: string;

  // Database ORM configuration
  readonly TYPEORM_HOST: string;
  readonly TYPEORM_PORT: number;
  readonly TYPEORM_USERNAME: string;
  readonly TYPEORM_PASSWORD: string;
  readonly TYPEORM_DATABASE: string;
  readonly TYPEORM_SCHEMA: string;
  readonly TYPEORM_MIGRATIONS_RUN: boolean;
  readonly TYPEORM_LOGGING: boolean;

  //Discord API configuration
  readonly DISCORD_API_VERSION: number;
  readonly DISCORD_API_TOKEN: string;
  readonly DISCORD_UPLOAD_CHANNEL_ID: string;

  // Discord OAuth configuration
  readonly DISCORD_OAUTH_CLIENT_ID: string;
  readonly DISCORD_OAUTH_CLIENT_SECRET: string;
  readonly DISCORD_OAUTH_CALLBACK_URL: string;

  // Upload module configuration
  readonly UPLOAD_DIR: string;
  readonly UPLOAD_QUEUE_LIMIT: number;
  readonly UPLOAD_MIN_HEIGHT: number;
  readonly UPLOAD_MIN_WIDTH: number;
  readonly UPLOAD_MAX_HEIGHT: number;
  readonly UPLOAD_MAX_WIDTH: number;
  readonly UPLOAD_GM_MEMORY_LIMIT: string;
  readonly UPLOAD_GM_THREADS_LIMIT: number;
  readonly EMBED_UPLOAD_IMAGE_MAX_SIZE: number;

  // SFTP configuration
  readonly EMAIL_TRANSPORT: string;
  readonly EMAIL_DISPLAY_NAME: string;
  readonly EMAIL_DISPLAY_EMAIL: string;

  // Throttler configuration
  readonly RATE_LIMIT_POINTS: number;
  readonly RATE_LIMIT_DURATION: number;
  readonly RATE_LIMIT_QUEUE_ENABLED: boolean;
  readonly RATE_LIMIT_QUEUE_SIZE: number;
}
