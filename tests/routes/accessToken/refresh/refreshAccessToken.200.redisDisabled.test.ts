import fastify from "fastify";
import fastifyRedis from "fastify-redis-mock";
import server from "../../../../src/index";
import getConfig from "../../../helper";

describe("/accessToken/refresh (Redis disabled)", () => {
  const fastifyServer = fastify();

  beforeAll(() => {
    fastifyServer.register(fastifyRedis, {
      host: "127.0.0.1",
      port: "6379",
      password: "",
      enableReadyCheck: true,
      dropBufferSupport: false,
    });
    fastifyServer.register(server, getConfig(false));
  });

  afterAll(() => fastifyServer.close());

  it("returns 200", async () => {
    expect.assertions(1);
    const res = await fastifyServer.inject({
      method: "GET",
      url: "/accessToken/refresh",
    });
    expect(res.statusCode).toBe(200);
  });

  it("returns correct response", async () => {
    expect.assertions(1);

    const res = await fastifyServer.inject({
      method: "GET",
      url: "/accessToken/refresh",
    });

    expect(res.payload).toMatchSnapshot();
  });
});
