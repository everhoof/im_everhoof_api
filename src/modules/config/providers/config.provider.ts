import * as Joi from 'joi';
import * as _ from 'lodash';

import { Service } from '../../../tokens';
import { Config } from '../types';

function toBoolean(value?: string): boolean {
  return value === 'true';
}

export const configProvider = {
  provide: Service.CONFIG,
  useFactory: (): Config => {
    const { env } = process;
    const validationSchema = Joi.object<Config>().unknown().keys({
      APP_NAME: Joi.string().required(),
      APP_PORT: Joi.number().required(),

      PUBLIC_URL: Joi.string().required(),
      CDN_URL: Joi.string().required(),

      TYPEORM_HOST: Joi.string().required(),
      TYPEORM_PORT: Joi.number().required(),
      TYPEORM_USERNAME: Joi.string().required(),
      TYPEORM_PASSWORD: Joi.string().required(),
      TYPEORM_DATABASE: Joi.string().required(),
      TYPEORM_SCHEMA: Joi.string().required(),
      TYPEORM_MIGRATIONS_RUN: Joi.boolean().required(),
      TYPEORM_LOGGING: Joi.boolean().required(),

      DISCORD_API_VERSION: Joi.number().required(),
      DISCORD_API_TOKEN: Joi.string().required(),
      DISCORD_UPLOAD_CHANNEL_ID: Joi.string().required(),

      DISCORD_OAUTH_CLIENT_ID: Joi.string().required(),
      DISCORD_OAUTH_CLIENT_SECRET: Joi.string().required(),
      DISCORD_OAUTH_CALLBACK_URL: Joi.string().required(),

      UPLOAD_DIR: Joi.string().required(),
      UPLOAD_QUEUE_LIMIT: Joi.number().required(),
      UPLOAD_MIN_HEIGHT: Joi.number().required(),
      UPLOAD_MIN_WIDTH: Joi.number().required(),
      UPLOAD_MAX_HEIGHT: Joi.number().required(),
      UPLOAD_MAX_WIDTH: Joi.number().required(),
      UPLOAD_GM_MEMORY_LIMIT: Joi.string().required(),
      UPLOAD_GM_THREADS_LIMIT: Joi.number().required(),
      UPLOAD_ALLOWED_MIMES: Joi.string().required(),
      UPLOAD_IMAGE_MAX_SIZE: Joi.number().required(),
      EMBED_UPLOAD_IMAGE_MAX_SIZE: Joi.number().required(),

      EMAIL_TRANSPORT: Joi.string().required(),
      EMAIL_DISPLAY_NAME: Joi.string().required(),
      EMAIL_DISPLAY_EMAIL: Joi.string().required(),

      RATE_LIMIT_POINTS: Joi.number().required(),
      RATE_LIMIT_DURATION: Joi.number().required(),
      RATE_LIMIT_QUEUE_ENABLED: Joi.boolean().required(),
      RATE_LIMIT_QUEUE_SIZE: Joi.number().required(),

      DONATION_ALERTS_TOKEN: Joi.string().required(),
    });

    const result = validationSchema.validate(env);

    if (result.error) {
      throw new Error(`Configuration not valid: ${result.error.message}`);
    }

    return {
      APP_NAME: `${env.APP_NAME}`,
      APP_PORT: _.toNumber(env.API_PORT),

      PUBLIC_URL: `${env.PUBLIC_URL}`,
      CDN_URL: `${env.CDN_URL}`,

      TYPEORM_HOST: `${env.TYPEORM_HOST}`,
      TYPEORM_PORT: _.toNumber(env.TYPEORM_PORT),
      TYPEORM_USERNAME: `${env.TYPEORM_USERNAME}`,
      TYPEORM_PASSWORD: `${env.TYPEORM_PASSWORD}`,
      TYPEORM_DATABASE: `${env.TYPEORM_DATABASE}`,
      TYPEORM_SCHEMA: `${env.TYPEORM_SCHEMA}`,
      TYPEORM_MIGRATIONS_RUN: toBoolean(env.TYPEORM_MIGRATIONS_RUN),
      TYPEORM_LOGGING: toBoolean(env.TYPEORM_LOGGING),

      DISCORD_API_VERSION: _.toNumber(env.DISCORD_API_VERSION),
      DISCORD_API_TOKEN: `${env.DISCORD_API_TOKEN}`,
      DISCORD_UPLOAD_CHANNEL_ID: `${env.DISCORD_UPLOAD_CHANNEL_ID}`,

      DISCORD_OAUTH_CLIENT_ID: `${env.DISCORD_OAUTH_CLIENT_ID}`,
      DISCORD_OAUTH_CLIENT_SECRET: `${env.DISCORD_OAUTH_CLIENT_SECRET}`,
      DISCORD_OAUTH_CALLBACK_URL: `${env.DISCORD_OAUTH_CALLBACK_URL}`,

      UPLOAD_DIR: `${env.UPLOAD_DIR}`,
      UPLOAD_QUEUE_LIMIT: _.toNumber(env.UPLOAD_QUEUE_LIMIT),
      UPLOAD_MIN_HEIGHT: _.toNumber(env.UPLOAD_MIN_HEIGHT),
      UPLOAD_MIN_WIDTH: _.toNumber(env.UPLOAD_MIN_WIDTH),
      UPLOAD_MAX_HEIGHT: _.toNumber(env.UPLOAD_MAX_HEIGHT),
      UPLOAD_MAX_WIDTH: _.toNumber(env.UPLOAD_MAX_WIDTH),
      UPLOAD_GM_MEMORY_LIMIT: `${env.UPLOAD_GM_MEMORY_LIMIT}`,
      UPLOAD_GM_THREADS_LIMIT: _.toNumber(env.UPLOAD_GM_THREADS_LIMIT),
      UPLOAD_ALLOWED_MIMES: `${env.UPLOAD_ALLOWED_MIMES}`.split(','),
      UPLOAD_IMAGE_MAX_SIZE: _.toNumber(env.UPLOAD_IMAGE_MAX_SIZE),
      EMBED_UPLOAD_IMAGE_MAX_SIZE: _.toNumber(env.EMBED_UPLOAD_IMAGE_MAX_SIZE),

      EMAIL_TRANSPORT: `${env.EMAIL_TRANSPORT}`,
      EMAIL_DISPLAY_NAME: `${env.EMAIL_DISPLAY_NAME}`,
      EMAIL_DISPLAY_EMAIL: `${env.EMAIL_DISPLAY_EMAIL}`,

      RATE_LIMIT_POINTS: _.toNumber(env.RATE_LIMIT_POINTS),
      RATE_LIMIT_DURATION: _.toNumber(env.RATE_LIMIT_DURATION),
      RATE_LIMIT_QUEUE_ENABLED: toBoolean(env.RATE_LIMIT_QUEUE_ENABLED),
      RATE_LIMIT_QUEUE_SIZE: _.toNumber(env.RATE_LIMIT_QUEUE_SIZE),

      DONATION_ALERTS_TOKEN: `${env.DONATION_ALERTS_TOKEN}`,
    };
  },
};
