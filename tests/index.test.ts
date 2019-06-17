import server from '../src/index';


describe('/status', () => {
  beforeAll(async () => {
    server.registerPlugins();
    await server.instance.ready();
  });

  it("GET returns 200", async done => {
    const response = await server.instance.inject({ method: "GET", url: "/status" });
    expect(response.statusCode).toEqual(200);
    const payload: { status: number; message: string } = JSON.parse(
      response.payload
    );
    expect(payload).toMatchSnapshot({ status: 200, message: 'ok' });

    done();
  });
});