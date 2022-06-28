// import { Test, TestingModule } from '@nestjs/testing';
// import {
//   FastifyAdapter,
//   NestFastifyApplication,
// } from '@nestjs/platform-fastify';
// import { APP_GUARD } from '@nestjs/core';
// import { ConfigModule, ConfigService, registerAs } from '@nestjs/config';
// import { IncomingHttpHeaders } from 'http';
// import { JwtStrategy } from '../src/auth/strategies/jwt.strategy';
// import { minimalSetup, testCases } from './fixtures';
// import { JwtAuthGuard, PassthroughGuard } from '../src/auth/guards';
// import { AuthModule } from '../src/auth/auth.module';
// import { MainModule } from '../src/main/main.module';
// import { StatusModule } from '../src/status/status.module';
// import { AccessTokenModule } from '../src/accesstoken/accesstoken.module';
// import { AppController } from '../src/app.controller';
// import { LoggerModule } from '../src/logger/logger.module';

// // eslint-disable-next-line global-require
// jest.mock('ioredis', () => require('ioredis-mock'));

// // const testEndpoint = (params: TestEndpointParams) =>
// //   params.app
// //     .inject({
// //       method: 'GET',
// //       url: params.url,
// //       headers: params.headers,
// //     })
// //     .then((result) => {
// //       expect(result.statusCode).toEqual(params.expectedStatusCode);
// //       const parsedResult = JSON.parse(result.payload);
// //       if (params.expectedResult) {
// //         expect(parsedResult).toEqual(params.expectedResult);
// //       }

// //       if (params.expectedDataProperties) {
// //         params.expectedDataProperties.forEach((property) => {
// //           expect(parsedResult).toHaveProperty(property);
// //         });
// //       }
// //     });

// // describe('1. AppModule (e2e)', () => {
// // testCases.map((feature, i) =>
// //   feature.states.forEach((state, j) => {
// //     describe(`${i + 1}.${j + 1}. ${feature.name} ${state.name}`, () => {
// //       let app: NestFastifyApplication;
// //       let OLD_ENV;
// //       beforeAll(async () => {
// //         OLD_ENV = process.env;
// //         minimalSetup.forEach((variable) => {
// //           process.env[variable.name] = variable.value;
// //         });
// //         if (state.env_vars.length > 0) {
// //           state.env_vars.forEach((variable) => {
// //             process.env[variable.name] = variable.value;
// //           });
// //         }
// //         // TODO: parametrize it based on test states / features
// //         app = await createServer({
// //           auth: {
// //             enable: process.env.BAS_AUTH_ENABLE === 'true',
// //             username: process.env.BAS_AUTH_USERNAME,
// //             jwtSecret: process.env.BAS_AUTH_JWT_SECRET,
// //           },
// //         });
// //         await startServer(app);
// //       });
// //       afterAll(async () => {
// //         process.env = { ...OLD_ENV };
// //         await stopServer(app);
// //       });
// //       if (state.variants.length === 1) {
// //         it('/ (GET)', () =>
// //           testEndpoint({
// //             app,
// //             url: '/',
// //             headers: { ...state.variants[0].headers },
// //             expectedStatusCode: state.variants[0].response.main.statusCode,
// //             expectedResult: state.variants[0].response.main.data,
// //           }));
// //         it('/status (GET)', () =>
// //           testEndpoint({
// //             app,
// //             url: '/status',
// //             headers: { ...state.variants[0].headers },
// //             expectedStatusCode: state.variants[0].response.status.statusCode,
// //             expectedDataProperties: state.variants[0].properties.status,
// //           }));
// //       } else {
// //         state.variants.forEach((variant, k) => {
// //           describe(`${i + 1}.${j + 1}.${k + 1} ${variant.name}`, () => {
// //             it('/ (GET)', () =>
// //               testEndpoint({
// //                 app,
// //                 url: '/',
// //                 headers: { ...variant.headers },
// //                 expectedStatusCode: variant.response.main.statusCode,
// //                 expectedResult: variant.response.main.data,
// //               }));
// //             it('/status (GET)', () =>
// //               testEndpoint({
// //                 app,
// //                 url: '/status',
// //                 headers: { ...variant.headers },
// //                 expectedStatusCode: variant.response.status.statusCode,
// //                 expectedDataProperties: variant.properties?.status,
// //               }));
// //           });
// //         });
// //       }
// //       it.todo('/accesstoken (GET)');
// //       it.todo('/accesstoken?refresh=true (GET)');
// //     });
// //   })
// // );
// // });
