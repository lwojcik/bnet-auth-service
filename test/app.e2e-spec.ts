import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { minimalSetup, testCases } from './fixtures';

// eslint-disable-next-line global-require
jest.mock('ioredis', () => require('ioredis-mock'));

describe('AppModule (e2e)', () => {
  let app: INestApplication;
  let OLD_ENV;
  // it('/ (GET)', () =>
  //   request(app.getHttpServer()).get('/').expect(200).expect('Hello World!'));

  testCases.map((feature) =>
    feature.states.forEach((state) => {
      describe(`${feature.name} ${state.name}`, () => {
        beforeAll(async () => {
          OLD_ENV = process.env;

          minimalSetup.forEach((variable) => {
            process.env[variable.name] = variable.value;
          });

          if (state.env_vars.length > 0) {
            state.env_vars.forEach((variable) => {
              process.env[variable.name] = variable.value;
            });
          }

          // TODO: create a factory here
          const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
          }).compile();

          app = moduleFixture.createNestApplication();
          await app.init();
        });

        afterAll(async () => {
          process.env = { ...OLD_ENV };
          await app.close();
        });

        it('/ (GET)', async () =>
          request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect(state.response.main));

        it.todo('/status (GET)');
        it.todo('/accesstoken (GET)');
        it.todo('/accesstoken?refresh=true (GET)');
      });
    })
  );
});
