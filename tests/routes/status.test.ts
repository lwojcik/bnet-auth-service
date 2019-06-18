import server from '../../src/index';

describe('/status', () => {
  beforeAll(() => {
    server.registerPlugins();
  });

  it("GET returns 200", async () => {
    const response = await server.instance.inject({ method: "GET", url: "/status" });
    expect(response.statusCode).toEqual(200);
  });

  it("Response matches snapshot", async () => {
    const response = await server.instance.inject({ method: "GET", url: "/status" });
    const payload = JSON.parse(response.payload);
    expect(payload).toMatchSnapshot({ status: 200, message: 'ok' });
  });
});