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
    expect(() => {
      require('../src/config/redis').enable.mockImplementation(() => false);
      server.start(async () => {
        server.stop(done);
      });
    }).not.toThrow();
  });

  it("works with redis enabled", (done) => {
    expect(() => {
      require('../src/config/redis').enable.mockImplementation(() => true);
      server.start(async () => {
        server.stop(done);
      });
    }).not.toThrow();
  });
});