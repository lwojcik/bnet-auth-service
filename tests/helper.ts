const getConfig = (enableRedis: boolean) => ({
  app: {
    nodeEnv: 'test',
    port: '8123',
  },
  bnet: {
    region: 'us',
    clientId: 'key',
    clientSecret: 'secret',
  },
  redis: {
    enable: enableRedis,
    host: '127.0.0.1',
    port: '6379',
    db: '0',
    replyCachePeriod: 100,
    cacheSegment: 'test',
    password: '',
    enableReadyCheck: true,
    dropBufferSupport: false,
  },
});

export default getConfig;
