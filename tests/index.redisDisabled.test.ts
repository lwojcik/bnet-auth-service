import fastify from "fastify";
import server from "../src/index";
import getConfig from "./helper";

describe("Server (Redis disabled)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it("starts and stops without throwing", async () => {
    expect.assertions(1);

    expect(async () => {
      const fastifyServer = fastify();
      fastifyServer.register(server, getConfig(false));
      await fastifyServer.close();
    }).not.toThrow();
  });
});
