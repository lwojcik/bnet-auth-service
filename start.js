(process.env.NODE_ENV !== 'production') && require('dotenv').config();
const fastify = require('fastify');
const fastifyBlipp = require('fastify-blipp');
const fastifyRedis = require('fastify-redis');
const fastifyEnv = require('fastify-env');
const server = require('./dist/index');

const opts = {
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.BAS_NODE_PORT || '8881',
  },
  redis: {
    enable: process.env.BAS_REDIS_ENABLE === 'true' || false,
    host: process.env.BAS_REDIS_HOST || '127.0.0.1',
    port: process.env.BAS_REDIS_PORT || '6379',
    password: process.env.BAS_REDIS_PASSWORD || '',
    db: process.env.BAS_REDIS_DB || '0',
    replyCachePeriod: process.env.BAS_REDIS_CACHE_PERIOD || 1000 * 60 * 5,
    cacheSegment: process.env.BAS_REDIS_CACHE_SEGMENT || 'bas',
  },
  bnet: {
    region: process.env.BAS_BATTLENET_REGION,
    apiKey: process.env.BAS_BATTLENET_KEY,
    apiSecret: process.env.BAS_BATTLENET_SECRET,
  }
}

const envSchema = {
  type: 'object',
  required: [
    'NODE_ENV',
    'BAS_NODE_HOST',
    'BAS_REDIS_ENABLE',
    'BAS_REDIS_HOST',
    'BAS_REDIS_PORT',
    'BAS_REDIS_PASSWORD',
    'BAS_REDIS_TTL',
    'BAS_REDIS_DB',
    'BAS_REDIS_CACHE_SEGMENT',
    'BAS_BATTLENET_REGION',
    'BAS_BATTLENET_KEY',
    'BAS_BATTLENET_SECRET'
  ],
  properties: {
    NODE_ENV: {
      type: 'string',
      default: 'development',
    },
    BAS_NODE_HOST: {
      type: 'string',
      default: 'localhost',
    },
    BAS_REDIS_ENABLE: {
      type: 'string',
      default: 'true',
    },
    BAS_REDIS_HOST: {
      type: 'string',
      default: '127.0.0.1',
    },
    BAS_REDIS_PORT: {
      type: 'string',
      default: '6379',
    },
    BAS_REDIS_PASSWORD: {
      type: 'string',
      default: '',
    },
    BAS_REDIS_TTL: {
      type: 'string',
      default: '2000',
    },
    BAS_REDIS_DB: {
      type: 'string',
      default: '0',
    },
    BAS_REDIS_CACHE_SEGMENT: {
      type: 'string',
      default: 'bas',
    },
    BAS_BATTLENET_REGION: {
      type: 'string',
    },
    BAS_BATTLENET_KEY: {
      type: 'string',
    },
    BAS_BATTLENET_SECRET: {
      type: 'string',
    }
  }
}

const fastifyInstance = fastify({
  logger: opts.app.nodeEnv === 'development'
});

fastifyInstance.register(fastifyEnv, {
  schema: envSchema,
  dotenv: {
      path: `${__dirname}/.env`,
      debug: process.env.NODE_ENV === 'development'
  },
});

fastifyInstance.register(fastifyRedis, {
  host: opts.redis.host,
  port: opts.redis.port,
  password: opts.redis.password,
  enableReadyCheck: true,
  dropBufferSupport: false,
});

fastifyInstance.register(server, opts);

fastifyInstance.register(fastifyBlipp);

const start = () => fastifyInstance.listen(opts.app.port, (err) => {
  if (err) throw err;
  fastifyInstance.blipp();
  fastifyInstance.log.info(`Redis cache enabled: ${!!opts.redis.enable}`);
});

start();