// import redisConfig from '../src/config/redis';
import server from '../src/index';
import appConfig from '../src/config/app';
import redisConfig from '../src/config/redis';

jest.mock('../src/config/app', () => ({
  nodeEnv: 'test',
  port: '8123',
}));

jest.mock('../src/config/redis', () => ({
  enable: true,
}));

describe('Server', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });


  it("works with redis enabled", (done) => {
    appConfig.port = '8123';
    redisConfig.enable = true;
    const instance = server.getInstance();
    expect(() => {
      server.start(instance, () => {
        server.stop(instance, () => {
          done();
        });
      });
    }).not.toThrow();
  });

  // it("works with redis disabled", (done) => {
  //   redisConfig.enable = false;
  //   const instance = server.getInstance();
  //   expect(() => server.start(instance, () => server.stop(instance, done()))).not.toThrow();
  // });

});