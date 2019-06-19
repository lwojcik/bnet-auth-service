const redisConfig = require('../src/config/redis');

global.console.log = jest.fn();

jest.mock('../src/config/redis', () => ({  
  enable: jest.fn(),
}));

describe('Server', () => {
  const server = require('../src/index');

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });


  it("works with redis disabled", (done) => {
    expect(async () => {
      require('../src/config/redis').enable.mockImplementation(() => false);
      await server.start();
      await server.stop();
      done();
    }).not.toThrow();
  });

  it("works with redis enabled", (done) => {
    expect(async () => {
      require('../src/config/redis').enable.mockImplementation(() => true);
      await server.start();
      await server.stop();
      done();
    }).not.toThrow();
  });
});