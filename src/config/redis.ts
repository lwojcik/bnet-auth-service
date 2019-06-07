/**
 * @file    Redis configuration file.
 * @author  Łukasz Wójcik
 * @license MIT
 * @since   2019-03-18
 */

const redisConfig = {
  connectionString: process.env.API_REDIS_CONNECTION_STRING || 'redis://127.0.0.1:6379',
  db: process.env.API_REDIS_DB || '4',
  replyCachePeriod: process.env.API_REDIS_CACHE_PERIOD || 1000 * 60 * 5
};

export default redisConfig;
