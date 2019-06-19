// const redisConfig = require('../src/config/redis');

// global.console.log = jest.fn();

const redisConfig = jest.fn();

describe('Server', () => {
  const server = require('../src/index');

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });


  it("works with redis enabled", (done) => {

    redisConfig.mockReturnValue({
      enable: true,
    });

    expect(async () => {
      await server.start();
      await server.stop();
      done();
    }).not.toThrow();
  });

  it("works with redis disabled", (done) => {

    redisConfig.mockReturnValue({
      enable: false,
    });

    expect(async () => {
      await server.start();
      await server.stop();
      done();
    }).not.toThrow();
  });
});