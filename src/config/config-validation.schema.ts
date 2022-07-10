import * as Joi from 'joi';
import { CronExpression } from '@nestjs/schedule';
import { validateRegionName } from '../common/validators/validateRegionName.validator';

const appSchema = {
  NODE_ENV: Joi.string().default('production'),
  BAS_APP_HOST: Joi.string().default('0.0.0.0'),
  BAS_APP_PORT: Joi.string().default(3000),
  BAS_APP_CORS_ORIGIN: Joi.optional(),
};

const redisSchema = {
  BAS_REDIS_HOST: Joi.string().optional().default('redis'),
  BAS_REDIS_PORT: Joi.string().optional().default('6379'),
  BAS_REDIS_PASSWORD: Joi.any().optional(),
  BAS_REDIS_TTL_SECS: Joi.string().optional().default('2000'),
  BAS_REDIS_DB: Joi.string().optional().default('0'),
};

const battlenetSchema = {
  BAS_BATTLENET_REGION: Joi.string().required().custom(validateRegionName),
  BAS_BATTLENET_CLIENT_ID: Joi.string().required(),
  BAS_BATTLENET_CLIENT_SECRET: Joi.string().required(),
};

const throttleSchema = {
  BAS_THROTTLE_LIMIT: Joi.string().optional().default('300'),
  BAS_THROTTLE_TTL_SECS: Joi.string().optional().default('60'),
};

const authSchema = {
  BAS_AUTH_USERNAME: Joi.string().optional(),
  BAS_AUTH_JWT_SECRET: Joi.string().optional(),
};

const httpsSchema = {
  BAS_HTTPS_KEY_PATH: Joi.string().optional(),
  BAS_HTTPS_CERT_PATH: Joi.string().optional(),
};

const cronSchema = {
  BAS_CRON_PATTERN: Joi.string()
    .optional()
    .default(CronExpression.EVERY_30_MINUTES),
};

export const configValidationSchema = Joi.object({
  ...appSchema,
  ...redisSchema,
  ...battlenetSchema,
  ...throttleSchema,
  ...authSchema,
  ...httpsSchema,
  ...cronSchema,
});
