import { BlizzAPI } from 'blizzapi';
import * as Joi from 'joi';
import { APP, AUTH, BATTLENET, REDIS, THROTTLE } from './environment';
import { DEFAULTS } from './DEFAULTS';

const appSchema = {
  [APP.environment]: Joi.string().default(DEFAULTS.app.environment),
  [APP.host]: Joi.string().default(DEFAULTS.app.host),
  [APP.port]: Joi.string().default(DEFAULTS.app.port),
  [APP.enableCors]: Joi.string().default('false'),
  [APP.corsOrigin]: Joi.optional(),
};

const redisSchema = {
  [REDIS.enable]: Joi.string().default('true'),
  [REDIS.host]: Joi.any().when(`${REDIS.enable}`, {
    is: 'true',
    then: Joi.string().default(DEFAULTS.redis.host),
    otherwise: Joi.optional(),
  }),
  [REDIS.host]: Joi.any().when(REDIS.enable, {
    is: 'true',
    then: Joi.string().default(DEFAULTS.redis.host),
    otherwise: Joi.optional(),
  }),
  [REDIS.port]: Joi.any().when(REDIS.enable, {
    is: 'true',
    then: Joi.string().default(DEFAULTS.redis.port),
    otherwise: Joi.optional(),
  }),
  [REDIS.password]: Joi.optional(),
  [REDIS.ttlSecs]: Joi.any().when(REDIS.enable, {
    is: 'true',
    then: Joi.string().default(DEFAULTS.redis.ttlSecs),
    otherwise: Joi.optional(),
  }),
  [REDIS.db]: Joi.any().when(REDIS.enable, {
    is: 'true',
    then: Joi.string().default(DEFAULTS.redis.db),
    otherwise: Joi.optional(),
  }),
  [REDIS.keyPrefix]: Joi.any().when(REDIS.enable, {
    is: 'true',
    then: Joi.string().default(DEFAULTS.redis.keyPrefix),
    otherwise: Joi.optional(),
  }),
  [REDIS.keyName]: Joi.any().when(REDIS.enable, {
    is: 'true',
    then: Joi.string().default(DEFAULTS.redis.keyName),
    otherwise: Joi.optional(),
  }),
};

const battlenetSchema = {
  [BATTLENET.region]: Joi.string()
    .required()
    .custom((value) => {
      const allowedRegionNames = BlizzAPI.getAllRegionNames()
        .filter((region) => region !== 'tw')
        .join(', ');

      const validRegionName = BlizzAPI.validateRegionName(value);

      if (!validRegionName) {
        throw new RangeError(
          `'${value}' is not a valid Battle.net region. Available regions: ${allowedRegionNames}`
        );
      }
      return validRegionName;
    }),
  [BATTLENET.clientId]: Joi.string().required(),
  [BATTLENET.clientSecret]: Joi.string().required(),
};

const throttleSchema = {
  [THROTTLE.limit]: Joi.string().default(DEFAULTS.throttle.limit),
  [THROTTLE.ttlSecs]: Joi.string().default(DEFAULTS.throttle.ttlSecs),
};

const authSchema = {
  [AUTH.enable]: Joi.string().default(DEFAULTS.auth.enable),
  [AUTH.username]: Joi.any().when(AUTH.enable, {
    is: 'true',
    then: Joi.string().required(),
    otherwise: Joi.optional(),
  }),
  [AUTH.jwtSecret]: Joi.any().when(AUTH.enable, {
    is: 'true',
    then: Joi.string().required(),
    otherwise: Joi.optional(),
  }),
};

export const CONFIG_VALIDATION_SCHEMA = Joi.object({
  ...appSchema,
  ...redisSchema,
  ...battlenetSchema,
  ...throttleSchema,
  ...authSchema,
});
