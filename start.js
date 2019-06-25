if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const fastify = require('fastify');
const fp = require('fastify-plugin');
const fastifyBlipp = require('fastify-blipp');
const server = require('./dist/index');

const opts = {
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.API_NODE_PORT || '8881',
  },
  redis: {
    enable: process.env.API_REDIS_ENABLE === 'true' || false,
    connectionString: process.env.API_REDIS_CONNECTION_STRING || 'redis://127.0.0.1:6379',
    db: process.env.API_REDIS_DB || '0',
    replyCachePeriod: process.env.API_REDIS_CACHE_PERIOD || 1000 * 60 * 5,
    cacheSegment: process.env.API_REDIS_CACHE_SEGMENT || 'bas',
  },
  bnet: {
    region: process.env.API_BATTLENET_REGION,
    apiKey: process.env.API_BATTLENET_KEY,
    apiSecret: process.env.API_BATTLENET_SECRET,
  }
}

const fastifyInstance = fastify({
  logger: opts.app.nodeEnv === 'development'
});

fastifyInstance.register(fp(server), opts);
fastifyInstance.register(fastifyBlipp);

const start = () => fastifyInstance.listen(opts.app.port, (err) => {
  if (err) throw err;
  fastifyInstance.blipp();
  fastifyInstance.log.info(`Redis cache enabled: ${!!opts.redis.enable}`);
});

start();