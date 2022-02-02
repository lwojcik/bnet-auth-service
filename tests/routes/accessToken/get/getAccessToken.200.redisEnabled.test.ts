/* eslint-disable @typescript-eslint/no-explicit-any */
import fastify from "fastify";
import fastifyRedis from "fastify-redis-mock";
import server from "../../../../src/index";
import getConfig from "../../../helper";

describe("/accessToken/get 200 (Redis enabled)", () => {
  const fastifyServer = fastify() as any;

  beforeAll(() => {
    fastifyServer.register(fastifyRedis, {
      host: "127.0.0.1",
      port: "6379",
      password: "",
      enableReadyCheck: true,
      dropBufferSupport: false,
    });
    fastifyServer.register(server, getConfig(true));
  });

  afterAll(() => fastifyServer.close());

  it("returns 200", async () => {
    expect.assertions(1);

    const res = await fastifyServer.inject({
      method: "GET",
      url: "/accessToken/get",
    });

    expect(res.statusCode).toBe(200);
  });

  it("returns correct response", async () => {
    expect.assertions(1);

    const res = await fastifyServer.inject({
      method: "GET",
      url: "/accessToken/get",
    });

    expect(res.payload).toMatchSnapshot();
  });

  it("returns correct response when access token is cached", async () => {
    expect.assertions(1);

    await (fastifyServer as any).redis.set(
      getConfig(true).redis.cacheSegment,
      "sample cached access token"
    );

    const res = await fastifyServer.inject({
      method: "GET",
      url: "/accessToken/get",
    });

    expect(res.payload).toMatchSnapshot();
  });

  it("returns 200 when refresh parameter is sent", async () => {
    expect.assertions(1);

    const res = await fastifyServer.inject({
      method: "GET",
      url: "/accessToken/get?refresh=true",
    });

    expect(res.statusCode).toBe(200);
  });

  it("returns correct response refresh parameter is sent", async () => {
    expect.assertions(1);

    const res = await fastifyServer.inject({
      method: "GET",
      url: "/accessToken/get?refresh=true",
    });

    expect(res.payload).toMatchSnapshot();
  });

  it("response is cached correctly", async () => {
    expect.assertions(1);

    await fastifyServer.inject({
      method: "GET",
      url: "/accessToken/get?refresh=true",
    });

    const cachedResponse = await fastifyServer.redis.get(
      getConfig(true).redis.cacheSegment
    );

    expect(cachedResponse).toBe("sample access token");
  });
});
