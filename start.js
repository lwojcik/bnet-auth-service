if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const fastify = require('fastify');
const fastifyBlipp = require('fastify-blipp');
const server = require('./dist/index');

const opts = {
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.BAS_NODE_PORT || '8881',
  },
  redis: {
    enable: process.env.BAS_REDIS_ENABLE === 'true' || false,
    connectionString: process.env.BAS_REDIS_CONNECTION_STRING || 'redis://127.0.0.1:6379',
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

const fastifyInstance = fastify({
  logger: opts.app.nodeEnv === 'development'
});

fastifyInstance.register(server, opts);
fastifyInstance.register(fastifyBlipp);

const start = () => fastifyInstance.listen(opts.app.port, (err) => {
  if (err) throw err;
  fastifyInstance.blipp();
  fastifyInstance.log.info(`Redis cache enabled: ${!!opts.redis.enable}`);
});

start();